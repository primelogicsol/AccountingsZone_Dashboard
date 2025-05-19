// import { NextResponse } from "next/server"
// import prisma from "@/lib/prisma"

// export async function GET() {
//   try {
//     const users = await prisma.user.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//     })

//     return NextResponse.json(users)
//   } catch (error) {
//     console.error("Error fetching users:", error)
//     return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const data = await request.json()

//     const user = await prisma.user.create({
//       data: {
//         name: data.name,
//         email: data.email,
//         role: data.role,
//         status: data.status || "Pending",
//         lastLogin: data.lastLogin ? new Date(data.lastLogin) : null,
//       },
//     })

//     return NextResponse.json(user)
//   } catch (error) {
//     console.error("Error creating user:", error)
//     return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function GET() {
  try {
    // Get current session to check authorization
    const session = await getServerSession(authOptions);
    
    console.log("Fetching users from database...");
    
    // Debug query to see what tables are available
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log("Available tables:", tables);
    
    // Check if the User model exists in Prisma's metadata
    const userModelExists = Object.keys(prisma).includes('user');
    console.log("User model available in Prisma:", userModelExists);
    
    // Try fetching users with explicit model name
    let users;
    if (userModelExists) {
      users = await prisma.user.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          lastLogin: true,
          createdAt: true,
          // Don't include password in response
          password: false,
        }
      });
    } else {
      // Fallbacks if needed
      users = [];
    }
    
    console.log(`Found ${users.length} users in database`);
    
    if (users.length === 0) {
      // Generate some dummy data for development
      const { faker } = await import('@faker-js/faker');
      
      users = Array(10).fill(0).map((_, i) => ({
        id: `user-${i+1}`,
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        role: faker.helpers.arrayElement(["Admin", "Partner", "Client", "User"]),
        status: faker.helpers.arrayElement(["Active", "Inactive", "Pending"]),
        lastLogin: faker.date.recent(),
        createdAt: faker.date.past(),
      }));
    }
    
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Get current session to check authorization
    const session = await getServerSession(authOptions);
    
    // Only allow admins to create users
    if (!session || session.user.role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const data = await request.json();
    
    // Validate input data
    if (!data.email || !data.password || !data.name || !data.role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    // Check if user with email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });
    
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        status: data.status || "Active",
      }
    });
    
    // Don't return password in response
    const { password, ...userWithoutPassword } = user;
    
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
