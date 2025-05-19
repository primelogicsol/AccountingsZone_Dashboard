// "use client";

// import { useEffect, useRef } from "react";
// import { useStore } from "@/lib/store";
// import { useToast } from "@/components/ui/use-toast";

// export function DataProvider({ children }: { children: React.ReactNode }) {
//   const {
//     // Keep dashboard data loading functions available but don't call them by default
//     fetchPartnerApplications,
//     fetchClientInformation,
//     fetchTaxFilings,
//     fetchUsers,
//     fetchPayments,
//     // We'll only load website data by default
//     fetchAllWebsiteData,
//     isLoadingWebsiteData,
//     websiteDataError,
//   } = useStore();

//   const { toast } = useToast();
//   const dataFetched = useRef(false);

//   useEffect(() => {
//     // Only fetch data once on initial mount
//     if (!dataFetched.current) {
//       dataFetched.current = true;
      
//       // Only fetch website data by default
//       fetchAllWebsiteData().catch((error) => {
//         console.error("Failed to load website data:", error);
//         toast({
//           title: "Data Loading Error",
//           description: "Failed to load website data. Please try refreshing the page.",
//           variant: "destructive",
//         });
//       });
//     }
//   }, [fetchAllWebsiteData, toast]);

//   // Show loading state only for website data
//   if (isLoadingWebsiteData) {
//     return (
//       <div className="flex h-screen w-full items-center justify-center">
//         <div className="flex flex-col items-center gap-2">
//           <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
//           <p className="text-sm text-muted-foreground">Loading website data...</p>
//         </div>
//       </div>
//     );
//   }

//   // Show error state
//   if (websiteDataError) {
//     return (
//       <div className="flex h-screen w-full items-center justify-center">
//         <div className="flex flex-col items-center gap-2 max-w-md text-center">
//           <p className="text-lg font-semibold text-destructive">Data Loading Error</p>
//           <p className="text-sm text-muted-foreground">{websiteDataError}</p>
//           <button
//             className="mt-4 rounded bg-primary px-4 py-2 text-primary-foreground"
//             onClick={() => window.location.reload()}
//           >
//             Refresh Page
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }
"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";

export function DataProvider({ children }: { children: React.ReactNode }) {
  const {
    fetchPartnerApplications,
    fetchClientInformation,
    fetchTaxFilings,
    fetchUsers,
    fetchPayments,
    fetchAllWebsiteData,
    isLoadingWebsiteData,
    websiteDataError,
  } = useStore();
  
  const { toast } = useToast();
  const dataFetched = useRef(false);
  const [fallbackMode, setFallbackMode] = useState(false);
  
  useEffect(() => {
    const loadData = async () => {
      if (dataFetched.current) return;
      dataFetched.current = true;
      
      try {
        // First try website data which is less critical
        await fetchAllWebsiteData();
        
        // Then load primary data with small delays to avoid overwhelming the API
        await fetchUsers();
        // Small delay between requests to avoid rate limiting
        setTimeout(async () => {
          try {
            await fetchPartnerApplications();
          } catch (e) {
            console.warn("Failed to load partner applications:", e);
          }
          
          setTimeout(async () => {
            try {
              await fetchClientInformation();
            } catch (e) {
              console.warn("Failed to load client information:", e);
            }
            
            setTimeout(async () => {
              try {
                await fetchTaxFilings();
              } catch (e) {
                console.warn("Failed to load tax filings:", e);
              }
              
              setTimeout(async () => {
                try {
                  await fetchPayments();
                } catch (e) {
                  console.warn("Failed to load payments:", e);
                }
              }, 300);
            }, 300);
          }, 300);
        }, 300);
        
      } catch (error) {
        console.error("Initial data loading failed:", error);
        setFallbackMode(true);
        
        toast({
          title: "Some data couldn't be loaded",
          description: "We're showing what we have. Try refreshing in a moment.",
          variant: "default",
        });
      }
    };
    
    loadData();
  }, []);
  
  return <>{children}</>;
}