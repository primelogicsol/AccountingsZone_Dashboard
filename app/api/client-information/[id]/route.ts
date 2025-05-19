import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const clientInformation = await prisma.clientInformation.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!clientInformation) {
      return NextResponse.json({ error: "Client information not found" }, { status: 404 })
    }

    return NextResponse.json(clientInformation)
  } catch (error) {
    console.error("Error fetching client information:", error)
    return NextResponse.json({ error: "Failed to fetch client information" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    const clientInformation = await prisma.clientInformation.update({
      where: {
        id: params.id,
      },
      data: {
        status: data.status,
      },
    })

    return NextResponse.json(clientInformation)
  } catch (error) {
    console.error("Error updating client information:", error)
    return NextResponse.json({ error: "Failed to update client information" }, { status: 500 })
  }
}
