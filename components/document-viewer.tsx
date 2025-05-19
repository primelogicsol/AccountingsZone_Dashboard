// // "use client";

// // import { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Loader2, Eye, Download, ExternalLink, FileText } from "lucide-react";

// // interface DocumentViewerProps {
// //   url: string;
// //   filename?: string;
// // }

// // export default function DocumentViewer({ url, filename = "Document" }: DocumentViewerProps) {
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [fileData, setFileData] = useState<any>(null);
// //   const [error, setError] = useState<string | null>(null);
  
// //   const fetchDocumentData = async () => {
// //     if (!url) return;
    
// //     setIsLoading(true);
// //     setError(null);
    
// //     try {
// //       console.log("Fetching document data for:", url);
// //       const response = await fetch(`/api/cloudinary/file?url=${encodeURIComponent(url)}`);
      
// //       if (!response.ok) {
// //         throw new Error(`Error ${response.status}: ${await response.text()}`);
// //       }
      
// //       const data = await response.json();
// //       console.log("Received document data:", data);
// //       setFileData(data);
// //     } catch (err) {
// //       setError(err instanceof Error ? err.message : "Failed to load document");
// //       console.error("Error loading document:", err);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };
  
// //   const getFileExtension = (url: string) => {
// //     return url.split('.').pop()?.toLowerCase() || 'unknown';
// //   };
  
// //   const openDirectlyInNewTab = (fileUrl: string) => {
// //     window.open(fileUrl, '_blank');
// //   };
  
// //   const renderViewer = () => {
// //     if (!fileData) return null;
    
// //     // Use the URL directly from the response, or fall back to the original URL
// //     const fileUrl = fileData.url || url;
// //     const extension = getFileExtension(url);
    
// //     console.log("Rendering document with URL:", fileUrl);
// //     console.log("File extension:", extension);
    
// //     if (extension === 'pdf') {
// //       return (
// //         <div className="border rounded-md overflow-hidden">
// //           <div className="bg-muted p-2 flex justify-end">
// //             <Button 
// //               variant="outline" 
// //               size="sm"
// //               onClick={() => openDirectlyInNewTab(fileUrl)}
// //             >
// //               <ExternalLink className="h-4 w-4 mr-2" /> Open in new tab
// //             </Button>
// //           </div>
// //           <iframe 
// //             src={fileUrl}
// //             className="w-full h-[600px]"
// //             title={filename}
// //           />
// //         </div>
// //       );
// //     } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
// //       return (
// //         <div className="border rounded-md p-4 flex flex-col items-center">
// //           <img 
// //             src={fileUrl} 
// //             alt={filename} 
// //             className="max-h-[500px] object-contain"
// //           />
// //         </div>
// //       );
// //     } else {
// //       // For other file types
// //       return (
// //         <div className="border rounded-md p-8 text-center">
// //           <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
// //           <p className="text-sm mb-4">
// //             This file type ({extension.toUpperCase()}) cannot be previewed directly
// //           </p>
// //           <div className="flex justify-center gap-2">
// //             <Button 
// //               variant="outline" 
// //               onClick={() => openDirectlyInNewTab(fileUrl)}
// //             >
// //               <ExternalLink className="mr-2 h-4 w-4" /> Open in browser
// //             </Button>
// //           </div>
// //         </div>
// //       );
// //     }
// //   };
  
// //   return (
// //     <div className="w-full">
// //       {!fileData ? (
// //         <div>
// //           <Button 
// //             variant="outline" 
// //             onClick={fetchDocumentData}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? (
// //               <>
// //                 <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
// //               </>
// //             ) : (
// //               <>
// //                 <Eye className="mr-2 h-4 w-4" /> View {filename}
// //               </>
// //             )}
// //           </Button>
          
// //           {error && (
// //             <p className="text-sm text-red-500 mt-2">
// //               {error}
// //             </p>
// //           )}
// //         </div>
// //       ) : (
// //         <div className="space-y-4">
// //           <div className="flex justify-between items-center">
// //             <h3 className="font-medium">{filename}</h3>
// //             <Button 
// //               size="sm" 
// //               variant="outline"
// //               onClick={() => openDirectlyInNewTab(fileData.url || url)}
// //             >
// //               <ExternalLink className="mr-2 h-4 w-4" /> Open in new tab
// //             </Button>
// //           </div>
// //           {renderViewer()}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Loader2, Eye, Download, ExternalLink, FileText, File } from "lucide-react";

