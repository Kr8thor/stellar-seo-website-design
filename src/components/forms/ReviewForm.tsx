import React, { useState } from 'react';
import { Star, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ReviewFormProps {
  serviceType?: string;
  onSuccess?: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ 
  serviceType = 'general',
  onSuccess 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    rating: 5,
    title: '',
    content: '',
    serviceType: serviceType
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase reviews table
      const { error } = await supabase
        .from('reviews')
        .insert([{
          author_name: formData.name,
          author_email: formData.email,
          company: formData.company,
          rating: formData.rating,
          title: formData.title,
          content: formData.content,
          service_type: formData.serviceType,
          verified: false, // Admin will verify
          published: false, // Admin will publish after review
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      // Send email notification to admin
      await supabase.functions.invoke('send-review-notification', {
        body: { reviewData: formData }
      });

      toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback. Your review will be published after verification.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        rating: 5,
        title: '',
        content: '',
        serviceType: serviceType
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error submitting review:', error); // Keep error logs in production
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Your Name *</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="John Smith"
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="company">Company (Optional)</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
          placeholder="Your Company Name"
        />
      </div>

      <div>
        <Label>Rating *</Label>
        <div className="flex items-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingClick(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoveredRating || formData.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {formData.rating} out of 5 stars
          </span>
        </div>
      </div>

      <div>
        <Label htmlFor="title">Review Title *</Label>
        <Input
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Excellent SEO Services!"
        />
      </div>

      <div>
        <Label htmlFor="content">Your Review *</Label>
        <Textarea
          id="content"
          required
          rows={4}
          value={formData.content}
          onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
          placeholder="Tell us about your experience working with Marden SEO..."
          className="resize-none"
        />
        <p className="text-sm text-gray-500 mt-1">
          Minimum 50 characters ({formData.content.length}/50)
        </p>
      </div>

      <div className="text-sm text-gray-600 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <p className="font-semibold mb-2">Review Guidelines:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Be honest and specific about your experience</li>
          <li>Focus on the services you received</li>
          <li>Avoid personal information beyond your name</li>
          <li>Reviews are moderated before publication</li>
        </ul>
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting || formData.content.length < 50}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Submit Review
          </>
        )}
      </Button>
    </form>
  );
};