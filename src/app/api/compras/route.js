import { NextResponse } from "next/server";


export async function GET() {
  try {
    return NextResponse.json({ message: "esta es la rura de  get de compras" });
  } catch (error) {
    console.error("Error in GET /api/clientes:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}