// "use client"

// import { useState } from "react"
// import {
//   type ColumnDef,
//   type ColumnFiltersState,
//   type SortingState,
//   type VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table"
// import { ArrowUpDown, ChevronDown, DollarSign, Eye } from "lucide-react"
// import { useRouter } from "next/navigation"

// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { useStore, type User } from "@/lib/store"
// import { Card, CardContent } from "@/components/ui/card"

// export function UsersTable() {
//   const { users, getTotalUserPayments } = useStore()
//   const [sorting, setSorting] = useState<SortingState>([])
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
//   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
//   const [rowSelection, setRowSelection] = useState({})
//   const [selectedUser, setSelectedUser] = useState<User | null>(null)
//   const router = useRouter()

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount)
//   }

//   const columns: ColumnDef<User>[] = [
//     {
//       id: "select",
//       header: ({ table }) => (
//         <Checkbox
//           checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
//           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//           aria-label="Select all"
//         />
//       ),
//       cell: ({ row }) => (
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={(value) => row.toggleSelected(!!value)}
//           aria-label="Select row"
//         />
//       ),
//       enableSorting: false,
//       enableHiding: false,
//     },
//     {
//       accessorKey: "name",
//       header: ({ column }) => {
//         return (
//           <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
//             Name
//             <ArrowUpDown className="ml-2 h-4 w-4" />
//           </Button>
//         )
//       },
//       cell: ({ row }) => {
//         const name = row.getValue("name") as string
//         return (
//           <div className="flex items-center gap-2">
//             <Avatar className="h-8 w-8">
//               <AvatarFallback>
//                 {name
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")}
//               </AvatarFallback>
//             </Avatar>
//             <div className="font-medium">{name}</div>
//           </div>
//         )
//       },
//     },
//     {
//       accessorKey: "email",
//       header: "Email",
//       cell: ({ row }) => <div>{row.getValue("email")}</div>,
//     },
//     {
//       accessorKey: "role",
//       header: "Role",
//       cell: ({ row }) => {
//         const role = row.getValue("role") as string
//         return (
//           <Badge variant="outline" className="capitalize">
//             {role}
//           </Badge>
//         )
//       },
//     },
//     {
//       accessorKey: "status",
//       header: "Status",
//       cell: ({ row }) => {
//         const status = row.getValue("status") as string
//         return (
//           <Badge variant={status === "Active" ? "success" : status === "Inactive" ? "destructive" : "outline"}>
//             {status}
//           </Badge>
//         )
//       },
//     },
//     {
//       id: "totalPaid",
//       header: "Total Paid",
//       cell: ({ row }) => {
//         const totalPaid = getTotalUserPayments(row.original.id)
//         return (
//           <div className="flex items-center gap-1 font-medium">
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//             {formatCurrency(totalPaid)}
//           </div>
//         )
//       },
//     },
//     {
//       accessorKey: "lastLogin",
//       header: "Last Login",
//       cell: ({ row }) => {
//         const lastLogin = new Date(row.getValue("lastLogin"))
//         return (
//           <div>
//             {lastLogin.toLocaleDateString()} {lastLogin.toLocaleTimeString()}
//           </div>
//         )
//       },
//     },
//     {
//       id: "actions",
//       cell: ({ row }) => {
//         return (
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => router.push(`/users/${row.original.id}`)}
//             className="flex items-center gap-1"
//           >
//             <Eye className="h-4 w-4" />
//             <span>View Details</span>
//           </Button>
//         )
//       },
//     },
//   ]

//   const table = useReactTable({
//     data: users,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   })

//   return (
//     <div className="space-y-6">
//       <div className="w-full">
//         <div className="flex items-center py-4">
//           <Input
//             placeholder="Filter by name..."
//             value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
//             onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
//             className="max-w-sm"
//           />
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="ml-auto">
//                 Columns <ChevronDown className="ml-2 h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {table
//                 .getAllColumns()
//                 .filter((column) => column.getCanHide())
//                 .map((column) => {
//                   return (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       className="capitalize"
//                       checked={column.getIsVisible()}
//                       onCheckedChange={(value) => column.toggleVisibility(!!value)}
//                     >
//                       {column.id}
//                     </DropdownMenuCheckboxItem>
//                   )
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//         <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => {
//                     return (
//                       <TableHead key={header.id}>
//                         {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
//                       </TableHead>
//                     )
//                   })}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {table.getRowModel().rows?.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <TableRow
//                     key={row.id}
//                     data-state={row.getIsSelected() && "selected"}
//                     onClick={() => setSelectedUser(row.original)}
//                     className="cursor-pointer"
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={columns.length} className="h-24 text-center">
//                     No results.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//         <div className="flex items-center justify-end space-x-2 py-4">
//           <div className="flex-1 text-sm text-muted-foreground">
//             {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
//             selected.
//           </div>
//           <div className="space-x-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               Previous
//             </Button>
//             <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
//               Next
//             </Button>
//           </div>
//         </div>
//       </div>

