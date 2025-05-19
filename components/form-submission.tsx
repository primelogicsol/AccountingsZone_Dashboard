// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import { Button } from "@/components/ui/button"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import { useStore } from "@/lib/store"
// import { toast } from "@/components/ui/use-toast"
// import { Toaster } from "@/components/ui/toaster"

// // Partner Application Form Schema
// const partnerFormSchema = z.object({
//   businessName: z.string().min(2, {
//     message: "Business name must be at least 2 characters.",
//   }),
//   contactPerson: z.string().min(2, {
//     message: "Contact person must be at least 2 characters.",
//   }),
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
//   phone: z.string().min(10, {
//     message: "Phone number must be at least 10 characters.",
//   }),
//   website: z.string().optional(),
//   address: z.string().min(5, {
//     message: "Address must be at least 5 characters.",
//   }),
//   businessType: z.string().min(2, {
//     message: "Business type must be at least 2 characters.",
//   }),
//   servicesOffered: z.array(z.string()).min(1, {
//     message: "Please select at least one service.",
//   }),
//   yearsInBusiness: z.string(),
//   employeeCount: z.string(),
//   annualRevenue: z.string(),
//   certifications: z.array(z.string()),
// })

// type PartnerFormValues = z.infer<typeof partnerFormSchema>

// const services = [
//   { id: "tax-preparation", label: "Tax Preparation" },
//   { id: "bookkeeping", label: "Bookkeeping" },
//   { id: "financial-planning", label: "Financial Planning" },
//   { id: "audit", label: "Audit" },
//   { id: "payroll", label: "Payroll" },
//   { id: "consulting", label: "Consulting" },
// ]

// const certifications = [
//   { id: "cpa", label: "CPA" },
//   { id: "ea", label: "EA" },
//   { id: "cfp", label: "CFP" },
//   { id: "cfa", label: "CFA" },
//   { id: "quickbooks", label: "QuickBooks ProAdvisor" },
// ]

