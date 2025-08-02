# Database Setup Guide

## 🗄️ MySQL Database Setup for Flashcard App

### Step 1: Install Dependencies

First, install the required Node.js packages:

```bash
npm install
```

### Step 2: Configure Environment

1. Copy the environment template:
   ```bash
   cp env.example .env.local
   ```

2. Edit `.env.local` with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_actual_mysql_password
   DB_NAME=flashcard_app
   DB_PORT=3306
   ```

### Step 3: Set Up Database Schema

#### Option A: Using the SQL Script (Recommended)

1. Connect to MySQL:
   ```bash
   mysql -u root -p
   ```

2. Run the setup script:
   ```bash
   source scripts/setup-database.sql;
   ```

#### Option B: Using Node.js Script

```bash
npm run init-db
```

### Step 4: Verify Database Setup

Connect to MySQL and run these commands to verify:

```sql
USE flashcard_app;

-- Check tables
SHOW TABLES;

-- Check chapters
SELECT * FROM chapters;

-- Check flashcards
SELECT 
    c.title as chapter,
    f.category,
    f.question,
    f.answer
FROM chapters c
JOIN flashcards f ON c.id = f.chapter_id
ORDER BY c.id, f.category;

-- Check statistics
SELECT 
    COUNT(*) as total_chapters FROM chapters;
SELECT 
    COUNT(*) as total_cards FROM flashcards;
```

### Step 5: Start the Application

```bash
npm run dev
```

## 📊 Database Schema

### Chapters Table
```sql
CREATE TABLE chapters (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Flashcards Table
```sql
CREATE TABLE flashcards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(255) NOT NULL,
    chapter_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
);
```

## 🔍 Sample Data

The database comes pre-loaded with:

- **4 Chapters**: Introduction, Core Concepts, Advanced Topics, Expert Level
- **20 Flashcards**: Across various categories (Science, Math, Geography, Literature, History, Art)
- **6 Categories**: Science, Math, Geography, Literature, History, Art

## 🛠️ Database Features

### Indexes for Performance
- Primary keys on all tables
- Foreign key indexes
- Category indexes for filtering
- Full-text search on flashcard content
- Composite indexes for common queries

### Data Integrity
- Foreign key constraints with CASCADE delete
- NOT NULL constraints on required fields
- Automatic timestamp management
- Unicode support (utf8mb4)

### Search Capabilities
- Full-text search on questions, answers, and categories
- Efficient filtering by chapter and category
- Optimized queries for the sidebar search

## 🔧 Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure MySQL is running: `sudo service mysql start`
   - Check port 3306 is open
   - Verify credentials in `.env.local`

2. **Access Denied**
   - Check MySQL user permissions
   - Verify password in `.env.local`
   - Try: `mysql -u root -p` to test connection

3. **Database Not Found**
   - Run the setup script again
   - Check database name in `.env.local`
   - Verify database exists: `SHOW DATABASES;`

4. **Tables Missing**
   - Run the SQL setup script
   - Check for errors in the script execution
   - Verify table creation: `SHOW TABLES;`

### Useful MySQL Commands

```sql
-- Show all databases
SHOW DATABASES;

-- Use the flashcard database
USE flashcard_app;

-- Show all tables
SHOW TABLES;

-- Show table structure
DESCRIBE chapters;
DESCRIBE flashcards;

-- Show indexes
SHOW INDEX FROM flashcards;

-- Check foreign keys
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE REFERENCED_TABLE_SCHEMA = 'flashcard_app';
```

## 🚀 Next Steps

After setting up the database:

1. **Test the Application**: Visit `http://localhost:3000`
2. **Add Your Own Content**: Use the "Manage Cards" and "Add Chapter" buttons
3. **Customize Categories**: Add new categories through the card management interface
4. **Backup Your Data**: Regularly export your database for safekeeping

## 📈 Performance Tips

- The database is optimized for read-heavy workloads
- Full-text search is available for efficient content discovery
- Indexes are created for common query patterns
- Connection pooling is configured for optimal performance

Your flashcard app is now ready with a robust MySQL backend! 🎉 