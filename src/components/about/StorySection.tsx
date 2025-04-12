
import React from 'react';

const StorySection = () => {
  return (
    <section className="section-container">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        <div className="lg:w-1/2">
          <h2 className="heading-md mb-6">My Story</h2>
          <p className="mb-4">
            My journey began five years ago building websites for small businesses, which naturally led me into the world of SEO and PPC as clients needed more visibility online.
          </p>
          <p className="mb-4">
            After mastering the fundamentals, the opportunity and scope of AI grabbed my attention. While everyone else was making pictures of action figures, I was focusing on how to build automated workflows that will benefit small and medium enterprises.
          </p>
          <p>
            Today, I work with clients who are serious about getting ahead of the pack and using AI to drive sustainable organic growth through innovative, future-proof strategies.
          </p>
        </div>
        <div className="lg:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" 
            alt="SEO Strategy Meeting" 
            className="w-full h-auto rounded-lg shadow-lg" 
          />
        </div>
      </div>
    </section>
  );
};

export default StorySection;
