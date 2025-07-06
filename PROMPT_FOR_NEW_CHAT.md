# 📋 PROMPT TEMPLATE FOR NEW CHAT SESSION

Copy and paste this entire prompt into a new chat to continue the SEO implementation:

---

I need help continuing the advanced SEO implementation for the Marden SEO website. I've partially implemented analytics and SEO features but encountered some issues that need debugging.

**Project Details:**
- Location: `C:\Users\Leo\stellar-seo-website-design`
- Currently running: `npm run dev` on http://localhost:8087
- Git repo: https://github.com/Kr8thor/stellar-seo-website-design
- Live site: https://mardenseo.com

**Current Status:**
✅ **Working:**
- Analytics loading (GA4: G-C4RC6CSFG6, Clarity: sampcwqufk, GTM: GTM-5R45LHS7)
- SEO infrastructure (SEOProvider, React Helmet, structured data)
- Breadcrumbs on Services/Contact pages
- Clean sitemap.xml and robots.txt

⚠️ **Issues:**
- AnalyticsProvider causes runtime error when enabled (currently disabled in App.tsx)
- Three new components created but not integrated yet:
  - ReviewSection (for home page reviews with schema)
  - LazyImage (for performance optimization)
  - LazyLoadSection (for lazy loading content)

**Please help me:**
1. Debug and fix the AnalyticsProvider runtime error
2. Safely integrate ReviewSection into the home page
3. Start implementing LazyImage throughout the site
4. Complete remaining SEO optimizations

**Important Constraints:**
- The site's beautiful React design must remain 100% unchanged
- Only add SEO enhancements, don't modify existing UI/UX
- All changes must be tested before deployment
- Use the existing component structure and styling system

Please check the `CONTINUE_SEO_IMPLEMENTATION.md` file in the project root for complete technical details, file locations, and debugging steps already identified.

Could you start by:
1. Checking the current state of the project
2. Identifying the exact AnalyticsProvider error
3. Proposing a fix that maintains all functionality
4. Then we can proceed with the component integrations

---

**Additional Context Files to Reference:**
- `CONTINUE_SEO_IMPLEMENTATION.md` - Detailed current state and issues
- `SEO plan` document - Original implementation plan
- `Current update` document - What's been completed so far
