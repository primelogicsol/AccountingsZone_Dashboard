import { PartnerApplicationsTable } from "@/components/partner-applications-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PartnerApplicationsPage() {
  return (
    <div className="w-full max-w-full space-y-4 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Partner Applications</h1>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>All Partner Applications</CardTitle>
          <CardDescription>View and manage all partner application submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <PartnerApplicationsTable />
        </CardContent>
      </Card>
    </div>
  )
}
