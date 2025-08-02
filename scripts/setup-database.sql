-- Flashcard App Database Setup Script
-- Run this script in your MySQL terminal after connecting with: mysql -u root -p

-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS flashcard_app;
USE flashcard_app;

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS flashcards;
DROP TABLE IF EXISTS chapters;

-- Create chapters table
CREATE TABLE chapters (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create flashcards table
CREATE TABLE flashcards (
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
    INDEX idx_created_at (created_at),
    FULLTEXT idx_search (question, answer, category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample chapters
INSERT INTO chapters (id, title, description, is_active) VALUES
('chapter-1', 'Chapter 1: Introduction', 'Basic concepts and fundamentals to get you started', true),
('chapter-2', 'Chapter 2: Core Concepts', 'Essential building blocks and key principles', true),
('chapter-3', 'Chapter 3: Advanced Topics', 'More complex concepts and applications', true),
('chapter-4', 'Chapter 4: Expert Level', 'Advanced techniques and specialized knowledge', true);

-- Insert sample flashcards
INSERT INTO flashcards (question, answer, category, chapter_id) VALUES
-- Chapter 1: Introduction
('What is the capital of France?', 'Paris', 'Geography', 'chapter-1'),
('What is 2 + 2?', '4', 'Math', 'chapter-1'),
('What is the largest planet in our solar system?', 'Jupiter', 'Science', 'chapter-1'),
('Who wrote "Romeo and Juliet"?', 'William Shakespeare', 'Literature', 'chapter-1'),
('What is the chemical symbol for gold?', 'Au', 'Science', 'chapter-1'),

-- Chapter 2: Core Concepts
('What is the speed of light?', '299,792,458 meters per second', 'Science', 'chapter-2'),
('What year did World War II end?', '1945', 'History', 'chapter-2'),
('What is the square root of 144?', '12', 'Math', 'chapter-2'),
('What is the capital of Japan?', 'Tokyo', 'Geography', 'chapter-2'),
('Who painted the Mona Lisa?', 'Leonardo da Vinci', 'Art', 'chapter-2'),

-- Chapter 3: Advanced Topics
('What is the theory of relativity?', 'Einstein\'s theory that space and time are relative', 'Science', 'chapter-3'),
('What is the derivative of x²?', '2x', 'Math', 'chapter-3'),
('What is the largest ocean on Earth?', 'Pacific Ocean', 'Geography', 'chapter-3'),
('Who wrote "Pride and Prejudice"?', 'Jane Austen', 'Literature', 'chapter-3'),
('What is the atomic number of carbon?', '6', 'Science', 'chapter-3'),

-- Chapter 4: Expert Level
('What is quantum entanglement?', 'When particles become correlated regardless of distance', 'Science', 'chapter-4'),
('What is the Riemann Hypothesis?', 'A conjecture about the distribution of prime numbers', 'Math', 'chapter-4'),
('What is the capital of Brazil?', 'Brasília', 'Geography', 'chapter-4'),
('Who wrote "The Divine Comedy"?', 'Dante Alighieri', 'Literature', 'chapter-4'),
('What is the molecular formula for glucose?', 'C₆H₁₂O₆', 'Science', 'chapter-4');

-- Create additional useful indexes
CREATE INDEX idx_chapter_category ON flashcards(chapter_id, category);
CREATE INDEX idx_question_length ON flashcards((LENGTH(question)));

-- Show the created tables
SHOW TABLES;

-- Show table structures
DESCRIBE chapters;
DESCRIBE flashcards;

-- Show sample data
SELECT 'Chapters:' as info;
SELECT id, title, description, is_active FROM chapters;

SELECT 'Flashcards by Chapter:' as info;
SELECT 
    c.title as chapter,
    f.category,
    COUNT(*) as card_count
FROM chapters c
LEFT JOIN flashcards f ON c.id = f.chapter_id
GROUP BY c.id, c.title, f.category
ORDER BY c.id, f.category;

-- Show total statistics
SELECT 
    'Database Statistics:' as info,
    (SELECT COUNT(*) FROM chapters) as total_chapters,
    (SELECT COUNT(*) FROM flashcards) as total_cards,
    (SELECT COUNT(DISTINCT category) FROM flashcards) as unique_categories;

-- Grant permissions (adjust username as needed)
-- GRANT ALL PRIVILEGES ON flashcard_app.* TO 'your_username'@'localhost';
-- FLUSH PRIVILEGES;

SELECT 'Database setup completed successfully!' as status; 