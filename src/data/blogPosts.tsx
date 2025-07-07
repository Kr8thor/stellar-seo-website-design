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
  },  // Comprehensive blog posts collection
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

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">What is E-E-A-T, Really?</h2>
        <p className="mb-6">
          Let's decode the acronym before it makes your eyes glaze over.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-purple-700 mb-3">Experience</h3>
            <p>Have you actually done the thing you're writing about? If not, Google's not impressed.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-green-700 mb-3">Expertise</h3>
            <p>Are you knowledgeable, credentialed, or at least writing like someone who isn't making it up on the spot?</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-amber-700 mb-3">Authoritativeness</h3>
            <p>Do others point to your content as a source? Are you cited or linked to by people who aren't bots or your cousin Kevin?</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">Trustworthiness</h3>
            <p>Does your site look and feel reliable enough for someone to hand over their email or credit card?</p>
          </div>
        </div>

        <p className="mb-8">
          E-E-A-T is Google's way of measuring your real-world value in the online world. It's not just about ranking—it's about reputation.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">Experience: More Than "I Read About It Once"</h2>
        <p className="mb-6">
          You can't fake real-world experience anymore. Google wants to know if the person reviewing camping gear has actually left the house, or if the recipe writer has cooked anything other than toast.
        </p>

        <p className="mb-6">
          Show, don't tell. Add photos. Add video. Use first-person stories, especially in product reviews or tutorials. If your content reads like it was pulled straight out of ChatGPT's digestive system, you're in trouble.
        </p>

        <p className="font-medium mb-8">
          Real experience is what separates the how-to posts that rank from the ones that rot on page 7.
        </p>

        <img src="https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Person with actual experience" className="rounded-lg shadow-md my-8 w-full" />

        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">Expertise: Knowledge is Currency, But So is Context</h2>
        <p className="mb-6">
          Expertise doesn't always mean having a degree. It means knowing what you're talking about, and being able to prove it.
        </p>

        <p className="mb-6">
          This is where things like author bios, credentials, case studies, and original insights come into play. If you're writing about cybersecurity, you better not be linking to your TikTok where you explain phishing scams with sock puppets—unless you do it really well.
        </p>

        <p className="font-medium mb-8">
          Google is increasingly weighing not just what you say, but who's saying it.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">Authoritativeness: Welcome to the High School Popularity Contest</h2>
        <p className="mb-6">
          Your content might be brilliant, but if no one's referencing you, it doesn't matter. Google trusts sites that others trust. This means backlinks from real websites. Mentions on industry blogs. Social proof. Peer recognition.
        </p>

        <p className="mb-6">
          It's not easy to earn, but here's what helps:
        </p>

        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>Guest contributions on industry blogs</li>
          <li>Being cited in roundups or news articles</li>
          <li>Getting backlinks from real sites (not Fiverr spam farms)</li>
          <li>Publishing original research or data</li>
        </ul>

        <p className="mb-8">
          Authority is cumulative. It builds slowly—until it doesn't, and you start getting links just for existing.
        </p>

        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Authority building through connections" className="rounded-lg shadow-md my-8 w-full" />

        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">Trustworthiness: The Most Boring but Crucial Factor</h2>
        <p className="mb-6">
          This is the unsexy stuff: HTTPS, clear contact info, privacy policies, fast load times, no deceptive ads, and definitely no auto-play audio. It's everything that makes a site feel like it was built by professionals and not by someone with 27 toolbars on their browser.
        </p>

        <p className="mb-8">
          If you're dealing with health, finance, or legal topics—anything that falls under "Your Money or Your Life" (YMYL)—Google holds you to an even higher standard. Expect extra scrutiny and act accordingly.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-8 rounded-r-md">
          <h3 className="font-semibold text-amber-800 mb-2">YMYL Content Warning</h3>
          <p className="text-amber-800">
            For Your Money or Your Life topics, trustworthiness isn't optional—it's mandatory. Health, finance, and legal content creators need impeccable credentials and references.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">So What's the Playbook?</h2>
        <div className="bg-green-50 p-6 rounded-lg my-8">
          <h3 className="font-semibold text-green-800 mb-4">The E-E-A-T Action Plan:</h3>
          <ul className="list-disc pl-6 space-y-3 text-green-800">
            <li>Use real authors. Give them bios. Preferably ones that don't sound like a bot pretending to be a doctor.</li>
            <li>Add personal insights, stories, and media that prove real-world interaction with the subject.</li>
            <li>Build backlinks organically through useful, cite-worthy content.</li>
            <li>Keep your site clean, fast, secure, and transparent.</li>
            <li>Don't fake it. Seriously.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">Final Thoughts: Be Useful, Be Honest, Be Findable</h2>
        <p className="mb-6">
          E-E-A-T isn't about tricking Google. It's about showing Google that you deserve to rank. That you're helping people. That you're not just part of the noise.
        </p>

        <p className="text-xl font-medium mb-8">
          The internet has enough junk. If you're going to put something out there, make it count—and make it clear that it came from a real person with real insight.
        </p>

        <div className="bg-gray-100 p-6 rounded-lg my-8">
          <h3 className="font-semibold text-gray-800 mb-4">About the Author</h3>
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center text-xl font-medium text-purple-700 mr-4">
              LC
            </div>
            <div>
              <p className="font-medium">Leo Corbett</p>
              <p className="text-sm text-gray-600">An AI-first automation specialist and SEO expert who builds high-performance systems that scale businesses while eliminating inefficiencies.</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    ),
  },  // Add registry posts as metadata only
  ...registryPosts.map(post => ({
    ...post,
    content: <div>Component-based content from registry</div> // Placeholder
  }))
];
