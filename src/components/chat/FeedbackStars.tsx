'use client';

import { useState } from 'react';

interface FeedbackStarsProps {
  onSubmit: (rating: number, comment: string) => void;
}

export default function FeedbackStars({ onSubmit }: FeedbackStarsProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating > 0) {
      onSubmit(rating, comment);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="mt-2 text-sm text-green-600 dark:text-green-400">
        ✅ Thank you for your feedback!
      </div>
    );
  }

  return (
    <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Was this answer helpful?</p>
      <div className="flex items-center space-x-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="text-2xl focus:outline-none transition-all-fast"
            aria-label={`Rate ${star} stars`}
          >
            <span className={(hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'}>
              ★
            </span>
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Additional comments for senior engineers (optional)"
        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
        rows={2}
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={rating === 0}
        className="mt-2 px-4 py-1.5 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all-fast disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit Feedback
      </button>
    </div>
  );
}