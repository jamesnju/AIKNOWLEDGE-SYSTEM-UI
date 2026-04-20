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

export default function RecentQueries() {
  const { userId } = useAuth();
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQueries = async () => {
      if (!userId) return;
      try {
        const data = await apiService.getUserHistory(userId);
        setQueries(data.slice(0, 5));
      } catch (error) {
        console.error('Error loading queries:', error);
      } finally {
        setLoading(false);
      }
    };
    loadQueries();
  }, [userId]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recent Queries</h3>
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recent Queries</h3>
      <div className="space-y-3">
        {queries.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No queries yet</p>
        ) : (
          queries.map((query) => (
            <div
              key={query.id}
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all-fast"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-gray-900 dark:text-white truncate flex-1">
                  {query.question}
                </p>
                {query.is_verified && (
                  <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full">
                    ✓ Verified
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                <span>⏱️ {Math.round(query.search_time_ms)}ms</span>
                <span>📅 {new Date(query.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}