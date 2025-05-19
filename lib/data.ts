// Generate more realistic demo data for the dashboard

// Function to generate a random date within a range
export function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

// Function to generate a random number within a range
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Array of realistic first names
const firstNames = [
  "James",
  "Mary",
  "John",
  "Patricia",
  "Robert",
  "Jennifer",
  "Michael",
  "Linda",
  "William",
  "Elizabeth",
  "David",
  "Susan",
  "Richard",
  "Jessica",
  "Joseph",
  "Sarah",
  "Thomas",
  "Karen",
  "Charles",
  "Nancy",
  "Christopher",
  "Lisa",
  "Daniel",
  "Margaret",
  "Matthew",
  "Betty",
  "Anthony",
  "Sandra",
  "Mark",
  "Ashley",
  "Donald",
  "Dorothy",
  "Steven",
  "Kimberly",
  "Paul",
  "Emily",
  "Andrew",
  "Donna",
  "Joshua",
  "Michelle",
  "Kenneth",
  "Carol",
  "Kevin",
  "Amanda",
  "Brian",
  "Melissa",
  "George",
  "Deborah",
  "Timothy",
  "Stephanie",
  "Ronald",
  "Rebecca",
  "Edward",
  "Laura",
  "Jason",
  "Sharon",
  "Jeffrey",
  "Cynthia",
  "Ryan",
  "Kathleen",
  "Jacob",
  "Amy",
  "Gary",
  "Shirley",
  "Nicholas",
  "Angela",
  "Eric",
  "Helen",
  "Jonathan",
  "Anna",
  "Stephen",
  "Brenda",
  "Larry",
  "Pamela",
  "Justin",
  "Nicole",
  "Scott",
  "Samantha",
  "Brandon",
  "Katherine",
  "Benjamin",
  "Emma",
  "Samuel",
  "Ruth",
  "Gregory",
  "Christine",
  "Alexander",
  "Catherine",
  "Patrick",
  "Debra",
  "Frank",
  "Rachel",
  "Raymond",
  "Carolyn",
  "Jack",
  "Janet",
  "Dennis",
  "Virginia",
  "Jerry",
  "Maria",
  "Tyler",
  "Heather",
  "Aaron",
  "Diane",
  "Jose",
  "Julie",
  "Adam",
  "Joyce",
  "Nathan",
  "Victoria",
  "Henry",
  "Kelly",
  "Zachary",
  "Christina",
  "Douglas",
  "Lauren",
  "Peter",
  "Joan",
  "Kyle",
  "Evelyn",
]

// Array of realistic last names
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Jones",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "Garcia",
  "Martinez",
  "Robinson",
  "Clark",
  "Rodriguez",
  "Lewis",
  "Lee",
  "Walker",
  "Hall",
  "Allen",
  "Young",
  "Hernandez",
  "King",
  "Wright",
  "Lopez",
  "Hill",
  "Scott",
  "Green",
  "Adams",
  "Baker",
  "Gonzalez",
  "Nelson",
  "Carter",
  "Mitchell",
  "Perez",
  "Roberts",
  "Turner",
  "Phillips",
  "Campbell",
  "Parker",
  "Evans",
  "Edwards",
  "Collins",
  "Stewart",
  "Sanchez",
  "Morris",
  "Rogers",
  "Reed",
  "Cook",
  "Morgan",
  "Bell",
  "Murphy",
  "Bailey",
  "Rivera",
  "Cooper",
  "Richardson",
  "Cox",
  "Howard",
  "Ward",
  "Torres",
  "Peterson",
  "Gray",
  "Ramirez",
  "James",
  "Watson",
  "Brooks",
  "Kelly",
  "Sanders",
  "Price",
  "Bennett",
  "Wood",
  "Barnes",
  "Ross",
  "Henderson",
  "Coleman",
  "Jenkins",
  "Perry",
  "Powell",
  "Long",
  "Patterson",
  "Hughes",
  "Flores",
  "Washington",
  "Butler",
  "Simmons",
  "Foster",
  "Gonzales",
  "Bryant",
  "Alexander",
  "Russell",
  "Griffin",
  "Diaz",
  "Hayes",
]

