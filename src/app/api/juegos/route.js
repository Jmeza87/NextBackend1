import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET() {
    try {
        const db = await pool.getConnection()
        const query = 'SELECT * FROM juegos_play5 order by genero desc '
        const [rows] = await db.execute(query)
        db.release()
        
       // return NextResponse.json(rows)
        return NextResponse.json({ juegos: rows })
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}

export async function POST(request) {
    try {
      const { nombre, genero, lanzamiento } = await request.json();
      const db = await pool.getConnection();
      const query = 'INSERT INTO juegos_play5( nombre, genero, lanzamiento) VALUES (?,?,?)';
      const [result] = await db.execute(query, [nombre, genero, lanzamiento]);
      db.release();
      return NextResponse.json({
        id: result.insertId,
        nombre,
        genero,
        lanzamiento
        
      }, { status: 201 });
    } catch (error) {
      console.error('Error en POST /api/juegos:', error);
      return NextResponse.json({ error: 'Ocurrió un error al crear el producto' }, { status: 500 });
    }
}