"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Eye, FileText, FileImage, File } from "lucide-react"

interface FileViewerProps {
  files: {
    id: string
    name: string
    type: string
    size: string
    uploadedAt: string
    url: string
  }[]
}

export function FileViewer({ files }: FileViewerProps) {
  const [selectedFile, setSelectedFile] = useState(files[0] || null)

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="h-6 w-6 text-red-500" />
    if (type.includes("image")) return <FileImage className="h-6 w-6 text-blue-500" />
    if (type.includes("word") || type.includes("document")) return <FileText className="h-6 w-6 text-blue-700" />
    if (type.includes("excel") || type.includes("spreadsheet")) return <FileText className="h-6 w-6 text-green-600" />
    return <File className="h-6 w-6 text-gray-500" />
  }

  const renderFilePreview = () => {
    if (!selectedFile) return <div className="text-center p-12">No file selected</div>

    if (selectedFile.type.includes("pdf")) {
      return (
        <div className="h-[500px] w-full">
          <iframe src={selectedFile.url} className="w-full h-full border rounded-md" title={selectedFile.name} />
        </div>
      )
    }

    if (selectedFile.type.includes("image")) {
      return (
        <div className="flex justify-center">
          <img
            src={selectedFile.url || "/placeholder.svg"}
            alt={selectedFile.name}
            className="max-h-[500px] object-contain rounded-md"
          />
        </div>
      )
    }

    // For other file types, show a placeholder
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <div className="bg-muted rounded-lg p-8">{getFileIcon(selectedFile.type)}</div>
        <p className="text-center">Preview not available for this file type</p>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download to view
        </Button>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submitted Files</CardTitle>
        <CardDescription>View and download files submitted with this form</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="files" className="space-y-4">
          <TabsList>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="files" className="space-y-4">
            <div className="grid gap-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center space-x-4 p-3 rounded-md border ${selectedFile?.id === file.id ? "border-primary bg-primary/5" : ""}`}
                  onClick={() => setSelectedFile(file)}
                >
                  <div className="rounded-md bg-muted p-2">{getFileIcon(file.type)}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{file.name}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{file.size}</span>
                      <span className="mx-2">•</span>
                      <span>Uploaded on {new Date(file.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedFile(file)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={file.url} download={file.name}>
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </a>
                    </Button>
                  </div>
                </div>
              ))}

              {files.length === 0 && (
                <div className="text-center p-12 border rounded-md">
                  <p className="text-muted-foreground">No files have been submitted</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="preview">{renderFilePreview()}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
