'use client';

import { useAuth } from '@/src/contexts/AuthContext';
import apiService from '@/src/lib/api';
import { useEffect, useState } from 'react';

interface Query {
  id: number;
  query_id: string;
  question: string;
  ai_answer: string;
  search_time_ms: number;
  is_verified: boolean;
  timestamp: string;
}

export default function HistoryPage() {
      const { user } = useAuth();
  const userId = user?.id || null;
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      if (!userId) return;
      try {
        const data = await apiService.getUserHistory(userId);
        setQueries(data);
      } catch (error) {
        console.error('Error loading history:', error);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500 dark:text-gray-400">Loading history...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Query History</h1>
        <p className="text-gray-600 dark:text-gray-400">View all your past questions and AI responses</p>
      </div>

      <div className="space-y-3">
        {queries.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-gray-500 dark:text-gray-400">No queries yet. Start asking questions!</p>
          </div>
        ) : (
          queries.map((query) => (
            <div
              key={query.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div
                className="px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-all-fast"
                onClick={() => setExpandedId(expandedId === query.id ? null : query.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{query.question}</p>
                    <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>📅 {new Date(query.timestamp).toLocaleString()}</span>
                      <span>⏱️ {Math.round(query.search_time_ms)}ms</span>
                      {query.is_verified && <span className="text-green-600 dark:text-green-400">✓ Verified</span>}
                    </div>
                  </div>
                  <span className="text-gray-400">{expandedId === query.id ? '▲' : '▼'}</span>
                </div>
              </div>
              
              {expandedId === query.id && (
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {query.ai_answer}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}