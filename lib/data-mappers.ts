// // Data mapping utilities to convert website data to dashboard format

// // Map PartnerApplicationForm from website to PartnerApplication for dashboard
// export function mapPartnerApplicationForm(form: any): any {
//   return {
//     businessName: form.businessName,
//     contactPerson: form.contactPerson,
//     email: form.email,
//     phone: form.phoneNumber,
//     website: form.website || '',
//     address: form.businessAddress,
//     businessType: form.typeOfBusiness,
//     servicesOffered: form.servicesOrProductsOffered?.split(',').map((s: string) => s.trim()) || [],
//     yearsInBusiness: form.yearsInOperation?.toString() || 'N/A',
//     employeeCount: 'N/A', // Not directly available in the source schema
//     annualRevenue: form.annualRevenue || 'N/A',
//     certifications: [form.businessLicensesOrPermits].filter(Boolean),
//     status: mapStatus(form.status),
//     submittedAt: form.createdAt,
//     // Include document URLs
//     documents: [
//       form.businessRegistrationCertificate,
//       form.taxIdentificationCertificate,
//       form.portfolioOrReferences,
//     ].filter(Boolean),
//   };
// }

// // Map ClientInformationForm from website to ClientInformation for dashboard
// export function mapClientInformationForm(form: any): any {
//   return {
//     clientName: form.businessName || form.fullName,
//     contactPerson: form.fullName,
//     email: form.email,
//     phone: form.phoneNumber,
//     address: form.address,
//     businessType: form.businessType || 'Individual',
//     taxId: form.taxIdentificationNumber || 'N/A',
//     fiscalYearEnd: 'December 31', // Default value as it's not in the source schema
//     accountingMethod: 'Cash', // Default value as it's not in the source schema
//     industry: form.industryCategory || 'Other',
//     referredBy: '',
//     status: mapStatus(form.status),
//     submittedAt: form.createdAt,
//     // Include document URLs
//     documents: [
//       form.businessRegistrationCertificate,
//       form.taxIdentificationCertificate,
//       form.financialStatements,
//       form.governmentIssuedID,
//     ].filter(Boolean),
//   };
// }

// // Map TaxFilingForm from website to TaxFiling for dashboard
// export function mapTaxFilingForm(form: any): any {
//   return {
//     clientName: `${form.firstName} ${form.lastName}`,
//     taxYear: form.taxYear,
//     filingType: 'Individual', // Default value as it's not specified in the source
//     taxId: form.ssn,
//     filingStatus: form.refundOption,
//     dependents: 0, // Default value as it's not in the source schema
//     income: 0, // Default value as it's not in the source schema
//     deductions: 0, // Default value as it's not in the source schema
//     credits: 0, // Default value as it's not in the source schema
//     status: mapStatus(form.status),
//     amount: parseFloat(form.cashAdvance) || 0,
//     submittedAt: form.createdAt,
//     dueDate: new Date(parseInt(form.taxYear) + 1, 3, 15), // April 15 of the next year
//     // No documents in the source schema
//     documents: [],
//   };
// }

// // Map ContactMessage and ConsultationMessage to a generic format
// export function mapContactMessage(message: any): any {
//   return {
//     name: message.name,
//     email: message.email,
//     phone: message.phone,
//     company: message.company || message.country || '',
//     message: message.message,
//     status: mapStatus(message.status),
//     createdAt: message.createdAt,
//   };
// }

// // Helper function to map status values
// function mapStatus(status: string): string {
//   const statusMap: Record<string, string> = {
//     pending: 'Pending',
//     approved: 'Approved',
//     rejected: 'Rejected',
//     new: 'Pending',
//     'in-progress': 'Processing',
//     completed: 'Completed',
//     draft: 'Draft',
//   };

//   return statusMap[status.toLowerCase()] || 'Pending';
// }

// // Helper function to extract file ID from Cloudinary URL
// export function getCloudinaryPublicId(url: string): string {
//   if (!url) return '';

//   try {
//     // Remove query parameters if any
//     const urlWithoutQuery = url.split('?')[0];

//     // Extract everything after version number (v1234567890/) and before file extension
//     // Example: https://res.cloudinary.com/de52gly9t/image/upload/v1746632200/partner-application/business-registration/if34eci53uqyp6prefkn.pdf
//     const versionRegex = /\/v\d+\/(.+?)(\.[^.]+)?$/;
//     const match = urlWithoutQuery.match(versionRegex);

//     if (match && match[1]) {
//       // Return the full path (including all folder levels)
//       return match[1];
//     }