//       {selectedUser && (
//         <Card>
//           <CardContent className="p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4">
//                   <Avatar className="h-16 w-16">
//                     <AvatarFallback className="text-lg">
//                       {selectedUser.name
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
//                     <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4 pt-4">
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Role</p>
//                     <p className="font-medium">{selectedUser.role}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Status</p>
//                     <Badge
//                       variant={
//                         selectedUser.status === "Active"
//                           ? "success"
//                           : selectedUser.status === "Inactive"
//                             ? "destructive"
//                             : "outline"
//                       }
//                     >
//                       {selectedUser.status}
//                     </Badge>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Last Login</p>
//                     <p>{new Date(selectedUser.lastLogin).toLocaleString()}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Total Paid</p>
//                     <p className="font-medium">{formatCurrency(getTotalUserPayments(selectedUser.id))}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <h4 className="font-medium">Recent Activity</h4>
//                 <div className="space-y-2">
//                   <div className="rounded-md bg-muted p-3">
//                     <p className="text-sm">Logged in from 192.168.1.1</p>
//                     <p className="text-xs text-muted-foreground">{new Date(selectedUser.lastLogin).toLocaleString()}</p>
//                   </div>
//                   <div className="rounded-md bg-muted p-3">
//                     <p className="text-sm">Updated profile information</p>
//                     <p className="text-xs text-muted-foreground">{new Date(Date.now() - 86400000).toLocaleString()}</p>
//                   </div>
//                   <div className="rounded-md bg-muted p-3">
//                     <p className="text-sm">Viewed client information</p>
//                     <p className="text-xs text-muted-foreground">{new Date(Date.now() - 172800000).toLocaleString()}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 flex justify-between">
//               <Button
//                 variant="secondary"
//                 onClick={() => router.push(`/users/${selectedUser.id}`)}
//                 className="flex items-center gap-1"
//               >
//                 <Eye className="h-4 w-4" />
//                 View Full Details
//               </Button>
//               <Button variant="outline" onClick={() => setSelectedUser(null)}>
//                 Close
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, DollarSign, Eye } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useStore, type User } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"

export function UsersTable() {
  const {
    users,
    getTotalUserPayments,
    fetchUsers,
    loading
  } = useStore()

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const columns: ColumnDef<User>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const name = row.getValue("name") as string
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="font-medium">{name}</div>
          </div>
        )
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string
        return (
          <Badge variant="outline" className="capitalize">
            {role}
          </Badge>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "Active" ? "success" : status === "Inactive" ? "destructive" : "outline"}>
            {status}
          </Badge>
        )
      },
    },
    {
      id: "totalPaid",
      header: "Total Paid",
      cell: ({ row }) => {
        const totalPaid = getTotalUserPayments(row.original.id)
        return (
          <div className="flex items-center gap-1 font-medium">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            {formatCurrency(totalPaid)}
          </div>
        )
      },
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }) => {
        const lastLogin = new Date(row.getValue("lastLogin"))
        return (
          <div>
            {lastLogin.toLocaleDateString()} {lastLogin.toLocaleTimeString()}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/users/${row.original.id}`)}
          className="flex items-center gap-1"
        >
          <Eye className="h-4 w-4" />
          <span>View Details</span>
        </Button>
      ),
    },
  ]

  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="space-y-6">
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <Button
            onClick={() => fetchUsers()}
            variant="outline"
            className="ml-2"
            disabled={loading.users}
          >
            {loading.users ? "Refreshing..." : "Refresh"}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {loading.users ? (
          <div className="text-center py-8">Loading users data...</div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => setSelectedUser(row.original)}
                      className="cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {selectedUser && (
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">
                      {selectedUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  </div>
                </div>
                <p>
                  <strong>Role:</strong> {selectedUser.role}
                </p>
                <p>
                  <strong>Status:</strong> {selectedUser.status}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
