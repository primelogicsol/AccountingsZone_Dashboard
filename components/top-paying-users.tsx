"use client"

import { useStore } from "@/lib/store"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { useRouter } from "next/navigation"

export function TopPayingUsers() {
  const { users, payments } = useStore()
  const router = useRouter()

  // Calculate total payments per user
  const userPayments = users.map((user) => {
    const userCompletedPayments = payments.filter(
      (payment) => payment.userId === user.id && payment.status === "Completed",
    )
    const totalPaid = userCompletedPayments.reduce((sum, payment) => sum + payment.amount, 0)

    return {
      ...user,
      totalPaid,
      paymentCount: userCompletedPayments.length,
    }
  })

  // Sort by total paid (highest first) and take top 5
  const topPayingUsers = [...userPayments].sort((a, b) => b.totalPaid - a.totalPaid).slice(0, 5)

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {topPayingUsers.map((user) => (
        <div className="flex items-center justify-between" key={user.id}>
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.paymentCount} payments</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-medium">
              {formatCurrency(user.totalPaid)}
            </Badge>
            <Button variant="ghost" size="icon" onClick={() => router.push(`/users/${user.id}`)}>
              <Eye className="h-4 w-4" />
              <span className="sr-only">View details</span>
            </Button>
          </div>
        </div>
      ))}

      {topPayingUsers.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No payment data available</div>
      )}
    </div>
  )
}
