"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { useStore } from "@/lib/store"

export function RecentPartnerApplications() {
  const { partnerApplications } = useStore()
  const router = useRouter()

  // Sort by submission date (newest first) and take the first 5
  const recentApplications = [...partnerApplications]
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-8">
      {recentApplications.map((application) => (
        <div className="flex items-center" key={application.id}>
          <Avatar className="h-9 w-9">
            <AvatarFallback>{application.businessName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{application.businessName}</p>
            <p className="text-sm text-muted-foreground">{application.contactPerson}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge
              variant={
                application.status === "Approved"
                  ? "success"
                  : application.status === "Rejected"
                    ? "destructive"
                    : "outline"
              }
            >
              {application.status}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/forms/partner-applications/${application.id}`)}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </div>
        </div>
      ))}
      {recentApplications.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">No partner applications found.</div>
      )}
    </div>
  )
}
