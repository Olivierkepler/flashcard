'use client';

import { useState, useEffect } from 'react';
import { type Chapter, type Flashcard } from '@/lib/api';

interface SidebarProps {
  chapters: Chapter[];
  cards: Flashcard[];
  selectedChapter: string;
  onChapterSelect: (chapterId: string) => void;
  onAddChapter: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ 
  chapters, 
  cards, 
  selectedChapter, 
  onChapterSelect, 
  onAddChapter, 
  isOpen, 
  onToggle 
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filter chapters and cards based on search
  const filteredChapters = chapters.filter(chapter => 
    chapter.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    chapter.description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const filteredCards = cards.filter(card => 
    card.question.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    card.answer.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
    card.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const hasSearchResults = debouncedSearchTerm && (filteredChapters.length > 0 || filteredCards.length > 0);

  return (
    <div className="flex h-[calc(100vh-64px)] mt-16">
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-800">Chapters</h2>
              <button
                onClick={onToggle}
                className="lg:hidden text-gray-500 hover:text-gray-700 p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search chapters and cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <svg 
                className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {hasSearchResults ? (
              <div className="p-4">
                {/* Search Results */}
                {filteredChapters.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Chapters</h3>
                    <div className="space-y-2">
                      {filteredChapters.map(chapter => (
                        <button
                          key={chapter.id}
                          onClick={() => onChapterSelect(chapter.id)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${
                            selectedChapter === chapter.id
                              ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <div className="font-medium text-sm">{chapter.title}</div>
                          {chapter.description && (
                            <div className="text-xs text-gray-500 mt-1 truncate">{chapter.description}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {filteredCards.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Cards</h3>
                    <div className="space-y-2">
                      {filteredCards.slice(0, 10).map(card => (
                        <div
                          key={card.id}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <div className="text-sm font-medium text-gray-800 mb-1">{card.question}</div>
                          <div className="text-xs text-gray-600 mb-2">{card.answer}</div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                              {card.category}
                            </span>
                            <span className="text-xs text-gray-500">
                              {chapters.find(ch => ch.id === card.chapter_id)?.title}
                            </span>
                          </div>
                        </div>
                      ))}
                      {filteredCards.length > 10 && (
                        <div className="text-xs text-gray-500 text-center py-2">
                          +{filteredCards.length - 10} more results
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4">
                {/* Regular Chapter List */}
                <div className="space-y-2">
                  {chapters.map(chapter => {
                    const chapterCards = cards.filter(card => card.chapter_id === chapter.id);
                    const cardCount = chapterCards.length;
                    
                    return (
                      <button
                        key={chapter.id}
                        onClick={() => onChapterSelect(chapter.id)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedChapter === chapter.id
                            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-medium text-sm truncate">{chapter.title}</div>
                          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                            {cardCount}
                          </span>
                        </div>
                        {chapter.description && (
                          <div className="text-xs text-gray-500 truncate">{chapter.description}</div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {chapters.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-4">📚</div>
                    <p className="text-sm text-gray-600 mb-4">No chapters yet</p>
                    <button
                      onClick={onAddChapter}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                    >
                      Add Chapter
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onAddChapter}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              + Add Chapter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 