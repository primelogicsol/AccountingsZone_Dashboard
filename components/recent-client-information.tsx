"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { useStore } from "@/lib/store"

export function RecentClientInformation() {
  const { clientInformation } = useStore()
  const router = useRouter()

  // Sort by submission date (newest first) and take the first 5
  const recentClients = [...clientInformation]
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-8">
      {recentClients.map((client) => (
        <div className="flex items-center" key={client.id}>
          <Avatar className="h-9 w-9">
            <AvatarFallback>{client.clientName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{client.clientName}</p>
            <p className="text-sm text-muted-foreground">{client.contactPerson}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge
              variant={
                client.status === "Active" ? "success" : client.status === "Inactive" ? "destructive" : "outline"
              }
            >
              {client.status}
            </Badge>
            <Button variant="ghost" size="icon" onClick={() => router.push(`/forms/client-information/${client.id}`)}>
              <Eye className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </div>
        </div>
      ))}
      {recentClients.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">No client information found.</div>
      )}
    </div>
  )
}
