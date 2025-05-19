import { NextResponse } from "next/server";
import websitePrisma from "@/lib/website-prisma";
import { mapClientInformationForm } from "@/lib/data-mappers";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log(`Fetching website client information with id: ${params.id}`);
    
    const clientInfo = await websitePrisma.clientInformationForm.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!clientInfo) {
      console.log(`Client information with id ${params.id} not found`);
      return NextResponse.json({ error: "Client information not found" }, { status: 404 });
    }

    // Map to dashboard format
    const mappedClientInfo = mapClientInformationForm(clientInfo);
    
    return NextResponse.json(mappedClientInfo);
  } catch (error) {
    console.error("Error fetching website client information:", error);
    return NextResponse.json(
      { error: "Failed to fetch website client information" }, 
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    console.log(`Updating website client information ${params.id} status to ${data.status}`);

    // Convert dashboard status format to website database format
    let statusValue = data.status;
    if (data.status === "Active") statusValue = "active";
    if (data.status === "Inactive") statusValue = "inactive";
    if (data.status === "Pending") statusValue = "pending";

    const clientInfo = await websitePrisma.clientInformationForm.update({
      where: {
        id: params.id,
      },
      data: {
        status: statusValue,
      },
    });

    // Return mapped data
    const mappedClientInfo = mapClientInformationForm(clientInfo);
    
    return NextResponse.json(mappedClientInfo);
  } catch (error) {
    console.error("Error updating website client information:", error);
    return NextResponse.json(
      { error: "Failed to update website client information" }, 
      { status: 500 }
    );
  }
}