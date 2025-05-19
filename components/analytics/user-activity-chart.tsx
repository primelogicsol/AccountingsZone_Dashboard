"use client"

import { useStore } from "@/lib/store"
import { addDays, format, isAfter, isBefore, isEqual, parseISO } from "date-fns"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface UserActivityChartProps {
  dateRange: {
    from: Date
    to: Date
  }
}

export function UserActivityChart({ dateRange }: UserActivityChartProps) {
  const { users } = useStore()

  // Filter users by last login date
  const filteredUsers = users.filter((user) => {
    const date = parseISO(user.lastLogin)
    return (
      (isAfter(date, dateRange.from) || isEqual(date, dateRange.from)) &&
      (isBefore(date, dateRange.to) || isEqual(date, dateRange.to))
    )
  })

  // Group data by day, week, or month depending on the date range
  const daysDifference = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))

  // Determine the appropriate grouping format
  let groupFormat = "yyyy-MM-dd" // daily
  let displayFormat = "MMM d"

  if (daysDifference > 60) {
    groupFormat = "yyyy-MM" // monthly
    displayFormat = "MMM yyyy"
  } else if (daysDifference > 14) {
    groupFormat = "yyyy-'W'ww" // weekly
    displayFormat = "'Week' w"
  }

  // Create a map to store counts by date
  const dateMap = new Map()

  // Initialize the date map with all dates in the range
  let currentDate = new Date(dateRange.from)
  while (currentDate <= dateRange.to) {
    const dateKey = format(currentDate, groupFormat)
    if (!dateMap.has(dateKey)) {
      dateMap.set(dateKey, {
        date: new Date(currentDate),
        "Admin Logins": 0,
        "Partner Logins": 0,
        "Client Logins": 0,
      })
    }

    // Increment by day, week, or month based on grouping
    if (groupFormat === "yyyy-MM") {
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    } else if (groupFormat === "yyyy-'W'ww") {
      currentDate = addDays(currentDate, 7)
    } else {
      currentDate = addDays(currentDate, 1)
    }
  }

  // Count logins by date and role
  filteredUsers.forEach((user) => {
    const date = parseISO(user.lastLogin)
    const dateKey = format(date, groupFormat)
    if (dateMap.has(dateKey)) {
      if (user.role === "Admin") {
        dateMap.get(dateKey)["Admin Logins"]++
      } else if (user.role === "Partner") {
        dateMap.get(dateKey)["Partner Logins"]++
      } else if (user.role === "Client") {
        dateMap.get(dateKey)["Client Logins"]++
      }
    }
  })

  // Convert map to array and sort by date
  const chartData = Array.from(dateMap.values())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((item) => ({
      ...item,
      name: format(item.date, displayFormat),
    }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="Admin Logins" stackId="1" stroke="#f43f5e" fill="#f43f5e" />
        <Area type="monotone" dataKey="Partner Logins" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
        <Area type="monotone" dataKey="Client Logins" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
      </AreaChart>
    </ResponsiveContainer>
  )
}
