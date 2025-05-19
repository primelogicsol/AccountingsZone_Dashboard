// import { NextResponse } from "next/server"
// import { uploadToCloudinary } from "@/lib/cloudinary"

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData()
//     const file = formData.get("file") as File
//     const folder = (formData.get("folder") as string) || "accounting_zone"

//     if (!file) {
//       return NextResponse.json({ error: "No file provided" }, { status: 400 })
//     }

//     // Convert file to base64
//     const arrayBuffer = await file.arrayBuffer()
//     const buffer = Buffer.from(arrayBuffer)
//     const base64 = `data:${file.type};base64,${buffer.toString("base64")}`

//     // Upload to Cloudinary
//     const url = await uploadToCloudinary(base64, folder)

//     return NextResponse.json({ url })
//   } catch (error) {
//     console.error("Error uploading file:", error)
//     return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
//   }
// }


import { NextResponse } from "next/server"
import { uploadToCloudinary } from "@/lib/cloudinary"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const folder = (formData.get("folder") as string) || "accounting_zone"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Log file details for debugging
    console.log("Uploading file:", { 
      name: file.name, 
      type: file.type, 
      size: file.size 
    });

    // Explicitly check if file is a PDF (use both MIME type and extension)
    const isPdf = file.type === "application/pdf" || 
                 file.name.toLowerCase().endsWith(".pdf")
    
    console.log("File is PDF:", isPdf)

    // Convert file to base64 with proper MIME type handling
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Ensure correct MIME type, especially for PDFs
    const mimeType = isPdf ? "application/pdf" : file.type
    const base64 = `data:${mimeType};base64,${buffer.toString("base64")}`

    // Upload to Cloudinary with appropriate parameters
    const url = await uploadToCloudinary(base64, folder)
    console.log("File uploaded successfully:", url)

    return NextResponse.json({ url })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}