// Array of realistic company name prefixes
const companyPrefixes = [
  "Advanced",
  "Allied",
  "American",
  "Associated",
  "Atlantic",
  "Atlas",
  "Blue",
  "Capital",
  "Central",
  "Century",
  "Coastal",
  "Commonwealth",
  "Consolidated",
  "Continental",
  "Crown",
  "Diamond",
  "Digital",
  "Dynamic",
  "Eagle",
  "Eastern",
  "Elite",
  "Empire",
  "Enterprise",
  "Equity",
  "Excel",
  "Executive",
  "Federal",
  "First",
  "Frontier",
  "Gateway",
  "Global",
  "Golden",
  "Great",
  "Heritage",
  "Horizon",
  "Imperial",
  "Independent",
  "Innovative",
  "Integrated",
  "International",
  "Liberty",
  "Magna",
  "Meridian",
  "Metro",
  "Millennium",
  "Modern",
  "National",
  "New",
  "North",
  "Northern",
  "Olympic",
  "Pacific",
  "Paramount",
  "Peak",
  "Pioneer",
  "Premier",
  "Premium",
  "Prestige",
  "Prime",
  "Progressive",
  "Quality",
  "Quantum",
  "Regional",
  "Reliable",
  "Republic",
  "Royal",
  "Safeguard",
  "Secure",
  "Select",
  "Signature",
  "Silver",
  "Southern",
  "Sovereign",
  "Standard",
  "Sterling",
  "Summit",
  "Superior",
  "Supreme",
  "Titan",
  "Total",
  "Transcontinental",
  "Tri-State",
  "Trust",
  "United",
  "Universal",
  "Valley",
  "Vanguard",
  "Venture",
  "Victory",
  "Western",
]

// Array of realistic company name suffixes
const companySuffixes = [
  "Accounting",
  "Advisors",
  "Analytics",
  "Associates",
  "Capital",
  "Consulting",
  "Corporation",
  "Enterprises",
  "Financial",
  "Group",
  "Holdings",
  "Inc",
  "Industries",
  "International",
  "Investments",
  "LLC",
  "Limited",
  "Management",
  "Partners",
  "Properties",
  "Resources",
  "Services",
  "Solutions",
  "Strategies",
  "Systems",
  "Technologies",
  "Ventures",
  "Worldwide",
  "& Co.",
  "& Sons",
]

// Array of realistic business types
const businessTypes = [
  "Accounting Firm",
  "Financial Advisory",
  "Tax Preparation",
  "Bookkeeping",
  "Wealth Management",
  "Financial Planning",
  "Audit Services",
  "Consulting",
  "Investment Management",
  "Retirement Planning",
  "Estate Planning",
  "Insurance Agency",
  "Payroll Services",
  "Business Valuation",
  "Forensic Accounting",
  "Tax Resolution",
  "Financial Education",
  "Credit Counseling",
  "Debt Management",
  "Risk Management",
  "Compliance Services",
  "Corporate Finance",
  "Mergers & Acquisitions",
  "Venture Capital",
  "Private Equity",
  "Real Estate Investment",
  "Securities Brokerage",
  "Portfolio Management",
  "Financial Technology",
  "Banking Services",
]

// Array of realistic industries
const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Retail",
  "Education",
  "Real Estate",
  "Construction",
  "Energy",
  "Transportation",
  "Hospitality",
  "Entertainment",
  "Media",
  "Telecommunications",
  "Agriculture",
  "Automotive",
  "Aerospace",
  "Pharmaceuticals",
  "Food & Beverage",
  "Consumer Goods",
  "Professional Services",
  "Legal Services",
  "Insurance",
  "Non-Profit",
  "Government",
  "Utilities",
  "Mining",
  "Wholesale",
  "Logistics",
  "E-commerce",
]

