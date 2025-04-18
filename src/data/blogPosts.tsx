
import React from 'react';
import { BlogPostProps } from '@/components/blog/BlogPost';

export const blogPosts: BlogPostProps[] = [
  {
    id: 'featured',
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
  },
  {
    id: 1,
    title: "10 On-Page SEO Tactics That Still Work in 2025 (And Actually Matter)",
    category: "SEO Tips",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    date: "April 05, 2025",
    readTime: "8 min read",
    author: "Leo Corbett",
    content: (
      <React.Fragment>
        <p className="text-xl leading-relaxed mb-8">
          If you've ever screamed into a Google Doc, "What even works anymore?!"—this one's for you. SEO's been dragged through AI upheavals, algorithm shakeups, and enough SERP drama to fuel a Netflix docuseries. But guess what? Some on-page tactics still hold the line.
        </p>
        
        <p className="mb-6">
          These are the old-school fundamentals with fresh-school relevance. The techniques Google still rewards because—spoiler alert—they're actually helpful to users. So put down your AI content spinner and let's get into the real stuff.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-8 rounded-r-md">
          <p className="italic text-amber-800">
            "SEO in 2025 isn't about gaming the system—it's about showing up like a professional with content that helps, structure that guides, and performance that respects the user's time."
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">1. 🔍 Search Intent: The Only Keyword That Matters Is Why</h2>
        <p className="mb-6">
          You can stuff your page with keywords like a piñata full of synonyms, but if you're not matching the reason behind the search, Google will ghost you. In 2025, intent is the algorithm's North Star. People aren't just searching "best protein powder"—they're trying to lose weight, gain muscle, or avoid burping up chalk dust.
        </p>

        <p className="font-medium mb-6">How to win:</p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>Answer the real question.</li>
          <li>Anticipate follow-ups.</li>
          <li>Align your tone to the reader's mood (panicked, researching, comparison-shopping, etc.).</li>
        </ul>

        <p className="font-medium mb-8">Google doesn't want "content"—it wants solutions.</p>
        
        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">2. 💬 Schema Markup: Talking to Google in Its Love Language</h2>
        <p className="mb-6">
          Structured data is like putting subtitles on your website. You're not just saying "Here's a recipe." You're saying, "This is a gluten-free lasagna with 1,000 five-star reviews, prep time of 15 mins, and no one cried making it."
        </p>

        <p className="font-medium mb-4">Use it for:</p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>Reviews, events, FAQs, products</li>
          <li>Article type, author, and publish dates</li>
          <li>Your ego (via "sameAs" and "author" tags)</li>
        </ul>

        <p className="mb-8">Result? Rich snippets. Enhanced SERPs. And maybe even your face showing up in Google's fancy answers box.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-purple-700 mb-3">3. 📚 Content Depth: Go Long or Go Home</h3>
            <p>We're not talking word count inflation here. Depth means giving a topic the attention it deserves—covering angles your competitors missed, answering the follow-up questions before they're even asked.</p>
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <p className="text-gray-700 font-medium">Quick test:</p>
              <p>If a user still needs to Google after reading your post, you've failed.</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-green-700 mb-3">4. 🧠 Internal Linking: The Secret Sauce</h3>
            <p>Google's like a curious toddler—it follows links to understand context. Internal linking isn't just about "SEO juice" anymore. It's about building semantic relationships between your ideas.</p>
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <p className="text-gray-700 font-medium">Do this:</p>
              <p>Build a web of ideas, not a maze of confusion.</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">5. ⚡ Core Web Vitals: Google's Fitness Tracker for Your Site</h2>
        <p className="mb-6">
          Still important. Still annoying. Still worth doing.
        </p>

        <p className="mb-6">
          You want your site fast, stable, and responsive because—shocker—people don't like broken or sluggish pages. And Google knows this.
        </p>

        <div className="bg-green-50 p-6 rounded-lg my-8">
          <h3 className="font-semibold text-green-800 mb-4">Focus on:</h3>
          <ul className="list-disc pl-6 space-y-3 text-green-800">
            <li><span className="font-bold">LCP:</span> Make that big hero image load fast</li>
            <li><span className="font-bold">CLS:</span> Stop layout shifts that make people rage-click</li>
            <li><span className="font-bold">INP:</span> Keep interaction smooth (especially on mobile)</li>
          </ul>
        </div>

        <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Person using laptop for SEO work" className="rounded-lg shadow-md my-8 w-full" />

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">6. 🔁 Update Your Evergreen Content</h2>
        <p className="mb-6">
          The "set it and forget it" strategy is now "set it and regret it." Your 2021 guide to TikTok ads needs CPR. And Google can smell stale info from a mile away.
        </p>

        <p className="font-medium mb-4">How to resuscitate content:</p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>Add new insights</li>
          <li>Refresh stats</li>
          <li>Replace outdated screenshots</li>
          <li>Re-promote like it's brand new</li>
        </ul>

        <p className="italic mb-8">Old content is like wine—only the good stuff gets better with age. The rest turns into vinegar.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">7. 🧠 Entity-Based Optimization</h3>
            <p>Keywords? Still relevant. But 2025 SEO is about entities—people, places, concepts, and how they all relate.</p>
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <p className="text-gray-700 font-medium">Think:</p>
              <p>"Elon Musk" is an entity. "CEO of Tesla and Twitter chaos coordinator" is context. Google understands both.</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-amber-700 mb-3">8. 🖼️ Media Optimization</h3>
            <p>A beautiful hero image is great—until it takes 6 seconds to load and your bounce rate turns into a bounce rave.</p>
            <div className="mt-4 p-3 bg-gray-50 rounded">
              <p className="text-gray-700 font-medium">Fix it:</p>
              <p>Compress images, use lazy loading, add descriptive alt text, and transcript your videos.</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">9. 📱 Mobile-First or You're Last</h2>
        <p className="mb-6">
          Google's been mobile-first for years. But now it's mobile-everything. Your beautifully responsive site on desktop doesn't matter if it feels like a Craigslist forum on phones.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-8 rounded-r-md">
          <p className="italic text-blue-800">
            "You don't design for mobile anymore. You design on mobile."
          </p>
        </div>

        <p className="font-medium mb-4">Your checklist:</p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>Large, tap-friendly buttons</li>
          <li>No desktop-style popups</li>
          <li>Font sizes that don't require squinting</li>
          <li>Fast mobile performance</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">10. 🤖 AI-Optimized Structure: Write for Readers, Organize for Robots</h2>
        <p className="mb-6">
          AI-assisted search (hello, SGE) now reads your page like a structured document. You need crystal-clear headings, digestible sections, and logic that even a chatbot can follow.
        </p>

        <p className="font-medium mb-4">Best practices:</p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li>Use H1 → H2 → H3 hierarchy properly</li>
          <li>Front-load value in every paragraph</li>
          <li>Use bullet points like this one</li>
          <li>Make your page skimmable, scrollable, and screenshot-worthy</li>
        </ul>

        <p className="mb-6">AI doesn't "read"—it parses. Give it clean input, and you'll get clean rankings.</p>

        <div className="bg-gray-100 p-6 rounded-lg my-8">
          <h3 className="font-semibold text-gray-800 mb-4">Final Thought: SEO That's Worth Clicking</h3>
          <p className="mb-4">On-page SEO in 2025 isn't about "gaming the system." It's about showing up like a professional—with content that helps, structure that guides, and performance that respects the user's time.</p>
          <p className="font-medium">Google is getting smarter. Your content should too.</p>
          <p className="mt-4 italic">Now go update your site like it's your digital résumé—because in Google's eyes, it kinda is.</p>
        </div>

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
  },
  {
    id: 2,
    title: "Why Core Web Vitals Are Still Running Your SEO Life in 2025",
    category: "Technical SEO",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
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

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-8 rounded-r-md">
          <p className="italic text-blue-800">
            "Core Web Vitals are Google's UX report card. They measure how fast, responsive, and stable your site feels when a real, impatient human visits it on a 4G connection while juggling coffee and car keys."
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">What the Heck Are Core Web Vitals, Anyway?</h2>
        <p className="mb-6">
          Core Web Vitals are Google's UX report card. They measure how fast, responsive, and stable your site feels when a real, impatient human visits it on a 4G connection while juggling coffee and car keys.
        </p>

        <p className="font-medium mb-4">The trio:</p>
        <ul className="list-disc pl-6 mb-8 space-y-2">
          <li><strong>LCP (Largest Contentful Paint)</strong> – "How fast does the important stuff show up?"</li>
          <li><strong>FID (First Input Delay)</strong> – "How fast can I click something without crying?"</li>
          <li><strong>CLS (Cumulative Layout Shift)</strong> – "Why did the button move just as I tapped it?!"</li>
        </ul>

        <p className="italic mb-8">
          Fail these, and Google assumes your site feels like trying to shop on a fax machine.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-blue-700 mb-3">LCP</h3>
            <p className="text-gray-700">Largest Contentful Paint</p>
            <p className="mt-2">How fast your main content loads</p>
            <div className="mt-4 p-3 bg-blue-50 rounded text-center">
              <p className="text-blue-800 font-bold">Target: &lt; 2.5s</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-purple-700 mb-3">FID</h3>
            <p className="text-gray-700">First Input Delay</p>
            <p className="mt-2">How fast your page responds</p>
            <div className="mt-4 p-3 bg-purple-50 rounded text-center">
              <p className="text-purple-800 font-bold">Target: &lt; 100ms</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-amber-700 mb-3">CLS</h3>
            <p className="text-gray-700">Cumulative Layout Shift</p>
            <p className="mt-2">How stable your page is</p>
            <div className="mt-4 p-3 bg-amber-50 rounded text-center">
              <p className="text-amber-800 font-bold">Target: &lt; 0.1</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">🚀 LCP: Show Me the Good Stuff—Fast</h2>
        <p className="mb-6">
          LCP measures how long it takes for the biggest visual part of your page to load. Google wants this under 2.5 seconds.
        </p>

        <p className="mb-6">
          Because guess what? Nobody cares how clever your headline is if your hero image takes longer to load than a microwave burrito.
        </p>

        <div className="bg-blue-50 p-6 rounded-lg my-8">
          <h3 className="font-semibold text-blue-800 mb-4">✅ How to Fix Your LCP Without Crying:</h3>
          <ul className="list-disc pl-6 space-y-3 text-blue-800">
            <li>Compress your images like you're paying for pixels.</li>
            <li>Cache smart—use the browser's memory like a steel trap.</li>
            <li>Use CDNs. Your server in Ohio isn't gonna cut it for users in Dubai.</li>
            <li>Ditch the script circus. If you're running 19 tracking pixels, rethink your life.</li>
            <li>Prioritize the critical path. Show useful stuff first; load party tricks later.</li>
          </ul>
        </div>

        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="Developer optimizing website code" className="rounded-lg shadow-md my-8 w-full" />

        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">🖱️ FID: Don't Make Me Wait to Click</h2>
        <p className="mb-6">
          FID is about how responsive your site feels. It's the time between someone clicking something and your site responding.
        </p>

        <p className="mb-6">
          If there's a delay, it feels like your site just ghosted them. FID over 100ms? That's the SEO equivalent of left on read.
        </p>

        <div className="bg-purple-50 p-6 rounded-lg my-8">
          <h3 className="font-semibold text-purple-800 mb-4">✅ FID Optimization Cheat Sheet:</h3>
          <ul className="list-disc pl-6 space-y-3 text-purple-800">
            <li>Minimize JavaScript like you're being charged by the kilobyte.</li>
            <li>Break long tasks into short bursts. We're not here for a TED Talk.</li>
            <li>Clean up your event handlers—don't make users wait for bloated code to think things through.</li>
            <li>Offload heavy lifting to web workers. They're like interns for your browser.</li>
            <li>Lazy load anything that doesn't scream "I need to be here right now."</li>
          </ul>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">🧩 CLS: Stop the Page from Jumping Like a Nervous Chihuahua</h2>
        <p className="mb-6">
          CLS is all about visual stability. If your text shifts right as someone's about to click "Buy Now"—and they hit "Delete Account" instead—that's a problem.
        </p>

        <p className="mb-6">
          Your CLS score should be under 0.1. Otherwise, your site looks like it's powered by caffeine and chaos.
        </p>

        <div className="bg-amber-50 p-6 rounded-lg my-8">
          <h3 className="font-semibold text-amber-800 mb-4">✅ CLS Fixes That Actually Work:</h3>
          <ul className="list-disc pl-6 space-y-3 text-amber-800">
            <li>Always define image and video dimensions. No surprises.</li>
            <li>Reserve space for ads. Don't let them photobomb the layout.</li>
            <li>Never insert content at the top of the page after load. That's betrayal.</li>
            <li>Use transform, not layout-shifting animations. They're smooth and don't ruin lives.</li>
            <li>Preload fonts so your text doesn't do a costume change mid-read.</li>
          </ul>
        </div>

        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" alt="Fast loading website on laptop" className="rounded-lg shadow-md my-8 w-full" />

        <h2 className="text-2xl font-semibold text-gray-800 mt-12 mb-4">💥 The Real-World Impact (Because You Like Numbers)</h2>
        <p className="mb-6">
          When you nail Core Web Vitals, the results aren't just "theoretical improvements"—they're cold, hard performance gains:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-green-700 mb-3">Lower Bounce Rates</h3>
            <p>Improved LCP can reduce bounce rates by up to 24%. People don't leave what loads fast.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-semibold text-green-700 mb-3">Higher Conversions</h3>
            <p>Stable pages (good CLS) can increase conversion rates by 15-20%. People buy when buttons don't move.</p>
          </div>
        </div>
      </React.Fragment>
    ),
  },
];

