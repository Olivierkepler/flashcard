import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';

// GET /api/flashcards/[id] - Get a specific flashcard
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const connection = await pool.getConnection();
    
    const [flashcards] = await connection.execute(
      'SELECT * FROM flashcards WHERE id = ?',
      [params.id]
    );

    connection.release();
    
    if ((flashcards as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Flashcard not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(flashcards[0]);
  } catch (error) {
    console.error('Error fetching flashcard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flashcard' },
      { status: 500 }
    );
  }
}

// PUT /api/flashcards/[id] - Update a flashcard
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      'UPDATE flashcards SET question = ?, answer = ?, category = ?, chapter_id = ? WHERE id = ?',
      [question, answer, category, chapterId, params.id]
    );

    if ((result as any).affectedRows === 0) {
      connection.release();
      return NextResponse.json(
        { error: 'Flashcard not found' },
        { status: 404 }
      );
    }

    const [updatedCard] = await connection.execute(
      'SELECT * FROM flashcards WHERE id = ?',
      [params.id]
    );

    connection.release();
    
    return NextResponse.json(updatedCard[0]);
  } catch (error) {
    console.error('Error updating flashcard:', error);
    return NextResponse.json(
      { error: 'Failed to update flashcard' },
      { status: 500 }
    );
  }
}

// DELETE /api/flashcards/[id] - Delete a flashcard
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      'DELETE FROM flashcards WHERE id = ?',
      [params.id]
    );

    connection.release();
    
    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Flashcard not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    console.error('Error deleting flashcard:', error);
    return NextResponse.json(
      { error: 'Failed to delete flashcard' },
      { status: 500 }
    );
  }
} 