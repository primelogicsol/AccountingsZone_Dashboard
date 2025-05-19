"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStore } from "@/lib/store"
import { FormSubmissionsChart } from "@/components/analytics/form-submissions-chart"
import { UserActivityChart } from "@/components/analytics/user-activity-chart"
import { RevenueAnalytics } from "@/components/analytics/revenue-analytics"
import { addDays } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/components/date-range-picker"
import type { DateRange } from "react-day-picker"

export default function AnalyticsPage() {
  // Only use website data, not dashboard data
  const { 
    websitePartnerApplications, 
    websiteClientInformation, 
    websiteTaxFilings,
    websiteMessages,
    isLoadingWebsiteData
  } = useStore()
  
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const [timeFrame, setTimeFrame] = useState("30")
  
  // Calculate metrics using ONLY website data
  const totalSubmissions = websitePartnerApplications.length + websiteClientInformation.length + websiteTaxFilings.length
  
  // Calculate approval rate from website data only
  const approvedApps = websitePartnerApplications.filter(app => app.status === "Approved").length
  const approvalRate = websitePartnerApplications.length > 0 
    ? approvedApps / websitePartnerApplications.length 
    : 0
  
  const totalMessages = websiteMessages.length

  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value)
    const to = new Date()
    const from = addDays(to, -Number.parseInt(value))
    setDateRange({ from, to })
  }

  const handleDateRangeChange = (range: DateRange) => {
    if (range?.from && range?.to) {
      setDateRange(range)
      setTimeFrame("custom")
    }
  }

  if (isLoadingWebsiteData) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="text-sm text-muted-foreground">Loading website data...</p>
        </div>
      </div>
    )
  }

  // No data state - show empty state if there's no real data
  if (totalSubmissions === 0 && totalMessages === 0) {
    return (
      <div className="w-full max-w-full space-y-6 px-4">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <Card>
          <CardHeader>
            <CardTitle>No Data Available</CardTitle>
            <CardDescription>
              There is currently no data to display. Data will appear here when submissions are received through your website.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full space-y-6 px-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
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
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubmissions}</div>
            <p className="text-xs text-muted-foreground">Website form submissions</p>
          </CardContent>
        </Card>
        
        {websitePartnerApplications.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(approvalRate * 100).toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">For partner applications</p>
            </CardContent>
          </Card>
        )}
        
        {totalMessages > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Website Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMessages}</div>
              <p className="text-xs text-muted-foreground">Contact form submissions</p>
            </CardContent>
          </Card>
        )}
      </div>

      {totalSubmissions > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Website Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{totalSubmissions}</div>
            <div className="text-xs text-muted-foreground mt-2 space-y-1">
              {websitePartnerApplications.length > 0 && (
                <div>Partner Applications: {websitePartnerApplications.length}</div>
              )}
              {websiteClientInformation.length > 0 && (
                <div>Client Information: {websiteClientInformation.length}</div>
              )}
              {websiteTaxFilings.length > 0 && (
                <div>Tax Filings: {websiteTaxFilings.length}</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="submissions" className="space-y-6">
        <TabsList className="w-full sm:w-auto">
          {/* Only show revenue tab if there's actual revenue data */}
          <TabsTrigger value="submissions">Form Submissions</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Submissions Over Time</CardTitle>
              <CardDescription>
                Tracking website form submissions over the selected period
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <FormSubmissionsChart dateRange={dateRange} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Website Messages</CardTitle>
              <CardDescription>Contact form and consultation requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {websiteMessages.length > 0 ? (
                  websiteMessages.map((message, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{message.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          {new Date(message.submittedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm">{message.email}</div>
                      <div className="mt-2 text-sm">{message.message}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">No messages found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}