"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function WebsiteTaxFilings() {
  const { websiteTaxFilings } = useStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Filings from Website</CardTitle>
        <CardDescription>
          Tax filings submitted through the AccountingZone website
        </CardDescription>
      </CardHeader>
      <CardContent>
        {websiteTaxFilings.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No tax filings found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Tax Year</TableHead>
                <TableHead>Tax ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {websiteTaxFilings.map((filing) => (
                <TableRow key={filing.id}>
                  <TableCell className="font-medium">{filing.clientName}</TableCell>
                  <TableCell>{filing.taxYear}</TableCell>
                  <TableCell>{filing.taxId}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        filing.status === "Completed"
                          ? "success"
                          : filing.status === "Rejected"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {filing.status}
                    </Badge>
                  </TableCell>
                  <TableCell>${filing.amount.toFixed(2)}</TableCell>
                  <TableCell>{new Date(filing.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(filing.dueDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}