"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function WebsiteMessages() {
  const { websiteMessages } = useStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages from Website</CardTitle>
        <CardDescription>
          Contact and consultation messages submitted through the AccountingZone website
        </CardDescription>
      </CardHeader>
      <CardContent>
        {websiteMessages.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No messages found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {websiteMessages.map((message, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.phone}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        message.status === "Completed"
                          ? "success"
                          : message.status === "Rejected"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {message.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(message.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Message from {message.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium">Name</p>
                              <p className="text-sm">{message.name}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Email</p>
                              <p className="text-sm">{message.email}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Phone</p>
                              <p className="text-sm">{message.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Company/Country</p>
                              <p className="text-sm">{message.company}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Message</p>
                            <p className="text-sm mt-1 p-4 bg-muted rounded-md">{message.message}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}