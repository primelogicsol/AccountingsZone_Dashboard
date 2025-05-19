
"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/lib/store"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DocumentViewer from "@/components/document-viewer" // New import for document viewer

export default function PartnerApplicationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { getPartnerApplicationById, updatePartnerApplicationStatus } = useStore()
  const application = getPartnerApplicationById(id)

  // Function to generate appropriate document labels
  function getDocumentLabel(url: string, index: number) {
    if (url.includes('business-registration')) {
      return 'Business Registration Certificate';
    } else if (url.includes('tax-identification')) {
      return 'Tax ID Certificate';
    } else if (url.includes('portfolio')) {
      return 'Portfolio/References';
    } else {
      return `Document ${index + 1}`;
    }
  }

  if (!application) {
    return (
      <div className="container mx-auto max-w-4xl space-y-6 px-4">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Partner Application Not Found</h1>
        </div>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            The partner application with ID {id} could not be found. It may have been deleted or the ID is incorrect.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const handleApprove = () => {
    updatePartnerApplicationStatus(id, "Approved")
  }

  const handleReject = () => {
    updatePartnerApplicationStatus(id, "Rejected")
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
          <h1 className="text-2xl font-bold tracking-tight">Partner Application Details</h1>
        </div>
        <Badge
          variant={
            application.status === "Approved"
              ? "success"
              : application.status === "Rejected"
                ? "destructive"
                : "outline"
          }
          className="text-sm px-3 py-1"
        >
          {application.status}
        </Badge>
      </div>

      <Tabs defaultValue="details">
        <TabsList className="mb-4">
          <TabsTrigger value="details">Application Details</TabsTrigger>
          <TabsTrigger value="files">Submitted Files</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{application.businessName}</CardTitle>
              <CardDescription>
                Application ID: {application.id} • Submitted on {formatDate(application.submittedAt)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">General Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Contact Person</p>
                    <p>{application.contactPerson}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p>{application.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <p>{application.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Website</p>
                    <p>{application.website}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium text-muted-foreground">Address</p>
                    <p>{application.address}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Business Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Business Type</p>
                    <p>{application.businessType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Years in Business</p>
                    <p>{application.yearsInBusiness}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Employee Count</p>
                    <p>{application.employeeCount}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Annual Revenue</p>
                    <p>{application.annualRevenue}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-2">Services & Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Services Offered</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {application.servicesOffered.map((service) => (
                        <Badge key={service} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Certifications</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {application.certifications.map((cert) => (
                        <Badge key={cert} variant="outline">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {application.status === "Pending" ? (
                <>
                  <Button variant="outline" onClick={handleReject} className="gap-2">
                    <XCircle className="h-4 w-4" />
                    Reject Application
                  </Button>
                  <Button onClick={handleApprove} className="gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Approve Application
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => router.back()}>
                  Return to List
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Uploaded Documents</CardTitle>
              <CardDescription>
                Documents submitted with this application
              </CardDescription>
            </CardHeader>
            <CardContent>
              {application.documents && application.documents.length > 0 ? (
                <div className="space-y-6">
                  {application.documents.map((docUrl, index) => (
                    <div key={index} className="border rounded-md p-4 bg-muted/10">
                      <DocumentViewer 
                        url={docUrl} 
                        filename={getDocumentLabel(docUrl, index)} 
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>No documents were submitted with this application.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}