import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

interface Review {
  id: number;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
  featured?: boolean;
  websiteUrl?: string;
}

interface ReviewSectionProps {
  showComingSoon?: boolean;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Violet Rainwater",
    role: "Keynote Speaker | Workplace Transformation Expert",
    company: "The Rainmaker's Way",
    content: "Leo is an absolute workflow wizard and SEO genius who helped me create the website of my dreams! His ability to teach how to leverage AI to essentially become your own coder and web designer is truly remarkable. Even with my passion for AI, I never imagined I'd be able to create something this incredible on my own. Because of Leo, I went from website shame to website fame, I literally receive compliments every single day on my website, and my confidence has skyrocketed. I'm genuinely excited to share my site and offerings now, which wasn't the case before. If you're looking for a stunning website, powerful SEO, or a customized workflow, and especially if you want to harness AI to maintain full creative control, I honestly couldn't recommend Leo highly enough. He's a total game changer!",
    rating: 5,
    featured: true,
    websiteUrl: "https://violetrainwater.com"
  }
];
const StarRating: React.FC<{ rating: number; size?: string }> = ({ rating, size = "w-5 h-5" }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`${size} ${
            index < rating 
              ? "text-yellow-400 fill-yellow-400" 
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

export const ReviewSection: React.FC<ReviewSectionProps> = ({ 
  showComingSoon = false
}) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-current" />
            <span>Client Success Stories</span>
          </div>
          <h2 className="heading-lg mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real results from real clients who transformed their digital presence with our SEO and development expertise.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Featured Review */}
          {reviews.filter(review => review.featured).map((review) => (
            <Card key={review.id} className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-white to-primary/5 dark:from-gray-800 dark:to-primary/10 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Quote Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
                      <Quote className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="mb-6">
                      <StarRating rating={review.rating} size="w-6 h-6" />
                    </div>
                    
                    <blockquote className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-8 italic">
                      "{review.content}"
                    </blockquote>
                    
                    {/* Client Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {review.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-gray-100">{review.name}</div>
                        <div className="text-sm text-muted-foreground">{review.role}</div>
                        {review.company && review.websiteUrl && (
                          <a 
                            href={review.websiteUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:text-primary/80 hover:underline transition-colors"
                          >
                            {review.company}
                          </a>
                        )}
                        {review.company && !review.websiteUrl && (
                          <div className="text-sm text-muted-foreground">{review.company}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Card className="border-2 border-dashed border-primary/30 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Experience the same transformative results. Let's create something amazing together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    <Link to="/contact">
                      Start Your Transformation
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/portfolio">
                      View Our Work
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
