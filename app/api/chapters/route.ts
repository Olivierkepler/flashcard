import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';

// GET /api/chapters - Get all chapters
export async function GET() {
  try {
    const connection = await pool.getConnection();
    
    const [chapters] = await connection.execute(`
      SELECT 
        c.id,
        c.title,
        c.description,
        c.is_active,
        COUNT(f.id) as cards
      FROM chapters c
      LEFT JOIN flashcards f ON c.id = f.chapter_id
      GROUP BY c.id, c.title, c.description, c.is_active
      ORDER BY c.created_at ASC
    `);

    connection.release();
    
    return NextResponse.json(chapters);
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chapters' },
      { status: 500 }
    );
  }
}

// POST /api/chapters - Create a new chapter
export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json();
    
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    const chapterId = `chapter-${Date.now()}`;
    
    await connection.execute(
      'INSERT INTO chapters (id, title, description) VALUES (?, ?, ?)',
      [chapterId, title, description || null]
    );

    const [newChapter] = await connection.execute(
      'SELECT * FROM chapters WHERE id = ?',
      [chapterId]
    );

    connection.release();
    
    return NextResponse.json(newChapter[0], { status: 201 });
  } catch (error) {
    console.error('Error creating chapter:', error);
    return NextResponse.json(
      { error: 'Failed to create chapter' },
      { status: 500 }
    );
  }
} 