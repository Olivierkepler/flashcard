import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/database';

// GET /api/chapters/[id] - Get a specific chapter
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const connection = await pool.getConnection();
    
    const [chapters] = await connection.execute(
      'SELECT * FROM chapters WHERE id = ?',
      [params.id]
    );

    connection.release();
    
    if ((chapters as any[]).length === 0) {
      return NextResponse.json(
        { error: 'Chapter not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(chapters[0]);
  } catch (error) {
    console.error('Error fetching chapter:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chapter' },
      { status: 500 }
    );
  }
}

// PUT /api/chapters/[id] - Update a chapter
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description } = await request.json();
    
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      'UPDATE chapters SET title = ?, description = ? WHERE id = ?',
      [title, description || null, params.id]
    );

    if ((result as any).affectedRows === 0) {
      connection.release();
      return NextResponse.json(
        { error: 'Chapter not found' },
        { status: 404 }
      );
    }

    const [updatedChapter] = await connection.execute(
      'SELECT * FROM chapters WHERE id = ?',
      [params.id]
    );

    connection.release();
    
    return NextResponse.json(updatedChapter[0]);
  } catch (error) {
    console.error('Error updating chapter:', error);
    return NextResponse.json(
      { error: 'Failed to update chapter' },
      { status: 500 }
    );
  }
}

// DELETE /api/chapters/[id] - Delete a chapter
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const connection = await pool.getConnection();
    
    const [result] = await connection.execute(
      'DELETE FROM chapters WHERE id = ?',
      [params.id]
    );

    connection.release();
    
    if ((result as any).affectedRows === 0) {
      return NextResponse.json(
        { error: 'Chapter not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Chapter deleted successfully' });
  } catch (error) {
    console.error('Error deleting chapter:', error);
    return NextResponse.json(
      { error: 'Failed to delete chapter' },
      { status: 500 }
    );
  }
} 