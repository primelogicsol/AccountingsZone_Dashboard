// import { PrismaClient } from "@prisma/client";

// // Define a global variable to store the website Prisma client
// const globalForWebsitePrisma = global as unknown as { websitePrisma: PrismaClient };

// // Create a new Prisma client instance for the website database
// export const websitePrisma = globalForWebsitePrisma.websitePrisma || 
//   new PrismaClient({
//     datasources: {
//       db: {
//         url: process.env.WEBSITE_DATABASE_URL,
//       },
//     },
//   });

// // In development, prevent multiple instances of Prisma Client
// if (process.env.NODE_ENV !== "production") globalForWebsitePrisma.websitePrisma = websitePrisma;

// export default websitePrisma;

import { PrismaClient } from '@prisma/website-client'

const globalForWebsitePrisma = global as unknown as {
  websitePrisma: PrismaClient | undefined
}

// Add debugging to see what models are available
console.log("Available website models:", 
  Object.keys(PrismaClient.prototype).filter(key => !key.startsWith('_')))

const websitePrisma = globalForWebsitePrisma.websitePrisma || 
  new PrismaClient({
    log: ['query', 'error', 'info', 'warn'], // More detailed logging
    datasources: {
      db: {
        url: process.env.WEBSITE_DATABASE_URL,
      },
    },
  })

if (process.env.NODE_ENV !== "production") globalForWebsitePrisma.websitePrisma = websitePrisma

export default websitePrisma