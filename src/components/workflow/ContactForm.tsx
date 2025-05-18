
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FormData {
  name: string;
  email: string;
  company: string;
  requirements: string;
}

const WorkflowContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    requirements: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.requirements) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch('https://uhwhdokmdqpwtgipivwp.supabase.co/functions/v1/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          website: formData.company, // Using company field as website
          service: 'n8n Workflow Automation',
          message: formData.requirements
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        company: '',
        requirements: ''
      });
      
      toast.success("Thanks for your message! We'll be in touch soon.");
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("There was a problem sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Your name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Your email"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-medium text-gray-700">Company</label>
        <input
          id="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          placeholder="Your company name"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="requirements" className="text-sm font-medium text-gray-700">What would you like to automate?</label>
        <textarea
          id="requirements"
          rows={4}
          value={formData.requirements}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          placeholder="Describe the process you'd like to automate..."
          required
        ></textarea>
      </div>
      
      <Button 
        type="submit" 
        size="lg" 
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        {isSubmitting ? "Sending..." : "Submit Request"}
      </Button>
      
      <p className="text-xs text-gray-500 text-center">
        We'll respond to your inquiry within 24 business hours.
      </p>
    </form>
  );
};

export default WorkflowContactForm;
