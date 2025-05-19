import websitePrisma from "../lib/website-prisma"

async function testConnection() {
  try {
    console.log("Testing website database connection...")
    
    // Use the correct model name
    const count = await websitePrisma.partnerApplicationForm.count()
    
    console.log(`Connection successful! Found ${count} partner applications.`)
  } catch (error) {
    console.error("Error connecting to website database:", error)
    console.error("Details:", error instanceof Error ? error.message : String(error))
  } finally {
    await websitePrisma.$disconnect()
  }
}

testConnection()