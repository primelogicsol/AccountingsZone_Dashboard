// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { DateRangePicker } from "@/components/date-range-picker"
// import { addDays } from "date-fns"
// import type { DateRange } from "react-day-picker"
// import { Download, Clock } from "lucide-react"
// import { toast } from "@/components/ui/use-toast"
// import { Toaster } from "@/components/ui/toaster"

// export default function ReportsPage() {
//   const [dateRange, setDateRange] = useState<DateRange>({
//     from: addDays(new Date(), -30),
//     to: new Date(),
//   })
//   const [reportType, setReportType] = useState("partner-applications")
//   const [reportFormat, setReportFormat] = useState("csv")
//   const [includeFields, setIncludeFields] = useState<string[]>([
//     "id",
//     "businessName",
//     "contactPerson",
//     "email",
//     "status",
//     "submittedAt",
//   ])
//   const [reportName, setReportName] = useState("")
//   const [isGenerating, setIsGenerating] = useState(false)

//   const handleGenerateReport = () => {
//     if (!reportName) {
//       toast({
//         title: "Report Name Required",
//         description: "Please enter a name for your report.",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsGenerating(true)

//     // Simulate report generation
//     setTimeout(() => {
//       // Create a dummy CSV content
//       let csvContent = "data:text/csv;charset=utf-8,"

//       // Add headers based on selected fields
//       csvContent += includeFields.join(",") + "\r\n"

//       // Add some dummy data rows
//       for (let i = 0; i < 10; i++) {
//         const row = includeFields.map((field) => {
//           if (field === "id") return `ID-${1000 + i}`
//           if (field === "businessName") return `Business ${i}`
//           if (field === "contactPerson") return `Contact ${i}`
//           if (field === "email") return `email${i}@example.com`
//           if (field === "status") return i % 3 === 0 ? "Approved" : i % 3 === 1 ? "Pending" : "Rejected"
//           if (field === "submittedAt") return new Date().toISOString()
//           return `Data for ${field}`
//         })
//         csvContent += row.join(",") + "\r\n"
//       }

//       // Create a download link
//       const encodedUri = encodeURI(csvContent)
//       const link = document.createElement("a")
//       link.setAttribute("href", encodedUri)
//       link.setAttribute("download", `${reportName}.${reportFormat}`)
//       document.body.appendChild(link)

//       // Trigger download
//       link.click()
//       document.body.removeChild(link)

//       toast({
//         title: "Report Generated",
//         description: `Your ${reportName} report has been generated and downloaded successfully.`,
//       })
//       setIsGenerating(false)
//     }, 1500)
//   }

//   const handleDateRangeChange = (range: DateRange) => {
//     if (range?.from && range?.to) {
//       setDateRange(range)
//     }
//   }

//   // Get field options based on report type
//   const getFieldOptions = () => {
//     switch (reportType) {
//       case "partner-applications":
//         return [
//           { id: "id", label: "Application ID" },
//           { id: "businessName", label: "Business Name" },
//           { id: "contactPerson", label: "Contact Person" },
//           { id: "email", label: "Email" },
//           { id: "phone", label: "Phone" },
//           { id: "website", label: "Website" },
//           { id: "address", label: "Address" },
//           { id: "businessType", label: "Business Type" },
//           { id: "status", label: "Status" },
//           { id: "submittedAt", label: "Submitted At" },
//         ]
//       case "client-information":
//         return [
//           { id: "id", label: "Client ID" },
//           { id: "clientName", label: "Client Name" },
//           { id: "contactPerson", label: "Contact Person" },
//           { id: "email", label: "Email" },
//           { id: "phone", label: "Phone" },
//           { id: "address", label: "Address" },
//           { id: "businessType", label: "Business Type" },
//           { id: "status", label: "Status" },
//           { id: "submittedAt", label: "Submitted At" },
//         ]
//       case "tax-filings":
//         return [
//           { id: "id", label: "Filing ID" },
//           { id: "clientName", label: "Client Name" },
//           { id: "taxYear", label: "Tax Year" },
//           { id: "filingType", label: "Filing Type" },
//           { id: "status", label: "Status" },
//           { id: "amount", label: "Amount" },
//           { id: "submittedAt", label: "Submitted At" },
//           { id: "dueDate", label: "Due Date" },
//         ]
//       default:
//         return []
//     }
//   }

//   const fieldOptions = getFieldOptions()

//   return (
//     <div className="w-full max-w-full space-y-6 px-4">
//       <h1 className="text-3xl font-bold tracking-tight">Reports</h1>

