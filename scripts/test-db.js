const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function testDatabase() {
  let connection;
  
  try {
    console.log('🧪 Testing database connection...');
    
    // Test connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'flashcard_app',
      port: parseInt(process.env.DB_PORT || '3306'),
    });

    console.log('✅ Database connection successful');

    // Test basic queries
    console.log('\n📊 Testing queries...');
    
    const [chapters] = await connection.execute('SELECT COUNT(*) as count FROM chapters');
    const [cards] = await connection.execute('SELECT COUNT(*) as count FROM flashcards');
    
    console.log(`   Chapters: ${chapters[0].count}`);
    console.log(`   Flashcards: ${cards[0].count}`);

    // Test sample data
    const [sampleChapters] = await connection.execute('SELECT id, title FROM chapters LIMIT 3');
    console.log('\n📚 Sample chapters:');
    sampleChapters.forEach(chapter => {
      console.log(`   - ${chapter.title} (${chapter.id})`);
    });

    const [sampleCards] = await connection.execute(`
      SELECT f.question, f.category, c.title as chapter 
      FROM flashcards f 
      JOIN chapters c ON f.chapter_id = c.id 
      LIMIT 3
    `);
    
    console.log('\n🃏 Sample flashcards:');
    sampleCards.forEach(card => {
      console.log(`   - ${card.question} (${card.category}) - ${card.chapter}`);
    });

    // Test search functionality
    console.log('\n🔍 Testing search functionality...');
    const [searchResults] = await connection.execute(`
      SELECT question, answer, category 
      FROM flashcards 
      WHERE MATCH(question, answer, category) AGAINST('science' IN NATURAL LANGUAGE MODE)
      LIMIT 3
    `);
    
    console.log(`   Found ${searchResults.length} cards matching 'science'`);
    searchResults.forEach(card => {
      console.log(`   - ${card.question} (${card.category})`);
    });

    console.log('\n✅ All tests passed! Database is working correctly.');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    if (error.code) {
      console.error(`   Error code: ${error.code}`);
    }
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the test
testDatabase(); 