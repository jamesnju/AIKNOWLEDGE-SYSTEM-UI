'use client';

import { useState } from 'react';

interface ChatInputProps {
  onAsk: (question: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onAsk, disabled }: ChatInputProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !disabled) {
      onAsk(question.trim());
      setQuestion('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a technical question... (e.g., 'How do I reset a user password?')"
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          rows={3}
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || !question.trim()}
          className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-lg hover:opacity-90 transition-all-fast disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Ask AI
        </button>
      </div>
    </form>
  );
}