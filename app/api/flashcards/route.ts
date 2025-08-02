import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';

// GET /api/flashcards - Get all flashcards (with optional chapter filter)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const chapterId = searchParams.get('chapterId');
    
    const connection = await pool.getConnection();
    
    let query = 'SELECT * FROM flashcards';
    let params: string[] = [];
    
    if (chapterId) {
      query += ' WHERE chapter_id = ?';
      params.push(chapterId);
    }
    
    query += ' ORDER BY created_at ASC';
    
    const [flashcards] = await connection.execute(query, params);
    connection.release();
    
    return NextResponse.json(flashcards);
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flashcards' },
      { status: 500 }
    );
  }
}

// POST /api/flashcards - Create a new flashcard
export async function POST(request: NextRequest) {
  try {
    const { question, answer, category, chapterId } = await request.json();
    
    if (!question || !answer || !category || !chapterId) {
      return NextResponse.json(
        { error: 'Question, answer, category, and chapterId are required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    // Verify chapter exists
    const [chapters] = await connection.execute(
      'SELECT id FROM chapters WHERE id = ?',
      [chapterId]
    );
    
    if ((chapters as any[]).length === 0) {
      connection.release();
      return NextResponse.json(
        { error: 'Chapter not found' },
        { status: 404 }
      );
    }
    
    const [result] = await connection.execute(
      'INSERT INTO flashcards (question, answer, category, chapter_id) VALUES (?, ?, ?, ?)',
      [question, answer, category, chapterId]
    );

    const newCardId = (result as any).insertId;
    
    const [newCard] = await connection.execute(
      'SELECT * FROM flashcards WHERE id = ?',
      [newCardId]
    );

    connection.release();
    
    return NextResponse.json(newCard[0], { status: 201 });
  } catch (error) {
    console.error('Error creating flashcard:', error);
    return NextResponse.json(
      { error: 'Failed to create flashcard' },
      { status: 500 }
    );
  }
} 