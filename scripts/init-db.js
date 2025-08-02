const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function initializeDatabase() {
  let connection;
  
  try {
    console.log('🔌 Connecting to MySQL server...');
    
    // Connect to MySQL server (without specifying database)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: parseInt(process.env.DB_PORT || '3306'),
    });

    console.log('✅ Connected to MySQL server');

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'flashcard_app';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`✅ Database '${dbName}' created or already exists`);

    // Use the database
    await connection.execute(`USE ${dbName}`);

    // Create chapters table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS chapters (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_active (is_active),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Chapters table created');

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
        FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
        INDEX idx_chapter_id (chapter_id),
        INDEX idx_category (category),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Flashcards table created');

    // Add fulltext search index separately
    try {
      await connection.query(`
        ALTER TABLE flashcards 
        ADD FULLTEXT INDEX idx_search (question, answer, category)
      `);
      console.log('✅ Fulltext search index created');
    } catch (error) {
      if (error.code === 'ER_DUP_KEYNAME') {
        console.log('ℹ️  Fulltext search index already exists');
      } else {
        throw error;
      }
    }

    // Check if default data exists
    const [existingChapters] = await connection.execute(
      'SELECT COUNT(*) as count FROM chapters'
    );
    
    if (existingChapters[0].count === 0) {
      console.log('📝 Inserting default data...');
      
      // Insert default chapters
      await connection.execute(`
        INSERT INTO chapters (id, title, description, is_active) VALUES
        ('chapter-1', 'Chapter 1: Introduction', 'Basic concepts and fundamentals to get you started', true),
        ('chapter-2', 'Chapter 2: Core Concepts', 'Essential building blocks and key principles', true),
        ('chapter-3', 'Chapter 3: Advanced Topics', 'More complex concepts and applications', true),
        ('chapter-4', 'Chapter 4: Expert Level', 'Advanced techniques and specialized knowledge', true)
      `);
      console.log('✅ Default chapters inserted');

      // Insert default flashcards
      await connection.execute(`
        INSERT INTO flashcards (question, answer, category, chapter_id) VALUES
        ('What is the capital of France?', 'Paris', 'Geography', 'chapter-1'),
        ('What is 2 + 2?', '4', 'Math', 'chapter-1'),
        ('What is the largest planet in our solar system?', 'Jupiter', 'Science', 'chapter-1'),
        ('Who wrote "Romeo and Juliet"?', 'William Shakespeare', 'Literature', 'chapter-1'),
        ('What is the chemical symbol for gold?', 'Au', 'Science', 'chapter-1'),
        ('What is the speed of light?', '299,792,458 meters per second', 'Science', 'chapter-2'),
        ('What year did World War II end?', '1945', 'History', 'chapter-2'),
        ('What is the square root of 144?', '12', 'Math', 'chapter-2'),
        ('What is the capital of Japan?', 'Tokyo', 'Geography', 'chapter-2'),
        ('Who painted the Mona Lisa?', 'Leonardo da Vinci', 'Art', 'chapter-2'),
        ('What is the theory of relativity?', 'Einstein\'s theory that space and time are relative', 'Science', 'chapter-3'),
        ('What is the derivative of x²?', '2x', 'Math', 'chapter-3'),
        ('What is the largest ocean on Earth?', 'Pacific Ocean', 'Geography', 'chapter-3'),
        ('Who wrote "Pride and Prejudice"?', 'Jane Austen', 'Literature', 'chapter-3'),
        ('What is the atomic number of carbon?', '6', 'Science', 'chapter-3'),
        ('What is quantum entanglement?', 'When particles become correlated regardless of distance', 'Science', 'chapter-4'),
        ('What is the Riemann Hypothesis?', 'A conjecture about the distribution of prime numbers', 'Math', 'chapter-4'),
        ('What is the capital of Brazil?', 'Brasília', 'Geography', 'chapter-4'),
        ('Who wrote "The Divine Comedy"?', 'Dante Alighieri', 'Literature', 'chapter-4'),
        ('What is the molecular formula for glucose?', 'C₆H₁₂O₆', 'Science', 'chapter-4')
      `);
      console.log('✅ Default flashcards inserted');
    } else {
      console.log('ℹ️  Default data already exists, skipping insertion');
    }

    // Show statistics
    const [chapterCount] = await connection.execute('SELECT COUNT(*) as count FROM chapters');
    const [cardCount] = await connection.execute('SELECT COUNT(*) as count FROM flashcards');
    
    console.log('\n📊 Database Statistics:');
    console.log(`   Chapters: ${chapterCount[0].count}`);
    console.log(`   Flashcards: ${cardCount[0].count}`);

    console.log('\n🎉 Database initialization completed successfully!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    if (error.code) {
      console.error(`   Error code: ${error.code}`);
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the initialization
initializeDatabase(); 