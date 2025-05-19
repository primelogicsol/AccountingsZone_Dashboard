// import { UsersTable } from "@/components/users-table"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// export default function UsersPage() {
//   return (
//     <div className="w-full max-w-full space-y-4 px-4">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold tracking-tight">Users</h1>
//       </div>
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>All Users</CardTitle>
//           <CardDescription>View and manage all users of the Accountings ZONE platform</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <UsersTable />
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import { useEffect } from "react"
import { UsersTable } from "@/components/users-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function UsersPageClient() {
  const { fetchUsers, loading } = useStore()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <div className="w-full max-w-full space-y-4 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <Button 
          onClick={() => fetchUsers()} 
          variant="outline" 
          size="sm"
          disabled={loading.users}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading.users ? 'animate-spin' : ''}`} />
          {loading.users ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>View and manage all users of the Accountings ZONE platform</CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTable />
        </CardContent>
      </Card>
    </div>
  )
}