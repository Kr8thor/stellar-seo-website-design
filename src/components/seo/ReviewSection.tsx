import React from 'react';
import { Star } from 'lucide-react';
import { Helmet } from 'react-helmet';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  verified?: boolean;
}

interface ReviewSectionProps {
  reviews?: Review[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}

const defaultReviews: Review[] = [
  {
    id: '1',
    author: 'John Smith',
    rating: 5,
    date: '2025-01-15',
    content: 'Marden SEO transformed our online presence. Our organic traffic increased by 150% in just 3 months!',
    verified: true
  },
  {
    id: '2',
    author: 'Sarah Johnson',
    rating: 5,
    date: '2025-01-10',
    content: 'Exceptional service! The team\'s expertise in both SEO and app development is unmatched.',
    verified: true
  },
  {
    id: '3',
    author: 'Michael Chen',
    rating: 5,
    date: '2025-01-05',
    content: 'The workflow automation solutions saved us countless hours. Highly recommend their n8n expertise!',
    verified: true
  }
];

export const ReviewSection: React.FC<ReviewSectionProps> = ({ 
  reviews = defaultReviews,
  aggregateRating = { ratingValue: 5.0, reviewCount: reviews.length }
}) => {
  // Generate Review schema
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Marden SEO",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": aggregateRating.ratingValue,
      "reviewCount": aggregateRating.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.date,
      "reviewBody": review.content
    }))
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(reviewSchema)}
        </script>
      </Helmet>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Client Reviews</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {renderStars(Math.round(aggregateRating.ratingValue))}
            <span className="text-lg font-semibold">
              {aggregateRating.ratingValue.toFixed(1)}
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Based on {aggregateRating.reviewCount} reviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-4">
                {renderStars(review.rating)}
                {review.verified && (
                  <span className="text-xs text-green-600 dark:text-green-400">
                    Verified
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "{review.content}"
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {review.author}
                </span>
                <time className="text-gray-500 dark:text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
