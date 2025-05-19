// app/api/website-data/debug/route.ts
import { NextResponse } from 'next/server';
import websitePrisma from '@/lib/website-prisma';

export async function GET() {
  try {
    // List all available models in the website prisma client
    const availableModels = Object.keys(websitePrisma)
      .filter(key => typeof websitePrisma[key] === 'object' && websitePrisma[key] !== null);

    return NextResponse.json({
      success: true,
      databaseUrl: process.env.WEBSITE_DATABASE_URL?.substring(0, 20) + '...',
      availableModels,
    });
  } catch (error) {
    console.error('Error in debug route:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}