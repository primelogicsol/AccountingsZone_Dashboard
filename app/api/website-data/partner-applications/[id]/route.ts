import { NextResponse } from "next/server";
import websitePrisma from "@/lib/website-prisma";
import { mapPartnerApplicationForm } from "@/lib/data-mappers";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log(`Fetching website partner application with id: ${params.id}`);
    
    const partnerApplication = await websitePrisma.partnerApplicationForm.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!partnerApplication) {
      console.log(`Partner application with id ${params.id} not found`);
      return NextResponse.json({ error: "Partner application not found" }, { status: 404 });
    }

    // Map to dashboard format for consistency
    const mappedApplication = mapPartnerApplicationForm(partnerApplication);
    
    return NextResponse.json(mappedApplication);
  } catch (error) {
    console.error("Error fetching website partner application:", error);
    return NextResponse.json(
      { error: "Failed to fetch website partner application" }, 
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    console.log(`Updating website partner application ${params.id} status to ${data.status}`);

    // Convert dashboard status format to website database format if needed
    // (e.g., "Approved" might be stored as "approved" in the website database)
    let statusValue = data.status;
    if (data.status === "Approved") statusValue = "approved";
    if (data.status === "Rejected") statusValue = "rejected";
    if (data.status === "Pending") statusValue = "pending";

    const partnerApplication = await websitePrisma.partnerApplicationForm.update({
      where: {
        id: params.id,
      },
      data: {
        status: statusValue,
      },
    });

    if (!partnerApplication) {
      console.log(`Failed to update partner application ${params.id}`);
      return NextResponse.json(
        { error: "Failed to update partner application" }, 
        { status: 500 }
      );
    }

    // Return mapped data for consistency
    const mappedApplication = mapPartnerApplicationForm(partnerApplication);
    
    return NextResponse.json(mappedApplication);
  } catch (error) {
    console.error("Error updating website partner application:", error);
    return NextResponse.json(
      { error: "Failed to update website partner application" }, 
      { status: 500 }
    );
  }
}