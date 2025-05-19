import { NextResponse } from "next/server";
import websitePrisma from "@/lib/website-prisma";
import { mapTaxFilingForm } from "@/lib/data-mappers";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    // Await params if it's a Promise
    const resolvedParams = params instanceof Promise ? await params : params;
    const id = resolvedParams.id;
    
    console.log(`Fetching website tax filing with id: ${id}`);
    
    const taxFiling = await websitePrisma.taxFilingForm.findUnique({
      where: { id }
    });

    if (!taxFiling) {
      console.log(`Tax filing with id ${id} not found`);
      return NextResponse.json({ error: "Tax filing not found" }, { status: 404 });
    }

    const mappedFiling = mapTaxFilingForm(taxFiling);
    return NextResponse.json(mappedFiling);
  } catch (error) {
    console.error("Error fetching website tax filing:", error);
    return NextResponse.json(
      { error: "Failed to fetch website tax filing" }, 
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> | { id: string } }) {
  try {
    // Await params if it's a Promise
    const resolvedParams = params instanceof Promise ? await params : params;
    const id = resolvedParams.id;
    
    const data = await request.json();
    console.log(`Updating website tax filing ${id} status to ${data.status}`);

    // Convert dashboard status to website database format
    let statusValue = data.status;
    if (data.status === "Completed") statusValue = "completed";
    if (data.status === "Processing") statusValue = "processing";
    if (data.status === "Submitted") statusValue = "submitted";
    if (data.status === "Rejected") statusValue = "rejected";
    if (data.status === "Draft") statusValue = "draft";

    const taxFiling = await websitePrisma.taxFilingForm.update({
      where: { id },
      data: { status: statusValue }
    });

    const mappedFiling = mapTaxFilingForm(taxFiling);
    return NextResponse.json(mappedFiling);
  } catch (error) {
    console.error("Error updating website tax filing:", error);
    return NextResponse.json(
      { error: "Failed to update website tax filing" }, 
      { status: 500 }
    );
  }
}