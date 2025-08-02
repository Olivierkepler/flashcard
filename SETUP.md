# Flashcard App Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
Create `.env.local` file in the root directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=flashcard_app
DB_PORT=3306
```

### 3. Initialize Database
```bash
npm run init-db
```

### 4. Test Database Connection
```bash
npm run test-db
```

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your flashcard app!

## 📁 Project Structure

```
flashcard_aws/
├── app/
│   ├── components/
│   │   ├── Flashcard.tsx      # 3D flip card component
│   │   ├── CardManager.tsx    # Card CRUD modal
│   │   ├── ChapterManager.tsx # Chapter CRUD modal
│   │   └── Sidebar.tsx        # Navigation with search
│   ├── api/
│   │   ├── chapters/
│   │   │   ├── route.ts       # Chapter CRUD API
│   │   │   └── [id]/route.ts  # Individual chapter API
│   │   └── flashcards/
│   │       ├── route.ts       # Flashcard CRUD API
│   │       └── [id]/route.ts  # Individual flashcard API
│   ├── globals.css            # Styles with 3D animations
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main app component
├── lib/
│   ├── api.ts                 # API service layer
│   └── database.ts            # Database configuration
├── scripts/
│   ├── init-db.js             # Database initialization
│   ├── test-db.js             # Database testing
│   └── setup-database.sql     # SQL setup script
├── .env.local                 # Environment variables
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## 🗄️ Database Schema

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

## ✨ Features

### 🎯 Core Functionality
- **3D Card Flip Animation** - Smooth, realistic card flipping
- **Chapter Organization** - Sidebar with different chapters
- **Category Filtering** - Filter cards by categories
- **Study Modes** - Sequential and random study modes
- **Progress Tracking** - Visual progress bar

### 🔍 Search & Navigation
- **Real-time Search** - Search chapters and cards instantly
- **Sidebar Navigation** - Collapsible chapter list
- **Category Filtering** - Filter by subject categories
- **Cross-chapter Search** - Find content across all chapters

### 📝 Content Management
- **Chapter CRUD** - Add, edit, delete chapters
- **Card CRUD** - Add, edit, delete flashcards
- **Category Management** - Organize by subject categories
- **Bulk Operations** - Manage multiple cards efficiently

### 🎨 Modern UI/UX
- **Responsive Design** - Works on all devices
- **Beautiful Animations** - Smooth transitions
- **Accessibility** - Keyboard navigation support
- **Loading States** - User feedback during operations

## 🔧 API Endpoints

### Chapters
- `GET /api/chapters` - Get all chapters
- `POST /api/chapters` - Create chapter
- `PUT /api/chapters/[id]` - Update chapter
- `DELETE /api/chapters/[id]` - Delete chapter

### Flashcards
- `GET /api/flashcards` - Get all flashcards
- `GET /api/flashcards?chapterId=X` - Get cards by chapter
- `POST /api/flashcards` - Create flashcard
- `PUT /api/flashcards/[id]` - Update flashcard
- `DELETE /api/flashcards/[id]` - Delete flashcard

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run init-db      # Initialize database
npm run test-db      # Test database connection
```

### Environment Variables
```env
DB_HOST=localhost          # Database host
DB_USER=root              # Database user
DB_PASSWORD=password      # Database password
DB_NAME=flashcard_app     # Database name
DB_PORT=3306              # Database port
```

## 🐛 Troubleshooting

### Database Issues
1. **Connection Failed**
   ```bash
   # Check MySQL is running
   sudo service mysql start
   
   # Test connection
   mysql -u root -p
   ```

2. **Database Not Found**
   ```bash
   # Reinitialize database
   npm run init-db
   ```

3. **Permission Denied**
   ```bash
   # Check .env.local file
   cat .env.local
   
   # Verify MySQL user permissions
   mysql -u root -p -e "SHOW GRANTS FOR 'root'@'localhost';"
   ```

### App Issues
1. **TypeScript Errors**
   ```bash
   # Check for type errors
   npx tsc --noEmit
   ```

2. **Build Errors**
   ```bash
   # Clean and rebuild
   rm -rf .next
   npm run build
   ```

3. **Runtime Errors**
   ```bash
   # Check browser console
   # Check terminal for server errors
   ```

## 📊 Sample Data

The app comes with:
- **4 Chapters**: Introduction, Core Concepts, Advanced Topics, Expert Level
- **20 Flashcards**: Across Science, Math, Geography, Literature, History, Art
- **6 Categories**: Ready for immediate use

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Setup
Ensure your production environment has:
- MySQL database
- Proper environment variables
- Node.js 18+ runtime

## 📈 Performance

- **Optimized Queries** - Indexed database operations
- **Connection Pooling** - Efficient database connections
- **Full-text Search** - Fast content discovery
- **Lazy Loading** - Optimized component loading

## 🔒 Security

- **SQL Injection Protection** - Parameterized queries
- **Input Validation** - Server-side validation
- **Error Handling** - Graceful error management
- **Environment Variables** - Secure configuration

Your flashcard app is now ready for development and production! 🎉 