// export function PartnerApplicationForm() {
//   const router = useRouter()
//   const { addPartnerApplication } = useStore()
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const form = useForm<PartnerFormValues>({
//     resolver: zodResolver(partnerFormSchema),
//     defaultValues: {
//       businessName: "",
//       contactPerson: "",
//       email: "",
//       phone: "",
//       website: "",
//       address: "",
//       businessType: "",
//       servicesOffered: [],
//       yearsInBusiness: "1-5",
//       employeeCount: "1-10",
//       annualRevenue: "Under $500K",
//       certifications: [],
//     },
//   })

//   function onSubmit(values: PartnerFormValues) {
//     setIsSubmitting(true)

//     // Simulate API call
//     setTimeout(() => {
//       addPartnerApplication(values)

//       toast({
//         title: "Application Submitted",
//         description: "Your partner application has been submitted successfully.",
//       })

//       setIsSubmitting(false)
//       router.push("/forms/partner-applications")
//     }, 1000)
//   }

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>Partner Application Form</CardTitle>
//         <CardDescription>Submit your application to become a partner with Accountings ZONE.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">General Information</h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="businessName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Business Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Acme Accounting" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="contactPerson"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Contact Person</FormLabel>
//                       <FormControl>
//                         <Input placeholder="John Smith" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input placeholder="john@acmeaccounting.com" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="phone"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Phone Number</FormLabel>
//                       <FormControl>
//                         <Input placeholder="+1 (555) 123-4567" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="website"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Website</FormLabel>
//                       <FormControl>
//                         <Input placeholder="acmeaccounting.com" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="address"
//                   render={({ field }) => (
//                     <FormItem className="col-span-1 md:col-span-2">
//                       <FormLabel>Business Address</FormLabel>
//                       <FormControl>
//                         <Textarea placeholder="123 Main St, New York, NY 10001" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Business Details</h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <FormField
//                   control={form.control}
//                   name="businessType"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Business Type</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Accounting Firm" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="yearsInBusiness"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Years in Business</FormLabel>
//                       <FormControl>
//                         <select
//                           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                           {...field}
//                         >
//                           <option value="Less than 1">Less than 1</option>
//                           <option value="1-5">1-5</option>
//                           <option value="5-10">5-10</option>
//                           <option value="10+">10+</option>
//                         </select>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="employeeCount"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Number of Employees</FormLabel>
//                       <FormControl>
//                         <select
//                           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                           {...field}
//                         >
//                           <option value="1-10">1-10</option>
//                           <option value="10-50">10-50</option>
//                           <option value="50-100">50-100</option>
//                           <option value="100+">100+</option>
//                         </select>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <FormField
//                   control={form.control}
//                   name="annualRevenue"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Annual Revenue</FormLabel>
//                       <FormControl>
//                         <select
//                           className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                           {...field}
//                         >
//                           <option value="Under $500K">Under $500K</option>
//                           <option value="$500K-$1M">$500K-$1M</option>
//                           <option value="$1M-$5M">$1M-$5M</option>
//                           <option value="$5M+">$5M+</option>
//                         </select>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h3 className="text-lg font-medium">Services & Certifications</h3>

//               <FormField
//                 control={form.control}
//                 name="servicesOffered"
//                 render={() => (
//                   <FormItem>
//                     <div className="mb-4">
//                       <FormLabel>Services Offered</FormLabel>
//                       <FormDescription>Select all services that your business offers.</FormDescription>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                       {services.map((service) => (
//                         <FormField
//                           key={service.id}
//                           control={form.control}
//                           name="servicesOffered"
//                           render={({ field }) => {
//                             return (
//                               <FormItem key={service.id} className="flex flex-row items-start space-x-3 space-y-0">
//                                 <FormControl>
//                                   <Checkbox
//                                     checked={field.value?.includes(service.label)}
//                                     onCheckedChange={(checked) => {
//                                       return checked
//                                         ? field.onChange([...field.value, service.label])
//                                         : field.onChange(field.value?.filter((value) => value !== service.label))
//                                     }}
//                                   />
//                                 </FormControl>
//                                 <FormLabel className="font-normal">{service.label}</FormLabel>
//                               </FormItem>
//                             )
//                           }}
//                         />
//                       ))}
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="certifications"
//                 render={() => (
//                   <FormItem>
//                     <div className="mb-4">
//                       <FormLabel>Certifications</FormLabel>
//                       <FormDescription>Select all certifications that your business holds.</FormDescription>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                       {certifications.map((cert) => (
//                         <FormField
//                           key={cert.id}
//                           control={form.control}
//                           name="certifications"
//                           render={({ field }) => {
//                             return (
//                               <FormItem key={cert.id} className="flex flex-row items-start space-x-3 space-y-0">
//                                 <FormControl>
//                                   <Checkbox
//                                     checked={field.value?.includes(cert.label)}
//                                     onCheckedChange={(checked) => {
//                                       return checked
//                                         ? field.onChange([...field.value, cert.label])
//                                         : field.onChange(field.value?.filter((value) => value !== cert.label))
//                                     }}
//                                   />
//                                 </FormControl>
//                                 <FormLabel className="font-normal">{cert.label}</FormLabel>
//                               </FormItem>
//                             )
//                           }}
//                         />
//                       ))}
//                     </div>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <Button type="submit" disabled={isSubmitting}>
//               {isSubmitting ? "Submitting..." : "Submit Application"}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//       <Toaster />
//     </Card>
//   )
// }
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useStore } from "@/lib/store"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Partner Application Form Schema
const partnerFormSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  contactPerson: z.string().min(2, {
    message: "Contact person must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  website: z.string().optional(),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  businessType: z.string().min(2, {
    message: "Business type must be at least 2 characters.",
  }),
  servicesOffered: z.array(z.string()).min(1, {
    message: "Please select at least one service.",
  }),
  yearsInBusiness: z.string(),
  employeeCount: z.string(),
  annualRevenue: z.string(),
  certifications: z.array(z.string()),
})

type PartnerFormValues = z.infer<typeof partnerFormSchema>

