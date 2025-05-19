"use client";

import { useStore } from "@/lib/store";
import { addDays, format, isAfter, isBefore, isEqual, parseISO } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";

interface FormSubmissionsChartProps {
  dateRange: {
    from: Date;
    to: Date;
  };
}

export function FormSubmissionsChart({ dateRange }: FormSubmissionsChartProps) {
  const {
    websitePartnerApplications,
    websiteClientInformation,
    websiteTaxFilings,
  } = useStore();

  // If no data at all, show empty state
  if (
    websitePartnerApplications.length === 0 &&
    websiteClientInformation.length === 0 &&
    websiteTaxFilings.length === 0
  ) {
    return (
      <div className="flex h-[300px] items-center justify-center text-muted-foreground">
        No form submission data available
      </div>
    );
  }

  const chartData = useMemo(() => {
    // Validate dateRange inside memo
    if (!dateRange?.from || !dateRange?.to) return [];

    // Initialize date map
    const dateMap = new Map<string, {
      name: string;
      "Partner Applications": number;
      "Client Information": number;
      "Tax Filings": number;
    }>();

    let currentDate = new Date(dateRange.from);
    const endDate = new Date(dateRange.to);
    while (currentDate <= endDate) {
      const key = format(currentDate, "yyyy-MM-dd");
      dateMap.set(key, {
        name: format(currentDate, "MMM dd"),
        "Partner Applications": 0,
        "Client Information": 0,
        "Tax Filings": 0,
      });
      currentDate = addDays(currentDate, 1);
    }

    // Reusable processor
    const processSubmission = (submission: any, type: keyof typeof dateMap extends Map<string, infer U> ? keyof U : string) => {
      const dateString = submission.submittedAt || submission.createdAt;
      if (!dateString) return;
      let parsed: Date;
      try {
        parsed = parseISO(dateString);
      } catch {
        return;
      }
      if (
        (isAfter(parsed, dateRange.from) || isEqual(parsed, dateRange.from)) &&
        (isBefore(parsed, dateRange.to) || isEqual(parsed, dateRange.to))
      ) {
        const key = format(parsed, "yyyy-MM-dd");
        if (dateMap.has(key)) {
          dateMap.get(key)![type]++;
        }
      }
    };

    websitePartnerApplications.forEach(app => processSubmission(app, "Partner Applications"));
    websiteClientInformation.forEach(ci => processSubmission(ci, "Client Information"));
    websiteTaxFilings.forEach(tf => processSubmission(tf, "Tax Filings"));

    return Array.from(dateMap.values());
  }, [websitePartnerApplications, websiteClientInformation, websiteTaxFilings, dateRange]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Partner Applications" fill="#f59e0b" />
        <Bar dataKey="Client Information" fill="#3b82f6" />
        <Bar dataKey="Tax Filings" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
}
