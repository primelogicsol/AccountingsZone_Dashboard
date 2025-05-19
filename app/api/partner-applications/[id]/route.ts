import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const partnerApplication = await prisma.partnerApplication.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!partnerApplication) {
      return NextResponse.json({ error: "Partner application not found" }, { status: 404 })
    }

    return NextResponse.json(partnerApplication)
  } catch (error) {
    console.error("Error fetching partner application:", error)
    return NextResponse.json({ error: "Failed to fetch partner application" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    const partnerApplication = await prisma.partnerApplication.update({
      where: {
        id: params.id,
      },
      data: {
        status: data.status,
      },
    })

    return NextResponse.json(partnerApplication)
  } catch (error) {
    console.error("Error updating partner application:", error)
    return NextResponse.json({ error: "Failed to update partner application" }, { status: 500 })
  }
}