// interface DocumentViewerProps {
//   url: string;
//   filename?: string;
// }

// export default function DocumentViewer({ url, filename = "Document" }: DocumentViewerProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [fileData, setFileData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
  
//   // Auto-load document when component mounts
//   useEffect(() => {
//     if (url) {
//       fetchDocumentData();
//     }
//   }, [url]);
  
//   const fetchDocumentData = async () => {
//     if (!url) return;
    
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       console.log("Fetching document data for:", url);
//       const response = await fetch(`/api/cloudinary/file?url=${encodeURIComponent(url)}`);
      
//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${await response.text()}`);
//       }
      
//       const data = await response.json();
//       console.log("Received document data:", data);
//       setFileData(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to load document");
//       console.error("Error loading document:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   const getFileExtension = (url: string) => {
//     const urlWithoutParams = url.split('?')[0];
//     return urlWithoutParams.split('.').pop()?.toLowerCase() || 'unknown';
//   };
  
//   const isPdfFile = (url: string) => {
//     return url.toLowerCase().endsWith('.pdf') || 
//            url.toLowerCase().includes('/pdf/') ||
//            url.toLowerCase().includes('_pdf');
//   };
  
//   const openDirectlyInNewTab = (fileUrl: string) => {
//     window.open(fileUrl, '_blank');
//   };
  
//   const downloadFile = () => {
//     if (fileData?.downloadUrl) {
//       window.open(fileData.downloadUrl, '_blank');
//     } else if (fileData?.url) {
//       const link = document.createElement('a');
//       link.href = fileData.url;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };
  
//   // Get file icon based on type
//   const getFileIcon = () => {
//     const extension = getFileExtension(url);
//     const isPdf = isPdfFile(url);
    
//     if (isPdf) {
//       return <FileText className="h-4 w-4 mr-2" />;
//     } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
//       return <File className="h-4 w-4 mr-2" />;
//     } else {
//       return <FileText className="h-4 w-4 mr-2" />;
//     }
//   };
  
//   const renderViewer = () => {
//     if (!fileData) return null;
    
//     // Use the URL directly from the response
//     const fileUrl = fileData.url || url;
//     const extension = getFileExtension(url);
//     const isPdf = isPdfFile(url);
    
//     console.log("Rendering document with URL:", fileUrl);
//     console.log("File extension:", extension, "Is PDF:", isPdf);
    
//     if (isPdf) {
//       return (
//         <div className="border rounded-md overflow-hidden">
//           <div className="bg-muted p-2 flex justify-end gap-2">
//             <Button 
//               variant="outline" 
//               size="sm"
//               onClick={downloadFile}
//             >
//               <Download className="h-4 w-4 mr-2" /> Download
//             </Button>
//             <Button 
//               variant="outline" 
//               size="sm"
//               onClick={() => openDirectlyInNewTab(fileUrl)}
//             >
//               <ExternalLink className="h-4 w-4 mr-2" /> Open in new tab
//             </Button>
//           </div>
//           <iframe 
//             src={fileUrl}
//             className="w-full h-[600px]"
//             title={filename}
//           />
//         </div>
//       );
//     } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
//       return (
//         <div className="border rounded-md p-4 flex flex-col items-center">
//           <img 
//             src={fileUrl} 
//             alt={filename} 
//             className="max-h-[500px] object-contain"
//           />
//           <Button 
//             variant="outline" 
//             size="sm"
//             className="mt-4"
//             onClick={downloadFile}
//           >
//             <Download className="h-4 w-4 mr-2" /> Download
//           </Button>
//         </div>
//       );
//     } else {
//       return (
//         <div className="border rounded-md p-8 text-center">
//           <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
//           <p className="text-sm mb-4">
//             This file type ({extension.toUpperCase()}) cannot be previewed directly
//           </p>
//           <div className="flex justify-center gap-2">
//             <Button 
//               variant="outline" 
//               onClick={downloadFile}
//             >
//               <Download className="mr-2 h-4 w-4" /> Download
//             </Button>
//             <Button 
//               variant="outline" 
//               onClick={() => openDirectlyInNewTab(fileUrl)}
//             >
//               <ExternalLink className="mr-2 h-4 w-4" /> Open in browser
//             </Button>
//           </div>
//         </div>
//       );
//     }
//   };
  
