
// "use client";

// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// // Partner Application Form Types
// export type PartnerApplication = {
//   id: string;
//   businessName: string;
//   contactPerson: string;
//   email: string;
//   phone: string;
//   website: string;
//   address: string;
//   businessType: string;
//   servicesOffered: string[];
//   yearsInBusiness: string;
//   employeeCount: string;
//   annualRevenue: string;
//   certifications: string[];
//   status: "Pending" | "Approved" | "Rejected";
//   submittedAt: string;
// };

// // Client Information Form Types
// export type ClientInformation = {
//   id: string;
//   clientName: string;
//   contactPerson: string;
//   email: string;
//   phone: string;
//   address: string;
//   businessType: string;
//   taxId: string;
//   fiscalYearEnd: string;
//   accountingMethod: string;
//   industry: string;
//   referredBy: string;
//   status: "Active" | "Inactive" | "Pending";
//   submittedAt: string;
//   documents?: string[];
// };

// // Tax Filing Form Types
// export type TaxFiling = {
//   id: string;
//   clientName: string;
//   taxYear: string;
//   filingType: "Individual" | "Business" | "Partnership" | "Non-Profit";
//   taxId: string;
//   filingStatus: string;
//   dependents: number;
//   income: number;
//   deductions: number;
//   credits: number;
//   status: "Draft" | "Submitted" | "Processing" | "Completed" | "Rejected";
//   amount: number;
//   submittedAt: string;
//   dueDate: string;
// };

// // User Types
// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   role: "Admin" | "Partner" | "Client" | "User";
//   status: "Active" | "Inactive" | "Pending";
//   lastLogin: string;
//   createdAt: string;
// };

// // User Profile Type
// export type UserProfile = {
//   name: string;
//   email: string;
//   role: "Admin" | "Partner" | "Client" | "User";
//   avatar?: string;
// };

// // Payment Record Type
// export type PaymentRecord = {
//   id: string;
//   userId: string;
//   amount: number;
//   date: string;
//   description: string;
//   status: "Completed" | "Pending" | "Failed";
//   paymentMethod: string;
// };

// // Website Message Type
// export type WebsiteMessage = {
//   id: string;
//   name: string;
//   email: string;
//   message: string;
//   submittedAt: string;
//   status: "Unread" | "Read" | "Replied";
// };

// // Store State Type
// type StoreState = {
//   partnerApplications: PartnerApplication[];
//   clientInformation: ClientInformation[];
//   taxFilings: TaxFiling[];
//   users: User[];
//   userProfile: UserProfile;
//   payments: PaymentRecord[];
//   websitePartnerApplications: PartnerApplication[];
//   websiteClientInformation: ClientInformation[];
//   websiteTaxFilings: TaxFiling[];
//   websiteMessages: WebsiteMessage[];
//   isLoadingWebsiteData: boolean;
//   websiteDataError: string | null;
//   loading: {
//     partnerApplications: boolean;
//     clientInformation: boolean;
//     taxFilings: boolean;
//     users: boolean;
//     payments: boolean;
//   };
//   error: {
//     partnerApplications: string | null;
//     clientInformation: string | null;
//     taxFilings: string | null;
//     users: string | null;
//     payments: string | null;
//   };
//   fetchPartnerApplications: () => Promise<void>;
//   fetchClientInformation: () => Promise<void>;
//   fetchTaxFilings: () => Promise<void>;
//   fetchUsers: () => Promise<void>;
//   fetchPayments: () => Promise<void>;
//   addPartnerApplication: (application: Omit<PartnerApplication, "id" | "submittedAt" | "status">) => Promise<void>;
//   addClientInformation: (client: Omit<ClientInformation, "id" | "submittedAt" | "status">) => Promise<void>;
//   addTaxFiling: (filing: Omit<TaxFiling, "id" | "submittedAt" | "status">) => Promise<void>;
//   updatePartnerApplicationStatus: (id: string, status: PartnerApplication["status"]) => Promise<void>;
//   updateClientInformationStatus: (id: string, status: ClientInformation["status"]) => Promise<void>;
//   updateTaxFilingStatus: (id: string, status: TaxFiling["status"]) => Promise<void>;
//   getPartnerApplicationById: (id: string) => PartnerApplication | undefined;
//   getClientInformationById: (id: string) => ClientInformation | undefined;
//   getTaxFilingById: (id: string) => TaxFiling | undefined;
//   updateUserProfile: (profile: Partial<UserProfile>) => void;
//   addPayment: (payment: Omit<PaymentRecord, "id">) => Promise<void>;
//   getUserPayments: (userId: string) => PaymentRecord[];
//   getTotalUserPayments: (userId: string) => number;
//   fetchWebsitePartnerApplications: () => Promise<PartnerApplication[]>;
//   fetchWebsiteClientInformation: () => Promise<ClientInformation[]>;
//   fetchWebsiteTaxFilings: () => Promise<TaxFiling[]>;
//   fetchWebsiteMessages: () => Promise<WebsiteMessage[]>;
//   fetchAllWebsiteData: () => Promise<void>;
//   getCloudinaryFileUrl: (url: string) => Promise<any>;
// };

