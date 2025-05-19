"use client"

import { useEffect, useMemo, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ClipboardList, FileSpreadsheet, ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react"
import { useStore } from "@/lib/store"
import { addDays, parseISO, subMonths, isAfter, isBefore } from "date-fns"

export function DashboardStats() {
  const { partnerApplications, clientInformation, taxFilings, users, payments } = useStore()
  
  // Cache the previous props to prevent unnecessary recalculations
  const dataRef = useRef({
    partnerAppsLength: 0,
    clientInfoLength: 0,
    taxFilingsLength: 0,
    usersLength: 0,
    paymentsLength: 0
  });
  
  // Only recalculate stats when data actually changes
  const stats = useMemo(() => {
    // Check if data actually changed to avoid unnecessary recalculations
    const hasChanged = 
      partnerApplications.length !== dataRef.current.partnerAppsLength ||
      clientInformation.length !== dataRef.current.clientInfoLength ||
      taxFilings.length !== dataRef.current.taxFilingsLength ||
      users.length !== dataRef.current.usersLength ||
      payments.length !== dataRef.current.paymentsLength;
    
    // Update the ref with current lengths
    dataRef.current = {
      partnerAppsLength: partnerApplications.length,
      clientInfoLength: clientInformation.length,
      taxFilingsLength: taxFilings.length,
      usersLength: users.length,
      paymentsLength: payments.length
    };
    
    // If nothing changed, skip intensive calculations
    if (!hasChanged && dataRef.current.stats) {
      return dataRef.current.stats;
    }
    
    try {
      // Calculate current and previous month dates
      const now = new Date()
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      const previousMonthStart = subMonths(currentMonthStart, 1)
      
      // Safely parse dates and handle potential errors
      const safeParseDate = (dateString) => {
        try {
          if (!dateString) return null;
          const date = parseISO(dateString);
          // Check if date is valid
          return isNaN(date.getTime()) ? null : date;
        } catch (error) {
          console.error("Error parsing date:", error);
          return null;
        }
      };
      
      // Calculate real user growth with safe date parsing
      const usersThisMonth = users.filter(u => {
        const createdAt = safeParseDate(u.createdAt);
        return createdAt && isAfter(createdAt, currentMonthStart);
      }).length;
      
      const usersLastMonth = users.filter(u => {
        const createdAt = safeParseDate(u.createdAt);
        return createdAt && isAfter(createdAt, previousMonthStart) && isBefore(createdAt, currentMonthStart);
      }).length;
      
      const userGrowth = usersLastMonth === 0 
        ? usersThisMonth > 0 ? 100 : 0 
        : ((usersThisMonth - usersLastMonth) / usersLastMonth) * 100;
      
      // Partner applications growth with safe date parsing
      const appsThisMonth = partnerApplications.filter(app => {
        const submittedAt = safeParseDate(app.submittedAt);
        return submittedAt && isAfter(submittedAt, currentMonthStart);
      }).length;
      
      const appsLastMonth = partnerApplications.filter(app => {
        const submittedAt = safeParseDate(app.submittedAt);
        return submittedAt && isAfter(submittedAt, previousMonthStart) && isBefore(submittedAt, currentMonthStart);
      }).length;
      
      const partnerGrowth = appsLastMonth === 0 
        ? appsThisMonth > 0 ? 100 : 0
        : ((appsThisMonth - appsLastMonth) / appsLastMonth) * 100;
      
      // Client information growth
      const clientsThisMonth = clientInformation.filter(client => {
        const submittedAt = safeParseDate(client.submittedAt);
        return submittedAt && isAfter(submittedAt, currentMonthStart);
      }).length;
      
      const clientsLastMonth = clientInformation.filter(client => {
        const submittedAt = safeParseDate(client.submittedAt);
        return submittedAt && isAfter(submittedAt, previousMonthStart) && isBefore(submittedAt, currentMonthStart);
      }).length;
      
      const clientGrowth = clientsLastMonth === 0 
        ? clientsThisMonth > 0 ? 100 : 0
        : ((clientsThisMonth - clientsLastMonth) / clientsLastMonth) * 100;
      
      // Revenue calculations
      const revenueThisMonth = payments
        .filter(payment => {
          const paymentDate = safeParseDate(payment.date);
          return paymentDate && payment.status === "Completed" && isAfter(paymentDate, currentMonthStart);
        })
        .reduce((sum, payment) => sum + (payment.amount || 0), 0);
      
      const revenueLastMonth = payments
        .filter(payment => {
          const paymentDate = safeParseDate(payment.date);
          return paymentDate && payment.status === "Completed" && 
            isAfter(paymentDate, previousMonthStart) && 
            isBefore(paymentDate, currentMonthStart);
        })
        .reduce((sum, payment) => sum + (payment.amount || 0), 0);
      
      const revenueGrowth = revenueLastMonth === 0 
        ? revenueThisMonth > 0 ? 100 : 0
        : ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100;
      
      // Create the stats object
      const calculatedStats = {
        usersThisMonth,
        usersLastMonth,
        userGrowth,
        appsThisMonth,
        appsLastMonth,
        partnerGrowth,
        clientsThisMonth,
        clientsLastMonth,
        clientGrowth,
        revenueThisMonth,
        revenueLastMonth,
        revenueGrowth
      };
      
      // Store the calculated stats
      dataRef.current.stats = calculatedStats;
      return calculatedStats;
      
    } catch (error) {
      console.error("Error calculating dashboard stats:", error);
      // Return safe default values if calculations fail
      return {
        usersThisMonth: 0,
        usersLastMonth: 0,
        userGrowth: 0,
        appsThisMonth: 0,
        appsLastMonth: 0,
        partnerGrowth: 0,
        clientsThisMonth: 0,
        clientsLastMonth: 0,
        clientGrowth: 0,
        revenueThisMonth: 0,
        revenueLastMonth: 0,
        revenueGrowth: 0
      };
    }
  }, [users, partnerApplications, clientInformation, payments]);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <>
      <Card className="card-hover-effect">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{users.length}</div>
            <div className={`flex items-center text-xs ${stats.userGrowth >= 0 ? "text-success" : "text-destructive"}`}>
              {stats.userGrowth >= 0 ? (
                <ArrowUpRight className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownRight className="mr-1 h-3 w-3" />
              )}
              <span>{Math.abs(stats.userGrowth).toFixed(1)}% from last month</span>
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${Math.min((users.length / 30) * 100, 100)}%` }}></div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-hover-effect">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Partner Applications</CardTitle>
          <ClipboardList className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{partnerApplications.length}</div>
            <div className={`flex items-center text-xs ${stats.partnerGrowth >= 0 ? "text-success" : "text-destructive"}`}>
              {stats.partnerGrowth >= 0 ? (
                <ArrowUpRight className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownRight className="mr-1 h-3 w-3" />
              )}
              <span>{Math.abs(stats.partnerGrowth).toFixed(1)}% from last month</span>
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${Math.min((partnerApplications.length / 15) * 100, 100)}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-hover-effect">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Client Information</CardTitle>
          <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{clientInformation.length}</div>
            <div className={`flex items-center text-xs ${stats.clientGrowth >= 0 ? "text-success" : "text-destructive"}`}>
              {stats.clientGrowth >= 0 ? (
                <ArrowUpRight className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownRight className="mr-1 h-3 w-3" />
              )}
              <span>{Math.abs(stats.clientGrowth).toFixed(1)}% from last month</span>
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${Math.min((clientInformation.length / 15) * 100, 100)}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="card-hover-effect">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{formatCurrency(stats.revenueThisMonth)}</div>
            <div className={`flex items-center text-xs ${stats.revenueGrowth >= 0 ? "text-success" : "text-destructive"}`}>
              {stats.revenueGrowth >= 0 ? (
                <ArrowUpRight className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownRight className="mr-1 h-3 w-3" />
              )}
              <span>{Math.abs(stats.revenueGrowth).toFixed(1)}% from last month</span>
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{ width: `${Math.min((stats.revenueThisMonth / (stats.revenueLastMonth || 1) * 2) * 100, 100)}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}