import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'flashcard_app',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Initialize database tables
export async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create chapters table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS chapters (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create flashcards table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS flashcards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category VARCHAR(255) NOT NULL,
        chapter_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
      )
    `);

    // Insert default chapters if they don't exist
    const [existingChapters] = await connection.execute(
      'SELECT COUNT(*) as count FROM chapters'
    );
    
    const chaptersResult = existingChapters as { count: number }[];
    
    if (chaptersResult[0].count === 0) {
      await connection.execute(`
        INSERT INTO chapters (id, title, description, is_active) VALUES
        ('chapter-1', 'Chapter 1: Introduction', 'Basic concepts and fundamentals', true),
        ('chapter-2', 'Chapter 2: Advanced Topics', 'More complex concepts and applications', true)
      `);

      // Insert default flashcards
      await connection.execute(`
        INSERT INTO flashcards (question, answer, category, chapter_id) VALUES
        ('What is the capital of France?', 'Paris', 'Geography', 'chapter-1'),
        ('What is 2 + 2?', '4', 'Math', 'chapter-1'),
        ('What is the largest planet in our solar system?', 'Jupiter', 'Science', 'chapter-1'),
        ('Who wrote ''Romeo and Juliet''?', 'William Shakespeare', 'Literature', 'chapter-2'),
        ('What is the chemical symbol for gold?', 'Au', 'Science', 'chapter-2')
      `);
    }

    connection.release();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

export default pool;