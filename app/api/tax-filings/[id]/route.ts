import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const taxFiling = await prisma.taxFiling.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!taxFiling) {
      return NextResponse.json({ error: "Tax filing not found" }, { status: 404 })
    }

    return NextResponse.json(taxFiling)
  } catch (error) {
    console.error("Error fetching tax filing:", error)
    return NextResponse.json({ error: "Failed to fetch tax filing" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    const taxFiling = await prisma.taxFiling.update({
      where: {
        id: params.id,
      },
      data: {
        status: data.status,
      },
    })

    return NextResponse.json(taxFiling)
  } catch (error) {
    console.error("Error updating tax filing:", error)
    return NextResponse.json({ error: "Failed to update tax filing" }, { status: 500 })
  }
}
