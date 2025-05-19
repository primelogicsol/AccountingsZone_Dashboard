import { NextResponse } from "next/server";
import { getCloudinaryFileInfo, generateCloudinaryDownloadUrl } from "@/lib/cloudinary";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
    }

    console.log("Requesting file info for:", url);
    
    // Get file info from Cloudinary
    const fileInfo = await getCloudinaryFileInfo(url);
    
    if (!fileInfo) {
      console.log("File info not found, using fallback");
      // Return basic info even if Cloudinary metadata isn't available
      const format = url.split('.').pop()?.toLowerCase() || 'unknown';
      
      return NextResponse.json({
        url: url,
        fileInfo: {
          format,
          bytes: 0,
          resource_type: format === 'pdf' ? 'pdf' : 'image',
          type: 'upload'
        },
        fallback: true
      });
    }

    // Generate a download URL
    const downloadUrl = await generateCloudinaryDownloadUrl(url);
    console.log("Generated download URL:", downloadUrl);

    return NextResponse.json({
      url: downloadUrl || url,
      fileInfo: fileInfo
    });
  } catch (error) {
    console.error("Error retrieving Cloudinary file:", error);
    return NextResponse.json({ 
      error: "Failed to retrieve file",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
