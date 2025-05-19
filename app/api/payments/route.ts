import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        user: true,
      },
      orderBy: {
        date: "desc",
      },
    })

    return NextResponse.json(payments)
  } catch (error) {
    console.error("Error fetching payments:", error)
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const payment = await prisma.payment.create({
      data: {
        userId: data.userId,
        amount: data.amount,
        date: new Date(data.date),
        description: data.description,
        status: data.status,
        paymentMethod: data.paymentMethod,
      },
    })

    return NextResponse.json(payment)
  } catch (error) {
    console.error("Error creating payment:", error)
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}