//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Generate Custom Report</CardTitle>
//           <CardDescription>Create a custom report based on your specific requirements</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="grid gap-6 md:grid-cols-2">
//             <div className="space-y-2">
//               <Label htmlFor="report-name">Report Name</Label>
//               <Input
//                 id="report-name"
//                 placeholder="Enter report name"
//                 value={reportName}
//                 onChange={(e) => setReportName(e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="report-type">Report Type</Label>
//               <Select value={reportType} onValueChange={setReportType}>
//                 <SelectTrigger id="report-type">
//                   <SelectValue placeholder="Select report type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="partner-applications">Partner Applications</SelectItem>
//                   <SelectItem value="client-information">Client Information</SelectItem>
//                   <SelectItem value="tax-filings">Tax Filings</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label>Date Range</Label>
//               <DateRangePicker dateRange={dateRange} onDateRangeChange={handleDateRangeChange} />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="report-format">Report Format</Label>
//               <Select value={reportFormat} onValueChange={setReportFormat}>
//                 <SelectTrigger id="report-format">
//                   <SelectValue placeholder="Select format" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="csv">CSV</SelectItem>
//                   <SelectItem value="excel">Excel</SelectItem>
//                   <SelectItem value="pdf">PDF</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Include Fields</Label>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
//               {fieldOptions.map((field) => (
//                 <div key={field.id} className="flex items-center space-x-2">
//                   <Checkbox
//                     id={`field-${field.id}`}
//                     checked={includeFields.includes(field.id)}
//                     onCheckedChange={(checked) => {
//                       if (checked) {
//                         setIncludeFields([...includeFields, field.id])
//                       } else {
//                         setIncludeFields(includeFields.filter((id) => id !== field.id))
//                       }
//                     }}
//                   />
//                   <Label htmlFor={`field-${field.id}`}>{field.label}</Label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-end">
//           <Button onClick={handleGenerateReport} disabled={isGenerating} size="lg">
//             {isGenerating ? (
//               <>
//                 <Clock className="mr-2 h-4 w-4 animate-spin" />
//                 Generating...
//               </>
//             ) : (
//               <>
//                 <Download className="mr-2 h-4 w-4" />
//                 Generate Report
//               </>
//             )}
//           </Button>
//         </CardFooter>
//       </Card>
//       <Toaster />
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DateRangePicker } from "@/components/date-range-picker"
import { addDays, parseISO, isAfter, isBefore, isEqual } from "date-fns"
import type { DateRange } from "react-day-picker"
import { Download, Clock } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useStore } from "@/lib/store"

