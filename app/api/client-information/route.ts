import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const clientInformation = await prisma.clientInformation.findMany({
      orderBy: {
        submittedAt: "desc",
      },
    })

    return NextResponse.json(clientInformation)
  } catch (error) {
    console.error("Error fetching client information:", error)
    return NextResponse.json({ error: "Failed to fetch client information" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const clientInformation = await prisma.clientInformation.create({
      data: {
        clientName: data.clientName,
        contactPerson: data.contactPerson,
        email: data.email,
        phone: data.phone,
        address: data.address,
        businessType: data.businessType,
        taxId: data.taxId,
        fiscalYearEnd: data.fiscalYearEnd,
        accountingMethod: data.accountingMethod,
        industry: data.industry,
        referredBy: data.referredBy || "",
        status: "Pending",
      },
    })

    return NextResponse.json(clientInformation)
  } catch (error) {
    console.error("Error creating client information:", error)
    return NextResponse.json({ error: "Failed to create client information" }, { status: 500 })
  }
}
