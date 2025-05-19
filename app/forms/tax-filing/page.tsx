import { TaxFilingTable } from "@/components/tax-filing-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TaxFilingPage() {
  return (
    <div className="w-full max-w-full space-y-4 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tax Filing Forms</h1>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>All Tax Filing Forms</CardTitle>
          <CardDescription>View and manage all tax filing form submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <TaxFilingTable />
        </CardContent>
      </Card>
    </div>
  )
}
