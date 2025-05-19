import { ClientInformationTable } from "@/components/client-information-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClientInformationPage() {
  return (
    <div className="w-full max-w-full space-y-4 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Client Information</h1>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>All Client Information Forms</CardTitle>
          <CardDescription>View and manage all client information form submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <ClientInformationTable />
        </CardContent>
      </Card>
    </div>
  )
}
