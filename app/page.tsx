'use client';

import { useState, useEffect, useCallback } from 'react';
import FlashcardComponent from './components/Flashcard';
import CardManager from './components/CardManager';
import Sidebar from './components/Sidebar';
import ChapterManager from './components/ChapterManager';
import Navigation from './components/Navigation';
import { chapterAPI, flashcardAPI, type Chapter, type Flashcard } from '@/lib/api';

export default function Home() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [showChapterManager, setShowChapterManager] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [studyMode, setStudyMode] = useState<'sequential' | 'random'>('sequential');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load chapters and cards in parallel
      const [chaptersData, cardsData] = await Promise.all([
        chapterAPI.getAll(),
        flashcardAPI.getAll()
      ]);
      
      setChapters(chaptersData);
      setCards(cardsData);
      
      // Set first chapter as selected if available
      if (chaptersData.length > 0 && !selectedChapter) {
        setSelectedChapter(chaptersData[0].id);
      }
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data. Please check your database connection.');
    } finally {
      setLoading(false);
    }
  }, [selectedChapter]);

  // Load data from database on component mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  const currentChapter = chapters.find(ch => ch.id === selectedChapter);
  const chapterCards = cards.filter(card => card.chapter_id === selectedChapter);
  const categories = ['All', ...Array.from(new Set(chapterCards.map(card => card.category)))];
  const filteredCards = selectedCategory === 'All' 
    ? chapterCards 
    : chapterCards.filter(card => card.category === selectedCategory);

  const currentCard = filteredCards[currentCardIndex];

  const nextCard = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const resetCards = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const shuffleCards = () => {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setCards(cards.map(card => {
      const shuffledCard = shuffled.find(sc => sc.id === card.id);
      return shuffledCard || card;
    }));
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  const addCard = async (cardData: { question: string; answer: string; category: string }) => {
    try {
      const newCard = await flashcardAPI.create({
        ...cardData,
        chapterId: selectedChapter
      });
      setCards([...cards, newCard]);
    } catch (err) {
      console.error('Error adding card:', err);
      setError('Failed to add card. Please try again.');
    }
  };

  const editCard = async (id: number, cardData: { question: string; answer: string; category: string }) => {
    try {
      const updatedCard = await flashcardAPI.update(id, {
        ...cardData,
        chapterId: selectedChapter
      });
      setCards(cards.map(card => 
        card.id === id ? updatedCard : card
      ));
    } catch (err) {
      console.error('Error updating card:', err);
      setError('Failed to update card. Please try again.');
    }
  };

  const deleteCard = async (id: number) => {
    try {
      await flashcardAPI.delete(id);
      setCards(cards.filter(card => card.id !== id));
      if (currentCardIndex >= filteredCards.length - 1) {
        setCurrentCardIndex(Math.max(0, filteredCards.length - 2));
      }
    } catch (err) {
      console.error('Error deleting card:', err);
      setError('Failed to delete card. Please try again.');
    }
  };

  const addChapter = async (chapterData: { title: string; description?: string }) => {
    try {
      const newChapter = await chapterAPI.create(chapterData);
      setChapters([...chapters, newChapter]);
      setSelectedChapter(newChapter.id);
    } catch (err) {
      console.error('Error adding chapter:', err);
      setError('Failed to add chapter. Please try again.');
    }
  };

  const editChapter = async (id: string, chapterData: { title: string; description?: string }) => {
    try {
      const updatedChapter = await chapterAPI.update(id, chapterData);
      setChapters(chapters.map(chapter => 
        chapter.id === id ? updatedChapter : chapter
      ));
    } catch (err) {
      console.error('Error updating chapter:', err);
      setError('Failed to update chapter. Please try again.');
    }
  };

  const deleteChapter = async (id: string) => {
    try {
      await chapterAPI.delete(id);
      setChapters(chapters.filter(chapter => chapter.id !== id));
      setCards(cards.filter(card => card.chapter_id !== id));
      if (selectedChapter === id) {
        const remainingChapters = chapters.filter(chapter => chapter.id !== id);
        if (remainingChapters.length > 0) {
          setSelectedChapter(remainingChapters[0].id);
        }
      }
    } catch (err) {
      console.error('Error deleting chapter:', err);
      setError('Failed to delete chapter. Please try again.');
    }
  };

  const handleChapterSelect = (chapterId: string) => {
    setSelectedChapter(chapterId);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setSelectedCategory('All');
    setSidebarOpen(false);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation currentPage="home" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] p-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading your flashcards...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation currentPage="home" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] p-4">
          <div className="text-center max-w-md mx-auto">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Database Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadData}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentChapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation currentPage="home" />
        <div className="flex items-center justify-center h-[calc(100vh-64px)] p-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Flashcard App</h1>
            <p className="text-gray-600 mb-8 text-lg">No chapters available. Add some chapters to get started!</p>
            <button
              onClick={() => setShowChapterManager(true)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
            >
              Add Your First Chapter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation currentPage="home" />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <Sidebar
          chapters={chapters}
          cards={cards}
          selectedChapter={selectedChapter}
          onChapterSelect={handleChapterSelect}
          onAddChapter={() => setShowChapterManager(true)}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden mt-16">
          {/* Top Bar */}
          <div className="bg-white shadow-sm border-b border-gray-200 p-3 md:p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 md:gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden text-gray-500 hover:text-gray-700 p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg md:text-2xl font-bold text-gray-800 truncate">{currentChapter.title}</h1>
                  {currentChapter.description && (
                    <p className="text-xs md:text-sm text-gray-600 truncate">{currentChapter.description}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowManager(true)}
                className="px-3 py-2 md:px-4 md:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm md:text-base whitespace-nowrap"
              >
                <span className="hidden sm:inline">Manage Cards</span>
                <span className="sm:hidden">Cards</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4">
            {!currentCard ? (
              <div className="text-center py-8 md:py-12">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">No Cards in This Chapter</h2>
                <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg">Add some flashcards to get started with this chapter!</p>
                <button
                  onClick={() => setShowManager(true)}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
                >
                  Add Cards
                </button>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 mb-6">
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => setStudyMode(studyMode === 'sequential' ? 'random' : 'sequential')}
                    className={`px-3 py-2 rounded-lg transition-colors text-sm md:text-base ${
                      studyMode === 'random' 
                        ? 'bg-purple-600 text-white hover:bg-purple-700' 
                        : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}
                  >
                    {studyMode === 'sequential' ? 'Sequential' : 'Random'} Mode
                  </button>

                  <button
                    onClick={shuffleCards}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base"
                  >
                    Shuffle Cards
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs md:text-sm text-gray-600 mb-2">
                    <span>Card {currentCardIndex + 1} of {filteredCards.length}</span>
                    <span className="text-indigo-600 font-medium">{currentCard.category}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentCardIndex + 1) / filteredCards.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Flashcard */}
                <div className="flex justify-center mb-6 md:mb-8">
                  <FlashcardComponent
                    question={currentCard.question}
                    answer={currentCard.answer}
                    category={currentCard.category}
                    isFlipped={isFlipped}
                    onFlip={flipCard}
                  />
                </div>

                {/* Navigation Controls */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 mb-6 md:mb-8">
                  <button
                    onClick={prevCard}
                    disabled={currentCardIndex === 0}
                    className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
                  >
                    Previous
                  </button>
                  
                  <button
                    onClick={flipCard}
                    className="w-full sm:w-auto px-6 md:px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-base md:text-lg"
                  >
                    {isFlipped ? 'Show Question' : 'Show Answer'}
                  </button>
                  
                  <button
                    onClick={nextCard}
                    disabled={currentCardIndex === filteredCards.length - 1}
                    className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm md:text-base"
                  >
                    Next
                  </button>
                </div>

                {/* Reset Button */}
                <div className="text-center">
                  <button
                    onClick={resetCards}
                    className="px-4 md:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base"
                  >
                    Start Over
                  </button>
                </div>

                {/* Instructions */}
                <div className="mt-8 md:mt-12 text-center text-gray-600">
                  <p className="text-xs md:text-sm">
                    💡 Tip: Click on the card to flip it, or use the buttons below to navigate
                  </p>
                  
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Manager Modal */}
      {showManager && (
        <CardManager
          cards={cards.filter(card => card.chapter_id === selectedChapter)}
          onAddCard={addCard}
          onEditCard={editCard}
          onDeleteCard={deleteCard}
          onClose={() => setShowManager(false)}
        />
      )}

      {/* Chapter Manager Modal */}
      {showChapterManager && (
        <ChapterManager
          chapters={chapters}
          onAddChapter={addChapter}
          onEditChapter={editChapter}
          onDeleteChapter={deleteChapter}
          onClose={() => setShowChapterManager(false)}
        />
      )}
    </div>
  );
}