// Array of realistic cities
const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Fort Worth",
  "Columbus",
  "San Francisco",
  "Charlotte",
  "Indianapolis",
  "Seattle",
  "Denver",
  "Washington",
  "Boston",
  "El Paso",
  "Nashville",
  "Detroit",
  "Portland",
  "Memphis",
  "Oklahoma City",
  "Las Vegas",
  "Louisville",
  "Baltimore",
  "Milwaukee",
  "Albuquerque",
  "Tucson",
  "Fresno",
  "Sacramento",
  "Mesa",
  "Kansas City",
  "Atlanta",
  "Long Beach",
  "Colorado Springs",
  "Raleigh",
  "Miami",
  "Oakland",
  "Minneapolis",
  "Tulsa",
  "Cleveland",
  "Wichita",
  "Arlington",
  "New Orleans",
  "Bakersfield",
]

// Array of realistic states
const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]

// Function to generate a random name
function generateRandomName(): string {
  const firstName = firstNames[randomNumber(0, firstNames.length - 1)]
  const lastName = lastNames[randomNumber(0, lastNames.length - 1)]
  return `${firstName} ${lastName}`
}

// Function to generate a random company name
function generateRandomCompanyName(): string {
  const prefix = companyPrefixes[randomNumber(0, companyPrefixes.length - 1)]
  const suffix = companySuffixes[randomNumber(0, companySuffixes.length - 1)]
  return `${prefix} ${suffix}`
}

// Function to generate a random address
function generateRandomAddress(): string {
  const streetNumber = randomNumber(100, 9999)
  const streetNames = [
    "Main",
    "Oak",
    "Pine",
    "Maple",
    "Cedar",
    "Elm",
    "Washington",
    "Park",
    "Lake",
    "Hill",
    "River",
    "View",
    "Ridge",
    "Forest",
    "Sunset",
    "Valley",
    "Highland",
    "Meadow",
    "Spring",
    "Willow",
  ]
  const streetTypes = [
    "St",
    "Ave",
    "Blvd",
    "Dr",
    "Ln",
    "Rd",
    "Way",
    "Pl",
    "Ct",
    "Terrace",
    "Circle",
    "Highway",
    "Junction",
    "Pass",
    "Plaza",
    "Trail",
    "Parkway",
    "Square",
    "Drive",
    "Court",
  ]

  const streetName = streetNames[randomNumber(0, streetNames.length - 1)]
  const streetType = streetTypes[randomNumber(0, streetTypes.length - 1)]
  const city = cities[randomNumber(0, cities.length - 1)]
  const state = states[randomNumber(0, states.length - 1)]
  const zip = randomNumber(10000, 99999)

  return `${streetNumber} ${streetName} ${streetType}, ${city}, ${state} ${zip}`
}

// Function to generate a random email
function generateRandomEmail(name: string): string {
  const domains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "aol.com",
    "icloud.com",
    "protonmail.com",
    "mail.com",
    "zoho.com",
    "yandex.com",
  ]
  const nameParts = name.toLowerCase().split(" ")
  const domain = domains[randomNumber(0, domains.length - 1)]

  // Different email formats
  const emailFormats = [
    `${nameParts[0]}@${domain}`,
    `${nameParts[0]}.${nameParts[1]}@${domain}`,
    `${nameParts[0]}${nameParts[1]}@${domain}`,
    `${nameParts[0]}.${nameParts[1][0]}@${domain}`,
    `${nameParts[0][0]}${nameParts[1]}@${domain}`,
    `${nameParts[0]}${randomNumber(1, 999)}@${domain}`,
  ]

  return emailFormats[randomNumber(0, emailFormats.length - 1)]
}

// Function to generate a random business email
function generateBusinessEmail(name: string, company: string): string {
  const nameParts = name.toLowerCase().split(" ")
  const companyDomain = company.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com"

  // Different email formats
  const emailFormats = [
    `${nameParts[0]}@${companyDomain}`,
    `${nameParts[0]}.${nameParts[1]}@${companyDomain}`,
    `${nameParts[0][0]}${nameParts[1]}@${companyDomain}`,
    `${nameParts[0]}.${nameParts[1][0]}@${companyDomain}`,
    `${nameParts[0][0]}.${nameParts[1]}@${companyDomain}`,
    `${nameParts[1]}@${companyDomain}`,
  ]

  return emailFormats[randomNumber(0, emailFormats.length - 1)]
}

