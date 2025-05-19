// import type React from "react"
// import "@/app/globals.css"
// import { Inter } from "next/font/google"
// import { ThemeProvider } from "@/components/theme-provider"
// import { SidebarProvider } from "@/components/ui/sidebar"
// import { AdminSidebar } from "@/components/admin-sidebar"
// import { Header } from "@/components/header"
// import { Toaster } from "@/components/ui/toaster"
// import { DataProvider } from "@/components/data-provider"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata = {
//   title: "Accountings ZONE - Admin Dashboard",
//   description: "Admin dashboard for Accountings ZONE",
//   generator: "accountingzone-dashboard.dev",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
//           <DataProvider>
//             <SidebarProvider>
//               <div className="flex min-h-screen flex-col">
//                 <Header />
//                 <div className="flex flex-1 w-full">
//                   <AdminSidebar />
//                   <main className="flex-1 overflow-y-auto w-full pt-6">
//                     <div className="w-full">{children}</div>
//                   </main>
//                 </div>
//               </div>
//             </SidebarProvider>
//             <Toaster />
//           </DataProvider>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }

import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Header } from "@/components/header"
import { Toaster } from "@/components/ui/toaster"
import { DataProvider } from "@/components/data-provider"
import AuthProvider from "@/providers/auth-provider" // Add this

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Accountings ZONE - Admin Dashboard",
  description: "Admin dashboard for Accountings ZONE",
  generator: "accountingzone-dashboard.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <DataProvider>
              <SidebarProvider>
                <div className="flex h-screen">
                  <AdminSidebar />
                  <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-4 md:p-6">
                      {children}
                    </main>
                  </div>
                </div>
              </SidebarProvider>
              <Toaster />
            </DataProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}