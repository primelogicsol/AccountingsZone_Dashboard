// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { BarChart3, Home, Settings, Users, ClipboardList, FileSpreadsheet, Receipt, LogOut, User, Globe } from "lucide-react"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
//   SidebarSeparator,
// } from "@/components/ui/sidebar"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { ModeToggle } from "@/components/mode-toggle"
// import { Button } from "@/components/ui/button"
// import { useStore } from "@/lib/store"

// export function AdminSidebar() {
//   const pathname = usePathname()
//   const { userProfile } = useStore()

//   const isActive = (path: string) => {
//     return pathname === path
//   }

//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild isActive={isActive("/")}>
//                   <Link href="/">
//                     <Home />
//                     <span>Overview</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild isActive={isActive("/analytics")}>
//                   <Link href="/analytics">
//                     <BarChart3 />
//                     <span>Analytics</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild isActive={isActive("/reports")}>
//                   <Link href="/reports">
//                     <FileSpreadsheet />
//                     <span>Reports</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//         <SidebarSeparator />
//         <SidebarGroup>
//           <SidebarGroupLabel>Management</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild isActive={isActive("/users")}>
//                   <Link href="/users">
//                     <Users />
//                     <span>Users</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//         <SidebarSeparator />
//         <SidebarGroup>
//           <SidebarGroupLabel>Forms</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild isActive={isActive("/forms/partner-applications")}>
//                   <Link href="/forms/partner-applications">
//                     <ClipboardList />
//                     <span>Partner Applications</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild isActive={isActive("/forms/client-information")}>
//                   <Link href="/forms/client-information">
//                     <FileSpreadsheet />
//                     <span>Client Information</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild isActive={isActive("/forms/tax-filing")}>
//                   <Link href="/forms/tax-filing">
//                     <Receipt />
//                     <span>Tax Filing</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//         <SidebarSeparator />
//         <SidebarGroup>
//           <SidebarGroupLabel>Website Data</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild isActive={isActive("/website-data")}>
//                   <Link href="/website-data">
//                     <Globe />
//                     <span>Website Data</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//         <SidebarSeparator />
//         <SidebarGroup>
//           <SidebarGroupLabel>System</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               <SidebarMenuItem>
//                 <SidebarMenuButton asChild isActive={isActive("/settings")}>
//                   <Link href="/settings">
//                     <Settings />
//                     <span>Settings</span>
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter>
//         <div className="px-3 py-4 border-t">
//           <div className="flex flex-col space-y-4">
//             <div className="flex items-center space-x-3">
//               <Avatar className="h-10 w-10">
//                 <AvatarImage src="/placeholder.svg" alt={userProfile.name} />
//                 <AvatarFallback>
//                   {userProfile.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium leading-none">{userProfile.name}</p>
//                 <p className="text-xs text-muted-foreground truncate">{userProfile.email}</p>
//               </div>
//             </div>
//             <div className="flex items-center justify-between">
//               <ModeToggle />
//               <div className="flex space-x-1">
//                 <Button variant="ghost" size="icon" asChild className="h-8 w-8">
//                   <Link href="/settings">
//                     <User className="h-4 w-4" />
//                     <span className="sr-only">Profile</span>
//                   </Link>
//                 </Button>
//                 <Button variant="ghost" size="icon" className="h-8 w-8">
//                   <LogOut className="h-4 w-4" />
//                   <span className="sr-only">Log out</span>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </SidebarFooter>
//     </Sidebar>
//   )
// }


"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { BarChart3, Settings, Users, ClipboardList, FileSpreadsheet, Receipt, LogOut, User, Globe } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"

export function AdminSidebar() {
  const pathname = usePathname()
  const { userProfile } = useStore()
  const { data: session } = useSession()
  const router = useRouter()

  // Use session data if available
  const userName = session?.user?.name || userProfile.name
  const userEmail = session?.user?.email || userProfile.email
  const userRole = session?.user?.role || userProfile.role

  const isActive = (path: string) => {
    return pathname === path
  }

  // Handle logout
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/auth/login');
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Overview button removed */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/analytics")}>
                  <Link href="/analytics">
                    <BarChart3 />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/reports")}>
                  <Link href="/reports">
                    <FileSpreadsheet />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/users")}>
                  <Link href="/users">
                    <Users />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Forms</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/forms/partner-applications")}>
                  <Link href="/forms/partner-applications">
                    <ClipboardList />
                    <span>Partner Applications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/forms/client-information")}>
                  <Link href="/forms/client-information">
                    <FileSpreadsheet />
                    <span>Client Information</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/forms/tax-filing")}>
                  <Link href="/forms/tax-filing">
                    <Receipt />
                    <span>Tax Filing</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Website Data</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/website-data")}>
                  <Link href="/website-data">
                    <Globe />
                    <span>Website Data</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")}>
                  <Link href="/settings">
                    <Settings />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-3 py-4 border-t">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg" alt={userName} />
                <AvatarFallback>
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <ModeToggle />
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                  <Link href="/settings">
                    <User className="h-4 w-4" />
                    <span className="sr-only">Profile</span>
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span className="sr-only">Log out</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}