// export const useStore = create<StoreState>()(
//   persist(
//     (set, get) => ({
//       // Initial empty state
//       partnerApplications: [],
//       clientInformation: [],
//       taxFilings: [],
//       users: [],
//       userProfile: {
//         name: "Admin User",
//         email: "admin@accountingszone.com",
//         role: "Admin",
//       },
//       payments: [],
//       websitePartnerApplications: [],
//       websiteClientInformation: [],
//       websiteTaxFilings: [],
//       websiteMessages: [],
//       isLoadingWebsiteData: false,
//       websiteDataError: null,
//       // Loading states
//       loading: {
//         partnerApplications: false,
//         clientInformation: false,
//         taxFilings: false,
//         users: false,
//         payments: false,
//       },
//       // Error states
//       error: {
//         partnerApplications: null,
//         clientInformation: null,
//         taxFilings: null,
//         users: null,
//         payments: null,
//       },
//       // Fetch functions for primary data
//       fetchPartnerApplications: async () => {
//         set((state) => ({
//           loading: { ...state.loading, partnerApplications: true },
//           error: { ...state.error, partnerApplications: null },
//         }));
//         try {
//           console.log("Fetching primary partner applications...");
//           const response = await fetch("/api/partner-applications");
//           if (!response.ok) throw new Error(`Failed to fetch partner applications: ${response.statusText}`);
//           const data = await response.json();
//           set((state) => ({
//             partnerApplications: data,
//             loading: { ...state.loading, partnerApplications: false },
//           }));
//           console.log("Fetched primary partner applications:", data.length);
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error fetching primary partner applications:", errorMessage);
//           set((state) => ({
//             loading: { ...state.loading, partnerApplications: false },
//             error: { ...state.error, partnerApplications: errorMessage },
//           }));
//         }
//       },
//       fetchClientInformation: async () => {
//         set((state) => ({
//           loading: { ...state.loading, clientInformation: true },
//           error: { ...state.error, clientInformation: null },
//         }));
//         try {
//           console.log("Fetching primary client information...");
//           const response = await fetch("/api/client-information");
//           if (!response.ok) throw new Error(`Failed to fetch client information: ${response.statusText}`);
//           const data = await response.json();
//           set((state) => ({
//             clientInformation: data,
//             loading: { ...state.loading, clientInformation: false },
//           }));
//           console.log("Fetched primary client information:", data.length);
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error fetching primary client information:", errorMessage);
//           set((state) => ({
//             loading: { ...state.loading, clientInformation: false },
//             error: { ...state.error, clientInformation: errorMessage },
//           }));
//         }
//       },
//       fetchTaxFilings: async () => {
//         set((state) => ({
//           loading: { ...state.loading, taxFilings: true },
//           error: { ...state.error, taxFilings: null },
//         }));
//         try {
//           console.log("Fetching primary tax filings...");
//           const response = await fetch("/api/tax-filings");
//           if (!response.ok) throw new Error(`Failed to fetch tax filings: ${response.statusText}`);
//           const data = await response.json();
//           set((state) => ({
//             taxFilings: data,
//             loading: { ...state.loading, taxFilings: false },
//           }));
//           console.log("Fetched primary tax filings:", data.length);
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error fetching primary tax filings:", errorMessage);
//           set((state) => ({
//             loading: { ...state.loading, taxFilings: false },
//             error: { ...state.error, taxFilings: errorMessage },
//           }));
//         }
//       },
//       fetchUsers: async () => {
//         set((state) => ({
//           loading: { ...state.loading, users: true },
//           error: { ...state.error, users: null },
//         }));
//         try {
//           console.log("Fetching primary users...");
//           const response = await fetch("/api/users");
//           if (!response.ok) throw new Error(`Failed to fetch users: ${response.statusText}`);
//           const data = await response.json();
//           set((state) => ({
//             users: data,
//             loading: { ...state.loading, users: false },
//           }));
//           console.log("Fetched primary users:", data.length);
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error fetching primary users:", errorMessage);
//           set((state) => ({
//             loading: { ...state.loading, users: false },
//             error: { ...state.error, users: errorMessage },
//           }));
//         }
//       },
//       fetchPayments: async () => {
//         set((state) => ({
//           loading: { ...state.loading, payments: true },
//           error: { ...state.error, payments: null },
//         }));
//         try {
//           console.log("Fetching primary payments...");
//           const response = await fetch("/api/payments");
//           if (!response.ok) throw new Error(`Failed to fetch payments: ${response.statusText}`);
//           const data = await response.json();
//           set((state) => ({
//             payments: data,
//             loading: { ...state.loading, payments: false },
//           }));
//           console.log("Fetched primary payments:", data.length);
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error fetching primary payments:", errorMessage);
//           set((state) => ({
//             loading: { ...state.loading, payments: false },
//             error: { ...state.error, payments: errorMessage },
//           }));
//         }
//       },
//       // Add functions for website data
//       addPartnerApplication: async (application) => {
//         try {
//           console.log("Adding website partner application...");
//           const response = await fetch("/api/website-data/partner-applications", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(application),
//           });
//           if (!response.ok) throw new Error(`Failed to add partner application: ${response.statusText}`);
//           const newApplication = await response.json();
//           set((state) => ({
//             websitePartnerApplications: [...state.websitePartnerApplications, newApplication],
//           }));
//           console.log("Added website partner application:", newApplication.id);
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error adding website partner application:", errorMessage);
//           throw error;
//         }
//       },
//       addClientInformation: async (client) => {
//         try {
//           console.log("Adding website client information...");
//           const response = await fetch("/api/website-data/client-information", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(client),
//           });
//           if (!response.ok) throw new Error(`Failed to add client information: ${response.statusText}`);
//           const newClient = await response.json();
//           set((state) => ({
//             websiteClientInformation: [...state.websiteClientInformation, newClient],
//           }));
//           console.log("Added website client information:", newClient.id);
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error adding website client information:", errorMessage);
//           throw error;
//         }
//       },
//       addTaxFiling: async (filing) => {
//         try {
//           console.log("Adding website tax filing...");
//           const response = await fetch("/api/website-data/tax-filings", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(filing),
//           });
//           if (!response.ok) throw new Error(`Failed to add tax filing: ${response.statusText}`);
//           const newFiling = await response.json();
//           set((state) => ({
//             websiteTaxFilings: [...state.websiteTaxFilings, newFiling],
//           }));
//           console.log("Added website tax filing:", newFiling.id);
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error adding website tax filing:", errorMessage);
//           throw error;
//         }
//       },
//       updatePartnerApplicationStatus: async (id, status) => {
//         try {
//           console.log(`Updating website partner application status: id=${id}, status=${status}`);
//           const response = await fetch(`/api/website-data/partner-applications/${id}`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ status }),
//           });
//           if (!response.ok) throw new Error(`Failed to update partner application status: ${response.statusText}`);
//           set((state) => ({
//             websitePartnerApplications: state.websitePartnerApplications.map((app) =>
//               app.id === id ? { ...app, status } : app
//             ),
//           }));
//           console.log("Updated website partner application status");
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error updating website partner application status:", errorMessage);
//           throw error;
//         }
//       },
//       updateClientInformationStatus: async (id, status) => {
//         try {
//           console.log(`Updating website client information status: id=${id}, status=${status}`);
//           const response = await fetch(`/api/website-data/client-information/${id}`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ status }),
//           });
//           if (!response.ok) throw new Error(`Failed to update client information status: ${response.statusText}`);
//           set((state) => ({
//             websiteClientInformation: state.websiteClientInformation.map((client) =>
//               client.id === id ? { ...client, status } : client
//             ),
//           }));
//           console.log("Updated website client information status");
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error updating website client information status:", errorMessage);
//           throw error;
//         }
//       },
//       updateTaxFilingStatus: async (id, status) => {
//         try {
//           console.log(`Updating website tax filing status: id=${id}, status=${status}`);
//           const response = await fetch(`/api/website-data/tax-filings/${id}`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ status }),
//           });
//           if (!response.ok) throw new Error(`Failed to update tax filing status: ${response.statusText}`);
//           set((state) => ({
//             websiteTaxFilings: state.websiteTaxFilings.map((filing) =>
//               filing.id === id ? { ...filing, status } : filing
//             ),
//           }));
//           console.log("Updated website tax filing status");
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error updating website tax filing status:", errorMessage);
//           throw error;
//         }
//       },
//       getPartnerApplicationById: (id) => {
//         return get().websitePartnerApplications.find((app) => app.id === id);
//       },
//       getClientInformationById: (id) => {
//         return get().websiteClientInformation.find((client) => client.id === id);
//       },
//       getTaxFilingById: (id) => {
//         return get().websiteTaxFilings.find((filing) => filing.id === id);
//       },
//       updateUserProfile: (profile) => {
//         set((state) => ({
//           userProfile: { ...state.userProfile, ...profile },
//         }));
//       },
//       addPayment: async (payment) => {
//         try {
//           console.log("Adding payment...");
//           const response = await fetch("/api/payments", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(payment),
//           });
//           if (!response.ok) throw new Error(`Failed to add payment: ${response.statusText}`);
//           const newPayment = await response.json();
//           set((state) => ({
//             payments: [...state.payments, newPayment],
//           }));
//           console.log("Added payment:", newPayment.id);
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error adding payment:", errorMessage);
//           throw error;
//         }
//       },
//       getUserPayments: (userId) => {
//         return get().payments.filter((payment) => payment.userId === userId);
//       },
//       getTotalUserPayments: (userId) => {
//         const userPayments = get().payments.filter(
//           (payment) => payment.userId === userId && payment.status === "Completed"
//         );
//         return userPayments.reduce((total, payment) => total + payment.amount, 0);
//       },
//       fetchWebsitePartnerApplications: async () => {
//         try {
//           console.log("Fetching website partner applications...");
//           const response = await fetch("/api/website-data/partner-applications");
//           if (!response.ok) throw new Error(`Failed to fetch website partner applications: ${response.statusText}`);
//           const data = await response.json();
//           set({ websitePartnerApplications: data });
//           console.log("Fetched website partner applications:", data.length);
//           return data;
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error fetching website partner applications:", errorMessage);
//           throw error;
//         }
//       },
//       fetchWebsiteClientInformation: async () => {
//         try {
//           console.log("Fetching website client information...");
//           const response = await fetch("/api/website-data/client-information");
//           if (!response.ok) throw new Error(`Failed to fetch website client information: ${response.statusText}`);
//           const data = await response.json();
//           set({ websiteClientInformation: data });
//           console.log("Fetched website client information:", data.length);
//           return data;
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error fetching website client information:", errorMessage);
//           throw error;
//         }
//       },
//       fetchWebsiteTaxFilings: async () => {
//         try {
//           console.log("Fetching website tax filings...");
//           const response = await fetch("/api/website-data/tax-filings");
//           if (!response.ok) throw new Error(`Failed to fetch website tax filings: ${response.statusText}`);
//           const data = await response.json();
//           set({ websiteTaxFilings: data });
//           console.log("Fetched website tax filings:", data.length);
//           return data;
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error fetching website tax filings:", errorMessage);
//           throw error;
//         }
//       },
//       fetchWebsiteMessages: async () => {
//         try {
//           console.log("Fetching website messages...");
//           const response = await fetch("/api/website-data/contact-messages");
//           if (!response.ok) throw new Error(`Failed to fetch website messages: ${response.statusText}`);
//           const data = await response.json();
//           set({ websiteMessages: data });
//           console.log("Fetched website messages:", data.length);
//           return data;
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error fetching website messages:", errorMessage);
//           throw error;
//         }
//       },
//       fetchAllWebsiteData: async () => {
//         if (get().isLoadingWebsiteData) {
//           console.log("Skipping fetchAllWebsiteData: already in progress");
//           return;
//         }
//         set({ isLoadingWebsiteData: true, websiteDataError: null });
//         console.log("Fetching all website data...");
//         try {
//           const [partnerApplications, clientInformation, taxFilings, messages] = await Promise.all([
//             fetch("/api/website-data/partner-applications").then((res) => {
//               if (!res.ok) throw new Error(`Failed to fetch partner applications: ${res.statusText}`);
//               return res.json();
//             }),
//             fetch("/api/website-data/client-information").then((res) => {
//               if (!res.ok) throw new Error(`Failed to fetch client information: ${res.statusText}`);
//               return res.json();
//             }),
//             fetch("/api/website-data/tax-filings").then((res) => {
//               if (!res.ok) throw new Error(`Failed to fetch tax filings: ${res.statusText}`);
//               return res.json();
//             }),
//             fetch("/api/website-data/contact-messages").then((res) => {
//               if (!res.ok) throw new Error(`Failed to fetch messages: ${res.statusText}`);
//               return res.json();
//             }),
//           ]);
//           set({
//             websitePartnerApplications: partnerApplications,
//             websiteClientInformation: clientInformation,
//             websiteTaxFilings: taxFilings,
//             websiteMessages: messages,
//             isLoadingWebsiteData: false,
//             websiteDataError: null,
//           });
//           console.log("All website data fetched successfully");
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error fetching website data";
//           console.error("Error fetching all website data:", errorMessage);
//           set({
//             isLoadingWebsiteData: false,
//             websiteDataError: errorMessage,
//           });
//         }
//       },
//       getCloudinaryFileUrl: async (url: string) => {
//         if (!url) return null;
//         try {
//           console.log("Fetching Cloudinary file URL:", url);
//           const response = await fetch(`/api/cloudinary/file?url=${encodeURIComponent(url)}`);
//           if (!response.ok) throw new Error(`Failed to get Cloudinary file: ${response.statusText}`);
//           const data = await response.json();
//           console.log("Fetched Cloudinary file data");
//           return data;
//         } catch (error) {
//           const errorMessage = error instanceof Error ? error.message : "Unknown error";
//           console.error("Error getting Cloudinary file:", errorMessage);
//           return null;
//         }
//       },
//     }),
//     { name: "accountings-zone-storage" }
//   )
// );

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Partner Application Form Types
export type PartnerApplication = {
  id: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  businessType: string;
  servicesOffered: string[];
  yearsInBusiness: string;
  employeeCount: string;
  annualRevenue: string;
  certifications: string[];
  status: "Pending" | "Approved" | "Rejected";
  submittedAt: string;
};