//     console.warn('Failed to extract Cloudinary public ID from URL:', url);
//     return '';
//   } catch (error) {
//     console.error('Error extracting Cloudinary public ID:', error);
//     return '';
//   }
// }









// lib/data-mappers.ts
// Data mapping utilities to convert website data to dashboard format

// Map PartnerApplicationForm from website to PartnerApplication for dashboard
export function mapPartnerApplicationForm(form: any): any {
  return {
    id: form.id, // Include ID for routing and selection
    businessName: form.businessName,
    contactPerson: form.contactPerson,
    email: form.email,
    phone: form.phoneNumber,
    website: form.website || '',
    address: form.businessAddress,
    businessType: form.typeOfBusiness,
    servicesOffered: form.servicesOrProductsOffered
      ? form.servicesOrProductsOffered.split(',').map((s: string) => s.trim())
      : [],
    yearsInBusiness: form.yearsInOperation?.toString() || 'N/A',
    employeeCount: 'N/A', // Not directly available in the source schema
    annualRevenue: form.annualRevenue || 'N/A',
    certifications: [form.businessLicensesOrPermits].filter(Boolean),
    status: mapStatus(form.status || 'pending'),
    submittedAt: form.createdAt,
    // Include document URLs
    documents: [
      form.businessRegistrationCertificate,
      form.taxIdentificationCertificate,
      form.portfolioOrReferences,
    ].filter(Boolean),
  };
}

// Map ClientInformationForm from website to ClientInformation for dashboard
export function mapClientInformationForm(form: any): any {
  return {
    id: form.id,
    clientName: form.businessName || form.fullName,
    contactPerson: form.fullName,
    email: form.email,
    phone: form.phoneNumber,
    address: form.address,
    businessType: form.businessType || 'Individual',
    taxId: form.taxIdentificationNumber || 'N/A',
    fiscalYearEnd: 'December 31', // Default value as it's not in the source schema
    accountingMethod: 'Cash', // Default value as it's not in the source schema
    industry: form.industryCategory || 'Other',
    referredBy: '',
    status: mapStatus(form.status),
    submittedAt: form.createdAt,
    // Include document URLs
    documents: [
      form.businessRegistrationCertificate,
      form.taxIdentificationCertificate,
      form.financialStatements,
      form.governmentIssuedID,
    ].filter(Boolean),
  };
}

// Map TaxFilingForm from website to TaxFiling for dashboard
export function mapTaxFilingForm(form: any): any {
  return {
    id: form.id,
    clientName: `${form.firstName} ${form.lastName}`,
    taxYear: form.taxYear,
    filingType: 'Individual', // Default value as it's not specified in the source
    taxId: form.ssn,
    filingStatus: form.refundOption,
    dependents: 0, // Default value as it's not in the source schema
    income: 0, // Default value as it's not in the source schema
    deductions: 0, // Default value as it's not in the source schema
    credits: 0, // Default value as it's not in the source schema
    status: mapStatus(form.status),
    amount: parseFloat(form.cashAdvance) || 0,
    submittedAt: form.createdAt,
    dueDate: new Date(parseInt(form.taxYear) + 1, 3, 15), // April 15 of the next year
    // No documents in the source schema
    documents: [],
  };
}

// Map ContactMessage and ConsultationMessage to a generic format
export function mapContactMessage(message: any): any {
  return {
    name: message.name,
    email: message.email,
    phone: message.phone,
    company: message.company || message.country || '',
    message: message.message,
    status: mapStatus(message.status),
    createdAt: message.createdAt,
  };
}

// Helper function to map status values consistently
function mapStatus(status: string): string {
  const lower = status.toLowerCase();
  switch (lower) {
    case 'approved':
      return 'Approved';
    case 'rejected':
      return 'Rejected';
    case 'pending':
    case 'new':
      return 'Pending';
    case 'in-progress':
      return 'Processing';
    case 'completed':
      return 'Completed';
    case 'draft':
      return 'Draft';
    default:
      return 'Pending';
  }
}

// Helper function to extract file ID from Cloudinary URL
export function getCloudinaryPublicId(url: string): string {
  if (!url) return '';
  try {
    const urlWithoutQuery = url.split('?')[0];
    const versionRegex = /\/v\d+\/(.+?)(\.[^.]+)?$/;
    const match = urlWithoutQuery.match(versionRegex);
    return match && match[1] ? match[1] : '';
  } catch (error) {
    console.error('Error extracting Cloudinary public ID:', error);
    return '';
  }
}

