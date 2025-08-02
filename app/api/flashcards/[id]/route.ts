import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const connection = await pool.getConnection();
    
    const [rows] = await connection.execute(
      'SELECT * FROM flashcards WHERE id = ?',
      [id]
    );
    
    connection.release();
    
    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json(
        { error: 'Flashcard not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching flashcard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flashcard' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { question, answer, category, chapterId } = body;
    
    if (!question || !answer || !category || !chapterId) {
      return NextResponse.json(
        { error: 'Question, answer, category, and chapterId are required' },
        { status: 400 }
      );
    }
    
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      'UPDATE flashcards SET question = ?, answer = ?, category = ?, chapter_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [question, answer, category, chapterId, id]
    );
    
    connection.release();
    
    const updateResult = result as { affectedRows: number };
    
    if (updateResult.affectedRows === 0) {
      return NextResponse.json(
        { error: 'Flashcard not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Flashcard updated successfully' });
  } catch (error) {
    console.error('Error updating flashcard:', error);
    return NextResponse.json(
      { error: 'Failed to update flashcard' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      'DELETE FROM flashcards WHERE id = ?',
      [id]
    );
    
    connection.release();
    
    const deleteResult = result as { affectedRows: number };
    
    if (deleteResult.affectedRows === 0) {
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