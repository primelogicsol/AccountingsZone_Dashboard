"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { CreditCard, DollarSign, Plus } from "lucide-react"
import { useStore } from "@/lib/store"

interface PaymentHistoryProps {
  userId: string
}

export function PaymentHistory({ userId }: PaymentHistoryProps) {
  const { getUserPayments, getTotalUserPayments, addPayment } = useStore()
  const payments = getUserPayments(userId)
  const totalPaid = getTotalUserPayments(userId)
  const [isAddingPayment, setIsAddingPayment] = useState(false)
  const [newPayment, setNewPayment] = useState({
    amount: "",
    description: "",
    paymentMethod: "Credit Card",
    status: "Completed",
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const handleAddPayment = () => {
    if (!newPayment.amount || isNaN(Number(newPayment.amount)) || Number(newPayment.amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid payment amount",
        variant: "destructive",
      })
      return
    }

    if (!newPayment.description) {
      toast({
        title: "Description Required",
        description: "Please enter a payment description",
        variant: "destructive",
      })
      return
    }

    addPayment({
      userId,
      amount: Number(newPayment.amount),
      description: newPayment.description,
      paymentMethod: newPayment.paymentMethod,
      status: newPayment.status as "Completed" | "Pending" | "Failed",
      date: new Date().toISOString(),
    })

    toast({
      title: "Payment Added",
      description: "The payment has been recorded successfully",
    })

    setNewPayment({
      amount: "",
      description: "",
      paymentMethod: "Credit Card",
      status: "Completed",
    })
    setIsAddingPayment(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>Track all payments made by this user</CardDescription>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium text-muted-foreground">Total Paid</p>
            <p className="text-2xl font-bold">{formatCurrency(totalPaid)}</p>
          </div>
          <Dialog open={isAddingPayment} onOpenChange={setIsAddingPayment}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Payment</DialogTitle>
                <DialogDescription>Record a new payment for this user. All fields are required.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                    Amount
                  </Label>
                  <div className="col-span-3 relative">
                    <DollarSign className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="amount"
                      placeholder="0.00"
                      className="pl-8"
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    placeholder="Payment description"
                    className="col-span-3"
                    value={newPayment.description}
                    onChange={(e) => setNewPayment({ ...newPayment, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="payment-method" className="text-right">
                    Payment Method
                  </Label>
                  <Select
                    value={newPayment.paymentMethod}
                    onValueChange={(value) => setNewPayment({ ...newPayment, paymentMethod: value })}
                  >
                    <SelectTrigger id="payment-method" className="col-span-3">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="PayPal">PayPal</SelectItem>
                      <SelectItem value="Check">Check</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    value={newPayment.status}
                    onValueChange={(value) => setNewPayment({ ...newPayment, status: value })}
                  >
                    <SelectTrigger id="status" className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingPayment(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPayment}>Save Payment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {payments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{formatDate(payment.date)}</TableCell>
                    <TableCell>{payment.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span>{payment.paymentMethod}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          payment.status === "Completed"
                            ? "success"
                            : payment.status === "Failed"
                              ? "destructive"
                              : "outline"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(payment.amount)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <DollarSign className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No Payment Records</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This user hasn't made any payments yet. Add a payment to get started.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t bg-muted/50 flex justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Payment Summary</p>
          <p className="text-sm">
            {payments.length} payment{payments.length !== 1 ? "s" : ""} recorded
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-muted-foreground">Total Amount Paid</p>
          <p className="text-lg font-bold">{formatCurrency(totalPaid)}</p>
        </div>
      </CardFooter>
    </Card>
  )
}
