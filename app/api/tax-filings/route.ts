import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const taxFilings = await prisma.taxFiling.findMany({
      orderBy: {
        submittedAt: "desc",
      },
    })

    return NextResponse.json(taxFilings)
  } catch (error) {
    console.error("Error fetching tax filings:", error)
    return NextResponse.json({ error: "Failed to fetch tax filings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const taxFiling = await prisma.taxFiling.create({
      data: {
        clientName: data.clientName,
        taxYear: data.taxYear,
        filingType: data.filingType,
        taxId: data.taxId,
        filingStatus: data.filingStatus,
        dependents: data.dependents || 0,
        income: data.income,
        deductions: data.deductions,
        credits: data.credits,
        status: "Draft",
        amount: data.amount,
        dueDate: new Date(data.dueDate),
      },
    })

    return NextResponse.json(taxFiling)
  } catch (error) {
    console.error("Error creating tax filing:", error)
    return NextResponse.json({ error: "Failed to create tax filing" }, { status: 500 })
  }
}
