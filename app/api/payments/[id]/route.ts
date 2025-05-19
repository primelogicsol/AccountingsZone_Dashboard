import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const payment = await prisma.payment.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: true,
      },
    })

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 })
    }

    return NextResponse.json(payment)
  } catch (error) {
    console.error("Error fetching payment:", error)
    return NextResponse.json({ error: "Failed to fetch payment" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    const payment = await prisma.payment.update({
      where: {
        id: params.id,
      },
      data: {
        amount: data.amount,
        date: data.date ? new Date(data.date) : undefined,
        description: data.description,
        status: data.status,
        paymentMethod: data.paymentMethod,
      },
    })

    return NextResponse.json(payment)
  } catch (error) {
    console.error("Error updating payment:", error)
    return NextResponse.json({ error: "Failed to update payment" }, { status: 500 })
  }
}