// Function to generate a random phone number
function generateRandomPhone(): string {
  const formats = [
    `+1 (${randomNumber(200, 999)}) ${randomNumber(100, 999)}-${randomNumber(1000, 9999)}`,
    `(${randomNumber(200, 999)}) ${randomNumber(100, 999)}-${randomNumber(1000, 9999)}`,
    `${randomNumber(200, 999)}-${randomNumber(100, 999)}-${randomNumber(1000, 9999)}`,
    `+1 ${randomNumber(200, 999)}-${randomNumber(100, 999)}-${randomNumber(1000, 9999)}`,
  ]

  return formats[randomNumber(0, formats.length - 1)]
}

// Function to generate a random website
function generateRandomWebsite(company: string): string {
  const domains = [".com", ".net", ".org", ".io", ".co", ".biz", ".info"]
  const domain = domains[randomNumber(0, domains.length - 1)]

  // Clean up company name for URL
  const websiteName = company.toLowerCase().replace(/[^a-z0-9]/g, "")

  return `${websiteName}${domain}`
}

// Function to generate random partner applications data
export function generatePartnerApplicationsData(count: number) {
  const servicesOffered = [
    "Tax Preparation",
    "Bookkeeping",
    "Financial Planning",
    "Audit",
    "Payroll",
    "Consulting",
    "Investment Planning",
    "Retirement Planning",
    "Tax Strategy",
    "Estate Planning",
    "Wealth Management",
    "Individual Tax",
    "Business Tax",
    "Tax Planning",
    "Accounts Payable",
    "Financial Reporting",
    "Cash Flow Management",
    "Budgeting",
    "Forecasting",
    "Risk Assessment",
    "Compliance",
    "IRS Representation",
    "Business Valuation",
    "Forensic Accounting",
    "Merger & Acquisition",
    "Strategic Planning",
  ]

  const certifications = [
    "CPA",
    "EA",
    "CFP",
    "CFA",
    "ChFC",
    "QuickBooks ProAdvisor",
    "CGMA",
    "CIA",
    "CMA",
    "PFS",
    "CVA",
    "ABV",
    "ASA",
    "CISA",
    "CISM",
    "CISSP",
    "CRISC",
    "CRMA",
    "CIPP",
    "CIPM",
    "Series 7",
    "Series 66",
    "Series 63",
    "RIA",
    "FINRA",
    "NASAA",
    "AICPA",
    "IRS Annual Filing Season Program",
  ]

  const statuses = ["Pending", "Approved", "Rejected"]
  const yearsInBusinessOptions = ["Less than 1", "1-5", "5-10", "10+"]
  const employeeCountOptions = ["1-10", "10-50", "50-100", "100+"]
  const annualRevenueOptions = ["Under $500K", "$500K-$1M", "$1M-$5M", "$5M+"]

  const data = []

  for (let i = 0; i < count; i++) {
    const contactPerson = generateRandomName()
    const businessName = generateRandomCompanyName()
    const email = generateBusinessEmail(contactPerson, businessName)
    const phone = generateRandomPhone()
    const website = generateRandomWebsite(businessName)
    const address = generateRandomAddress()
    const businessType = businessTypes[randomNumber(0, businessTypes.length - 1)]

    // Generate random services
    const selectedServices = []
    const serviceCount = randomNumber(2, 8)
    for (let j = 0; j < serviceCount; j++) {
      const service = servicesOffered[randomNumber(0, servicesOffered.length - 1)]
      if (!selectedServices.includes(service)) {
        selectedServices.push(service)
      }
    }

    const yearsInBusiness = yearsInBusinessOptions[randomNumber(0, yearsInBusinessOptions.length - 1)]
    const employeeCount = employeeCountOptions[randomNumber(0, employeeCountOptions.length - 1)]
    const annualRevenue = annualRevenueOptions[randomNumber(0, annualRevenueOptions.length - 1)]

    // Generate random certifications
    const selectedCertifications = []
    const certCount = randomNumber(0, 5)
    for (let j = 0; j < certCount; j++) {
      const cert = certifications[randomNumber(0, certifications.length - 1)]
      if (!selectedCertifications.includes(cert)) {
        selectedCertifications.push(cert)
      }
    }

    // Weight the statuses to have more pending and approved than rejected
    let status
    const statusRoll = Math.random()
    if (statusRoll < 0.45) {
      status = "Pending"
    } else if (statusRoll < 0.85) {
      status = "Approved"
    } else {
      status = "Rejected"
    }

    // Generate a date within the last year, with more recent dates being more common
    const today = new Date()
    const oneYearAgo = new Date(today)
    oneYearAgo.setFullYear(today.getFullYear() - 1)

    // Bias towards more recent dates (last 3 months)
    let submittedDate
    const dateRoll = Math.random()
    if (dateRoll < 0.6) {
      const threeMonthsAgo = new Date(today)
      threeMonthsAgo.setMonth(today.getMonth() - 3)
      submittedDate = randomDate(threeMonthsAgo, today)
    } else {
      submittedDate = randomDate(oneYearAgo, today)
    }

    data.push({
      id: `APP-${1000 + i}`,
      businessName,
      contactPerson,
      email,
      phone,
      website,
      address,
      businessType,
      servicesOffered: selectedServices,
      yearsInBusiness,
      employeeCount,
      annualRevenue,
      certifications: selectedCertifications,
      status,
      submittedAt: submittedDate.toISOString(),
    })
  }

  return data
}

