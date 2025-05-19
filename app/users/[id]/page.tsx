// "use client"

// import { useParams, useRouter } from "next/navigation"
// import { ArrowLeft, Mail, Phone, Calendar, Clock, User, Shield, Activity, Download, DollarSign } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { useStore } from "@/lib/store"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { PaymentHistory } from "@/components/payment-history"

// export default function UserDetailPage() {
//   const params = useParams()
//   const router = useRouter()
//   const id = params.id as string
//   const { users, getTotalUserPayments } = useStore()
//   const user = users.find((u) => u.id === id)

//   if (!user) {
//     return (
//       <div className="container mx-auto max-w-4xl space-y-6 px-4">
//         <div className="flex items-center">
//           <Button variant="ghost" onClick={() => router.back()} className="mr-4">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back
//           </Button>
//           <h1 className="text-2xl font-bold tracking-tight">User Not Found</h1>
//         </div>
//         <Alert variant="destructive">
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>
//             The user with ID {id} could not be found. They may have been deleted or the ID is incorrect.
//           </AlertDescription>
//         </Alert>
//       </div>
//     )
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

//   const totalPaid = getTotalUserPayments(id)
//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount)
//   }

//   return (
//     <div className="container mx-auto max-w-4xl space-y-6 px-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center">
//           <Button variant="ghost" onClick={() => router.back()} className="mr-4">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back
//           </Button>
//           <h1 className="text-2xl font-bold tracking-tight">User Details</h1>
//         </div>
//         <Badge
//           variant={user.status === "Active" ? "success" : user.status === "Inactive" ? "destructive" : "outline"}
//           className="text-sm px-3 py-1"
//         >
//           {user.status}
//         </Badge>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card className="md:col-span-1">
//           <CardHeader>
//             <CardTitle>Profile</CardTitle>
//             <CardDescription>User information and details</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="flex flex-col items-center space-y-3">
//               <Avatar className="h-24 w-24 border-2 border-muted">
//                 <AvatarFallback className="text-xl font-semibold">
//                   {user.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="text-center">
//                 <h3 className="text-lg font-semibold">{user.name}</h3>
//                 <p className="text-sm text-muted-foreground">{user.email}</p>
//               </div>
//               <Badge variant="outline" className="capitalize">
//                 {user.role}
//               </Badge>
//             </div>

//             <Separator />

//             <div className="space-y-3">
//               <div className="flex items-center">
//                 <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm">{user.email}</span>
//               </div>
//               <div className="flex items-center">
//                 <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm">+1 (555) 123-4567</span>
//               </div>
//               <div className="flex items-center">
//                 <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm">{user.role}</span>
//               </div>
//               <div className="flex items-center">
//                 <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm">Created: {formatDate(user.createdAt)}</span>
//               </div>
//               <div className="flex items-center">
//                 <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm">Last login: {formatDate(user.lastLogin)}</span>
//               </div>
//               <div className="flex items-center">
//                 <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
//                 <span className="text-sm">Total paid: {formatCurrency(totalPaid)}</span>
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter className="flex justify-center">
//             <Button variant="outline" onClick={() => router.back()} className="w-full">
//               Return to List
//             </Button>
//           </CardFooter>
//         </Card>

//         <Card className="md:col-span-2">
//           <CardHeader>
//             <CardTitle>User Activity</CardTitle>
//             <CardDescription>Recent activity and uploaded files</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Tabs defaultValue="activity" className="w-full">
//               <TabsList className="mb-4 w-full grid grid-cols-4">
//                 <TabsTrigger value="activity">Activity</TabsTrigger>
//                 <TabsTrigger value="files">Files</TabsTrigger>
//                 <TabsTrigger value="payments">Payments</TabsTrigger>
//                 <TabsTrigger value="permissions">Permissions</TabsTrigger>
//               </TabsList>

//               <TabsContent value="activity" className="space-y-4">
//                 <div className="space-y-4">
//                   <div className="flex items-start space-x-4">
//                     <div className="rounded-full bg-primary/10 p-2">
//                       <Activity className="h-4 w-4 text-primary" />
//                     </div>
//                     <div className="flex-1 space-y-1">
//                       <p className="text-sm font-medium">Logged in</p>
//                       <p className="text-xs text-muted-foreground">{formatDate(user.lastLogin)}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-4">
//                     <div className="rounded-full bg-primary/10 p-2">
//                       <User className="h-4 w-4 text-primary" />
//                     </div>
//                     <div className="flex-1 space-y-1">
//                       <p className="text-sm font-medium">Updated profile information</p>
//                       <p className="text-xs text-muted-foreground">
//                         {formatDate(new Date(Date.now() - 86400000).toISOString())}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-4">
//                     <div className="rounded-full bg-primary/10 p-2">
//                       <Activity className="h-4 w-4 text-primary" />
//                     </div>
//                     <div className="flex-1 space-y-1">
//                       <p className="text-sm font-medium">Viewed client information</p>
//                       <p className="text-xs text-muted-foreground">
//                         {formatDate(new Date(Date.now() - 172800000).toISOString())}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </TabsContent>

