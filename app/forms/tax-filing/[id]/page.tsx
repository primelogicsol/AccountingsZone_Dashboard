// "use client"

// import { useParams, useRouter } from "next/navigation"
// import { ArrowLeft } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { useStore } from "@/lib/store"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { FileViewer } from "@/components/file-viewer"

// export default function TaxFilingDetailPage() {
//   const params = useParams()
//   const router = useRouter()
//   const id = params.id as string
//   const { getTaxFilingById, updateTaxFilingStatus } = useStore()
//   const filing = getTaxFilingById(id)

//   // Sample files for demonstration
//   const sampleFiles = [
//     {
//       id: "file-1",
//       name: "tax_return_form.pdf",
//       type: "application/pdf",
//       size: "4.2 MB",
//       uploadedAt: new Date(Date.now() - 86400000).toISOString(),
//       url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
//     },
//     {
//       id: "file-2",
//       name: "supporting_documents.pdf",
//       type: "application/pdf",
//       size: "2.8 MB",
//       uploadedAt: new Date(Date.now() - 172800000).toISOString(),
//       url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
//     },
//     {
//       id: "file-3",
//       name: "income_statement.xlsx",
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       size: "1.5 MB",
//       uploadedAt: new Date(Date.now() - 259200000).toISOString(),
//       url: "#",
//     },
//   ]

//   if (!filing) {
//     return (
//       <div className="container mx-auto max-w-4xl space-y-6 px-4">
//         <div className="flex items-center">
//           <Button variant="ghost" onClick={() => router.back()} className="mr-4">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back
//           </Button>
//           <h1 className="text-2xl font-bold tracking-tight">Tax Filing Not Found</h1>
//         </div>
//         <Alert variant="destructive">
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>
//             The tax filing with ID {id} could not be found. It may have been deleted or the ID is incorrect.
//           </AlertDescription>
//         </Alert>
//       </div>
//     )
//   }

//   const handleStatusChange = (status: string) => {
//     updateTaxFilingStatus(id, status as any)
//   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(date)
//   }

//   return (
//     <div className="container mx-auto max-w-4xl space-y-6 px-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <Button variant="ghost" onClick={() => router.back()} className="mr-4">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back
//           </Button>
//           <h1 className="text-2xl font-bold tracking-tight">Tax Filing Details</h1>
//         </div>
//         <Badge
//           variant={
//             filing.status === "Completed"
//               ? "success"
//               : filing.status === "Rejected"
//                 ? "destructive"
//                 : filing.status === "Processing"
//                   ? "default"
//                   : filing.status === "Submitted"
//                     ? "secondary"
//                     : "outline"
//           }
//           className="text-sm px-3 py-1"
//         >
//           {filing.status}
//         </Badge>
//       </div>

//       <Tabs defaultValue="details">
//         <TabsList className="mb-4">
//           <TabsTrigger value="details">Filing Details</TabsTrigger>
//           <TabsTrigger value="files">Submitted Files</TabsTrigger>
//         </TabsList>

//         <TabsContent value="details">
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-xl">{filing.clientName}</CardTitle>
//               <CardDescription>
//                 Filing ID: {filing.id} • Submitted on {formatDate(filing.submittedAt)} • Due{" "}
//                 {formatDate(filing.dueDate)}
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Filing Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Tax Year</p>
//                     <p>{filing.taxYear}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Filing Type</p>
//                     <p>{filing.filingType}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Tax ID</p>
//                     <p>{filing.taxId}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Filing Status</p>
//                     <p>{filing.filingStatus}</p>
//                   </div>
//                   {filing.filingType === "Individual" && (
//                     <div>
//                       <p className="text-sm font-medium text-muted-foreground">Dependents</p>
//                       <p>{filing.dependents}</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <div className="flex items-center gap-2">
//                 <p className="text-sm font-medium">Status:</p>
//                 <Select value={filing.status} onValueChange={handleStatusChange}>
//                   <SelectTrigger className="w-[180px]">
//                     <SelectValue placeholder="Select status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Draft">Draft</SelectItem>
//                     <SelectItem value="Submitted">Submitted</SelectItem>
//                     <SelectItem value="Processing">Processing</SelectItem>
//                     <SelectItem value="Completed">Completed</SelectItem>
//                     <SelectItem value="Rejected">Rejected</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <Button variant="secondary" onClick={() => router.back()}>
//                 Return to List
//               </Button>
//             </CardFooter>
//           </Card>
//         </TabsContent>

//         <TabsContent value="files">
//           <FileViewer files={sampleFiles} />
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { FileViewer } from "@/components/file-viewer"
import { toast } from "@/components/ui/use-toast"

export default function TaxFilingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { 
    getTaxFilingById, 
    updateTaxFilingStatus,
    fetchWebsiteTaxFilings
  } = useStore()
  
  // Fetch data when component mounts
  useEffect(() => {
    fetchWebsiteTaxFilings()
  }, [fetchWebsiteTaxFilings])
  
  const filing = getTaxFilingById(id)

  if (!filing) {
    return (
      <div className="container mx-auto max-w-4xl space-y-6 px-4">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Tax Filing Not Found</h1>
        </div>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            The tax filing with ID {id} could not be found. It may have been deleted or the ID is incorrect.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const handleStatusChange = async (status: string) => {
    try {
      await updateTaxFilingStatus(id, status as any)
      toast({
        title: "Success",
        description: `Tax filing status updated to ${status}`,
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update tax filing status",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Tax Filing Details</h1>
        </div>
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
          className="text-sm px-3 py-1"
        >
          {filing.status}
        </Badge>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Filing Details</TabsTrigger>
          <TabsTrigger value="files">Submitted Files</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{filing.clientName}</CardTitle>
              <CardDescription>
                Filing ID: {filing.id} • Submitted on {formatDate(filing.submittedAt)} • Due{" "}
                {formatDate(filing.dueDate)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Filing Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tax Year</p>
                    <p>{filing.taxYear}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Filing Type</p>
                    <p>{filing.filingType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tax ID</p>
                    <p>{filing.taxId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Filing Status</p>
                    <p>{filing.filingStatus}</p>
                  </div>
                  {filing.filingType === "Individual" && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Dependents</p>
                      <p>{filing.dependents}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Status:</p>
                <Select value={filing.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Submitted">Submitted</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="secondary" onClick={() => router.back()}>
                Return to List
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle>No Files Available</CardTitle>
              <CardDescription>
                Tax filings do not include document attachments in this system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center p-12 border rounded-md">
                <p className="text-muted-foreground">
                  No files are associated with tax filings.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}