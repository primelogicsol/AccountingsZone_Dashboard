"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Loader2, ExternalLink } from 'lucide-react'
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import DocumentViewer from "@/components/document-viewer" // Import our document viewer component

export function WebsitePartnerApplications() {
  const { websitePartnerApplications } = useStore()
  
  // Function to generate document labels based on URL
  function getDocumentLabel(url: string, index: number) {
    if (url.includes('business-registration')) {
      return 'Business Registration';
    } else if (url.includes('tax-identification')) {
      return 'Tax ID Certificate';
    } else if (url.includes('portfolio')) {
      return 'Portfolio';
    } else {
      return `Doc ${index + 1}`;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partner Applications from Website</CardTitle>
        <CardDescription>
          Applications submitted through the AccountingZone website
        </CardDescription>
      </CardHeader>
      <CardContent>
        {websitePartnerApplications.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No partner applications found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Documents</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {websitePartnerApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.businessName}</TableCell>
                  <TableCell>{application.contactPerson}</TableCell>
                  <TableCell>{application.email}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{new Date(application.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {application.documents && application.documents.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {application.documents.map((doc: string, index: number) => (
                          <Dialog key={index}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs"
                              >
                                <FileText className="h-3 w-3 mr-1" />
                                {getDocumentLabel(doc, index)}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Document Preview - {getDocumentLabel(doc, index)}</DialogTitle>
                              </DialogHeader>
                              
                              <div className="p-2">
                                {/* Use our reusable DocumentViewer component */}
                                <DocumentViewer 
                                  url={doc} 
                                  filename={getDocumentLabel(doc, index)}
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No documents</span>
                    )}
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