// Function to generate random client information data
export function generateClientInformationData(count: number) {
  const referredBy = [
    "Online Search",
    "Existing Client",
    "Business Partner",
    "Social Media",
    "Website",
    "Advertisement",
    "Conference",
    "Networking Event",
    "Direct Mail",
    "Email Campaign",
    "Trade Show",
    "Webinar",
    "Podcast",
    "Radio",
    "TV",
    "Print Media",
    "Community Event",
    "Referral Program",
    "Cold Call",
    "Partner Referral",
  ]

  const statuses = ["Active", "Inactive", "Pending"]
  const fiscalYearEndOptions = ["12/31", "06/30", "03/31", "09/30", "01/31", "05/31", "08/31", "10/31"]
  const accountingMethodOptions = ["Accrual", "Cash", "Modified Accrual", "Hybrid"]

  const data = []

  for (let i = 0; i < count; i++) {
    const contactPerson = generateRandomName()
    const clientName = generateRandomCompanyName()
    const email = generateBusinessEmail(contactPerson, clientName)
    const phone = generateRandomPhone()
    const address = generateRandomAddress()
    const businessType = businessTypes[randomNumber(0, businessTypes.length - 1)]
    const taxId = `${randomNumber(10, 99)}-${randomNumber(1000000, 9999999)}`
    const fiscalYearEnd = fiscalYearEndOptions[randomNumber(0, fiscalYearEndOptions.length - 1)]
    const accountingMethod = accountingMethodOptions[randomNumber(0, accountingMethodOptions.length - 1)]
    const industry = industries[randomNumber(0, industries.length - 1)]
    const referredByValue = referredBy[randomNumber(0, referredBy.length - 1)]

    // Weight the statuses to have more active than inactive or pending
    let status
    const statusRoll = Math.random()
    if (statusRoll < 0.7) {
      status = "Active"
    } else if (statusRoll < 0.9) {
      status = "Inactive"
    } else {
      status = "Pending"
    }

    // Generate a date within the last two years, with more recent dates being more common
    const today = new Date()
    const twoYearsAgo = new Date(today)
    twoYearsAgo.setFullYear(today.getFullYear() - 2)

    // Bias towards more recent dates (last 6 months)
    let submittedDate
    const dateRoll = Math.random()
    if (dateRoll < 0.7) {
      const sixMonthsAgo = new Date(today)
      sixMonthsAgo.setMonth(today.getMonth() - 6)
      submittedDate = randomDate(sixMonthsAgo, today)
    } else {
      submittedDate = randomDate(twoYearsAgo, today)
    }

    data.push({
      id: `CI-${1000 + i}`,
      clientName,
      contactPerson,
      email,
      phone,
      address,
      businessType,
      taxId,
      fiscalYearEnd,
      accountingMethod,
      industry,
      referredBy: referredByValue,
      status,
      submittedAt: submittedDate.toISOString(),
    })
  }

  return data
}

