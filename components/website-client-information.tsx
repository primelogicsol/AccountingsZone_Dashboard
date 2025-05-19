"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download } from 'lucide-react'
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function WebsiteClientInformation() {
  const { websiteClientInformation, getCloudinaryFileUrl } = useStore()
  const [selectedDocUrl, setSelectedDocUrl] = useState<string | null>(null)
  const [fileInfo, setFileInfo] = useState<any>(null)

  const handleViewDocument = async (url: string) => {
    const fileData = await getCloudinaryFileUrl(url)
    if (fileData) {
      setSelectedDocUrl(fileData.url)
      setFileInfo(fileData.fileInfo)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Information from Website</CardTitle>
        <CardDescription>
          Client information submitted through the AccountingZone website
        </CardDescription>
      </CardHeader>
      <CardContent>
        {websiteClientInformation.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No client information found</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Documents</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {websiteClientInformation.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.clientName}</TableCell>
                  <TableCell>{client.contactPerson}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        client.status === "Active"
                          ? "success"
                          : client.status === "Inactive"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(client.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {client.documents && client.documents.length > 0 ? (
                      <div className="flex space-x-2">
                        {client.documents.map((doc: string, index: number) => (
                          <Dialog key={index}>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDocument(doc)}
                              >
                                <FileText className="h-4 w-4 mr-1" />
                                Doc {index + 1}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Document Preview</DialogTitle>
                              </DialogHeader>
                              {selectedDocUrl && (
                                <div className="flex flex-col items-center space-y-4">
                                  {fileInfo?.format === "pdf" ? (
                                    <iframe
                                      src={selectedDocUrl}
                                      className="w-full h-[70vh]"
                                      title="PDF Document"
                                    />
                                  ) : fileInfo?.format?.match(/(jpg|jpeg|png|gif)/) ? (
                                    <img
                                      src={selectedDocUrl.replace("/attachment/", "/upload/") || "/placeholder.svg"}
                                      alt="Document"
                                      className="max-h-[70vh] object-contain"
                                    />
                                  ) : (
                                    <div className="p-8 text-center">
                                      <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                                      <p>This document cannot be previewed</p>
                                    </div>
                                  )}
                                  <Button asChild>
                                    <a href={selectedDocUrl} download target="_blank" rel="noopener noreferrer">
                                      <Download className="h-4 w-4 mr-2" />
                                      Download Document
                                    </a>
                                  </Button>
                                </div>
                              )}
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