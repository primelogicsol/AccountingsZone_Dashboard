
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WebsitePartnerApplications } from "@/components/website-partner-applications"
import { WebsiteClientInformation } from "@/components/website-client-information"
import { WebsiteMessages } from "@/components/website-messages"
import { WebsiteTaxFilings } from "@/components/website-tax-filings"

export default function WebsiteDataPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Website Data</h1>
        <p className="text-muted-foreground">
          View and manage data submitted through the AccountingZone website
        </p>
      </div>
      <Tabs defaultValue="partner-applications" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="partner-applications">Partner Applications</TabsTrigger>
          <TabsTrigger value="client-information">Client Information</TabsTrigger>
          <TabsTrigger value="tax-filings">Tax Filings</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="partner-applications" className="mt-6">
          <WebsitePartnerApplications />
        </TabsContent>
        <TabsContent value="client-information" className="mt-6">
          <WebsiteClientInformation />
        </TabsContent>
        <TabsContent value="tax-filings" className="mt-6">
          <WebsiteTaxFilings />
        </TabsContent>
        <TabsContent value="messages" className="mt-6">
          <WebsiteMessages />
        </TabsContent>
      </Tabs>
    </div>
  );
}