// import { PrismaClient } from "@prisma/client"
// import { faker } from "@faker-js/faker"

// const prisma = new PrismaClient()

// async function main() {
//   console.log("Starting database seeding...")

//   // Clear existing data
//   await prisma.payment.deleteMany()
//   await prisma.user.deleteMany()
//   await prisma.partnerApplication.deleteMany()
//   await prisma.clientInformation.deleteMany()
//   await prisma.taxFiling.deleteMany()

//   console.log("Cleared existing data")

//   // Create users
//   const users = []
//   for (let i = 0; i < 20; i++) {
//     const user = await prisma.user.create({
//       data: {
//         name: faker.person.fullName(),
//         email: faker.internet.email().toLowerCase(),
//         role: faker.helpers.arrayElement(["Admin", "Partner", "Client", "User"]),
//         status: faker.helpers.arrayElement(["Active", "Inactive", "Pending"]),
//         lastLogin: faker.date.recent(),
//       },
//     })
//     users.push(user)
//     console.log(`Created user: ${user.name}`)
//   }

//   // Create partner applications
//   const businessTypes = [
//     "Accounting Firm",
//     "Tax Preparation Service",
//     "Bookkeeping Service",
//     "Financial Advisory",
//     "Consulting Firm",
//   ]

//   for (let i = 0; i < 15; i++) {
//     const partnerApplication = await prisma.partnerApplication.create({
//       data: {
//         businessName: faker.company.name(),
//         contactPerson: faker.person.fullName(),
//         email: faker.internet.email().toLowerCase(),
//         phone: faker.phone.number(),
//         website: faker.internet.url(),
//         address: faker.location.streetAddress(),
//         businessType: faker.helpers.arrayElement(businessTypes),
//         servicesOffered: faker.helpers.arrayElements(
//           ["Tax Preparation", "Bookkeeping", "Audit", "Advisory", "Payroll", "Consulting"],
//           faker.number.int({ min: 1, max: 4 }),
//         ),
//         yearsInBusiness: faker.helpers.arrayElement(["1-3", "3-5", "5-10", "10+"]),
//         employeeCount: faker.helpers.arrayElement(["1-5", "6-10", "11-20", "21-50", "50+"]),
//         annualRevenue: faker.helpers.arrayElement(["<$100K", "$100K-$500K", "$500K-$1M", "$1M-$5M", ">$5M"]),
//         certifications: faker.helpers.arrayElements(
//           ["CPA", "EA", "CMA", "CFP", "CGMA"],
//           faker.number.int({ min: 0, max: 3 }),
//         ),
//         status: faker.helpers.arrayElement(["Pending", "Approved", "Rejected"]),
//         submittedAt: faker.date.recent(),
//       },
//     })
//     console.log(`Created partner application: ${partnerApplication.businessName}`)
//   }

//   // Create client information
//   const industries = [
//     "Technology",
//     "Healthcare",
//     "Finance",
//     "Retail",
//     "Manufacturing",
//     "Construction",
//     "Education",
//     "Hospitality",
//   ]

//   for (let i = 0; i < 25; i++) {
//     const clientInformation = await prisma.clientInformation.create({
//       data: {
//         clientName: faker.company.name(),
//         contactPerson: faker.person.fullName(),
//         email: faker.internet.email().toLowerCase(),
//         phone: faker.phone.number(),
//         address: faker.location.streetAddress(),
//         businessType: faker.helpers.arrayElement(businessTypes),
//         taxId: faker.string.numeric(9),
//         fiscalYearEnd: faker.helpers.arrayElement(["December 31", "June 30", "September 30", "March 31"]),
//         accountingMethod: faker.helpers.arrayElement(["Cash", "Accrual", "Modified Cash", "Modified Accrual"]),
//         industry: faker.helpers.arrayElement(industries),
//         referredBy: faker.helpers.arrayElement([...users.map((u) => u.name), ""]),
//         status: faker.helpers.arrayElement(["Active", "Inactive", "Pending"]),
//         submittedAt: faker.date.recent(),
//       },
//     })
//     console.log(`Created client information: ${clientInformation.clientName}`)
//   }

//   // Create tax filings
//   const filingTypes = ["Individual", "Business", "Partnership", "Non-Profit"]
//   const filingStatuses = ["Single", "Married Filing Jointly", "Married Filing Separately", "Head of Household"]

//   for (let i = 0; i < 30; i++) {
//     const taxYear = faker.helpers.arrayElement(["2021", "2022", "2023"])
//     const dueDate = new Date(`${Number.parseInt(taxYear) + 1}-04-15`)

//     const taxFiling = await prisma.taxFiling.create({
//       data: {
//         clientName: faker.company.name(),
//         taxYear,
//         filingType: faker.helpers.arrayElement(filingTypes),
//         taxId: faker.string.numeric(9),
//         filingStatus: faker.helpers.arrayElement(filingStatuses),
//         dependents: faker.number.int({ min: 0, max: 5 }),
//         income: Number.parseFloat(faker.finance.amount(30000, 500000, 2)),
//         deductions: Number.parseFloat(faker.finance.amount(5000, 50000, 2)),
//         credits: Number.parseFloat(faker.finance.amount(0, 10000, 2)),
//         status: faker.helpers.arrayElement(["Draft", "Submitted", "Processing", "Completed", "Rejected"]),
//         amount: Number.parseFloat(faker.finance.amount(1000, 50000, 2)),
//         submittedAt: faker.date.recent(),
//         dueDate,
//       },
//     })
//     console.log(`Created tax filing: ${taxFiling.clientName} - ${taxFiling.taxYear}`)
//   }

//   // Create payments
//   const paymentMethods = ["Credit Card", "Bank Transfer", "PayPal", "Check", "Cash"]
//   const paymentDescriptions = [
//     "Monthly subscription",
//     "Annual plan",
//     "Service fee",
//     "Consultation fee",
//     "Tax preparation",
//     "Bookkeeping services",
//     "Financial planning",
//     "Audit services",
//   ]

//   for (const user of users) {
//     const paymentCount = faker.number.int({ min: 1, max: 5 })

//     for (let i = 0; i < paymentCount; i++) {
//       const payment = await prisma.payment.create({
//         data: {
//           userId: user.id,
//           amount: Number.parseFloat(faker.finance.amount(100, 5000, 2)),
//           date: faker.date.recent(),
//           description: faker.helpers.arrayElement(paymentDescriptions),
//           status: faker.helpers.arrayElement(["Completed", "Pending", "Failed"]),
//           paymentMethod: faker.helpers.arrayElement(paymentMethods),
//         },
//       })
//       console.log(`Created payment: $${payment.amount} for ${user.name}`)
//     }
//   }

//   console.log("Database seeding completed!")
// }

// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })


import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seeding...");

  // Create admin user if not exists
  const adminEmail = "admin@accountingszone.com";
  
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });
  
  if (!existingAdmin) {
    // Create admin user with hashed password
    const hashedPassword = await bcrypt.hash("Admin123!", 10);
    
    const admin = await prisma.user.create({
      data: {
        name: "Admin User",
        email: adminEmail,
        password: hashedPassword,
        role: "Admin",
        status: "Active",
        lastLogin: new Date(),
      },
    });
    
    console.log(`Created admin user: ${admin.name}`);
  } else {
    console.log("Admin user already exists");
  }


  console.log("Seeding complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });