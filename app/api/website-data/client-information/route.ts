import { NextResponse } from "next/server";
import websitePrisma from "@/lib/website-prisma";
import { mapClientInformationForm } from "@/lib/data-mappers";

export async function GET() {
  try {
    // Use clientInformationForm - matches what we see in debug output
    const clientInformation = await websitePrisma.clientInformationForm.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    
    const mappedInformation = clientInformation.map(mapClientInformationForm);
    
    return NextResponse.json(mappedInformation);
  } catch (error) {
    console.error("Error fetching client information from website:", error);
    return NextResponse.json(
      { error: "Failed to fetch client information from website" },
      { status: 500 }
    );
  }
}