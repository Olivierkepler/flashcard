// API service functions for database operations

export interface Chapter {
  id: string;
  title: string;
  description: string;
  is_active: boolean;
  cards: number;
  created_at: string;
  updated_at: string;
}

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  category: string;
  chapter_id: string;
  created_at: string;
  updated_at: string;
}

// Chapter API functions
export const chapterAPI = {
  // Get all chapters
  async getAll(): Promise<Chapter[]> {
    const response = await fetch('/api/chapters');
    if (!response.ok) {
      throw new Error('Failed to fetch chapters');
    }
    return response.json();
  },

  // Get a specific chapter
  async getById(id: string): Promise<Chapter> {
    const response = await fetch(`/api/chapters/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch chapter');
    }
    return response.json();
  },

  // Create a new chapter
  async create(data: { title: string; description?: string }): Promise<Chapter> {
    const response = await fetch('/api/chapters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create chapter');
    }
    return response.json();
  },

  // Update a chapter
  async update(id: string, data: { title: string; description?: string }): Promise<Chapter> {
    const response = await fetch(`/api/chapters/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update chapter');
    }
    return response.json();
  },

  // Delete a chapter
  async delete(id: string): Promise<void> {
    const response = await fetch(`/api/chapters/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete chapter');
    }
  },
};

// Flashcard API functions
export const flashcardAPI = {
  // Get all flashcards (with optional chapter filter)
  async getAll(chapterId?: string): Promise<Flashcard[]> {
    const url = chapterId ? `/api/flashcards?chapterId=${chapterId}` : '/api/flashcards';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch flashcards');
    }
    return response.json();
  },

  // Get a specific flashcard
  async getById(id: number): Promise<Flashcard> {
    const response = await fetch(`/api/flashcards/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch flashcard');
    }
    return response.json();
  },

  // Create a new flashcard
  async create(data: { question: string; answer: string; category: string; chapterId: string }): Promise<Flashcard> {
    const response = await fetch('/api/flashcards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create flashcard');
    }
    return response.json();
  },

  // Update a flashcard
  async update(id: number, data: { question: string; answer: string; category: string; chapterId: string }): Promise<Flashcard> {
    const response = await fetch(`/api/flashcards/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update flashcard');
    }
    return response.json();
  },

  // Delete a flashcard
  async delete(id: number): Promise<void> {
    const response = await fetch(`/api/flashcards/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete flashcard');
    }
  },
}; 