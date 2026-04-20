'use client';

export default function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
      <span className="ml-3 text-gray-500 dark:text-gray-400">Searching knowledge base...</span>
    </div>
  );
}