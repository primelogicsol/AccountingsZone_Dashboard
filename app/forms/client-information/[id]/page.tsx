// "use client"

// import { useParams, useRouter } from "next/navigation"
// import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { useStore } from "@/lib/store"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { FileViewer } from "@/components/file-viewer"

// export default function ClientInformationDetailPage() {
//   const params = useParams()
//   const router = useRouter()
//   const id = params.id as string
//   const { getClientInformationById, updateClientInformationStatus } = useStore()
//   const client = getClientInformationById(id)

//   // Sample files for demonstration
//   const sampleFiles = [
//     {
//       id: "file-1",
//       name: "tax_id_document.pdf",
//       type: "application/pdf",
//       size: "1.8 MB",
//       uploadedAt: new Date(Date.now() - 86400000).toISOString(),
//       url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
//     },
//     {
//       id: "file-2",
//       name: "company_registration.pdf",
//       type: "application/pdf",
//       size: "3.2 MB",
//       uploadedAt: new Date(Date.now() - 172800000).toISOString(),
//       url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
//     },
//   ]

//   if (!client) {
//     return (
//       <div className="container mx-auto max-w-4xl space-y-6 px-4">
//         <div className="flex items-center">
//           <Button variant="ghost" onClick={() => router.back()} className="mr-4">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back
//           </Button>
//           <h1 className="text-2xl font-bold tracking-tight">Client Information Not Found</h1>
//         </div>
//         <Alert variant="destructive">
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>
//             The client information with ID {id} could not be found. It may have been deleted or the ID is incorrect.
//           </AlertDescription>
//         </Alert>
//       </div>
//     )
//   }

//   const handleActivate = () => {
//     updateClientInformationStatus(id, "Active")
//   }

//   const handleDeactivate = () => {
//     updateClientInformationStatus(id, "Inactive")
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
//           <h1 className="text-2xl font-bold tracking-tight">Client Information Details</h1>
//         </div>
//         <Badge
//           variant={client.status === "Active" ? "success" : client.status === "Inactive" ? "destructive" : "outline"}
//           className="text-sm px-3 py-1"
//         >
//           {client.status}
//         </Badge>
//       </div>

//       <Tabs defaultValue="details">
//         <TabsList className="mb-4">
//           <TabsTrigger value="details">Client Details</TabsTrigger>
//           <TabsTrigger value="files">Submitted Files</TabsTrigger>
//         </TabsList>

//         <TabsContent value="details">
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-xl">{client.clientName}</CardTitle>
//               <CardDescription>
//                 Client ID: {client.id} • Submitted on {formatDate(client.submittedAt)}
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Contact Person</p>
//                     <p>{client.contactPerson}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Email</p>
//                     <p>{client.email}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Phone</p>
//                     <p>{client.phone}</p>
//                   </div>
//                   <div className="md:col-span-2">
//                     <p className="text-sm font-medium text-muted-foreground">Address</p>
//                     <p>{client.address}</p>
//                   </div>
//                 </div>
//               </div>

//               <Separator />

//               <div>
//                 <h3 className="text-lg font-semibold mb-2">Business Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Business Type</p>
//                     <p>{client.businessType}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Tax ID</p>
//                     <p>{client.taxId}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Fiscal Year End</p>
//                     <p>{client.fiscalYearEnd}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Accounting Method</p>
//                     <p>{client.accountingMethod}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Industry</p>
//                     <p>{client.industry}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Referred By</p>
//                     <p>{client.referredBy}</p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               {client.status === "Active" ? (
//                 <Button variant="outline" onClick={handleDeactivate} className="gap-2">
//                   <XCircle className="h-4 w-4" />
//                   Deactivate Client
//                 </Button>
//               ) : (
//                 <Button onClick={handleActivate} className="gap-2">
//                   <CheckCircle className="h-4 w-4" />
//                   Activate Client
//                 </Button>
//               )}
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

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/lib/store"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileViewer } from "@/components/file-viewer"
import { toast } from "@/components/ui/use-toast"

