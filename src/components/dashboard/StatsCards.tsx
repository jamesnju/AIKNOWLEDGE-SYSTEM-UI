'use client';

interface StatsCardsProps {
  stats: {
    total_queries: number;
    avg_search_time_ms: number;
    avg_rating: number;
    total_documents: number;
    verified_responses: number;
    time_saved_minutes: number;
  } | null;
}

const cards = [
  { key: 'total_queries', label: 'Total Queries', icon: '❓', color: 'from-blue-500 to-blue-600' },
  { key: 'avg_search_time_ms', label: 'Avg Search Time', icon: '⏱️', color: 'from-green-500 to-green-600', suffix: 'ms' },
  { key: 'avg_rating', label: 'Avg Rating', icon: '⭐', color: 'from-yellow-500 to-yellow-600', suffix: '/5' },
  { key: 'total_documents', label: 'Total Documents', icon: '📚', color: 'from-purple-500 to-purple-600' },
  { key: 'verified_responses', label: 'Verified Answers', icon: '✅', color: 'from-teal-500 to-teal-600' },
  { key: 'time_saved_minutes', label: 'Time Saved', icon: '⏰', color: 'from-indigo-500 to-indigo-600', suffix: 'min' },
];

export default function StatsCards({ stats }: StatsCardsProps) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => {
        let displayValue: string | number = stats[card.key as keyof typeof stats];
        
        if (card.key === 'avg_search_time_ms') {
          displayValue = Math.round(displayValue as number);
        }
        if (card.key === 'avg_rating') {
          displayValue = (displayValue as number).toFixed(1);
        }
        
        return (
          <div
            key={card.key}
            className={`bg-gradient-to-r ${card.color} rounded-lg shadow-lg p-5 text-white transform transition-all-fast hover:scale-105`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{card.label}</p>
                <p className="text-3xl font-bold mt-1">
                  {displayValue}{card.suffix ? ` ${card.suffix}` : ''}
                </p>
              </div>
              <div className="text-4xl opacity-80">{card.icon}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}