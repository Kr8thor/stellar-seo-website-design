import React from 'react';
import { Star, MessageCircle, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';

interface ReviewSectionProps {
  showComingSoon?: boolean;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ 
  showComingSoon = true
}) => {
  if (showComingSoon) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Client Reviews</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're building something amazing and would love to hear from our valued clients.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center mb-6">
                    <MessageCircle className="h-12 w-12 text-primary" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4">Reviews Coming Soon!</h3>
                  
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    We're launching our new review system to showcase the amazing results our clients achieve. 
                    Your success stories matter to us and future clients.
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 mb-8">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Join our growing community of successful businesses
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className="w-8 h-8 text-gray-300 dark:text-gray-600"
                      />
                    ))}
                  </div>
                  
                  <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    <Link to="/contact">
                      Be the First to Review
                    </Link>
                  </Button>
                  
                  <p className="text-sm text-muted-foreground mt-4">
                    Share your experience and help others discover the impact of our SEO and development services.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  // Fallback return for future implementation with actual reviews
  return null;
};
