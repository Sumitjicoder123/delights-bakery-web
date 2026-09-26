import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import initialCakes from '@/data/cakes.json';

const filePath = path.join(process.cwd(), 'src', 'data', 'cakes.json');

// --- Simple in-memory rate limiter ---
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_MUTATION_REQUESTS = 60; // 60 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_MUTATION_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

// --- Admin Authentication Check ---
function isAuthorized(request: Request): boolean {
  const expectedPin = process.env.ADMIN_PIN || process.env.NEXT_PUBLIC_ADMIN_PIN || '1234';
  
  const headerPin = request.headers.get('x-admin-pin');
  if (headerPin && headerPin === expectedPin) {
    return true;
  }

  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token === expectedPin) {
      return true;
    }
  }

  return false;
}

// --- Sanitization & Validation Helpers ---
function sanitizeString(str: any, maxLength = 150): string {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim().slice(0, maxLength);
}

function sanitizeImageUrl(url: any): string {
  if (typeof url !== 'string') return '/cakes/WhiteForest%20400.jpeg';
  const trimmed = url.trim();
  // Prevent path traversal
  if (trimmed.includes('..')) {
    return '/cakes/WhiteForest%20400.jpeg';
  }
  if (trimmed.startsWith('/') || trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed.slice(0, 1000);
  }
  return '/cakes/WhiteForest%20400.jpeg';
}

function validatePrice(price: any): number | null {
  const num = Number(price);
  if (!Number.isFinite(num) || num <= 0 || num > 100000) {
    return null;
  }
  return Math.round(num);
}

async function readCakes() {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch {
    return initialCakes;
  }
}

async function writeCakes(cakes: any[]) {
  await fs.writeFile(filePath, JSON.stringify(cakes, null, 2), 'utf-8');
}

// Public GET Endpoint
export async function GET() {
  const cakes = await readCakes();
  return NextResponse.json(cakes, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

// Protected POST Endpoint
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized: Invalid or missing admin credentials." }, { status: 401 });
  }

  try {
    const body = await request.json();

    if (body.action === 'seed') {
      await writeCakes(initialCakes);
      return NextResponse.json({ success: true, cakes: initialCakes });
    }

    const name = sanitizeString(body.name, 80);
    if (!name) {
      return NextResponse.json({ error: "Valid cake name is required." }, { status: 400 });
    }

    const basePrice = validatePrice(body.basePrice || body.price);
    if (basePrice === null) {
      return NextResponse.json({ error: "Valid price (1 - 100,000) is required." }, { status: 400 });
    }

    const description = sanitizeString(body.description || "100% Pure Veg & Eggless fresh cake prepared daily.", 300);
    const image = sanitizeImageUrl(body.image || body.image_url);

    const cakes = await readCakes();
    const newCake = {
      id: sanitizeString(body.id, 50) || `cake-${Date.now()}`,
      name,
      description,
      basePrice,
      weightOptions: Array.isArray(body.weightOptions) && body.weightOptions.length > 0 
        ? body.weightOptions.map((w: any) => sanitizeString(w, 20))
        : ["0.5 kg", "1 kg"],
      dietary: ["100% Eggless"],
      image,
      in_stock: body.in_stock !== false
    };

    cakes.push(newCake);
    await writeCakes(cakes);

    return NextResponse.json({ success: true, cake: newCake });
  } catch {
    return NextResponse.json({ error: "An error occurred while saving cake." }, { status: 500 });
  }
}

// Protected PATCH Endpoint
export async function PATCH(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized: Invalid or missing admin credentials." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const safeId = sanitizeString(id, 60);
    if (!safeId) {
      return NextResponse.json({ error: "Cake ID is required" }, { status: 400 });
    }

    const cakes = await readCakes();
    const index = cakes.findIndex((c: any) => c.id === safeId);

    if (index === -1) {
      return NextResponse.json({ error: "Cake not found" }, { status: 404 });
    }

    if (updates.price !== undefined || updates.basePrice !== undefined) {
      const validPrice = validatePrice(updates.price ?? updates.basePrice);
      if (validPrice !== null) {
        cakes[index].basePrice = validPrice;
      }
    }
    if (updates.in_stock !== undefined) {
      cakes[index].in_stock = Boolean(updates.in_stock);
    }
    if (updates.name !== undefined) {
      const safeName = sanitizeString(updates.name, 80);
      if (safeName) cakes[index].name = safeName;
    }
    if (updates.description !== undefined) {
      cakes[index].description = sanitizeString(updates.description, 300);
    }
    if (updates.image !== undefined) {
      cakes[index].image = sanitizeImageUrl(updates.image);
    }

    await writeCakes(cakes);
    return NextResponse.json({ success: true, cake: cakes[index] });
  } catch {
    return NextResponse.json({ error: "An error occurred while updating cake." }, { status: 500 });
  }
}

// Protected DELETE Endpoint
export async function DELETE(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized: Invalid or missing admin credentials." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = sanitizeString(searchParams.get('id'), 60);

    if (!id) {
      return NextResponse.json({ error: "Cake ID is required" }, { status: 400 });
    }

    const cakes = await readCakes();
    const filtered = cakes.filter((c: any) => c.id !== id);

    await writeCakes(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "An error occurred while deleting cake." }, { status: 500 });
  }
}