// Function to generate random tax filing data
export function generateTaxFilingData(count: number) {
  const filingTypes = ["Individual", "Business", "Partnership", "Non-Profit"]
  const individualFilingStatuses = [
    "Single",
    "Married Filing Jointly",
    "Married Filing Separately",
    "Head of Household",
    "Qualifying Widow(er)",
  ]
  const businessFilingStatuses = ["C-Corporation", "S-Corporation", "LLC", "Sole Proprietorship"]
  const partnershipFilingStatuses = ["General Partnership", "Limited Partnership", "LLP", "LLLP"]
  const nonProfitFilingStatuses = ["501(c)(3)", "501(c)(4)", "501(c)(6)", "501(c)(7)"]
  const statuses = ["Draft", "Submitted", "Processing", "Completed", "Rejected"]
  const taxYears = ["2022", "2023", "2024"]

  const data = []

  for (let i = 0; i < count; i++) {
    // For individuals, use a person's name; for others, use a company name
    const filingType = filingTypes[randomNumber(0, filingTypes.length - 1)]
    const clientName = filingType === "Individual" ? generateRandomName() : generateRandomCompanyName()

    const taxYear = taxYears[randomNumber(0, taxYears.length - 1)]

    // Generate appropriate tax ID based on filing type
    let taxId
    if (filingType === "Individual") {
      taxId = `${randomNumber(100, 999)}-${randomNumber(10, 99)}-${randomNumber(1000, 9999)}`
    } else {
      taxId = `${randomNumber(10, 99)}-${randomNumber(1000000, 9999999)}`
    }

    // Select appropriate filing status based on filing type
    let filingStatus
    if (filingType === "Individual") {
      filingStatus = individualFilingStatuses[randomNumber(0, individualFilingStatuses.length - 1)]
    } else if (filingType === "Business") {
      filingStatus = businessFilingStatuses[randomNumber(0, businessFilingStatuses.length - 1)]
    } else if (filingType === "Partnership") {
      filingStatus = partnershipFilingStatuses[randomNumber(0, partnershipFilingStatuses.length - 1)]
    } else {
      filingStatus = nonProfitFilingStatuses[randomNumber(0, nonProfitFilingStatuses.length - 1)]
    }

    // Generate appropriate income ranges based on filing type
    let incomeMin, incomeMax
    if (filingType === "Individual") {
      incomeMin = 30000
      incomeMax = 250000
    } else if (filingType === "Non-Profit") {
      incomeMin = 100000
      incomeMax = 5000000
    } else {
      incomeMin = 100000
      incomeMax = 10000000
    }

    const income = randomNumber(incomeMin, incomeMax)

    // Calculate realistic deductions (10-40% of income)
    const deductionRate = randomNumber(10, 40) / 100
    const deductions = Math.round(income * deductionRate)

    // Calculate realistic credits (0-5% of income)
    const creditRate = randomNumber(0, 5) / 100
    const credits = Math.round(income * creditRate)

    // Generate dependents for individuals only
    const dependents = filingType === "Individual" ? randomNumber(0, 5) : 0

    // Weight the statuses
    let status
    const statusRoll = Math.random()
    if (statusRoll < 0.15) {
      status = "Draft"
    } else if (statusRoll < 0.3) {
      status = "Submitted"
    } else if (statusRoll < 0.5) {
      status = "Processing"
    } else if (statusRoll < 0.9) {
      status = "Completed"
    } else {
      status = "Rejected"
    }

    // Calculate tax amount based on income, deductions, and credits
    // More realistic tax calculation
    const taxableIncome = Math.max(0, income - deductions)
    let taxRate

    if (filingType === "Individual") {
      // Progressive tax rate for individuals
      if (taxableIncome <= 50000) taxRate = 0.1
      else if (taxableIncome <= 100000) taxRate = 0.15
      else if (taxableIncome <= 200000) taxRate = 0.25
      else taxRate = 0.32
    } else if (filingType === "Business" && filingStatus === "C-Corporation") {
      taxRate = 0.21 // Flat corporate tax rate
    } else if (filingType === "Non-Profit") {
      taxRate = 0 // Non-profits generally don't pay income tax
    } else {
      // Pass-through entities or other business types
      taxRate = 0.25
    }

    const calculatedTax = Math.max(0, Math.round(taxableIncome * taxRate - credits))

    // Generate dates
    const today = new Date()
    const oneYearAgo = new Date(today)
    oneYearAgo.setFullYear(today.getFullYear() - 1)

    // Tax filing dates tend to cluster around tax deadlines
    const submittedDate = randomDate(oneYearAgo, today)

    // Due dates are typically April 15 or October 15 (with extension)
    const dueYear = Number.parseInt(taxYear)
    let dueDate
    if (Math.random() < 0.8) {
      // Regular due date (April 15)
      dueDate = new Date(dueYear, 3, 15)
    } else {
      // Extended due date (October 15)
      dueDate = new Date(dueYear, 9, 15)
    }

    data.push({
      id: `TF-${1000 + i}`,
      clientName,
      taxYear,
      filingType,
      taxId,
      filingStatus,
      dependents,
      income,
      deductions,
      credits,
      status,
      amount: calculatedTax,
      submittedAt: submittedDate.toISOString(),
      dueDate: dueDate.toISOString(),
    })
  }

  return data
}

