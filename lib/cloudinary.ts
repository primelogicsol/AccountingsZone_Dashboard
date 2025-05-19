
// import { v2 as cloudinary } from "cloudinary";
// import { getCloudinaryPublicId } from "./data-mappers";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function uploadToCloudinary(file: string, folder = "accounting_zone") {
//   try {
//     const result = await cloudinary.uploader.upload(file, {
//       folder,
//     });
//     return result.secure_url;
//   } catch (error) {
//     console.error("Error uploading to Cloudinary:", error);
//     throw new Error("Failed to upload file to Cloudinary");
//   }
// }

// export async function deleteFromCloudinary(publicId: string) {
//   try {
//     await cloudinary.uploader.destroy(publicId);
//   } catch (error) {
//     console.error("Error deleting from Cloudinary:", error);
//     throw new Error("Failed to delete file from Cloudinary");
//   }
// }

// export async function getCloudinaryFileInfo(url: string) {
//   try {
//     const publicId = getCloudinaryPublicId(url);
//     if (!publicId) return null;
    
//     // Determine if this is a PDF document or image
//     const isPdf = url.toLowerCase().endsWith('.pdf');
    
//     // Specify the correct resource type - "image" works for PDFs too in Cloudinary
//     const result = await cloudinary.api.resource(publicId, {
//       resource_type: isPdf ? "raw" : "image",
//       type: "upload"
//     });
    
//     // Log success to help with debugging
//     console.log("Successfully retrieved file info:", publicId);
    
//     return result;
//   } catch (error) {
//     console.error("Error getting Cloudinary file info:", error);
//     return null;
//   }
// }

// export async function generateCloudinaryDownloadUrl(url: string) {
//   try {
//     const publicId = getCloudinaryPublicId(url);
//     if (!publicId) return url;
    
//     const isPdf = url.toLowerCase().endsWith('.pdf');
    
//     // Use appropriate resource type for the URL
//     return cloudinary.url(publicId, {
//       resource_type: isPdf ? "raw" : "image",
//       flags: "attachment",
//       sign_url: true,
//       secure: true,
//     });
//   } catch (error) {
//     console.error("Error generating Cloudinary download URL:", error);
//     return url;
//   }
// }

// // Add this function for document type detection
// export function getFileTypeInfo(url: string) {
//   if (!url) return { type: 'unknown', icon: 'file', label: 'Unknown' };
  
//   const extension = url.split('.').pop()?.toLowerCase();
  
//   switch (extension) {
//     case 'pdf':
//       return { type: 'pdf', icon: 'file-text', label: 'PDF Document' };
//     case 'jpg':
//     case 'jpeg':
//     case 'png':
//     case 'gif':
//     case 'webp':
//       return { type: 'image', icon: 'image', label: 'Image' };
//     case 'doc':
//     case 'docx':
//       return { type: 'word', icon: 'file-text', label: 'Word Document' };
//     case 'xls':
//     case 'xlsx':
//       return { type: 'excel', icon: 'table', label: 'Excel Spreadsheet' };
//     case 'ppt':
//     case 'pptx':
//       return { type: 'powerpoint', icon: 'layout', label: 'PowerPoint' };
//     default:
//       return { type: 'other', icon: 'file', label: 'Document' };
//   }
// }

// // Add this function to transform standard Cloudinary URLs if needed
// export function enhanceCloudinaryUrl(url: string, options: any = {}) {
//   // If URL doesn't contain cloudinary, return as is
//   if (!url.includes('cloudinary.com') || !url.includes('/upload/')) {
//     return url;
//   }
  
//   try {
//     // Split URL at upload part
//     const parts = url.split('/upload/');
    
//     if (parts.length !== 2) return url;
    
//     // Build transformation string
//     let transformations = '';
//     if (options.download) {
//       transformations += 'fl_attachment/';
//     }
    
//     // Apply any other transformations here
//     if (options.format) {
//       transformations += `f_${options.format}/`;
//     }
    
//     // Reconstruct URL with transformations
//     return `${parts[0]}/upload/${transformations}${parts[1]}`;
//   } catch (error) {
//     console.error("Error enhancing Cloudinary URL:", error);
//     return url;
//   }
// }

// export default cloudinary;

import { v2 as cloudinary } from "cloudinary";
import { getCloudinaryPublicId } from "./data-mappers";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// export async function uploadToCloudinary(file: string, folder = "accounting_zone") {
//   try {
//     const result = await cloudinary.uploader.upload(file, {
//       folder,
//     });
//     return result.secure_url;
//   } catch (error) {
//     console.error("Error uploading to Cloudinary:", error);
//     throw new Error("Failed to upload file to Cloudinary");
//   }
// }

