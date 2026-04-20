'use client';

interface ChatMessageProps {
  message: {
    question: string;
    answer: string;
    searchTime: number;
    source: string;
    timestamp: Date;
  };
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Question */}
      <div className="px-4 py-3 bg-primary-50 dark:bg-primary-900/20 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start space-x-2">
          <span className="text-lg">👤</span>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">You asked:</p>
            <p className="font-medium text-gray-900 dark:text-white">{message.question}</p>
          </div>
        </div>
      </div>
      
      {/* Answer */}
      <div className="px-4 py-3">
        <div className="flex items-start space-x-2">
          <span className="text-lg">🤖</span>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">AI Response</p>
              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <span>⏱️ {message.searchTime.toFixed(0)}ms</span>
                {message.source && <span>📄 {message.source}</span>}
              </div>
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {message.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}