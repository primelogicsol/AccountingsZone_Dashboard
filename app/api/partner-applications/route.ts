import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const partnerApplications = await prisma.partnerApplication.findMany({
      orderBy: {
        submittedAt: "desc",
      },
    })

    return NextResponse.json(partnerApplications)
  } catch (error) {
    console.error("Error fetching partner applications:", error)
    return NextResponse.json({ error: "Failed to fetch partner applications" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const partnerApplication = await prisma.partnerApplication.create({
      data: {
        businessName: data.businessName,
        contactPerson: data.contactPerson,
        email: data.email,
        phone: data.phone,
        website: data.website || "",
        address: data.address,
        businessType: data.businessType,
        servicesOffered: data.servicesOffered,
        yearsInBusiness: data.yearsInBusiness,
        employeeCount: data.employeeCount,
        annualRevenue: data.annualRevenue,
        certifications: data.certifications || [],
        status: "Pending",
      },
    })

    return NextResponse.json(partnerApplication)
  } catch (error) {
    console.error("Error creating partner application:", error)
    return NextResponse.json({ error: "Failed to create partner application" }, { status: 500 })
  }
}