//   return (
//     <div className="w-full">
//       {isLoading ? (
//         <div className="flex items-center justify-center p-4">
//           <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
//           <span>Loading document...</span>
//         </div>
//       ) : error ? (
//         <div className="border border-red-200 bg-red-50 rounded-md p-3">
//           <p className="text-red-700 text-sm">Error: {error}</p>
//           <Button 
//             variant="outline" 
//             size="sm" 
//             onClick={fetchDocumentData} 
//             className="mt-2"
//           >
//             Try again
//           </Button>
//         </div>
//       ) : !fileData ? (
//         <div>
//           <Button 
//             variant="outline" 
//             onClick={fetchDocumentData}
//             disabled={isLoading}
//           >
//             <Eye className="mr-2 h-4 w-4" /> View {filename}
//           </Button>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             <h3 className="font-medium flex items-center">
//               {getFileIcon()}
//               {filename}
//             </h3>
//             <div className="space-x-2">
//               <Button 
//                 size="sm" 
//                 variant="outline"
//                 onClick={downloadFile}
//               >
//                 <Download className="mr-2 h-4 w-4" /> Download
//               </Button>
//               <Button 
//                 size="sm" 
//                 variant="outline"
//                 onClick={() => openDirectlyInNewTab(fileData.url || url)}
//               >
//                 <ExternalLink className="mr-2 h-4 w-4" /> Open in new tab
//               </Button>
//             </div>
//           </div>
//           {renderViewer()}
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Loader2, Eye, Download, ExternalLink, FileText } from "lucide-react";

// interface DocumentViewerProps {
//   url: string;
//   filename?: string;
// }

// export default function DocumentViewer({ url, filename = "Document" }: DocumentViewerProps) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [fileData, setFileData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
  
//   const fetchDocumentData = async () => {
//     if (!url) return;
    
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       console.log("Fetching document data for:", url);
//       const response = await fetch(`/api/cloudinary/file?url=${encodeURIComponent(url)}`);
      
//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${await response.text()}`);
//       }
      
//       const data = await response.json();
//       console.log("Received document data:", data);
//       setFileData(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to load document");
//       console.error("Error loading document:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   const getFileExtension = (url: string) => {
//     return url.split('.').pop()?.toLowerCase() || 'unknown';
//   };
  
//   const openDirectlyInNewTab = (fileUrl: string) => {
//     window.open(fileUrl, '_blank');
//   };
  
//   const renderViewer = () => {
//     if (!fileData) return null;
    
//     // Use the URL directly from the response, or fall back to the original URL
//     const fileUrl = fileData.url || url;
//     const extension = getFileExtension(url);
    
//     console.log("Rendering document with URL:", fileUrl);
//     console.log("File extension:", extension);
    
//     if (extension === 'pdf') {
//       return (
//         <div className="border rounded-md overflow-hidden">
//           <div className="bg-muted p-2 flex justify-end">
//             <Button 
//               variant="outline" 
//               size="sm"
//               onClick={() => openDirectlyInNewTab(fileUrl)}
//             >
//               <ExternalLink className="h-4 w-4 mr-2" /> Open in new tab
//             </Button>
//           </div>
//           <iframe 
//             src={fileUrl}
//             className="w-full h-[600px]"
//             title={filename}
//           />
//         </div>
//       );
//     } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
//       return (
//         <div className="border rounded-md p-4 flex flex-col items-center">
//           <img 
//             src={fileUrl} 
//             alt={filename} 
//             className="max-h-[500px] object-contain"
//           />
//         </div>
//       );
//     } else {
//       // For other file types
//       return (
//         <div className="border rounded-md p-8 text-center">
//           <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
//           <p className="text-sm mb-4">
//             This file type ({extension.toUpperCase()}) cannot be previewed directly
//           </p>
//           <div className="flex justify-center gap-2">
//             <Button 
//               variant="outline" 
//               onClick={() => openDirectlyInNewTab(fileUrl)}
//             >
//               <ExternalLink className="mr-2 h-4 w-4" /> Open in browser
//             </Button>
//           </div>
//         </div>
//       );
//     }
//   };
  
//   return (
//     <div className="w-full">
//       {!fileData ? (
//         <div>
//           <Button 
//             variant="outline" 
//             onClick={fetchDocumentData}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
//               </>
//             ) : (
//               <>
//                 <Eye className="mr-2 h-4 w-4" /> View {filename}
//               </>
//             )}
//           </Button>
          
