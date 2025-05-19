"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { useStore } from "@/lib/store"

export function RecentTaxFilings() {
  const { taxFilings } = useStore()
  const router = useRouter()

  // Sort by submission date (newest first) and take the first 5
  const recentFilings = [...taxFilings]
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-8">
      {recentFilings.map((filing) => (
        <div className="flex items-center" key={filing.id}>
          <Avatar className="h-9 w-9">
            <AvatarFallback>{filing.clientName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{filing.clientName}</p>
            <p className="text-sm text-muted-foreground">
              {filing.filingType} - {filing.taxYear}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge
              variant={
                filing.status === "Completed"
                  ? "success"
                  : filing.status === "Rejected"
                    ? "destructive"
                    : filing.status === "Processing"
                      ? "default"
                      : filing.status === "Submitted"
                        ? "secondary"
                        : "outline"
              }
            >
              {filing.status}
            </Badge>
            <Button variant="ghost" size="icon" onClick={() => router.push(`/forms/tax-filing/${filing.id}`)}>
              <Eye className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </div>
        </div>
      ))}
      {recentFilings.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">No tax filings found.</div>
      )}
    </div>
  )
}
