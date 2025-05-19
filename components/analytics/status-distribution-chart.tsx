"use client"

import { useStore } from "@/lib/store"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export function StatusDistributionChart() {
  const { partnerApplications, clientInformation, taxFilings } = useStore()

  // Partner Applications Status Distribution
  const partnerStatusCounts = partnerApplications.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const partnerStatusData = Object.entries(partnerStatusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }))

  // Client Information Status Distribution
  const clientStatusCounts = clientInformation.reduce(
    (acc, client) => {
      acc[client.status] = (acc[client.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const clientStatusData = Object.entries(clientStatusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }))

  // Tax Filings Status Distribution
  const taxStatusCounts = taxFilings.reduce(
    (acc, filing) => {
      acc[filing.status] = (acc[filing.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const taxStatusData = Object.entries(taxStatusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }))

  // Colors for the pie charts
  const COLORS = {
    Pending: "#f59e0b",
    Approved: "#10b981",
    Rejected: "#ef4444",
    Active: "#10b981",
    Inactive: "#ef4444",
    Draft: "#94a3b8",
    Submitted: "#3b82f6",
    Processing: "#8b5cf6",
    Completed: "#10b981",
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
      <div className="flex flex-col items-center">
        <h3 className="text-center font-medium mb-4">Partner Applications</h3>
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={partnerStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                {partnerStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || "#8884d8"} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <Legend
            payload={partnerStatusData.map((item, index) => ({
              value: `${item.name} (${item.value})`,
              color: COLORS[item.name as keyof typeof COLORS] || "#8884d8",
              type: "square",
            }))}
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-center font-medium mb-4">Client Information</h3>
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={clientStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                {clientStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || "#8884d8"} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <Legend
            payload={clientStatusData.map((item, index) => ({
              value: `${item.name} (${item.value})`,
              color: COLORS[item.name as keyof typeof COLORS] || "#8884d8",
              type: "square",
            }))}
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-center font-medium mb-4">Tax Filings</h3>
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taxStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                {taxStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || "#8884d8"} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <Legend
            payload={taxStatusData.map((item, index) => ({
              value: `${item.name} (${item.value})`,
              color: COLORS[item.name as keyof typeof COLORS] || "#8884d8",
              type: "square",
            }))}
          />
        </div>
      </div>
    </div>
  )
}
