
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { validateContactForm, checkClientRateLimit } from '@/lib/security';
import { securityMonitor } from '@/lib/securityMonitor';
import { useSEO, getEnhancedSEOConfig } from '@/hooks/useSEO';
import { scrollToTop } from '@/utils/scrollUtils';
import { trackContactFormSubmission } from '@/components/Analytics';
import { useAnalytics } from '@/hooks/useAnalytics';
import CalendlyButton from '@/components/common/CalendlyButton';

const Contact = () => {
  // Add enhanced SEO for contact page with breadcrumb schema
  useSEO(getEnhancedSEOConfig('contact'));
  
  // Initialize analytics
  const { trackFormSubmission, trackEngagement } = useAnalytics();
  
  // Scroll to top when component mounts
  useEffect(() => {
    // Check if we have a hash in the URL
    if (window.location.hash === '#top' || window.location.hash === '') {
      scrollToTop();
    }
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side rate limiting
    if (!checkClientRateLimit('contact-form', 3, 60000)) {
      securityMonitor.logRateLimit('contact-form', 3);
      toast({
        title: "Too many requests",
        description: "Please wait a minute before submitting another message.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate and sanitize form data
    const validation = validateContactForm(formData);
    
    if (!validation.isValid) {
      // Log validation errors
      validation.errors.forEach(error => {
        securityMonitor.logValidationError('contact-form', error);
      });
      
      toast({
        title: "Validation Error",
        description: validation.errors.join(', '),
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://uhwhdokmdqpwtgipivwp.supabase.co/functions/v1/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', // Security header
        },
        body: JSON.stringify(validation.sanitizedData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }
      
      // Log successful submission
      securityMonitor.logFormSubmission('contact', true);
      
      // Track form submission in Google Analytics
      trackContactFormSubmission('contact_form');
      
      // Enhanced analytics tracking
      trackFormSubmission('contact_form');
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorMessage = "There was an error sending your message. Please try again.";
      
      if (error instanceof Error) {
        // Log failed submission with details
        securityMonitor.logFormSubmission('contact', false, error.message);
        
        if (error.message.includes('Rate limit')) {
          errorMessage = "Too many requests. Please try again later.";
        } else if (error.message.includes('Validation')) {
          errorMessage = "Please check your form data and try again.";
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="pt-24 pb-16 px-4 md:px-8 bg-gradient-to-b from-white to-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Ready to transform your online presence? Let's discuss how we can help your business grow through strategic SEO and digital marketing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Let's Start a Conversation</h2>
              <p className="text-slate-600 mb-6">
                Whether you're looking to improve your search rankings, increase website traffic, or develop a comprehensive digital strategy, I'm here to help.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Free Consultation</h3>
                  <p className="text-slate-600">30-minute strategy session to discuss your goals</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Custom Solutions</h3>
                  <p className="text-slate-600">Tailored strategies for your specific industry and needs</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Quick Response</h3>
                  <p className="text-slate-600">I'll get back to you within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Your Name *
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  maxLength={100}
                  className="w-full"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address *
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Your Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  maxLength={5000}
                  rows={6}
                  className="w-full"
                  placeholder="Tell me about your project, goals, and how I can help..."
                />
                <div className="text-sm text-slate-500 mt-1">
                  {formData.message.length}/5000 characters
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>

              {/* Calendly Integration */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-4">
                    Prefer to talk directly? Schedule a free consultation call.
                  </p>
                  <CalendlyButton 
                    variant="outline"
                    size="lg"
                    className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                    calendlyUrl={import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/marden-seo/30min'}
                  >
                    Schedule Free Consultation
                  </CalendlyButton>
                </div>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              <p>Your information is secure and will never be shared.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
