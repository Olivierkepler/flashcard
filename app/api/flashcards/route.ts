import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface Flashcard extends RowDataPacket {
  id: number;
  question: string;
  answer: string;
  category: string;
  chapter_id: number;
  created_at: string;
  updated_at: string;
  chapter_title?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const chapterId = searchParams.get('chapterId');

    const connection = await pool.getConnection();

    let query = `
      SELECT f.*, c.title as chapter_title 
      FROM flashcards f 
      LEFT JOIN chapters c ON f.chapter_id = c.id
    `;
    const queryParams: (string | number)[] = [];

    if (chapterId) {
      query += ' WHERE f.chapter_id = ?';
      queryParams.push(chapterId);
    }

    query += ' ORDER BY f.created_at DESC';

    const [rows] = await connection.execute<Flashcard[]>(query, queryParams);

    connection.release();

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    return NextResponse.json({ error: 'Failed to fetch flashcards' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
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

    const [chapters] = await connection.execute<RowDataPacket[]>(
      'SELECT id FROM chapters WHERE id = ?',
      [chapterId]
    );

    if (!Array.isArray(chapters) || chapters.length === 0) {
      connection.release();
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    const [result] = await connection.execute<ResultSetHeader>(
      'INSERT INTO flashcards (question, answer, category, chapter_id) VALUES (?, ?, ?, ?)',
      [question, answer, category, chapterId]
    );

    const [newCard] = await connection.execute<Flashcard[]>(
      'SELECT * FROM flashcards WHERE id = ?',
      [result.insertId]
    );

    connection.release();

    return NextResponse.json(newCard[0], { status: 201 });
  } catch (error) {
    console.error('Error creating flashcard:', error);
    return NextResponse.json({ error: 'Failed to create flashcard' }, { status: 500 });
  }
}