// Function to generate random user data
export function generateUserData(count: number) {
  const roles = ["Admin", "Partner", "Client", "User"]
  const statuses = ["Active", "Inactive", "Pending"]

  const data = []

  // Ensure we have at least one admin
  const adminName = generateRandomName()
  data.push({
    id: `USR-1000`,
    name: adminName,
    email: "admin@accountingszone.com",
    role: "Admin",
    status: "Active",
    lastLogin: new Date().toISOString(),
    createdAt: new Date(2022, 0, 1).toISOString(),
  })

  for (let i = 1; i < count; i++) {
    const name = generateRandomName()

    // Weight the roles to have more clients and partners than admins
    let role
    const roleRoll = Math.random()
    if (roleRoll < 0.05) {
      role = "Admin"
    } else if (roleRoll < 0.35) {
      role = "Partner"
    } else if (roleRoll < 0.85) {
      role = "Client"
    } else {
      role = "User"
    }

    // Generate appropriate email based on role
    let email
    if (role === "Admin") {
      const adminEmails = ["admin", "administrator", "sysadmin", "system", "support"]
      const adminEmail = adminEmails[randomNumber(0, adminEmails.length - 1)]
      email = `${adminEmail}@accountingszone.com`
    } else if (role === "Partner") {
      email = generateBusinessEmail(name, "AccountingsZONE Partner")
    } else {
      email = generateRandomEmail(name)
    }

    // Weight the statuses to have more active users
    let status
    const statusRoll = Math.random()
    if (statusRoll < 0.85) {
      status = "Active"
    } else if (statusRoll < 0.95) {
      status = "Inactive"
    } else {
      status = "Pending"
    }

    // Generate login and creation dates
    const today = new Date()
    const twoYearsAgo = new Date(today)
    twoYearsAgo.setFullYear(today.getFullYear() - 2)

    const createdAt = randomDate(twoYearsAgo, today)

    // Last login should be after creation date
    const lastLogin = randomDate(createdAt, today)

    data.push({
      id: `USR-${1000 + i}`,
      name,
      email,
      role,
      status,
      lastLogin: lastLogin.toISOString(),
      createdAt: createdAt.toISOString(),
    })
  }

  return data
}

// Generate demo data
export const demoData = {
  partnerApplications: generatePartnerApplicationsData(50),
  clientInformation: generateClientInformationData(75),
  taxFilings: generateTaxFilingData(100),
  users: generateUserData(40),
}

// Export the data generation functions for use elsewhere
export const dataGenerators = {
  generatePartnerApplicationsData,
  generateClientInformationData,
  generateTaxFilingData,
  generateUserData,
  randomDate,
  randomNumber,
}
