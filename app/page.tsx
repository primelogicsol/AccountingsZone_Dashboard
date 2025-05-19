// "use client"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Overview } from "@/components/overview"
// import { RecentPartnerApplications } from "@/components/recent-partner-applications"
// import { DashboardStats } from "@/components/dashboard-stats"
// import { useStore } from "@/lib/store"
// import { RecentTaxFilings } from "@/components/recent-tax-filings"
// import { RecentClientInformation } from "@/components/recent-client-information"
// import { RevenueTrendChart } from "@/components/revenue-trend-chart"
// import { TopPayingUsers } from "@/components/top-paying-users"
// import { PaymentMethodsChart } from "@/components/payment-methods-chart"

// export default function DashboardPage() {
//   const { partnerApplications, clientInformation, taxFilings, users } = useStore()

//   // Calculate statistics
//   const pendingPartnerApplications = partnerApplications.filter((app) => app.status === "Pending").length
//   const activeClients = clientInformation.filter((client) => client.status === "Active").length
//   const completedTaxFilings = taxFilings.filter((filing) => filing.status === "Completed").length

//   return (
//     <div className="w-full max-w-full space-y-6 px-4">
//       <div className="flex flex-col gap-2">
//         <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
//         <p className="text-muted-foreground">Welcome back! Here's an overview of your accounting operations.</p>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//         <DashboardStats />
//       </div>

//       <Tabs defaultValue="overview" className="space-y-6">
//         <TabsList className="w-full sm:w-auto">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="revenue">Revenue</TabsTrigger>
//           <TabsTrigger value="recent">Recent Activity</TabsTrigger>
//           <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview" className="space-y-6">
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
//             <Card className="col-span-4">
//               <CardHeader>
//                 <CardTitle>Form Submissions</CardTitle>
//                 <CardDescription>Monthly form submissions across all forms</CardDescription>
//               </CardHeader>
//               <CardContent className="pl-2">
//                 <Overview />
//               </CardContent>
//             </Card>
//             <Card className="col-span-3">
//               <CardHeader>
//                 <CardTitle>Recent Partner Applications</CardTitle>
//                 <CardDescription>Latest partner application submissions</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <RecentPartnerApplications />
//               </CardContent>
//             </Card>
//           </div>

//           <Card>
//             <CardHeader>
//               <CardTitle>Activity Summary</CardTitle>
//               <CardDescription>Overview of system activity</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-8">
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-muted-foreground">Completed Filings</span>
//                     <span className="font-medium">{completedTaxFilings} filings</span>
//                   </div>
//                   <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
//                     <div
//                       className="h-full bg-primary"
//                       style={{ width: `${Math.min((completedTaxFilings / taxFilings.length) * 100, 100)}%` }}
//                     ></div>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-muted-foreground">Active Clients</span>
//                     <span className="font-medium">{activeClients} clients</span>
//                   </div>
//                   <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
//                     <div
//                       className="h-full bg-primary"
//                       style={{ width: `${Math.min((activeClients / clientInformation.length) * 100, 100)}%` }}
//                     ></div>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-muted-foreground">Pending Applications</span>
//                     <span className="font-medium">{pendingPartnerApplications} applications</span>
//                   </div>
//                   <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
//                     <div
//                       className="h-full bg-primary"
//                       style={{
//                         width: `${Math.min((pendingPartnerApplications / partnerApplications.length) * 100, 100)}%`,
//                       }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="revenue" className="space-y-6">
//           <RevenueTrendChart />

//           <div className="grid gap-6 md:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Top Paying Users</CardTitle>
//                 <CardDescription>Users with highest total payments</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <TopPayingUsers />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Payment Methods</CardTitle>
//                 <CardDescription>Revenue by payment method</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <PaymentMethodsChart />
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="recent" className="space-y-6">
//           <div className="grid gap-6 md:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Recent Client Information</CardTitle>
//                 <CardDescription>Latest client information submissions</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <RecentClientInformation />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Recent Tax Filings</CardTitle>
//                 <CardDescription>Latest tax filing submissions</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <RecentTaxFilings />
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>