export default function ClientInformationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  
  const [formattedFiles, setFormattedFiles] = useState<any[]>([])
  const [isLoadingFiles, setIsLoadingFiles] = useState(false)
  
  const { 
    websiteClientInformation,
    getClientInformationById, 
    updateClientInformationStatus,
    fetchWebsiteClientInformation,
    getCloudinaryFileUrl
  } = useStore()

  // Fetch data on mount
  useEffect(() => {
    fetchWebsiteClientInformation()
  }, [fetchWebsiteClientInformation])

  const client = getClientInformationById(id)
  
  // Process document URLs when client data is available
  useEffect(() => {
    async function loadDocuments() {
      if (!client?.documents || client.documents.length === 0) return;
      
      setIsLoadingFiles(true)
      console.log("Loading documents:", client.documents);
      
      const filePromises = client.documents.map(async (url: string, index: number) => {
        if (!url) return null;
        
        try {
          // Get file data from API
          const fileData = await getCloudinaryFileUrl(url);
          
          if (!fileData) return null;
          
          // Extract filename and determine type
          const urlParts = url.split('/');
          const fileName = urlParts[urlParts.length - 1];
          const fileType = fileName.includes('.pdf') ? 'pdf' : 
                          (fileName.includes('.jpg') || fileName.includes('.jpeg')) ? 'jpg' : 
                          fileName.includes('.png') ? 'png' : 'raw';
          
          // Create file object for FileViewer
          return {
            id: `file-${index}`,
            name: fileName || `Document ${index + 1}`,
            type: fileType === 'pdf' ? 'application/pdf' : `image/${fileType}`,
            size: fileData.fileInfo?.bytes ? `${Math.round(fileData.fileInfo.bytes/1024)} KB` : 'Unknown',
            uploadedAt: client.submittedAt,
            url: fileData.url // This should be the download URL
          };
        } catch (error) {
          console.error(`Error processing document ${index}:`, error);
          return null;
        }
      });
      
      const results = await Promise.all(filePromises);
      setFormattedFiles(results.filter(Boolean));
      setIsLoadingFiles(false);
    }
    
    loadDocuments();
  }, [client, getCloudinaryFileUrl]);

  // Status change handler
  const handleStatusChange = async (status: string) => {
    try {
      await updateClientInformationStatus(id, status as any)
      toast({
        title: "Success",
        description: `Client information status updated to ${status}`,
        variant: "default",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update client information status",
        variant: "destructive",
      })
    }
  }

  if (!client) {
    return (
      <div className="container mx-auto max-w-4xl space-y-6 px-4">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Client Information Not Found</h1>
        </div>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            The client information with ID {id} could not be found. It may have been deleted or the ID is incorrect.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Client Information Details</h1>
        </div>
        <Badge
          variant={client.status === "Active" ? "success" : client.status === "Inactive" ? "destructive" : "outline"}
          className="text-sm px-3 py-1"
        >
          {client.status}
        </Badge>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Client Details</TabsTrigger>
          <TabsTrigger value="files">Submitted Files</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>{client.clientName}</CardTitle>
              <CardDescription>
                Client information submitted on {new Date(client.submittedAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Contact Person</h3>
                    <p>{client.contactPerson || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <p>{client.email || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                    <p>{client.phone || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Business Type</h3>
                    <p>{client.businessType || "N/A"}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                    <p>{client.address || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Tax ID</h3>
                    <p>{client.taxId || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Industry</h3>
                    <p>{client.industry || "N/A"}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Referred By</h3>
                    <p>{client.referredBy || "N/A"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {client.status === "Active" ? (
                <Button onClick={() => handleStatusChange("Inactive")} variant="destructive" className="gap-2">
                  <XCircle className="h-4 w-4" />
                  Deactivate Client
                </Button>
              ) : (
                <Button onClick={() => handleStatusChange("Active")} className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Activate Client
                </Button>
              )}
              <Button variant="secondary" onClick={() => router.back()}>
                Return to List
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <FileViewer files={formattedFiles} isLoading={isLoadingFiles} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