//               <TabsContent value="files" className="space-y-4">
//                 <div className="grid grid-cols-1 gap-4">
//                   {[
//                     {
//                       name: "tax_document_2023.pdf",
//                       type: "pdf",
//                       date: new Date(Date.now() - 86400000),
//                     },
//                     {
//                       name: "client_report.xlsx",
//                       type: "excel",
//                       date: new Date(Date.now() - 172800000),
//                     },
//                     {
//                       name: "contract_signed.pdf",
//                       type: "pdf",
//                       date: new Date(Date.now() - 259200000),
//                     },
//                   ].map((file, index) => (
//                     <Card key={index}>
//                       <CardContent className="p-4">
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-4">
//                             <div className="rounded-md bg-primary/10 p-2">
//                               {file.type === "pdf" ? (
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   viewBox="0 0 384 512"
//                                   className="h-8 w-8 text-primary"
//                                 >
//                                   <path
//                                     d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128z"
//                                     fill="currentColor"
//                                   />
//                                 </svg>
//                               ) : (
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   viewBox="0 0 384 512"
//                                   className="h-8 w-8 text-primary"
//                                 >
//                                   <path
//                                     d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM155.7 250.2L192 302.1l36.3-51.9c7.6-10.9 22.6-13.5 33.4-5.9s13.5 22.6 5.9 33.4L221.3 344l46.4 66.2c7.6 10.9 5 25.8-5.9 33.4s-25.8 5-33.4-5.9L192 385.8l-36.3 51.9c-7.6 10.9-22.6 13.5-33.4 5.9s-13.5-22.6-5.9-33.4L162.7 344l-46.4-66.2c-7.6-10.9-5-25.8 5.9-33.4s25.8-5 33.4 5.9z"
//                                     fill="currentColor"
//                                   />
//                                 </svg>
//                               )}
//                             </div>
//                             <div className="flex-1 space-y-1">
//                               <p className="text-sm font-medium">{file.name}</p>
//                               <p className="text-xs text-muted-foreground">
//                                 Uploaded on {formatDate(file.date.toISOString())}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex space-x-2">
//                             <Button variant="outline" size="sm" className="flex items-center gap-1">
//                               <Download className="h-4 w-4" />
//                               <span>Download</span>
//                             </Button>
//                             <Button variant="secondary" size="sm">
//                               View
//                             </Button>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </TabsContent>

//               <TabsContent value="payments">
//                 <PaymentHistory userId={user.id} />
//               </TabsContent>

//               <TabsContent value="permissions" className="space-y-4">
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <div className="space-y-0.5">
//                       <p className="text-sm font-medium">View Client Information</p>
//                       <p className="text-xs text-muted-foreground">Can view client information and details</p>
//                     </div>
//                     <Badge variant="success">Allowed</Badge>
//                   </div>
//                   <Separator />
//                   <div className="flex items-center justify-between">
//                     <div className="space-y-0.5">
//                       <p className="text-sm font-medium">Edit Client Information</p>
//                       <p className="text-xs text-muted-foreground">Can edit client information and details</p>
//                     </div>
//                     <Badge variant="success">Allowed</Badge>
//                   </div>
//                   <Separator />
//                   <div className="flex items-center justify-between">
//                     <div className="space-y-0.5">
//                       <p className="text-sm font-medium">Delete Client Information</p>
//                       <p className="text-xs text-muted-foreground">Can delete client information</p>
//                     </div>
//                     <Badge variant="destructive">Denied</Badge>
//                   </div>
//                   <Separator />
//                   <div className="flex items-center justify-between">
//                     <div className="space-y-0.5">
//                       <p className="text-sm font-medium">Generate Reports</p>
//                       <p className="text-xs text-muted-foreground">Can generate and download reports</p>
//                     </div>
//                     <Badge variant="success">Allowed</Badge>
//                   </div>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft, Mail, Phone, Calendar, Clock,
  User, Shield, Activity, Download, DollarSign
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription,
  CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/lib/store"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentHistory } from "@/components/payment-history"

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const { users, getTotalUserPayments, fetchUsers, loading } = useStore()

  // Automatically fetch users if not already fetched
  useEffect(() => {
    if (users.length === 0) {
      fetchUsers()
    }
  }, [fetchUsers, users.length])

  const user = users.find((u) => u.id === id)

  if (loading?.users) {
    return (
      <div className="container mx-auto max-w-4xl space-y-6 px-4 text-center py-12">
        <p>Loading user information...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-4xl space-y-6 px-4">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">User Not Found</h1>
        </div>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            The user with ID {id} could not be found. They may have been deleted or the ID is incorrect.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) {
      return "N/A"; // Return a placeholder for missing dates
    }
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid (Invalid dates return "NaN" when calling getTime())
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid date";
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const totalPaid = getTotalUserPayments(id)

  return (
    <div className="container mx-auto max-w-4xl space-y-6 px-4">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">User Detail</h1>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 space-x-4">
          <Avatar>
            <AvatarFallback>
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{user.firstName} {user.lastName}</CardTitle>
            <CardDescription>User ID: {user.id}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            {user.email}
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            {user.phone || "N/A"}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Created at: {formatDate(user.createdAt)}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Last seen: {formatDate(user.updatedAt)}
          </div>
          <div className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Role: <Badge className="ml-2">{user.role}</Badge>
          </div>
          <div className="flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Status: <Badge variant={user.isActive ? "default" : "destructive"} className="ml-2">
              {user.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-2" />
            Total Paid: {formatCurrency(totalPaid)}
          </div>
        </CardFooter>
      </Card>

      <Tabs defaultValue="payments">
        <TabsList>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
        </TabsList>
        <TabsContent value="payments">
          <PaymentHistory userId={user.id} />
        </TabsContent>
        <TabsContent value="downloads">
          <Card>
            <CardHeader>
              <CardTitle>Downloads</CardTitle>
              <CardDescription>Files downloaded by this user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Download className="w-4 h-4 mr-2" />
                (This section is under development)
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