export async function uploadToCloudinary(file: string, folder = "accounting_zone") {
  try {
    // Detect if file is a PDF
    const isPdf = 
      file.includes('data:application/pdf') || 
      file.toLowerCase().includes('.pdf;base64') ||
      file.toLowerCase().includes('pdf');
    
    console.log(`Uploading file. PDF detected: ${isPdf ? 'Yes' : 'No'}`);
    
    // Use the raw_format preset for PDFs and raw files
    const result = await cloudinary.uploader.upload(file, {
      folder,
      // Use your custom preset for PDFs/raw files
      upload_preset: isPdf ? "raw_format" : undefined,
      // Still specify resource_type as a fallback
      resource_type: isPdf ? "raw" : "auto",
    });
    
    console.log(`File uploaded as: ${result.resource_type}, format: ${result.format || 'raw'}`);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload file to Cloudinary");
  }
}


export async function deleteFromCloudinary(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw new Error("Failed to delete file from Cloudinary");
  }
}

export async function getCloudinaryFileInfo(url: string) {
  try {
    const publicId = getCloudinaryPublicId(url);
    if (!publicId) return null;
    
    // Determine if this is a PDF document or image
    const isPdf = url.toLowerCase().endsWith('.pdf');
    
    // First, try with the expected resource type
    const resourceType = isPdf ? "raw" : "image";
    try {
      const result = await cloudinary.api.resource(publicId, {
        resource_type: resourceType,
        type: "upload"
      });
      
      console.log("Successfully retrieved file info:", publicId);
      return result;
    } catch (error) {
      // If the first attempt fails and it's a PDF, try the alternative type
      if (isPdf) {
        console.log("Failed to get PDF as 'raw', trying as 'image'");
        try {
          const result = await cloudinary.api.resource(publicId, {
            resource_type: "image",
            type: "upload"
          });
          
          console.log("Successfully retrieved PDF file info as image:", publicId);
          return result;
        } catch (secondError) {
          console.log("Failed to get PDF as 'image' too, trying as 'pdf'");
          try {
            const result = await cloudinary.api.resource(publicId, {
              resource_type: "pdf",
              type: "upload"
            });
            return result;
          } catch (thirdError) {
            console.error("All attempts failed", thirdError);
            return null;
          }
        }
      }
      console.error("Error fetching resource:", error);
      return null;
    }
  } catch (error) {
    console.error("Error getting Cloudinary file info:", error);
    return null;
  }
}

export async function generateCloudinaryDownloadUrl(url: string) {
  try {
    const publicId = getCloudinaryPublicId(url);
    if (!publicId) return url;
    
    const isPdf = url.toLowerCase().endsWith('.pdf');
    
    // Use appropriate resource type for the URL
    return cloudinary.url(publicId, {
      resource_type: isPdf ? "raw" : "image",
      flags: "attachment",
      sign_url: true,
      secure: true,
    });
  } catch (error) {
    console.error("Error generating Cloudinary download URL:", error);
    return url;
  }
}

// Add this function for document type detection
export function getFileTypeInfo(url: string) {
  if (!url) return { type: 'unknown', icon: 'file', label: 'Unknown' };
  
  const extension = url.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return { type: 'pdf', icon: 'file-text', label: 'PDF Document' };
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
      return { type: 'image', icon: 'image', label: 'Image' };
    case 'doc':
    case 'docx':
      return { type: 'word', icon: 'file-text', label: 'Word Document' };
    case 'xls':
    case 'xlsx':
      return { type: 'excel', icon: 'table', label: 'Excel Spreadsheet' };
    case 'ppt':
    case 'pptx':
      return { type: 'powerpoint', icon: 'layout', label: 'PowerPoint' };
    default:
      return { type: 'other', icon: 'file', label: 'Document' };
  }
}

// Add this function to transform standard Cloudinary URLs if needed
export function enhanceCloudinaryUrl(url: string, options: any = {}) {
  // If URL doesn't contain cloudinary, return as is
  if (!url.includes('cloudinary.com') || !url.includes('/upload/')) {
    return url;
  }
  
  try {
    // Split URL at upload part
    const parts = url.split('/upload/');
    
    if (parts.length !== 2) return url;
    
    // Build transformation string
    let transformations = '';
    if (options.download) {
      transformations += 'fl_attachment/';
    }
    
    // Apply any other transformations here
    if (options.format) {
      transformations += `f_${options.format}/`;
    }
    
    // Reconstruct URL with transformations
    return `${parts[0]}/upload/${transformations}${parts[1]}`;
  } catch (error) {
    console.error("Error enhancing Cloudinary URL:", error);
    return url;
  }
}

export default cloudinary;