const services = [
  { id: "tax-preparation", label: "Tax Preparation" },
  { id: "bookkeeping", label: "Bookkeeping" },
  { id: "financial-planning", label: "Financial Planning" },
  { id: "audit", label: "Audit" },
  { id: "payroll", label: "Payroll" },
  { id: "consulting", label: "Consulting" },
]

const certifications = [
  { id: "cpa", label: "CPA" },
  { id: "ea", label: "EA" },
  { id: "cfp", label: "CFP" },
  { id: "cfa", label: "CFA" },
  { id: "quickbooks", label: "QuickBooks ProAdvisor" },
]

export function PartnerApplicationForm() {
  const router = useRouter()
  const { addWebsitePartnerApplication } = useStore() // Use website-specific function instead
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      businessName: "",
      contactPerson: "",
      email: "",
      phone: "",
      website: "",
      address: "",
      businessType: "",
      servicesOffered: [],
      yearsInBusiness: "1-5",
      employeeCount: "1-10",
      annualRevenue: "Under $500K",
      certifications: [],
    },
  })

  async function onSubmit(values: PartnerFormValues) {
    setIsSubmitting(true)

    try {
      // Use API endpoint specifically for website data
      const response = await fetch("/api/website-data/partner-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          businessName: values.businessName,
          contactPerson: values.contactPerson,
          email: values.email,
          phoneNumber: values.phone,
          website: values.website,
          businessAddress: values.address,
          typeOfBusiness: values.businessType,
          servicesOrProductsOffered: values.servicesOffered.join(', '),
          yearsInOperation: values.yearsInBusiness,
          annualRevenue: values.annualRevenue,
          businessLicensesOrPermits: values.certifications.join(', '),
          // Match website database schema fields
          declaration: true,
          consent: true,
          signature: values.contactPerson,
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit partner application");
      }

      const data = await response.json();
      
      // Add to the website applications in the store
      addWebsitePartnerApplication(data);

      toast({
        title: "Application Submitted",
        description: "Your partner application has been submitted successfully.",
      });
      
      router.push("/forms/partner-applications");
    } catch (error) {
      console.error("Error submitting application:", error);
      
      toast({
        title: "Submission Failed",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Partner Application Form</CardTitle>
        <CardDescription>Submit your application to become a partner with Accountings ZONE.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">General Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Accounting" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@acmeaccounting.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="acmeaccounting.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                      <FormLabel>Business Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="123 Main St, New York, NY 10001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Business Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Accounting Firm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearsInBusiness"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years in Business</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="Less than 1">Less than 1</option>
                          <option value="1-5">1-5</option>
                          <option value="5-10">5-10</option>
                          <option value="10+">10+</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employeeCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Employees</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="1-10">1-10</option>
                          <option value="10-50">10-50</option>
                          <option value="50-100">50-100</option>
                          <option value="100+">100+</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="annualRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Revenue</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="Under $500K">Under $500K</option>
                          <option value="$500K-$1M">$500K-$1M</option>
                          <option value="$1M-$5M">$1M-$5M</option>
                          <option value="$5M+">$5M+</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Services & Certifications</h3>

              <FormField
                control={form.control}
                name="servicesOffered"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Services Offered</FormLabel>
                      <FormDescription>Select all services that your business offers.</FormDescription>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {services.map((service) => (
                        <FormField
                          key={service.id}
                          control={form.control}
                          name="servicesOffered"
                          render={({ field }) => {
                            return (
                              <FormItem key={service.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(service.label)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, service.label])
                                        : field.onChange(field.value?.filter((value) => value !== service.label))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{service.label}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="certifications"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Certifications</FormLabel>
                      <FormDescription>Select all certifications that your business holds.</FormDescription>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {certifications.map((cert) => (
                        <FormField
                          key={cert.id}
                          control={form.control}
                          name="certifications"
                          render={({ field }) => {
                            return (
                              <FormItem key={cert.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(cert.label)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, cert.label])
                                        : field.onChange(field.value?.filter((value) => value !== cert.label))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{cert.label}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <Toaster />
    </Card>
  )
}