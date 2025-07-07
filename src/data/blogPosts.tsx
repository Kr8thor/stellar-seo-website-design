import React from 'react';
import { BlogPostProps } from '@/components/blog/BlogPost';
import { blogPostsRegistry, getAllPostsMeta } from './blogPostRegistry';

// Get all posts from registry plus legacy posts
const registryPosts = getAllPostsMeta();

export const blogPosts: BlogPostProps[] = [
  // Featured post from registry
  {
    id: 'featured',
    title: "From Google Whisperer to AI Prophet: An SEO's Midlife Crisis",
    category: "AI & SEO",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "June 21, 2025",
    readTime: "12 min read",
    author: "Leo Corbett",
    excerpt: "The era of traditional SEO is officially over. ChatGPT and AI have fundamentally changed how people find information, and your old playbook won't save you.",
    content: (
      <React.Fragment>
        <p className="text-xl leading-relaxed mb-8">
          The era of traditional SEO is officially over. ChatGPT and AI have fundamentally changed how people find information, and your old playbook won't save you.
        </p>
        <p className="mb-6">
          This is the story of how I went from keyword-obsessed SEO specialist to AI-powered automation consultant—and why you need to make the same transition if you want to survive the next five years of digital marketing.
        </p>
      </React.Fragment>
    ),
  },
  // Comprehensive blog posts collection
  {
    id: 'eat-guide',
    title: "The Complete Guide to E-E-A-T: How Experience, Expertise, Authoritativeness, and Trustworthiness Impact SEO",
    category: "SEO Strategy",
    image: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "April 10, 2025",
    readTime: "10 min read",
    author: "Leo Corbett",
    excerpt: "A comprehensive guide to Google's E-E-A-T principles and how they impact your SEO strategy in 2025 and beyond.",
    content: (
      <React.Fragment>
        <p className="text-xl leading-relaxed mb-8">
          Let's get one thing straight—if E-E-A-T were a real person, it'd be that coworker who drinks celery juice, runs a weekend startup, volunteers on Tuesdays, and files taxes in January. Google loves that guy. And whether you're a blogger, business, or someone yelling into the internet with a .com and a dream, you need to become him.
        </p>
        <p className="mb-6">
          This guide is your survival kit for building content that doesn't just rank—it earns trust, backlinks, and maybe even a compliment from a Google engineer (unlikely, but hey).
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-8 rounded-r-md">
          <p className="italic text-blue-800">
            "E-E-A-T is Google's way of measuring your real-world value in the online world. It's not just about ranking—it's about reputation."
          </p>
        </div>
      </React.Fragment>
    ),
  },
  {
    id: 1,
    title: "10 On-Page SEO Tactics That Still Work in 2025 (And Actually Matter)",
    category: "SEO Tips",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "April 05, 2025",
    readTime: "8 min read",
    author: "Leo Corbett",
    excerpt: "If you've ever screamed into a Google Doc, 'What even works anymore?!'—this one's for you. SEO's been dragged through AI upheavals, algorithm shakeups, and enough SERP drama to fuel a Netflix docuseries.",
    content: (
      <React.Fragment>
        <p className="text-xl leading-relaxed mb-8">
          If you've ever screamed into a Google Doc, "What even works anymore?!"—this one's for you. SEO's been dragged through AI upheavals, algorithm shakeups, and enough SERP drama to fuel a Netflix docuseries. But guess what? Some on-page tactics still hold the line.
        </p>
        <p className="mb-6">
          These are the old-school fundamentals with fresh-school relevance. The techniques Google still rewards because—spoiler alert—they're actually helpful to users. So put down your AI content spinner and let's get into the real stuff.
        </p>
      </React.Fragment>
    ),
  },
  {
    id: 2,
    title: "Why Core Web Vitals Are Still Running Your SEO Life in 2025",
    category: "Technical SEO",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "March 22, 2025",
    readTime: "12 min read",
    author: "Leo Corbett",
    excerpt: "Core Web Vitals have evolved from nice-to-have metrics to essential ranking factors. Learn how to master them for better SEO performance in 2025.",
    content: (
      <React.Fragment>
        <p className="text-xl leading-relaxed mb-8">
          If Google were your gym trainer, Core Web Vitals would be its way of screaming, "No more junk food and janky websites!" In 2025, these three little metrics have gone from "nice-to-have" to non-negotiable. They're the difference between page one glory and page seven purgatory—where even your mom won't find you.
        </p>
        <p className="mb-6">
          This isn't a technical rant. It's a survival guide for modern web performance. Let's break it down.
        </p>
      </React.Fragment>
    ),
  },
  {
    id: 3,
    title: "The AI Revolution in SEO: How to Adapt Your Strategy",
    category: "SEO Trends",
    date: "March 15, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Leo Corbett",
    excerpt: "Explore how artificial intelligence is transforming search engine optimization and what it means for your strategy.",
    content: (
      <React.Fragment>
        <p className="text-xl leading-relaxed mb-8">
          Artificial intelligence is rapidly transforming the SEO landscape, changing how search engines work and how websites need to optimize. From content creation to technical optimization, AI's impact touches every aspect of SEO.
        </p>
      </React.Fragment>
    ),
  },
  {
    id: 4,
    title: "Local SEO Mastery: How to Dominate Your Geographic Market",
    category: "Local SEO",
    date: "March 5, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Leo Corbett",
    excerpt: "Learn the essential strategies to improve your business's visibility in local search results.",
    content: (
      <React.Fragment>
        <p className="text-xl leading-relaxed mb-8">
          For businesses that serve specific geographic areas, local SEO is the most powerful way to connect with nearby customers. This guide covers the essential tactics to dominate local search results.
        </p>
      </React.Fragment>
    ),
  },
  {
    id: 5,
    title: "Mobile-First Indexing: Is Your Site Truly Ready?",
    category: "Technical SEO",
    date: "February 25, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Leo Corbett",
    excerpt: "Ensure your website is fully optimized for Google's mobile-first indexing with this comprehensive checklist.",
    content: (
      <React.Fragment>
        <p className="text-xl leading-relaxed mb-8">
          Mobile-first indexing is no longer the future—it's the present. Google now uses the mobile version of your site for indexing and ranking.
        </p>
      </React.Fragment>
    ),
  },
  {
    id: 6,
    title: "Content Strategy for SEO: Beyond Keywords",
    category: "Content Strategy",
    date: "February 15, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Leo Corbett",
    excerpt: "Discover how to create a content strategy that goes beyond traditional keyword targeting to drive real SEO results.",
    content: (
      <React.Fragment>
        <p className="text-xl leading-relaxed mb-8">
          The days of creating content around individual keywords are numbered. Modern SEO requires a more sophisticated approach to content strategy.
        </p>
      </React.Fragment>
    ),
  },
  {
    id: 7,
    title: "Technical SEO Fundamentals: The Foundation of Rankings",
    category: "Technical SEO",
    date: "February 8, 2025",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Leo Corbett",
    excerpt: "Master the technical aspects of SEO that form the foundation for all your other optimization efforts.",
    content: (
      <React.Fragment>
        <p className="text-xl leading-relaxed mb-8">
          Technical SEO is the foundation that supports all your other SEO efforts. Without a solid technical foundation, even the best content won't achieve its full potential.
        </p>
      </React.Fragment>
    ),
  },
  {
    id: 8,
    title: "Link Building in 2025: Quality Over Quantity",
    category: "Link Building",
    date: "January 28, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author: "Leo Corbett",
    excerpt: "Learn modern link building strategies that focus on earning high-quality, relevant backlinks that actually move the needle.",
    content: (
      <React.Fragment>
        <p className="text-xl leading-relaxed mb-8">
          Link building has evolved dramatically over the past few years. The days of mass outreach are giving way to more sophisticated strategies focused on building genuine relationships.
        </p>
      </React.Fragment>
    ),
  },
  // Add registry posts as metadata only
  ...registryPosts.map(post => ({
    ...post,
    content: <div>Component-based content from registry</div> // Placeholder
  }))
];