// Client Information Form Types
export type ClientInformation = {
  id: string;
  clientName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  businessType: string;
  taxId: string;
  fiscalYearEnd: string;
  accountingMethod: string;
  industry: string;
  referredBy: string;
  status: "Active" | "Inactive" | "Pending";
  submittedAt: string;
  documents?: string[];
};

// Tax Filing Form Types
export type TaxFiling = {
  id: string;
  clientName: string;
  taxYear: string;
  filingType: "Individual" | "Business" | "Partnership" | "Non-Profit";
  taxId: string;
  filingStatus: string;
  dependents: number;
  income: number;
  deductions: number;
  credits: number;
  status: "Draft" | "Submitted" | "Processing" | "Completed" | "Rejected";
  amount: number;
  submittedAt: string;
  dueDate: string;
};

// User Types
export type User = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Partner" | "Client" | "User";
  status: "Active" | "Inactive" | "Pending";
  lastLogin: string;
  createdAt: string;
};

// User Profile Type
export type UserProfile = {
  name: string;
  email: string;
  role: "Admin" | "Partner" | "Client" | "User";
  avatar?: string;
};

// Payment Record Type
export type PaymentRecord = {
  id: string;
  userId: string;
  amount: number;
  date: string;
  description: string;
  status: "Completed" | "Pending" | "Failed";
  paymentMethod: string;
};

