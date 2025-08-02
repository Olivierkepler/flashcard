'use client';

interface FlashcardProps {
  question: string;
  answer: string;
  category: string;
  isFlipped: boolean;
  onFlip: () => void;
}

export default function Flashcard({ question, answer, category, isFlipped, onFlip }: FlashcardProps) {
  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
      <div 
        className={`relative w-full h-48 md:h-56 lg:h-64 xl:h-72 cursor-pointer perspective-1000 transform-style-preserve-3d transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={onFlip}
      >
        {/* Front of card (Question) */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6 flex flex-col">
          <div className="flex justify-between items-start mb-3 md:mb-4">
            <span className="text-xs md:text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
              {category}
            </span>
            <span className="text-xs md:text-sm text-gray-400">Click to flip</span>
          </div>
          <div className="flex-1 flex items-center justify-center text-center">
            <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-800 leading-relaxed">
              {question}
            </h3>
          </div>
          <div className="text-center mt-3 md:mt-4">
            <div className="text-xs md:text-sm text-gray-500">Question</div>
          </div>
        </div>

        {/* Back of card (Answer) */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl shadow-lg border border-indigo-200 p-4 md:p-6 flex flex-col rotate-y-180">
          <div className="flex justify-between items-start mb-3 md:mb-4">
            <span className="text-xs md:text-sm font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">
              {category}
            </span>
            <span className="text-xs md:text-sm text-gray-400">Click to flip</span>
          </div>
          <div className="flex-1 flex items-center justify-center text-center">
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-gray-800 leading-relaxed">
              {answer}
            </p>
          </div>
          <div className="text-center mt-3 md:mt-4">
            <div className="text-xs md:text-sm text-gray-500">Answer</div>
          </div>
        </div>
      </div>
      
      {/* Mobile touch hint */}
      <div className="text-center mt-4 md:hidden">
        <p className="text-xs text-gray-500">💡 Tap the card to flip</p>
      </div>
    </div>
  );
} 