//           {error && (
//             <p className="text-sm text-red-500 mt-2">
//               {error}
//             </p>
//           )}
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div className="flex justify-between items-center">
//             <h3 className="font-medium">{filename}</h3>
//             <Button 
//               size="sm" 
//               variant="outline"
//               onClick={() => openDirectlyInNewTab(fileData.url || url)}
//             >
//               <ExternalLink className="mr-2 h-4 w-4" /> Open in new tab
//             </Button>
//           </div>
//           {renderViewer()}
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, Download, ExternalLink, FileText, File, Image } from "lucide-react";

interface DocumentViewerProps {
  url: string;
  filename?: string;
}

export default function DocumentViewer({ url, filename = "Document" }: DocumentViewerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fileData, setFileData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (url) {
      fetchDocumentData();
    }
  }, [url]);
  
  const fetchDocumentData = async () => {
    if (!url) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Fetching document data for:", url);
      const response = await fetch(`/api/cloudinary/file?url=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${await response.text()}`);
      }
      
      const data = await response.json();
      console.log("Received document data:", data);
      
      // Enhanced URL processing
      if (data.url) {
        data.url = enhanceCloudinaryUrl(data.url, data.fileInfo);
      }
      
      setFileData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load document");
      console.error("Error loading document:", err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Enhanced function to improve Cloudinary URLs
  const enhanceCloudinaryUrl = (fileUrl: string, fileInfo: any) => {
    if (!fileUrl) return fileUrl;
    
    // Special handling for PDFs that might have been uploaded as images
    const originalName = fileInfo?.original_filename || '';
    const publicId = fileInfo?.public_id || '';
    const extension = getFileExtension(fileUrl);
    const contentType = fileInfo?.content_type || '';
    
    // Check if this is likely a PDF stored as an image
    const isProbablyPdf = 
      originalName.toLowerCase().endsWith('.pdf') || 
      publicId.toLowerCase().includes('pdf') ||
      (extension === 'png' && (filename.toLowerCase().includes('pdf') || 
                              filename.toLowerCase().includes('document')));
    
    // If it's a PDF file that's stored as an image in Cloudinary
    if (isProbablyPdf && fileUrl.includes('/image/upload/')) {
      // Try to transform the URL to display better
      console.log("Enhancing URL for PDF stored as image:", fileUrl);
      
      // For downloads, add fl_attachment
      if (fileUrl.includes('/image/upload/')) {
        return fileUrl;
      }
    }
    
    return fileUrl;
  };
  
  const getFileExtension = (fileUrl: string) => {
    if (!fileUrl) return 'unknown';
    const urlWithoutParams = fileUrl.split('?')[0];
    return urlWithoutParams.split('.').pop()?.toLowerCase() || 'unknown';
  };
  
  const detectFileType = () => {
    if (!fileData) return { isPdf: false, isImage: false, extension: 'unknown' };
    
    const fileUrl = fileData.url || url;
    const extension = getFileExtension(fileUrl);
    
    // Get information from Cloudinary response
    const contentType = fileData.fileInfo?.content_type || '';
    const format = fileData.fileInfo?.format || '';
    const originalFilename = fileData.fileInfo?.original_filename || '';
    
    // Enhanced PDF detection - check more indicators
    const isPdf = 
      contentType.includes('pdf') || 
      format === 'pdf' || 
      extension === 'pdf' || 
      fileUrl.toLowerCase().endsWith('.pdf') || 
      fileUrl.toLowerCase().includes('/pdf/') ||
      originalFilename.toLowerCase().endsWith('.pdf') ||
      (filename && filename.toLowerCase().endsWith('.pdf'));
    
    // Check if it's an image
    const isImage = 
      contentType.includes('image') && !isPdf || // Don't classify PDFs as images
      ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(format) && !isPdf || 
      ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension) && !isPdf;
      
    console.log("File detection:", {
      url: fileUrl,
      extension,
      contentType,
      format,
      originalFilename,
      filename,
      isPdf,
      isImage
    });
    
    return { isPdf, isImage, extension, contentType, format };
  };
  
  const openDirectlyInNewTab = (fileUrl: string) => {
    // For PDFs stored as images in Cloudinary, we can try to get a better view
    if (fileUrl.includes('/image/upload/') && 
        (fileUrl.toLowerCase().endsWith('.pdf') || filename.toLowerCase().includes('.pdf'))) {
      // Try to use the original file if available
      window.open(fileUrl, '_blank');
    } else {
      window.open(fileUrl, '_blank');
    }
  };
  
  const downloadFile = () => {
    if (!fileData?.url) return;
    
    // For PDFs or PDF-like files, ensure proper download
    const { isPdf } = detectFileType();
    
    try {
      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      
      // If it's a PDF stored as an image in Cloudinary, modify the URL to ensure proper download
      if (isPdf && fileData.url.includes('/image/upload/') && !fileData.url.includes('fl_attachment')) {
        link.href = fileData.url.replace('/upload/', '/upload/fl_attachment/');
      } else {
        link.href = fileData.url;
      }
      
      // Set appropriate filename with extension
      const suggestedFilename = filename || "Document";
      const ext = getFileExtension(fileData.url);
      link.download = suggestedFilename + (suggestedFilename.includes(`.${ext}`) ? '' : `.${ext}`);
      
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (error) {
      console.error("Error downloading file:", error);
      // Fallback to direct open
      window.open(fileData.url, '_blank');
    }
  };
  
  const getFileIcon = () => {
    const { isPdf, isImage } = detectFileType();
    
    if (isPdf) {
      return <FileText className="h-4 w-4 mr-2" />;
    } else if (isImage) {
      return <Image className="h-4 w-4 mr-2" />;
    } else {
      return <File className="h-4 w-4 mr-2" />;
    }
  };
  
  const renderViewer = () => {
    if (!fileData) return null;
    
    const fileUrl = fileData.url || url;
    const { isPdf, isImage, extension, contentType } = detectFileType();
    
    // PDF rendering - including PDFs stored as images
    if (isPdf) {
      // Enhanced PDF viewing with better error handling
      return (
        <div className="border rounded-md overflow-hidden">
          <div className="bg-muted p-2 flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={downloadFile}
            >
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => openDirectlyInNewTab(fileUrl)}
            >
              <ExternalLink className="h-4 w-4 mr-2" /> Open in new tab
            </Button>
          </div>
          <iframe 
            src={fileUrl}
            className="w-full h-[600px]"
            title={filename}
            onError={(e) => {
              console.error("Error loading PDF in iframe:", e);
              // If iframe fails, we could try alternative methods here
            }}
          />
        </div>
      );
    } 
    // Image rendering
    else if (isImage) {
      return (
        <div className="border rounded-md p-4 flex flex-col items-center">
          <img 
            src={fileUrl} 
            alt={filename} 
            className="max-h-[500px] object-contain"
            onError={(e) => {
              console.error("Error loading image:", e);
              // Set a fallback image or message
              (e.target as HTMLImageElement).src = "/placeholder-image.png";
              (e.target as HTMLImageElement).alt = "Image could not be loaded";
            }}
          />
          <div className="mt-4 flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={downloadFile}
            >
              <Download className="h-4 w-4 mr-2" /> Download
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => openDirectlyInNewTab(fileUrl)}
            >
              <ExternalLink className="h-4 w-4 mr-2" /> Open in new tab
            </Button>
          </div>
        </div>
      );
    } 
    // Fallback for other file types
    else {
      return (
        <div className="border rounded-md p-8 text-center">
          <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-sm mb-4">
            {contentType ? (
              <>File type: {contentType} (cannot be previewed directly)</>
            ) : (
              <>This file type ({extension.toUpperCase()}) cannot be previewed directly</>
            )}
          </p>
          <div className="flex justify-center gap-2">
            <Button 
              variant="outline" 
              onClick={downloadFile}
            >
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button 
              variant="outline" 
              onClick={() => openDirectlyInNewTab(fileUrl)}
            >
              <ExternalLink className="mr-2 h-4 w-4" /> Open in browser
            </Button>
          </div>
        </div>
      );
    }
  };
  
  return (
    <div className="w-full">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
          <span>Loading document...</span>
        </div>
      ) : error ? (
        <div className="border border-red-200 bg-red-50 rounded-md p-3">
          <p className="text-red-700 text-sm">Error: {error}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchDocumentData} 
            className="mt-2"
          >
            Try again
          </Button>
        </div>
      ) : !fileData ? (
        <div>
          <Button 
            variant="outline" 
            onClick={fetchDocumentData}
            disabled={isLoading}
          >
            <Eye className="mr-2 h-4 w-4" /> View {filename}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium flex items-center">
              {getFileIcon()}
              {filename}
            </h3>
            <div className="space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={downloadFile}
              >
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => openDirectlyInNewTab(fileData.url || url)}
              >
                <ExternalLink className="mr-2 h-4 w-4" /> Open in new tab
              </Button>
            </div>
          </div>
          {renderViewer()}
        </div>
      )}
    </div>
  );
}