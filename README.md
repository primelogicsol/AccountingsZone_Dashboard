
# Accounting Zone Admin Dashboard

A comprehensive admin dashboard for Accounting Zone, allowing administrators to manage partner applications, client information, tax filings, and website data.

## Features

- 🔐 **Authentication**: Secure user authentication and role-based access control
- 📊 **Analytics**: Real-time analytics and reporting dashboards
- 📝 **Form Management**: Handle partner applications, client information, and tax filings
- 📨 **Website Data Integration**: Fetch and display data from the main Accounting Zone website
- 🌓 **Dark/Light Mode**: Customizable UI themes
  
## Tech Stack

- **Frontend**: Next.js 13+, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **Database**: Prisma ORM
- **API**: Next.js API Routes
- **Charts**: Recharts for data visualization

## Getting Started

### Prerequisites

- Node.js 16.8+ 
- npm or yarn
- PostgreSQL database (or any database supported by Prisma)


## Environment Variables

Create a `.env.local` file in the project root with the following variables:


# Database
DATABASE_URL="postgresql://username:password@localhost:5432/accounting_dashboard"
WEBSITE_DATABASE_URL="postgresql://username:password@localhost:5432/accounting_website"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Cloudinary (for file uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Prisma](https://prisma.io/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Recharts](https://recharts.org/)
```
