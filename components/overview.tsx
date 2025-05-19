"use client"

import { useStore } from "@/lib/store"
import { parseISO } from "date-fns"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"

export function Overview() {
  const { partnerApplications, clientInformation, taxFilings } = useStore()

  // Group submissions by month
  const monthlyData = new Map()

  // Initialize months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  months.forEach((month) => {
    monthlyData.set(month, {
      name: month,
      "Partner Applications": 0,
      "Client Information": 0,
      "Tax Filing": 0,
    })
  })

  // Count submissions by month
  partnerApplications.forEach((app) => {
    const date = parseISO(app.submittedAt)
    const month = months[date.getMonth()]
    monthlyData.get(month)["Partner Applications"]++
  })

  clientInformation.forEach((client) => {
    const date = parseISO(client.submittedAt)
    const month = months[date.getMonth()]
    monthlyData.get(month)["Client Information"]++
  })

  taxFilings.forEach((filing) => {
    const date = parseISO(filing.submittedAt)
    const month = months[date.getMonth()]
    monthlyData.get(month)["Tax Filing"]++
  })

  // Convert map to array
  const data = Array.from(monthlyData.values())

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Partner Applications" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Client Information" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Tax Filing" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
