import { NextResponse } from "next/server";
import websitePrisma from "@/lib/website-prisma";
import { mapContactMessage } from "@/lib/data-mappers";

export async function GET() {
  try {
    // Use contactMessage and consultationMessage - matches what we see in debug output
    const contactMessages = await websitePrisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const consultationMessages = await websitePrisma.consultationMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const mappedContactMessages = contactMessages.map(mapContactMessage);
    const mappedConsultationMessages = consultationMessages.map(mapContactMessage);

    const allMessages = [...mappedContactMessages, ...mappedConsultationMessages]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(allMessages);
  } catch (error) {
    console.error("Error fetching messages from website:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages from website" },
      { status: 500 }
    );
  }
}