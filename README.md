# 📚 Flashcard Learning App

A modern, responsive flashcard application built with Next.js, React, TypeScript, and MySQL. Perfect for students, educators, and anyone who wants to create and study flashcards with an intuitive interface.

![Flashcard App Demo](https://img.shields.io/badge/Status-Live%20Demo-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38B2AC)

## ✨ Features

### 🎯 Core Functionality
- **3D Card Flip Animation** - Smooth, interactive card flipping with CSS transforms
- **Sequential & Random Study Modes** - Choose your preferred learning style
- **Progress Tracking** - Visual progress bar showing your study progress
- **Category Filtering** - Filter cards by categories (Science, Math, History, etc.)

### 📱 Responsive Design
- **Mobile-First Approach** - Optimized for all screen sizes
- **Touch-Friendly Interface** - Perfect for mobile and tablet use
- **Adaptive Layouts** - Automatically adjusts to device orientation
- **Cross-Platform Compatibility** - Works on iOS, Android, Windows, macOS, Linux

### 🔍 Smart Search & Organization
- **Real-time Search** - Search across chapters and cards instantly
- **Chapter Management** - Organize content into logical chapters
- **Sidebar Navigation** - Easy chapter switching with collapsible sidebar
- **Debounced Search** - Performance-optimized search with 300ms delay

### 💾 Data Management
- **MySQL Database** - Robust, scalable data storage
- **CRUD Operations** - Full Create, Read, Update, Delete functionality
- **Data Persistence** - All data saved to database
- **Foreign Key Relationships** - Proper data integrity with cascading deletes

### 🎨 User Experience
- **Modern UI/UX** - Clean, intuitive interface with Tailwind CSS
- **Loading States** - Smooth loading indicators
- **Error Handling** - Graceful error messages and recovery
- **Accessibility** - Keyboard navigation and screen reader support

## 🏗️ Architecture

### Frontend Stack
- **Next.js 14** - React framework with App Router
- **React 18** - UI library with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Transforms** - 3D animations and transitions

### Backend Stack
- **Next.js API Routes** - Serverless API endpoints
- **MySQL 8.0** - Relational database
- **mysql2/promise** - Async MySQL driver
- **dotenv** - Environment variable management

### Database Schema
```sql
-- Chapters table
CREATE TABLE chapters (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Flashcards table
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

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flashcard_aws
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=flashcard_app
   DB_PORT=3306
   ```

4. **Initialize the database**
   ```bash
   npm run init-db
   ```

5. **Test the database connection**
   ```bash
   npm run test-db
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
flashcard_aws/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── chapters/             # Chapter CRUD endpoints
│   │   └── flashcards/           # Flashcard CRUD endpoints
│   ├── components/               # React Components
│   │   ├── Flashcard.tsx         # 3D flip card component
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   ├── CardManager.tsx       # Card management modal
│   │   ├── ChapterManager.tsx    # Chapter management modal
│   │   └── Navigation.tsx        # Navigation bar component
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main application page
├── lib/                          # Utility libraries
│   ├── api.ts                    # API service layer
│   └── database.ts               # Database configuration
├── scripts/                      # Database scripts
│   ├── init-db.js                # Database initialization
│   ├── test-db.js                # Database testing
│   └── setup-database.sql        # SQL setup script
├── public/                       # Static assets
├── .env.local                    # Environment variables
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## 🎮 How to Use

### Getting Started
1. **Browse Chapters** - Use the sidebar to navigate between different chapters
2. **Study Cards** - Click on cards to flip them, use navigation buttons to move between cards
3. **Filter Content** - Use the category dropdown to filter cards by subject
4. **Search** - Use the search bar in the sidebar to find specific content

### Managing Content
1. **Add Chapters** - Click "Add Chapter" in the sidebar
2. **Add Cards** - Click "Manage Cards" and then "Add Card"
3. **Edit Content** - Use the edit buttons in the management modals
4. **Delete Content** - Use the delete buttons (with confirmation)

### Study Modes
- **Sequential Mode** - Study cards in order
- **Random Mode** - Study cards in random order
- **Shuffle Cards** - Randomize the current card order

## 🔧 API Endpoints

### Chapters
- `GET /api/chapters` - Get all chapters with card counts
- `POST /api/chapters` - Create a new chapter
- `GET /api/chapters/[id]` - Get a specific chapter
- `PUT /api/chapters/[id]` - Update a chapter
- `DELETE /api/chapters/[id]` - Delete a chapter

### Flashcards
- `GET /api/flashcards` - Get all flashcards (with optional chapter filter)
- `POST /api/flashcards` - Create a new flashcard
- `GET /api/flashcards/[id]` - Get a specific flashcard
- `PUT /api/flashcards/[id]` - Update a flashcard
- `DELETE /api/flashcards/[id]` - Delete a flashcard

## 🆓 Free Deployment Options

### 💰 Completely Free Setup (Recommended)

This guide shows you how to deploy your flashcard app **completely for free** using free tiers of popular services.

#### 🎯 Free Stack Overview
- **Frontend**: Vercel (Free tier)
- **Database**: PlanetScale (Free tier)
- **Domain**: Vercel subdomain (Free) or custom domain
- **Total Cost**: $0/month

#### 📊 Free Tier Limits
- **Vercel**: 100GB bandwidth, 100 serverless function executions/day
- **PlanetScale**: 1 database, 1 billion row reads/month, 10 million row writes/month
- **Perfect for**: Personal projects, small teams, learning purposes

### 🚀 Step 1: Free Database Setup

#### Option A: PlanetScale (Recommended - Best Free Tier)

1. **Create Free PlanetScale Account**
   ```bash
   # Go to https://planetscale.com
   # Sign up with GitHub (free)
   # No credit card required
   ```

2. **Create Free Database**
   - Click "New Database"
   - Name: `flashcard-app`
   - Region: Choose closest to you
   - Plan: **Hobby (Free)**

3. **Get Connection Details**
   - Go to your database dashboard
   - Click "Connect" → "Connect with Prisma"
   - Copy the connection string

4. **Update Database Configuration**
   ```typescript
   // lib/database.ts
   const dbConfig = {
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     port: parseInt(process.env.DB_PORT || '3306'),
     ssl: {
       rejectUnauthorized: false
     }
   };
   ```

#### Option B: Railway (Alternative Free Option)

1. **Create Free Railway Account**
   ```bash
   # Go to https://railway.app
   # Sign up with GitHub
   # Get $5 free credit monthly
   ```

2. **Create MySQL Database**
   - Click "New Service" → "Database" → "MySQL"
   - Railway provides connection details automatically

#### Option C: Neon (PostgreSQL Alternative)

1. **Create Free Neon Account**
   ```bash
   # Go to https://neon.tech
   # Sign up with GitHub
   # Free tier: 3 projects, 0.5GB storage
   ```

2. **Note**: Requires switching from MySQL to PostgreSQL

### 🚀 Step 2: Free Vercel Deployment

1. **Create Free Vercel Account**
   ```bash
   # Go to https://vercel.com
   # Sign up with GitHub (free)
   # No credit card required
   ```

2. **Prepare Your Code for GitHub**
   ```bash
   # Initialize Git repository
   git init
   git add .
   git commit -m "Initial commit: Free flashcard app deployment"
   
   # Create GitHub repository
   # Go to github.com → New repository
   # Name: flashcard-app
   # Make it public or private
   
   # Push to GitHub
   git remote add origin https://github.com/YOUR_USERNAME/flashcard-app.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy to Vercel**
   - Go to Vercel dashboard
   - Click "New Project"
   - Import your GitHub repository
   - Framework: Next.js (auto-detected)

4. **Configure Free Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:
   ```
   DB_HOST=your-planetscale-host
   DB_USER=your-planetscale-user
   DB_PASSWORD=your-planetscale-password
   DB_NAME=your-planetscale-database
   DB_PORT=3306
   ```

5. **Deploy**
   - Click "Deploy"
   - Get free URL: `https://your-app.vercel.app`

### 🗄️ Step 3: Initialize Free Database

1. **Update Database Script for Free Tier**
   ```javascript
   // scripts/init-db.js
   require('dotenv').config();
   
   const dbConfig = {
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     port: parseInt(process.env.DB_PORT || '3306'),
     ssl: {
       rejectUnauthorized: false
     }
   };
   ```

2. **Run Database Setup**
   ```bash
   # Set your free database credentials
   export DB_HOST=your-planetscale-host
   export DB_USER=your-planetscale-user
   export DB_PASSWORD=your-planetscale-password
   export DB_NAME=your-planetscale-database
   
   # Initialize database
   npm run init-db
   ```

### 🌐 Step 4: Free Domain Setup

#### Option A: Free Vercel Subdomain
- Automatically provided: `https://your-app.vercel.app`
- No additional setup required
- SSL certificate included

#### Option B: Free Custom Domain (Optional)
- Use services like Freenom for free domains
- Configure DNS in Vercel dashboard
- SSL certificate automatically provided

### 📊 Free Tier Monitoring

#### Vercel Analytics (Free)
- Page views and performance metrics
- Real user monitoring (limited)
- Error tracking

#### Database Monitoring (Free)
- PlanetScale dashboard shows usage
- Connection status monitoring
- Query performance insights

### 🔒 Free Tier Security

#### Environment Variables
- Vercel encrypts environment variables
- Never commit .env files to Git
- Secure credential management

#### Database Security
- SSL connections enabled
- Automatic backups (PlanetScale)
- Access control through dashboard

### 💡 Free Tier Optimization Tips

#### Performance
```typescript
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
  }
}
```

#### Database Optimization
```sql
-- Add indexes for better performance
CREATE INDEX idx_flashcards_chapter_category ON flashcards(chapter_id, category);
CREATE INDEX idx_chapters_active ON chapters(is_active);
```

#### Caching Strategy
```typescript
// Add caching to API routes
export async function GET() {
  // Add cache headers
  return new Response(data, {
    headers: {
      'Cache-Control': 'public, max-age=300, s-maxage=600',
    },
  });
}
```

### 🚨 Free Tier Limitations & Solutions

#### Vercel Limits
- **100GB bandwidth/month**: Usually sufficient for personal projects
- **100 serverless function executions/day**: Monitor usage in dashboard
- **Solution**: Optimize API calls, implement caching

#### PlanetScale Limits
- **1 billion row reads/month**: More than enough for flashcards
- **10 million row writes/month**: Sufficient for normal usage
- **Solution**: Monitor usage, optimize queries

#### Scaling When Needed
- **Upgrade paths available**: Vercel Pro ($20/month), PlanetScale Pro ($29/month)
- **Gradual scaling**: Start free, upgrade as needed
- **No vendor lock-in**: Easy to migrate to other services

### 🎯 Free Deployment Checklist

- [ ] Create free PlanetScale account
- [ ] Create free Vercel account
- [ ] Push code to GitHub
- [ ] Connect Vercel to GitHub repository
- [ ] Set environment variables in Vercel
- [ ] Deploy application
- [ ] Initialize database with sample data
- [ ] Test all functionality
- [ ] Share your free app URL!

### 💰 Cost Breakdown: $0/month

| Service | Plan | Cost | What's Included |
|---------|------|------|-----------------|
| **Vercel** | Hobby | $0 | 100GB bandwidth, custom domains |
| **PlanetScale** | Hobby | $0 | 1 database, 1B reads/month |
| **GitHub** | Free | $0 | Unlimited public repos |
| **Domain** | Vercel subdomain | $0 | SSL certificate included |
| **Total** | | **$0/month** | Production-ready app |

### 🚀 Alternative Free Options

#### Frontend Hosting (Free)
- **Netlify**: Similar to Vercel, great free tier
- **GitHub Pages**: Static hosting, requires build optimization
- **Firebase Hosting**: Google's free hosting service

#### Database Hosting (Free)
- **Supabase**: PostgreSQL with generous free tier
- **Firebase Firestore**: NoSQL database, free tier available
- **MongoDB Atlas**: NoSQL database, free tier available

## 🚀 Deployment Guide (Paid Options)

### Step 1: Prepare Your Project for GitHub

1. **Initialize Git Repository** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Flashcard app with navigation"
   ```

2. **Create a .gitignore file** (if not exists)
   ```bash
   # Dependencies
   node_modules/
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*

   # Environment variables
   .env.local
   .env.development.local
   .env.test.local
   .env.production.local

   # Next.js
   .next/
   out/

   # Production
   build/

   # Misc
   .DS_Store
   *.pem

   # Debug
   .npm
   .eslintcache

   # Local env files
   .env*.local

   # Vercel
   .vercel
   ```

3. **Create GitHub Repository**
   - Go to [GitHub.com](https://github.com)
   - Click "New repository"
   - Name it `flashcard-app` or your preferred name
   - Make it public or private
   - Don't initialize with README (you already have one)

4. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/flashcard-app.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Set Up Production Database

#### Option A: PlanetScale (Recommended for Vercel)
1. **Create PlanetScale Account**
   - Go to [planetscale.com](https://planetscale.com)
   - Sign up with GitHub
   - Create a new database

2. **Get Database Credentials**
   - Go to your database dashboard
   - Click "Connect" → "Connect with Prisma"
   - Copy the connection string

3. **Update Database Configuration**
   ```typescript
   // lib/database.ts
   const dbConfig = {
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     port: parseInt(process.env.DB_PORT || '3306'),
     ssl: {
       rejectUnauthorized: false
     }
   };
   ```

#### Option B: Railway
1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - Create a new project

2. **Add MySQL Database**
   - Click "New Service" → "Database" → "MySQL"
   - Railway will provide connection details

#### Option C: AWS RDS
1. **Create RDS Instance**
   - Go to AWS Console → RDS
   - Create MySQL 8.0 instance
   - Configure security groups for Vercel IPs

### Step 3: Deploy to Vercel

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   In Vercel dashboard, go to your project → Settings → Environment Variables:
   ```
   DB_HOST=your-database-host
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   DB_PORT=3306
   ```

3. **Deploy Settings**
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app
   - You'll get a URL like: `https://your-app.vercel.app`

### Step 4: Initialize Production Database

1. **Update Database Scripts**
   ```javascript
   // scripts/init-db.js
   require('dotenv').config();
   
   // Use production environment variables
   const dbConfig = {
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
     port: parseInt(process.env.DB_PORT || '3306'),
     ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
   };
   ```

2. **Run Database Initialization**
   ```bash
   # Set production environment variables
   export DB_HOST=your-production-host
   export DB_USER=your-production-user
   export DB_PASSWORD=your-production-password
   export DB_NAME=your-production-database
   
   # Run initialization
   npm run init-db
   ```

### Step 5: Configure Custom Domain (Optional)

1. **Add Custom Domain in Vercel**
   - Go to your project → Settings → Domains
   - Add your domain
   - Configure DNS records as instructed

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - No additional configuration needed

## 🔧 Production Configuration

### Environment Variables for Production
```env
# Database Configuration
DB_HOST=your-production-database-host
DB_USER=your-production-database-user
DB_PASSWORD=your-production-database-password
DB_NAME=your-production-database-name
DB_PORT=3306

# Next.js Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Database Connection Pooling
```typescript
// lib/database.ts
const pool = mysql.createPool({
  ...dbConfig,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
});
```

### Performance Optimization
1. **Enable Caching**
   ```typescript
   // next.config.js
   module.exports = {
     experimental: {
       optimizeCss: true,
     },
     compress: true,
     poweredByHeader: false,
   }
   ```

2. **Database Indexes**
   ```sql
   -- Add performance indexes
   CREATE INDEX idx_flashcards_chapter_category ON flashcards(chapter_id, category);
   CREATE INDEX idx_chapters_active ON chapters(is_active);
   ```

## 🧪 Testing Production Deployment

### Health Check
```bash
# Test your deployed app
curl https://your-app.vercel.app/api/chapters
```

### Database Connection Test
```bash
# Test database connectivity
curl https://your-app.vercel.app/api/health
```

### Performance Testing
- Use [Lighthouse](https://developers.google.com/web/tools/lighthouse) for performance audit
- Test on different devices and network conditions
- Monitor Vercel analytics for performance metrics

## 🔄 Continuous Deployment

### Automatic Deployments
- Vercel automatically deploys on every push to main branch
- Preview deployments for pull requests
- Easy rollback to previous versions

### GitHub Actions (Optional)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
```

## 🐛 Troubleshooting Deployment

### Common Issues

**Database Connection Errors**
- Check environment variables in Vercel
- Verify database is accessible from Vercel's IPs
- Test connection string locally

**Build Failures**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify TypeScript compilation

**Environment Variables**
- Double-check all variables are set in Vercel
- Ensure no typos in variable names
- Test with local .env.local file

### Monitoring and Logs
- **Vercel Dashboard**: View deployment logs and analytics
- **Function Logs**: Monitor API route performance
- **Database Monitoring**: Use your database provider's monitoring tools

## 📊 Analytics and Monitoring

### Vercel Analytics
- Page views and performance metrics
- Real user monitoring
- Error tracking

### Database Monitoring
- Connection pool status
- Query performance
- Error rates

## 🔒 Security Considerations

### Environment Variables
- Never commit .env files to Git
- Use Vercel's environment variable encryption
- Rotate database passwords regularly

### Database Security
- Use SSL connections in production
- Implement proper access controls
- Regular security updates

### API Security
- Implement rate limiting
- Validate all inputs
- Use HTTPS in production

## 💰 Cost Optimization

### Vercel Pricing
- **Hobby**: Free tier for personal projects
- **Pro**: $20/month for professional use
- **Enterprise**: Custom pricing for large scale

### Database Pricing
- **PlanetScale**: Free tier available
- **Railway**: Pay-as-you-go pricing
- **AWS RDS**: Pay for what you use

## 🎯 Next Steps

1. **Set up monitoring** for your production app
2. **Configure backups** for your database
3. **Implement user authentication** if needed
4. **Add analytics** to track usage
5. **Set up CI/CD** for automated testing

---

**Your flashcard app is now ready for production! 🚀**

*For additional support, check the troubleshooting section or open an issue on GitHub.*