export default function ReportsPage() {
  // Access data from the store
  const { 
    websitePartnerApplications, 
    websiteClientInformation, 
    websiteTaxFilings,
    fetchWebsitePartnerApplications,
    fetchWebsiteClientInformation,
    fetchWebsiteTaxFilings
  } = useStore();

  // Load all website data when component mounts
  useEffect(() => {
    fetchWebsitePartnerApplications();
    fetchWebsiteClientInformation();
    fetchWebsiteTaxFilings();
  }, [fetchWebsitePartnerApplications, fetchWebsiteClientInformation, fetchWebsiteTaxFilings]);

  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })
  const [reportType, setReportType] = useState("partner-applications")
  const [reportFormat, setReportFormat] = useState("csv")
  const [includeFields, setIncludeFields] = useState<string[]>([
    "id",
    "businessName",
    "contactPerson",
    "email",
    "status",
    "submittedAt",
  ])
  const [reportName, setReportName] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  // Get relevant data based on report type and date range
  const getFilteredData = () => {
    let data: any[] = [];
    
    // Select appropriate data source
    switch (reportType) {
      case "partner-applications":
        data = [...websitePartnerApplications];
        break;
      case "client-information":
        data = [...websiteClientInformation];
        break;
      case "tax-filings":
        data = [...websiteTaxFilings];
        break;
    }
    
    // Filter by date range if specified
    if (dateRange.from && dateRange.to) {
      data = data.filter(item => {
        try {
          const itemDate = parseISO(item.submittedAt);
          return (isAfter(itemDate, dateRange.from) || isEqual(itemDate, dateRange.from)) && 
                 (isBefore(itemDate, dateRange.to) || isEqual(itemDate, dateRange.to));
        } catch (e) {
          console.error("Date parsing error:", e);
          return false;
        }
      });
    }
    
    return data;
  }

  const handleGenerateReport = () => {
    if (!reportName) {
      toast({
        title: "Report Name Required",
        description: "Please enter a name for your report.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    
    // Get filtered data
    const data = getFilteredData();
    
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,"

    // Add headers based on selected fields
    csvContent += includeFields.join(",") + "\r\n"

    // Add actual data rows
    data.forEach(item => {
      const row = includeFields.map(field => {
        // Handle special field formatting
        if (field === "submittedAt" && item[field]) {
          try {
            const date = new Date(item[field]);
            return date.toLocaleDateString() + " " + date.toLocaleTimeString();
          } catch (e) {
            return item[field] || '';
          }
        }
        
        // Handle nested objects or arrays
        if (Array.isArray(item[field])) {
          return '"' + item[field].join(", ") + '"';
        }
        
        // Handle regular fields
        const value = item[field] !== undefined ? item[field] : '';
        
        // Escape any commas or quotes in the value
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return '"' + value.replace(/"/g, '""') + '"';
        }
        
        return value;
      });
      csvContent += row.join(",") + "\r\n";
    });

    // Create a download link
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${reportName}.${reportFormat}`)
    document.body.appendChild(link)

    // Trigger download
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Report Generated",
      description: `Your ${reportName} report has been generated with ${data.length} records.`,
    })
    setIsGenerating(false)
  }

  const handleDateRangeChange = (range: DateRange) => {
    if (range?.from && range?.to) {
      setDateRange(range)
    }
  }

  // Get field options based on report type
  const getFieldOptions = () => {
    switch (reportType) {
      case "partner-applications":
        return [
          { id: "id", label: "Application ID" },
          { id: "businessName", label: "Business Name" },
          { id: "contactPerson", label: "Contact Person" },
          { id: "email", label: "Email" },
          { id: "phone", label: "Phone" },
          { id: "website", label: "Website" },
          { id: "address", label: "Address" },
          { id: "businessType", label: "Business Type" },
          { id: "status", label: "Status" },
          { id: "submittedAt", label: "Submitted At" },
        ]
      case "client-information":
        return [
          { id: "id", label: "Client ID" },
          { id: "clientName", label: "Client Name" },
          { id: "contactPerson", label: "Contact Person" },
          { id: "email", label: "Email" },
          { id: "phone", label: "Phone" },
          { id: "address", label: "Address" },
          { id: "businessType", label: "Business Type" },
          { id: "taxId", label: "Tax ID" },
          { id: "industry", label: "Industry" },
          { id: "status", label: "Status" },
          { id: "submittedAt", label: "Submitted At" },
        ]
      case "tax-filings":
        return [
          { id: "id", label: "Filing ID" },
          { id: "clientName", label: "Client Name" },
          { id: "taxYear", label: "Tax Year" },
          { id: "filingType", label: "Filing Type" },
          { id: "taxId", label: "Tax ID" },
          { id: "filingStatus", label: "Filing Status" },
          { id: "status", label: "Status" },
          { id: "amount", label: "Amount" },
          { id: "submittedAt", label: "Submitted At" },
          { id: "dueDate", label: "Due Date" },
        ]
      default:
        return []
    }
  }

  // Update included fields when report type changes
  useEffect(() => {
    const options = getFieldOptions()
    setIncludeFields(options.slice(0, 6).map(option => option.id))
  }, [reportType])

  const fieldOptions = getFieldOptions()
  const filteredData = getFilteredData();

  return (
    <div className="w-full max-w-full space-y-6 px-4">
      <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Generate Custom Report</CardTitle>
          <CardDescription>Create a custom report based on your specific requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="report-name">Report Name</Label>
              <Input
                id="report-name"
                placeholder="Enter report name"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="partner-applications">Partner Applications</SelectItem>
                  <SelectItem value="client-information">Client Information</SelectItem>
                  <SelectItem value="tax-filings">Tax Filings</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date Range</Label>
              <DateRangePicker dateRange={dateRange} onDateRangeChange={handleDateRangeChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-format">Report Format</Label>
              <Select value={reportFormat} onValueChange={setReportFormat}>
                <SelectTrigger id="report-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Include Fields</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {fieldOptions.map((field) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`field-${field.id}`}
                      checked={includeFields.includes(field.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setIncludeFields([...includeFields, field.id])
                        } else {
                          setIncludeFields(includeFields.filter((id) => id !== field.id))
                        }
                      }}
                    />
                    <Label htmlFor={`field-${field.id}`}>{field.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                Records available: <span className="font-semibold">{filteredData.length}</span> (filtered from {
                  reportType === "partner-applications" ? websitePartnerApplications.length : 
                  reportType === "client-information" ? websiteClientInformation.length : 
                  websiteTaxFilings.length
                } total)
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleGenerateReport} 
            disabled={isGenerating || filteredData.length === 0} 
            size="lg"
          >
            {isGenerating ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}