//         <TabsContent value="metrics" className="space-y-6">
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             <Card className="card-hover-effect">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{pendingPartnerApplications}</div>
//                 <p className="text-xs text-muted-foreground">Partner applications awaiting review</p>
//                 <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
//                   <div
//                     className="h-full bg-yellow-500"
//                     style={{
//                       width: `${Math.min((pendingPartnerApplications / partnerApplications.length) * 100, 100)}%`,
//                     }}
//                   ></div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card className="card-hover-effect">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{activeClients}</div>
//                 <p className="text-xs text-muted-foreground">Clients with active status</p>
//                 <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
//                   <div
//                     className="h-full bg-green-500"
//                     style={{ width: `${Math.min((activeClients / clientInformation.length) * 100, 100)}%` }}
//                   ></div>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card className="card-hover-effect">
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Completed Tax Filings</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{completedTaxFilings}</div>
//                 <p className="text-xs text-muted-foreground">Successfully completed tax filings</p>
//                 <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
//                   <div
//                     className="h-full bg-blue-500"
//                     style={{ width: `${Math.min((completedTaxFilings / taxFilings.length) * 100, 100)}%` }}
//                   ></div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }
"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/components/overview";
import { RecentPartnerApplications } from "@/components/recent-partner-applications";
import { DashboardStats } from "@/components/dashboard-stats";
import { useStore } from "@/lib/store";
import { RecentTaxFilings } from "@/components/recent-tax-filings";
import { RecentClientInformation } from "@/components/recent-client-information";
import { RevenueTrendChart } from "@/components/revenue-trend-chart";
import { TopPayingUsers } from "@/components/top-paying-users";
import { PaymentMethodsChart } from "@/components/payment-methods-chart";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function DashboardPage() {
  const {
    partnerApplications,
    clientInformation,
    taxFilings,
    users,
    fetchPartnerApplications,
    fetchClientInformation,
    fetchTaxFilings,
    fetchUsers,
    loading,
    error,
    websiteDataError
  } = useStore();
  
  const { data: session } = useSession();
  const initialFetchRef = useRef(false);
  const hasErrors = websiteDataError || Object.values(error).some(Boolean);

  // Only set up refresh interval if no errors
  useEffect(() => {
    // Don't set up interval if there are errors
    if (hasErrors) return;
    
    // Skip on first mount (initial load handled by DataProvider)
    if (!initialFetchRef.current) {
      initialFetchRef.current = true;
      return;
    }

    const refreshAllData = async () => {
      try {
        await Promise.all([
          fetchPartnerApplications(),
          fetchClientInformation(),
          fetchTaxFilings(),
          fetchUsers(),
        ]);
      } catch (err) {
        console.error("Refresh interval error:", err);
        // Don't attempt additional fetches on error
      }
    };

    const refreshInterval = setInterval(refreshAllData, 300_000); // every 5 minutes
    return () => clearInterval(refreshInterval);
  }, [hasErrors]); // Only re-run if error state changes


  // Derive stats
  const pendingPartnerApplications = partnerApplications.filter(app => app.status === "Pending").length;
  const activeClients = clientInformation.filter(c => c.status === "Active").length;
  const completedTaxFilings = taxFilings.filter(f => f.status === "Completed").length;

  const taxFilingsTotal = Math.max(taxFilings.length, 1);
  const clientsTotal = Math.max(clientInformation.length, 1);
  const applicationsTotal = Math.max(partnerApplications.length, 1);

  const taxFilingsPercent = Math.min((completedTaxFilings / taxFilingsTotal) * 100, 100);
  const activeClientsPercent = Math.min((activeClients / clientsTotal) * 100, 100);
  const pendingAppsPercent = Math.min((pendingPartnerApplications / applicationsTotal) * 100, 100);

  const handleRefreshData = () => {
    fetchPartnerApplications();
    fetchClientInformation();
    fetchTaxFilings();
    fetchUsers();
  };

  return (
    <div className="w-full max-w-full space-y-6 px-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}! Here’s an overview of your accounting operations.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefreshData}
          disabled={
            loading.partnerApplications ||
            loading.clientInformation ||
            loading.taxFilings ||
            loading.users
          }
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${
              loading.partnerApplications ||
              loading.clientInformation ||
              loading.taxFilings ||
              loading.users
                ? "animate-spin"
                : ""
            }`}
          />
          Refresh Data
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Form Submissions</CardTitle>
                <CardDescription>Monthly form submissions across all forms</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Partner Applications</CardTitle>
                <CardDescription>Latest partner application submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentPartnerApplications />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Activity Summary</CardTitle>
              <CardDescription>Overview of system activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Completed Filings */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Completed Filings</span>
                    <span className="font-medium">
                      {completedTaxFilings} filing{completedTaxFilings !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${taxFilingsPercent}%` }} />
                  </div>
                </div>

                {/* Active Clients */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Active Clients</span>
                    <span className="font-medium">
                      {activeClients} client{activeClients !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${activeClientsPercent}%` }} />
                  </div>
                </div>

                {/* Pending Applications */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Pending Applications</span>
                    <span className="font-medium">
                      {pendingPartnerApplications} application
                      {pendingPartnerApplications !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${pendingAppsPercent}%` }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <RevenueTrendChart />
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Paying Users</CardTitle>
                <CardDescription>Users with highest total payments</CardDescription>
              </CardHeader>
              <CardContent>
                <TopPayingUsers />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Revenue by payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentMethodsChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Client Information</CardTitle>
                <CardDescription>Latest client information submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentClientInformation />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Tax Filings</CardTitle>
                <CardDescription>Latest tax filing submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentTaxFilings />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="card-hover-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingPartnerApplications}</div>
                <p className="text-xs text-muted-foreground">
                  Partner applications awaiting review
                </p>
                <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: `${pendingAppsPercent}%` }} />
                </div>
              </CardContent>
            </Card>
            <Card className="card-hover-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeClients}</div>
                <p className="text-xs text-muted-foreground">Clients with active status</p>
                <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${activeClientsPercent}%` }} />
                </div>
              </CardContent>
            </Card>
            <Card className="card-hover-effect">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Tax Filings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedTaxFilings}</div>
                <p className="text-xs text-muted-foreground">
                  Successfully completed tax filings
                </p>
                <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${taxFilingsPercent}%` }} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
