import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface Params {
  id: string;
}

interface Flashcard extends RowDataPacket {
  id: number;
  question: string;
  answer: string;
  category: string;
  chapter_id: number;
  created_at: string;
  updated_at: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;
    const connection = await pool.getConnection();

    const [rows] = await connection.execute<Flashcard[]>(
      'SELECT * FROM flashcards WHERE id = ?',
      [id]
    );

    connection.release();

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ error: 'Flashcard not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching flashcard:', error);
    return NextResponse.json({ error: 'Failed to fetch flashcard' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;
    const body = await request.json() as {
      question: string;
      answer: string;
      category: string;
      chapterId: number;
    };

    const { question, answer, category, chapterId } = body;

    if (!question || !answer || !category || !chapterId) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const connection = await pool.getConnection();

    const [result] = await connection.execute<ResultSetHeader>(
      'UPDATE flashcards SET question = ?, answer = ?, category = ?, chapter_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [question, answer, category, chapterId, id]
    );

    connection.release();

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Flashcard not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Flashcard updated successfully' });
  } catch (error) {
    console.error('Error updating flashcard:', error);
    return NextResponse.json({ error: 'Failed to update flashcard' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;
    const connection = await pool.getConnection();

    const [result] = await connection.execute<ResultSetHeader>(
      'DELETE FROM flashcards WHERE id = ?',
      [id]
    );

    connection.release();

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Flashcard not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    console.error('Error deleting flashcard:', error);
    return NextResponse.json({ error: 'Failed to delete flashcard' }, { status: 500 });
  }
}
