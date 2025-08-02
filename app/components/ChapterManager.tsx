'use client';

import { useState } from 'react';
import { type Chapter } from '@/lib/api';

interface ChapterManagerProps {
  chapters: Chapter[];
  onAddChapter: (chapter: { title: string; description?: string }) => void;
  onEditChapter: (id: string, chapter: { title: string; description?: string }) => void;
  onDeleteChapter: (id: string) => void;
  onClose: () => void;
}

export default function ChapterManager({ chapters, onAddChapter, onEditChapter, onDeleteChapter, onClose }: ChapterManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      onEditChapter(editingId, formData);
      setEditingId(null);
    } else {
      onAddChapter(formData);
    }
    setFormData({ title: '', description: '' });
    setIsAdding(false);
  };

  const handleEdit = (chapter: Chapter) => {
    setEditingId(chapter.id);
    setFormData({
      title: chapter.title,
      description: chapter.description || ''
    });
    setIsAdding(true);
  };

  const handleCancel = () => {
    setFormData({ title: '', description: '' });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this chapter? This will also delete all cards in this chapter.')) {
      onDeleteChapter(id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl  flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Manage Chapters</h2>
          <div className="flex items-center gap-2">
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm md:text-base"
              >
                + Add Chapter
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden h-[90vh]">
          {/* Form Section */}
          {isAdding && (
            <div className="lg:w-1/2 p-4 md:p-6 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {editingId ? 'Edit Chapter' : 'Add New Chapter'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter chapter title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Enter chapter description..."
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm md:text-base font-medium"
                  >
                    {editingId ? 'Update Chapter' : 'Add Chapter'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm md:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Chapters List */}
          <div className={`flex-1 overflow-y-auto ${isAdding ? 'lg:w-1/2' : 'w-full'}`}>
            <div className="p-4 md:p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Chapters ({chapters.length})
              </h3>
              {chapters.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">📚</div>
                  <p className="text-gray-600 mb-4">No chapters yet</p>
                  <button
                    onClick={() => setIsAdding(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                  >
                    Add Your First Chapter
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${chapter.is_active ? 'bg-green-500' : 'bg-gray-300'}`} />
                          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                            {chapter.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(chapter)}
                            className="p-1 text-gray-500 hover:text-indigo-600 transition-colors"
                            title="Edit chapter"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(chapter.id)}
                            className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                            title="Delete chapter"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="text-sm font-medium text-gray-800">{chapter.title}</div>
                          {chapter.description && (
                            <div className="text-xs text-gray-600 mt-1">{chapter.description}</div>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          Created: {new Date(chapter.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 