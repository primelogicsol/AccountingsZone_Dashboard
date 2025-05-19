"use client"

import { Button } from "@/components/ui/button"
import { Download, Mail, Pencil, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface ScheduledReport {
  id: string
  name: string
  frequency: string
  nextRun: string
  recipients: string[]
  format: string
}

interface ScheduledReportsListProps {
  reports: ScheduledReport[]
}

export function ScheduledReportsList({ reports }: ScheduledReportsListProps) {
  const handleRunNow = (report: ScheduledReport) => {
    toast({
      title: "Report Running",
      description: `${report.name} is being generated and will be sent to recipients.`,
    })
  }

  const handleEdit = (report: ScheduledReport) => {
    toast({
      title: "Edit Report",
      description: `Editing ${report.name} schedule.`,
    })
  }

  const handleDelete = (report: ScheduledReport) => {
    toast({
      title: "Delete Report",
      description: `${report.name} schedule has been deleted.`,
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="overflow-x-auto">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report Name</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead className="hidden md:table-cell">Next Run</TableHead>
              <TableHead className="hidden lg:table-cell">Recipients</TableHead>
              <TableHead className="hidden sm:table-cell">Format</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{report.frequency}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{formatDate(report.nextRun)}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex flex-col gap-1">
                    {report.recipients.map((recipient, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs">{recipient}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{report.format}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleRunNow(report)}>
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Run now</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(report)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(report)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
