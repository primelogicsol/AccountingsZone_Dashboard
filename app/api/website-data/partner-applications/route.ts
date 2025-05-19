import { NextResponse } from "next/server";
import websitePrisma from "@/lib/website-prisma";
import { mapPartnerApplicationForm } from "@/lib/data-mappers";

export async function GET() {
  try {
    console.log("Fetching partner applications from website database...");
    
    // Use partnerApplicationForm - matches what we see in debug output
    const partnerApplications = await websitePrisma.partnerApplicationForm.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    
    console.log(`Found ${partnerApplications.length} partner applications`);
    
    // Map to dashboard format
    const mappedApplications = partnerApplications.map(mapPartnerApplicationForm);
    
    return NextResponse.json(mappedApplications);
  } catch (error) {
    console.error("Error fetching partner applications from website:", error);
    return NextResponse.json(
      { error: "Failed to fetch partner applications from website" },
      { status: 500 }
    );
  }
}