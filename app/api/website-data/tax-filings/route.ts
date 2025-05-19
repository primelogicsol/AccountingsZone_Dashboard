import { NextResponse } from "next/server";
import websitePrisma from "@/lib/website-prisma";
import { mapTaxFilingForm } from "@/lib/data-mappers";

export async function GET() {
  try {
    // Use taxFilingForm - matches what we see in debug output
    const taxFilings = await websitePrisma.taxFilingForm.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    
    const mappedFilings = taxFilings.map(mapTaxFilingForm);
    
    return NextResponse.json(mappedFilings);
  } catch (error) {
    console.error("Error fetching tax filings from website:", error);
    return NextResponse.json(
      { error: "Failed to fetch tax filings from website" },
      { status: 500 }
    );
  }
}