// Website Message Type
export type WebsiteMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  status: "Unread" | "Read" | "Replied";
};

// Store State Type
type StoreState = {
  // Primary data arrays
  partnerApplications: PartnerApplication[];
  clientInformation: ClientInformation[];
  taxFilings: TaxFiling[];
  users: User[];
  payments: PaymentRecord[];
  
  // Website data arrays
  websitePartnerApplications: PartnerApplication[];
  websiteClientInformation: ClientInformation[];
  websiteTaxFilings: TaxFiling[];
  websiteMessages: WebsiteMessage[];
  
  // Combined data getters
  getAllPartnerApplications: () => PartnerApplication[];
  getAllClientInformation: () => ClientInformation[];
  getAllTaxFilings: () => TaxFiling[];
  
  userProfile: UserProfile;
  isLoadingWebsiteData: boolean;
  websiteDataError: string | null;
  
  loading: {
    partnerApplications: boolean;
    clientInformation: boolean;
    taxFilings: boolean;
    users: boolean;
    payments: boolean;
    websitePartnerApplications: boolean;
    websiteClientInformation: boolean;
    websiteTaxFilings: boolean;
    websiteMessages: boolean;
  };
  
  error: {
    partnerApplications: string | null;
    clientInformation: string | null;
    taxFilings: string | null;
    users: string | null;
    payments: string | null;
    websitePartnerApplications: string | null;
    websiteClientInformation: string | null;
    websiteTaxFilings: string | null;
    websiteMessages: string | null;
  };
  
  // Fetch functions for primary data
  fetchPartnerApplications: () => Promise<void>;
  fetchClientInformation: () => Promise<void>;
  fetchTaxFilings: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  fetchPayments: () => Promise<void>;
  
  // Fetch functions for website data
  fetchWebsitePartnerApplications: () => Promise<void>;
  fetchWebsiteClientInformation: () => Promise<void>;
  fetchWebsiteTaxFilings: () => Promise<void>;
  fetchWebsiteMessages: () => Promise<void>;
  fetchAllWebsiteData: () => Promise<void>;
  
  // Add functions
  addPartnerApplication: (application: Omit<PartnerApplication, "id" | "submittedAt" | "status">) => Promise<void>;
  addClientInformation: (client: Omit<ClientInformation, "id" | "submittedAt" | "status">) => Promise<void>;
  addTaxFiling: (filing: Omit<TaxFiling, "id" | "submittedAt" | "status">) => Promise<void>;
  
  // Update functions
  updatePartnerApplicationStatus: (id: string, status: PartnerApplication["status"]) => Promise<void>;
  updateClientInformationStatus: (id: string, status: ClientInformation["status"]) => Promise<void>;
  updateTaxFilingStatus: (id: string, status: TaxFiling["status"]) => Promise<void>;
  
  // Getter functions
  getPartnerApplicationById: (id: string) => PartnerApplication | undefined;
  getClientInformationById: (id: string) => ClientInformation | undefined;
  getTaxFilingById: (id: string) => TaxFiling | undefined;
  
  // User and payment functions
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  addPayment: (payment: Omit<PaymentRecord, "id">) => Promise<void>;
  getUserPayments: (userId: string) => PaymentRecord[];
  getTotalUserPayments: (userId: string) => number;
  
  // Utils
  getCloudinaryFileUrl: (url: string) => Promise<any>;
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial empty state
      partnerApplications: [],
      clientInformation: [],
      taxFilings: [],
      users: [],
      userProfile: {
        name: "Admin User",
        email: "admin@accountingszone.com",
        role: "Admin",
      },
      payments: [],
      websitePartnerApplications: [],
      websiteClientInformation: [],
      websiteTaxFilings: [],
      websiteMessages: [],
      isLoadingWebsiteData: false,
      websiteDataError: null,
      
      // Loading states
      loading: {
        partnerApplications: false,
        clientInformation: false,
        taxFilings: false,
        users: false,
        payments: false,
        websitePartnerApplications: false,
        websiteClientInformation: false,
        websiteTaxFilings: false,
        websiteMessages: false,
      },
      
      // Error states
      error: {
        partnerApplications: null,
        clientInformation: null,
        taxFilings: null,
        users: null,
        payments: null,
        websitePartnerApplications: null,
        websiteClientInformation: null,
        websiteTaxFilings: null,
        websiteMessages: null,
      },
      
      // Combined data getters
      getAllPartnerApplications: () => {
        return [...get().partnerApplications, ...get().websitePartnerApplications];
      },
      
      getAllClientInformation: () => {
        return [...get().clientInformation, ...get().websiteClientInformation];
      },
      
      getAllTaxFilings: () => {
        return [...get().taxFilings, ...get().websiteTaxFilings];
      },
      
      // Fetch functions for primary data
      fetchPartnerApplications: async () => {
        set((state) => ({
          loading: { ...state.loading, partnerApplications: true },
          error: { ...state.error, partnerApplications: null },
        }));
        try {
          console.log("Fetching primary partner applications...");
          const response = await fetch("/api/partner-applications");
          if (!response.ok) throw new Error(`Failed to fetch partner applications: ${response.statusText}`);
          const data = await response.json();
          set((state) => ({
            partnerApplications: data,
            loading: { ...state.loading, partnerApplications: false },
          }));
          console.log("Fetched primary partner applications:", data.length);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error fetching primary partner applications:", errorMessage);
          set((state) => ({
            loading: { ...state.loading, partnerApplications: false },
            error: { ...state.error, partnerApplications: errorMessage },
          }));
        }
      },
      
      fetchClientInformation: async () => {
        set((state) => ({
          loading: { ...state.loading, clientInformation: true },
          error: { ...state.error, clientInformation: null },
        }));
        try {
          console.log("Fetching primary client information...");
          const response = await fetch("/api/client-information");
          if (!response.ok) throw new Error(`Failed to fetch client information: ${response.statusText}`);
          const data = await response.json();
          set((state) => ({
            clientInformation: data,
            loading: { ...state.loading, clientInformation: false },
          }));
          console.log("Fetched primary client information:", data.length);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error fetching primary client information:", errorMessage);
          set((state) => ({
            loading: { ...state.loading, clientInformation: false },
            error: { ...state.error, clientInformation: errorMessage },
          }));
        }
      },
      
      fetchTaxFilings: async () => {
        set((state) => ({
          loading: { ...state.loading, taxFilings: true },
          error: { ...state.error, taxFilings: null },
        }));
        try {
          console.log("Fetching primary tax filings...");
          const response = await fetch("/api/tax-filings");
          if (!response.ok) throw new Error(`Failed to fetch tax filings: ${response.statusText}`);
          const data = await response.json();
          set((state) => ({
            taxFilings: data,
            loading: { ...state.loading, taxFilings: false },
          }));
          console.log("Fetched primary tax filings:", data.length);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error fetching primary tax filings:", errorMessage);
          set((state) => ({
            loading: { ...state.loading, taxFilings: false },
            error: { ...state.error, taxFilings: errorMessage },
          }));
        }
      },
      
      fetchUsers: async () => {
        set((state) => ({
          loading: { ...state.loading, users: true },
          error: { ...state.error, users: null },
        }));
        try {
          console.log("Fetching primary users...");
          const response = await fetch("/api/users");
          if (!response.ok) throw new Error(`Failed to fetch users: ${response.statusText}`);
          const data = await response.json();
          set((state) => ({
            users: data,
            loading: { ...state.loading, users: false },
          }));
          console.log("Fetched primary users:", data.length);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error fetching primary users:", errorMessage);
          set((state) => ({
            loading: { ...state.loading, users: false },
            error: { ...state.error, users: errorMessage },
          }));
        }
      },
      
      fetchPayments: async () => {
        set((state) => ({
          loading: { ...state.loading, payments: true },
          error: { ...state.error, payments: null },
        }));
        try {
          console.log("Fetching primary payments...");
          const response = await fetch("/api/payments");
          if (!response.ok) throw new Error(`Failed to fetch payments: ${response.statusText}`);
          const data = await response.json();
          set((state) => ({
            payments: data,
            loading: { ...state.loading, payments: false },
          }));
          console.log("Fetched primary payments:", data.length);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error fetching primary payments:", errorMessage);
          set((state) => ({
            loading: { ...state.loading, payments: false },
            error: { ...state.error, payments: errorMessage },
          }));
        }
      },
      
      // Fetch functions for website data
      fetchWebsitePartnerApplications: async () => {
        set((state) => ({
          loading: { ...state.loading, websitePartnerApplications: true },
          error: { ...state.error, websitePartnerApplications: null },
        }));
        try {
          console.log("Fetching website partner applications...");
          const response = await fetch("/api/website-data/partner-applications");
          if (!response.ok) throw new Error(`Failed to fetch website partner applications: ${response.statusText}`);
          const data = await response.json();
          set((state) => ({
            websitePartnerApplications: data,
            loading: { ...state.loading, websitePartnerApplications: false },
          }));
          console.log("Fetched website partner applications:", data.length);
          return data;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error fetching website partner applications:", errorMessage);
          set((state) => ({
            loading: { ...state.loading, websitePartnerApplications: false },
            error: { ...state.error, websitePartnerApplications: errorMessage },
          }));
          throw error;
        }
      },
      
      fetchWebsiteClientInformation: async () => {
        set((state) => ({
          loading: { ...state.loading, websiteClientInformation: true },
          error: { ...state.error, websiteClientInformation: null },
        }));
        try {
          console.log("Fetching website client information...");
          const response = await fetch("/api/website-data/client-information");
          if (!response.ok) throw new Error(`Failed to fetch website client information: ${response.statusText}`);
          const data = await response.json();
          set((state) => ({
            websiteClientInformation: data,
            loading: { ...state.loading, websiteClientInformation: false },
          }));
          console.log("Fetched website client information:", data.length);
          return data;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error fetching website client information:", errorMessage);
          set((state) => ({
            loading: { ...state.loading, websiteClientInformation: false },
            error: { ...state.error, websiteClientInformation: errorMessage },
          }));
          throw error;
        }
      },
      
      fetchWebsiteTaxFilings: async () => {
        set((state) => ({
          loading: { ...state.loading, websiteTaxFilings: true },
          error: { ...state.error, websiteTaxFilings: null },
        }));
        try {
          console.log("Fetching website tax filings...");
          const response = await fetch("/api/website-data/tax-filings");
          if (!response.ok) throw new Error(`Failed to fetch website tax filings: ${response.statusText}`);
          const data = await response.json();
          set((state) => ({
            websiteTaxFilings: data,
            loading: { ...state.loading, websiteTaxFilings: false },
          }));
          console.log("Fetched website tax filings:", data.length);
          return data;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error fetching website tax filings:", errorMessage);
          set((state) => ({
            loading: { ...state.loading, websiteTaxFilings: false },
            error: { ...state.error, websiteTaxFilings: errorMessage },
          }));
          throw error;
        }
      },
      
      fetchWebsiteMessages: async () => {
        set((state) => ({
          loading: { ...state.loading, websiteMessages: true },
          error: { ...state.error, websiteMessages: null },
        }));
        try {
          console.log("Fetching website messages...");
          const response = await fetch("/api/website-data/contact-messages");
          if (!response.ok) throw new Error(`Failed to fetch website messages: ${response.statusText}`);
          const data = await response.json();
          set((state) => ({
            websiteMessages: data,
            loading: { ...state.loading, websiteMessages: false },
          }));
          console.log("Fetched website messages:", data.length);
          return data;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error fetching website messages:", errorMessage);
          set((state) => ({
            loading: { ...state.loading, websiteMessages: false },
            error: { ...state.error, websiteMessages: errorMessage },
          }));
          throw error;
        }
      },
      
      // Add functions
      addPartnerApplication: async (application) => {
        try {
          console.log("Adding website partner application...");
          const response = await fetch("/api/website-data/partner-applications", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(application),
          });
          if (!response.ok) throw new Error(`Failed to add partner application: ${response.statusText}`);
          const newApplication = await response.json();
          set((state) => ({
            websitePartnerApplications: [...state.websitePartnerApplications, newApplication],
          }));
          console.log("Added website partner application:", newApplication.id);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error adding website partner application:", errorMessage);
          throw error;
        }
      },
      
      addClientInformation: async (client) => {
        try {
          console.log("Adding website client information...");
          const response = await fetch("/api/website-data/client-information", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(client),
          });
          if (!response.ok) throw new Error(`Failed to add client information: ${response.statusText}`);
          const newClient = await response.json();
          set((state) => ({
            websiteClientInformation: [...state.websiteClientInformation, newClient],
          }));
          console.log("Added website client information:", newClient.id);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error adding website client information:", errorMessage);
          throw error;
        }
      },
      
      addTaxFiling: async (filing) => {
        try {
          console.log("Adding website tax filing...");
          const response = await fetch("/api/website-data/tax-filings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filing),
          });
          if (!response.ok) throw new Error(`Failed to add tax filing: ${response.statusText}`);
          const newFiling = await response.json();
          set((state) => ({
            websiteTaxFilings: [...state.websiteTaxFilings, newFiling],
          }));
          console.log("Added website tax filing:", newFiling.id);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error adding website tax filing:", errorMessage);
          throw error;
        }
      },
      
      // Update functions
      updatePartnerApplicationStatus: async (id, status) => {
        try {
          console.log(`Updating website partner application status: id=${id}, status=${status}`);
          const response = await fetch(`/api/website-data/partner-applications/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          });
          if (!response.ok) throw new Error(`Failed to update partner application status: ${response.statusText}`);
          set((state) => ({
            websitePartnerApplications: state.websitePartnerApplications.map((app) =>
              app.id === id ? { ...app, status } : app
            ),
          }));
          console.log("Updated website partner application status");
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error updating website partner application status:", errorMessage);
          throw error;
        }
      },
      
      updateClientInformationStatus: async (id, status) => {
        try {
          console.log(`Updating website client information status: id=${id}, status=${status}`);
          const response = await fetch(`/api/website-data/client-information/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          });
          if (!response.ok) throw new Error(`Failed to update client information status: ${response.statusText}`);
          set((state) => ({
            websiteClientInformation: state.websiteClientInformation.map((client) =>
              client.id === id ? { ...client, status } : client
            ),
          }));
          console.log("Updated website client information status");
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error updating website client information status:", errorMessage);
          throw error;
        }
      },
      
      updateTaxFilingStatus: async (id, status) => {
        try {
          console.log(`Updating website tax filing status: id=${id}, status=${status}`);
          const response = await fetch(`/api/website-data/tax-filings/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          });
          if (!response.ok) throw new Error(`Failed to update tax filing status: ${response.statusText}`);
          set((state) => ({
            websiteTaxFilings: state.websiteTaxFilings.map((filing) =>
              filing.id === id ? { ...filing, status } : filing
            ),
          }));
          console.log("Updated website tax filing status");
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error updating website tax filing status:", errorMessage);
          throw error;
        }
      },
      
      // Getter functions
      getPartnerApplicationById: (id) => {
        // Check both sources of partner applications
        const fromWebsite = get().websitePartnerApplications.find((app) => app.id === id);
        if (fromWebsite) return fromWebsite;
        
        const fromPrimary = get().partnerApplications.find((app) => app.id === id);
        return fromPrimary;
      },
      
      getClientInformationById: (id) => {
        // Check both sources of client information
        const fromWebsite = get().websiteClientInformation.find((client) => client.id === id);
        if (fromWebsite) return fromWebsite;
        
        const fromPrimary = get().clientInformation.find((client) => client.id === id);
        return fromPrimary;
      },
      
      getTaxFilingById: (id) => {
        // Check both sources of tax filings
        const fromWebsite = get().websiteTaxFilings.find((filing) => filing.id === id);
        if (fromWebsite) return fromWebsite;
        
        const fromPrimary = get().taxFilings.find((filing) => filing.id === id);
        return fromPrimary;
      },
      
      // User and payment functions
      updateUserProfile: (profile) => {
        set((state) => ({
          userProfile: { ...state.userProfile, ...profile },
        }));
      },
      
      addPayment: async (payment) => {
        try {
          console.log("Adding payment...");
          const response = await fetch("/api/payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payment),
          });
          if (!response.ok) throw new Error(`Failed to add payment: ${response.statusText}`);
          const newPayment = await response.json();
          set((state) => ({
            payments: [...state.payments, newPayment],
          }));
          console.log("Added payment:", newPayment.id);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error adding payment:", errorMessage);
          throw error;
        }
      },
      
      getUserPayments: (userId) => {
        return get().payments.filter((payment) => payment.userId === userId);
      },
      
      getTotalUserPayments: (userId) => {
        const userPayments = get().payments.filter(
          (payment) => payment.userId === userId && payment.status === "Completed"
        );
        return userPayments.reduce((total, payment) => total + payment.amount, 0);
      },
      
      // Fetch all website data
            fetchAllWebsiteData: async () => {
        if (get().isLoadingWebsiteData) {
          return; // Prevent concurrent fetches
        }
        
        set({ isLoadingWebsiteData: true, websiteDataError: null });
        
        try {
          // Use a more resilient fetching approach with custom error handling
          const fetchWithTimeout = async (url, timeout = 8000) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            
            try {
              const response = await fetch(url, { 
                signal: controller.signal,
                credentials: 'include', // Include auth credentials
                headers: { 'Content-Type': 'application/json' }
              });
              
              clearTimeout(timeoutId);
              
              // Check if we got HTML instead of JSON (error page)
              const contentType = response.headers.get('content-type');
              if (contentType && contentType.includes('text/html')) {
                console.warn(`Warning: ${url} returned HTML instead of JSON`);
                return []; // Return empty array instead of failing
              }
              
              if (!response.ok) {
                console.warn(`API Error (${response.status}): ${url}`);
                return []; // Return empty array for non-200 responses
              }
              
              return await response.json();
            } catch (error) {
              clearTimeout(timeoutId);
              console.error(`Fetch error for ${url}:`, error);
              return []; // Return empty array on any error
            }
          };
          
          // Fetch all data in parallel
          const [
            partnerApplications,
            clientInformation, 
            taxFilings,
            messages
          ] = await Promise.all([
            fetchWithTimeout("/api/website-data/partner-applications"),
            fetchWithTimeout("/api/website-data/client-information"),
            fetchWithTimeout("/api/website-data/tax-filings"),
            fetchWithTimeout("/api/website-data/contact-messages")
          ]);
          
          // Update state with any successfully fetched data
          set(state => ({
            // Only update if we got actual data
            websitePartnerApplications: Array.isArray(partnerApplications) ? partnerApplications : state.websitePartnerApplications,
            websiteClientInformation: Array.isArray(clientInformation) ? clientInformation : state.websiteClientInformation,
            websiteTaxFilings: Array.isArray(taxFilings) ? taxFilings : state.websiteTaxFilings,
            websiteMessages: Array.isArray(messages) ? messages : state.websiteMessages,
            isLoadingWebsiteData: false
          }));
          
          console.log("Website data fetch completed");
          
        } catch (error) {
          console.error("Error in fetchAllWebsiteData:", error);
          set({ 
            isLoadingWebsiteData: false,
            websiteDataError: error instanceof Error ? error.message : "Unknown error fetching website data"
          });
        }
      },
      
      // Utils
      getCloudinaryFileUrl: async (url: string) => {
        if (!url) return null;
        try {
          console.log("Fetching Cloudinary file URL:", url);
          const response = await fetch(`/api/cloudinary/file?url=${encodeURIComponent(url)}`);
          if (!response.ok) throw new Error(`Failed to get Cloudinary file: ${response.statusText}`);
          const data = await response.json();
          console.log("Fetched Cloudinary file data");
          return data;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          console.error("Error getting Cloudinary file:", errorMessage);
          return null;
        }
      },
    }),
    { name: "accountings-zone-storage" }
  )
);