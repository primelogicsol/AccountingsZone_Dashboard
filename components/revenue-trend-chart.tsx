"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { addDays, addHours, addMonths, addWeeks, format, isAfter, isBefore, parseISO } from "date-fns"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { DateRange } from "react-day-picker"
import { ArrowDown, ArrowUp } from "lucide-react"

export function RevenueTrendChart() {
  const { payments, users } = useStore()
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const [timeFrame, setTimeFrame] = useState("30")
  const [userFilter, setUserFilter] = useState<string>("all")

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

  // Filter payments by date range and user
  const filteredPayments = payments.filter((payment) => {
    if (!dateRange.from || !dateRange.to) return true

    const paymentDate = parseISO(payment.date)
    const dateInRange =
      (isAfter(paymentDate, dateRange.from) || paymentDate.getTime() === dateRange.from.getTime()) &&
      (isBefore(paymentDate, dateRange.to) || paymentDate.getTime() === dateRange.to.getTime())

    // Filter by user if not "all"
    const userMatches = userFilter === "all" || payment.userId === userFilter

    return dateInRange && userMatches && payment.status === "Completed"
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

  const comparisonPeriod = getPreviousPeriodRange()

  // Filter payments for comparison period
  const comparisonPayments = payments.filter((payment) => {
    if (!comparisonPeriod.from || !comparisonPeriod.to) return false

    const paymentDate = parseISO(payment.date)
    const userMatches = userFilter === "all" || payment.userId === userFilter

    return (
      (isAfter(paymentDate, comparisonPeriod.from) || paymentDate.getTime() === comparisonPeriod.from.getTime()) &&
      (isBefore(paymentDate, comparisonPeriod.to) || paymentDate.getTime() === comparisonPeriod.to.getTime()) &&
      userMatches &&
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
      if (userFilter !== "all" && payment.userId !== userFilter) return

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

  const chartData = getGroupedData(payments, dateRange)

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>
            {formatCurrency(totalRevenue)} total revenue
            <span className={`ml-2 ${percentageChange >= 0 ? "text-success" : "text-destructive"}`}>
              {percentageChange >= 0 ? (
                <ArrowUp className="inline mr-1 h-3 w-3" />
              ) : (
                <ArrowDown className="inline mr-1 h-3 w-3" />
              )}
              {Math.abs(percentageChange).toFixed(1)}% vs previous period
            </span>
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={timeFrame} onValueChange={handleTimeFrameChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={userFilter} onValueChange={setUserFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by user" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
        </div>
      </CardContent>
    </Card>
  )
}
