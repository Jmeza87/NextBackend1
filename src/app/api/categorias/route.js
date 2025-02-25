import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET() {
    try {
        const db = await pool.getConnection()
        const query = 'select * from categorias'
        const [rows] = await db.execute(query)
        db.release()
        
       // return NextResponse.json(rows)
        return NextResponse.json({ results: rows })
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}