"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Calendar } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"

interface ReportTemplateCardProps {
  template: {
    id: string
    name: string
    description: string
    type: string
    icon: React.ReactNode
  }
}

export function ReportTemplateCard({ template }: ReportTemplateCardProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = () => {
    setIsGenerating(true)

    // Simulate report generation
    setTimeout(() => {
      toast({
        title: "Report Generated",
        description: `Your ${template.name} report has been generated successfully.`,
      })
      setIsGenerating(false)
    }, 1500)
  }

  const handleScheduleReport = () => {
    toast({
      title: "Report Scheduled",
      description: `Your ${template.name} report has been scheduled successfully.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{template.name}</CardTitle>
          {template.icon}
        </div>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          <p>Type: {template.type.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}</p>
          <p>Last Generated: {new Date().toLocaleDateString()}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={handleScheduleReport}>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule
        </Button>
        <Button size="sm" onClick={handleGenerateReport} disabled={isGenerating}>
          <Download className="mr-2 h-4 w-4" />
          {isGenerating ? "Generating..." : "Generate"}
        </Button>
      </CardFooter>
    </Card>
  )
}
