"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStore } from "@/lib/store"
import { addDays, addHours, addMonths, addWeeks, format, isAfter, isBefore, parseISO } from "date-fns"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/date-range-picker"
import type { DateRange } from "react-day-picker"
import { ArrowDown, ArrowUp, DollarSign } from "lucide-react"

export function RevenueAnalytics() {
  const { payments } = useStore()
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const [timeFrame, setTimeFrame] = useState("30")
  const [periodComparison, setPeriodComparison] = useState("previous")

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Handle time frame change
  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value)
    const to = new Date()
    let from

    switch (value) {
      case "7":
        from = addDays(to, -7)
        break
      case "30":
        from = addDays(to, -30)
        break
      case "90":
        from = addDays(to, -90)
        break
      case "365":
        from = addDays(to, -365)
        break
      default:
        from = addDays(to, -30)
    }

    setDateRange({ from, to })
  }

  // Handle date range change
  const handleDateRangeChange = (range: DateRange) => {
    if (range?.from && range?.to) {
      setDateRange(range)
      setTimeFrame("custom")
    }
  }

  // Filter payments by date range
  const filteredPayments = payments.filter((payment) => {
    if (!dateRange.from || !dateRange.to) return true

    const paymentDate = parseISO(payment.date)
    return (
      (isAfter(paymentDate, dateRange.from) || paymentDate.getTime() === dateRange.from.getTime()) &&
      (isBefore(paymentDate, dateRange.to) || paymentDate.getTime() === dateRange.to.getTime()) &&
      payment.status === "Completed"
    )
  })

  // Calculate total revenue for the current period
  const totalRevenue = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0)

  // Calculate previous period for comparison
  const getPreviousPeriodRange = () => {
    if (!dateRange.from || !dateRange.to) return { from: undefined, to: undefined }

    const currentPeriodDays = Math.round((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
    const previousPeriodEnd = new Date(dateRange.from)
    previousPeriodEnd.setDate(previousPeriodEnd.getDate() - 1)
    const previousPeriodStart = new Date(previousPeriodEnd)
    previousPeriodStart.setDate(previousPeriodStart.getDate() - currentPeriodDays)

    return { from: previousPeriodStart, to: previousPeriodEnd }
  }

  // Calculate year-over-year comparison
  const getYearOverYearRange = () => {
    if (!dateRange.from || !dateRange.to) return { from: undefined, to: undefined }

    const yearAgoStart = new Date(dateRange.from)
    yearAgoStart.setFullYear(yearAgoStart.getFullYear() - 1)
    const yearAgoEnd = new Date(dateRange.to)
    yearAgoEnd.setFullYear(yearAgoEnd.getFullYear() - 1)

    return { from: yearAgoStart, to: yearAgoEnd }
  }

  // Get comparison period based on selection
  const getComparisonPeriod = () => {
    if (periodComparison === "previous") {
      return getPreviousPeriodRange()
    } else {
      return getYearOverYearRange()
    }
  }

  const comparisonPeriod = getComparisonPeriod()

  // Filter payments for comparison period
  const comparisonPayments = payments.filter((payment) => {
    if (!comparisonPeriod.from || !comparisonPeriod.to) return false

    const paymentDate = parseISO(payment.date)
    return (
      (isAfter(paymentDate, comparisonPeriod.from) || paymentDate.getTime() === comparisonPeriod.from.getTime()) &&
      (isBefore(paymentDate, comparisonPeriod.to) || paymentDate.getTime() === comparisonPeriod.to.getTime()) &&
      payment.status === "Completed"
    )
  })

  // Calculate total revenue for comparison period
  const comparisonRevenue = comparisonPayments.reduce((sum, payment) => sum + payment.amount, 0)

  // Calculate percentage change
  const percentageChange =
    comparisonRevenue === 0 ? 100 : ((totalRevenue - comparisonRevenue) / comparisonRevenue) * 100

  // Group data by time period for charts
  const getGroupedData = (paymentsData: typeof payments, range: DateRange) => {
    if (!range.from || !range.to) return []

    const daysDifference = Math.round((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24))

    // Determine grouping format based on date range
    let groupFormat = "yyyy-MM-dd" // daily
    let displayFormat = "MMM d"

    if (daysDifference > 90) {
      groupFormat = "yyyy-MM" // monthly
      displayFormat = "MMM yyyy"
    } else if (daysDifference > 31) {
      groupFormat = "yyyy-'W'ww" // weekly
      displayFormat = "'Week' w"
    } else if (daysDifference <= 3) {
      groupFormat = "yyyy-MM-dd HH" // hourly
      displayFormat = "ha"
    }

    // Create a map to store revenue by date
    const dateMap = new Map()

    // Initialize the date map with all dates in the range
    let currentDate = new Date(range.from)
    while (currentDate <= range.to) {
      const dateKey = format(currentDate, groupFormat)
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, {
          date: new Date(currentDate),
          revenue: 0,
          count: 0,
        })
      }

      // Increment by appropriate time unit based on grouping
      if (groupFormat === "yyyy-MM") {
        currentDate = addMonths(currentDate, 1)
      } else if (groupFormat === "yyyy-'W'ww") {
        currentDate = addWeeks(currentDate, 1)
      } else if (groupFormat === "yyyy-MM-dd HH") {
        currentDate = addHours(currentDate, 1)
      } else {
        currentDate = addDays(currentDate, 1)
      }
    }

    // Sum payments by date
    paymentsData.forEach((payment) => {
      if (payment.status !== "Completed") return

      const date = parseISO(payment.date)
      if (
        (isAfter(date, range.from!) || date.getTime() === range.from!.getTime()) &&
        (isBefore(date, range.to!) || date.getTime() === range.to!.getTime())
      ) {
        const dateKey = format(date, groupFormat)
        if (dateMap.has(dateKey)) {
          const data = dateMap.get(dateKey)
          data.revenue += payment.amount
          data.count += 1
          dateMap.set(dateKey, data)
        }
      }
    })

    // Convert map to array and sort by date
    return Array.from(dateMap.values())
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((item) => ({
        ...item,
        name: format(item.date, displayFormat),
      }))
  }

  const currentPeriodData = getGroupedData(payments, dateRange)
  const comparisonPeriodData = getGroupedData(payments, comparisonPeriod)

  // Calculate average daily revenue
  const averageDailyRevenue =
    totalRevenue /
    Math.max(1, Math.round((dateRange.to!.getTime() - dateRange.from!.getTime()) / (1000 * 60 * 60 * 24)))

  // Get top payment methods
  const paymentMethodTotals = filteredPayments.reduce(
    (acc, payment) => {
      acc[payment.paymentMethod] = (acc[payment.paymentMethod] || 0) + payment.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const paymentMethodData = Object.entries(paymentMethodTotals)
    .map(([method, amount]) => ({ name: method, value: amount }))
    .sort((a, b) => b.value - a.value)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Revenue Analytics</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Select value={timeFrame} onValueChange={handleTimeFrameChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <DateRangePicker dateRange={dateRange} onDateRangeChange={handleDateRangeChange} />
          <Select value={periodComparison} onValueChange={setPeriodComparison}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Compare to" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="previous">Previous period</SelectItem>
              <SelectItem value="yearOverYear">Year over year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <div className="flex items-center pt-1">
              {percentageChange > 0 ? (
                <ArrowUp className="mr-1 h-3 w-3 text-success" />
              ) : (
                <ArrowDown className="mr-1 h-3 w-3 text-destructive" />
              )}
              <span className={`text-xs ${percentageChange > 0 ? "text-success" : "text-destructive"}`}>
                {percentageChange.toFixed(1)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                vs {periodComparison === "previous" ? "previous period" : "last year"}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(averageDailyRevenue)}</div>
            <p className="text-xs text-muted-foreground pt-1">
              Based on {Math.round((dateRange.to!.getTime() - dateRange.from!.getTime()) / (1000 * 60 * 60 * 24))} days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Count</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredPayments.length}</div>
            <p className="text-xs text-muted-foreground pt-1">Completed payments in selected period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Payment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(filteredPayments.length ? totalRevenue / filteredPayments.length : 0)}
            </div>
            <p className="text-xs text-muted-foreground pt-1">Per transaction average</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="revenue">Revenue Over Time</TabsTrigger>
          <TabsTrigger value="comparison">Period Comparison</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Revenue collected over the selected time period</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentPeriodData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={(value) =>
                      new Intl.NumberFormat("en-US", {
                        notation: "compact",
                        compactDisplay: "short",
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(value)
                    }
                  />
                  <Tooltip
                    formatter={(value) => [
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(value as number),
                      "Revenue",
                    ]}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Revenue"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Period Comparison</CardTitle>
              <CardDescription>
                Compare revenue with {periodComparison === "previous" ? "previous period" : "same period last year"}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: "Current Period",
                      revenue: totalRevenue,
                      comparisonRevenue: 0,
                    },
                    {
                      name: periodComparison === "previous" ? "Previous Period" : "Last Year",
                      revenue: 0,
                      comparisonRevenue: comparisonRevenue,
                    },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={(value) =>
                      new Intl.NumberFormat("en-US", {
                        notation: "compact",
                        compactDisplay: "short",
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(value)
                    }
                  />
                  <Tooltip
                    formatter={(value) => [
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(value as number),
                      "Revenue",
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="revenue" name="Current Period" fill="#f59e0b" />
                  <Bar
                    dataKey="comparisonRevenue"
                    name={periodComparison === "previous" ? "Previous Period" : "Last Year"}
                    fill="#3b82f6"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Payment Method</CardTitle>
              <CardDescription>Distribution of revenue across different payment methods</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={paymentMethodData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    tickFormatter={(value) =>
                      new Intl.NumberFormat("en-US", {
                        notation: "compact",
                        compactDisplay: "short",
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                      }).format(value)
                    }
                  />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip
                    formatter={(value) => [
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(value as number),
                      "Revenue",
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="value" name="Revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
