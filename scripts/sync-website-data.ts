import { PrismaClient as DashboardPrisma } from "@prisma/client";
import { PrismaClient as WebsitePrisma } from "@prisma/website-client"; // UPDATED - use website client
import { 
  mapPartnerApplicationForm, 
  mapClientInformationForm, 
  mapTaxFilingForm 
} from "../lib/data-mappers";

// Initialize Prisma clients
const dashboardPrisma = new DashboardPrisma({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const websitePrisma = new WebsitePrisma({
  datasources: {
    db: {
      url: process.env.WEBSITE_DATABASE_URL,
    },
  },
});

async function syncPartnerApplications() {
  console.log("Syncing partner applications...");
  
  try {
    // Get all partner applications from the website
    const websitePartnerApplications = await websitePrisma.partnerApplicationForm.findMany();
    
    // Map to dashboard format
    const mappedApplications = websitePartnerApplications.map(mapPartnerApplicationForm);
    
    // For each mapped application
    for (const application of mappedApplications) {
      // Check if it already exists in the dashboard database
      const existingApplication = await dashboardPrisma.partnerApplication.findFirst({
        where: {
          businessName: application.businessName,
          email: application.email,
        },
      });
      
      if (existingApplication) {
        // Update existing application
        await dashboardPrisma.partnerApplication.update({
          where: { id: existingApplication.id },
          data: application,
        });
        console.log(`Updated partner application: ${application.businessName}`);
      } else {
        // Create new application
        await dashboardPrisma.partnerApplication.create({
          data: application,
        });
        console.log(`Created partner application: ${application.businessName}`);
      }
    }
    
    console.log(`Synced ${mappedApplications.length} partner applications`);
  } catch (error) {
    console.error("Error syncing partner applications:", error);
  }
}


async function syncClientInformation() {
  console.log("Syncing client information...");
  
  try {
    // Get all client information from the website
    const websiteClientInformation = await websitePrisma.clientInformationForm.findMany();
    
    // Map to dashboard format
    const mappedClients = websiteClientInformation.map(mapClientInformationForm);
    
    // For each mapped client
    for (const client of mappedClients) {
      // Check if it already exists in the dashboard database
      const existingClient = await dashboardPrisma.clientInformation.findFirst({
        where: {
          email: client.email,
        },
      });
      
      if (existingClient) {
        // Update existing client
        await dashboardPrisma.clientInformation.update({
          where: { id: existingClient.id },
          data: client,
        });
        console.log(`Updated client information: ${client.clientName}`);
      } else {
        // Create new client
        await dashboardPrisma.clientInformation.create({
          data: client,
        });
        console.log(`Created client information: ${client.clientName}`);
      }
    }
    
    console.log(`Synced ${mappedClients.length} client information records`);
  } catch (error) {
    console.error("Error syncing client information:", error);
  }
}

async function syncTaxFilings() {
  console.log("Syncing tax filings...");
  
  try {
    // Get all tax filings from the website
    const websiteTaxFilings = await websitePrisma.taxFilingForm.findMany();
    
    // Map to dashboard format
    const mappedFilings = websiteTaxFilings.map(mapTaxFilingForm);
    
    // For each mapped filing
    for (const filing of mappedFilings) {
      // Check if it already exists in the dashboard database
      const existingFiling = await dashboardPrisma.taxFiling.findFirst({
        where: {
          clientName: filing.clientName,
          taxYear: filing.taxYear,
          taxId: filing.taxId,
        },
      });
      
      if (existingFiling) {
        // Update existing filing
        await dashboardPrisma.taxFiling.update({
          where: { id: existingFiling.id },
          data: filing,
        });
        console.log(`Updated tax filing: ${filing.clientName} - ${filing.taxYear}`);
      } else {
        // Create new filing
        await dashboardPrisma.taxFiling.create({
          data: filing,
        });
        console.log(`Created tax filing: ${filing.clientName} - ${filing.taxYear}`);
      }
    }
    
    console.log(`Synced ${mappedFilings.length} tax filings`);
  } catch (error) {
    console.error("Error syncing tax filings:", error);
  }
}

async function main() {
  try {
    console.log("Starting data sync...");
    
    // Sync all data types
    await syncPartnerApplications();
    await syncClientInformation();
    await syncTaxFilings();
    
    console.log("Data sync completed successfully");
  } catch (error) {
    console.error("Error during data sync:", error);
  } finally {
    // Disconnect Prisma clients
    await dashboardPrisma.$disconnect();
    await websitePrisma.$disconnect();
  }
}

// Run the sync
main();