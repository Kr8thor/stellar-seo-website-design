export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const faqData: FAQItem[] = [
  // General Questions
  {
    question: "What makes Marden SEO different from other SEO agencies?",
    answer: "Marden SEO combines technical expertise with a personalized approach. We don't just focus on rankings; we deliver comprehensive solutions that include SEO optimization, custom app development, and workflow automation. Our unique blend of services helps businesses achieve sustainable growth through improved online visibility and operational efficiency.",
    category: "General"
  },
  {
    question: "How long does it take to see SEO results?",
    answer: "SEO is a long-term strategy, and results typically begin to show within 3-6 months. However, some improvements like technical fixes and on-page optimization can impact your site within weeks. We provide monthly reports so you can track progress throughout our engagement. Significant ranking improvements and traffic growth usually become evident within 6-12 months.",
    category: "General"
  },
  {
    question: "Do you work with businesses of all sizes?",
    answer: "Yes! We work with businesses ranging from local startups to established enterprises. Our services are tailored to meet each client's specific needs and budget. Whether you're a small business looking to improve local visibility or a large company needing comprehensive digital solutions, we have the expertise to help you succeed.",
    category: "General"
  },
  
  // SEO Services Questions
  {
    question: "What SEO services do you offer?",
    answer: "We offer comprehensive SEO services including: Technical SEO audits and optimization, on-page SEO (content optimization, meta tags, internal linking), off-page SEO (link building, brand mentions), local SEO for location-based businesses, e-commerce SEO, content strategy and creation, keyword research and competitive analysis, and monthly reporting with actionable insights.",
    category: "SEO Services"
  },
  {
    question: "How do you determine which keywords to target?",
    answer: "We use a data-driven approach combining multiple factors: search volume and competition analysis, relevance to your business goals, user intent matching, competitive gap analysis, and conversion potential. We utilize professional tools like SEMrush, Ahrefs, and Google's Keyword Planner to identify opportunities that will drive qualified traffic to your site.",
    category: "SEO Services"
  },
  {
    question: "Do you guarantee first page rankings?",
    answer: "While we don't guarantee specific rankings (no ethical SEO agency should), we do guarantee our commitment to using proven strategies and best practices. Our track record shows consistent improvements in rankings, traffic, and conversions for our clients. We focus on sustainable, white-hat techniques that deliver long-term results rather than quick fixes that could harm your site.",
    category: "SEO Services"
  },
  
  // App Development Questions
  {
    question: "What types of applications do you build?",
    answer: "We specialize in custom web applications built with modern technologies like React, Next.js, and Node.js. This includes progressive web apps (PWAs), e-commerce platforms, customer portals, internal business tools, API integrations, and mobile-responsive web applications. We focus on creating scalable, performant solutions that solve real business problems.",
    category: "App Development"
  },
  {
    question: "How long does app development typically take?",
    answer: "Development timelines vary based on project complexity. A simple web application might take 4-8 weeks, while complex enterprise solutions can take 3-6 months or more. We follow an agile development process with regular milestones and updates, ensuring transparency throughout the project. We'll provide a detailed timeline during our initial consultation.",
    category: "App Development"
  },
  
  // Workflow Automation Questions
  {
    question: "What is n8n workflow automation?",
    answer: "n8n is a powerful workflow automation tool that connects your apps and services to automate repetitive tasks. It's like Zapier but self-hosted and more flexible. We help businesses implement n8n to automate processes like data synchronization, email workflows, social media posting, lead management, reporting, and much more. This saves time, reduces errors, and allows your team to focus on high-value activities.",
    category: "Workflow Automation"
  },
  {
    question: "What processes can be automated?",
    answer: "Almost any repetitive digital task can be automated! Common examples include: lead capture and CRM updates, email marketing sequences, social media scheduling, invoice generation and payment processing, data backup and synchronization, report generation, customer support ticket routing, and inventory management. We'll analyze your workflows to identify the best automation opportunities.",
    category: "Workflow Automation"
  },
  
  // Pricing and Process Questions
  {
    question: "How much do your services cost?",
    answer: "Our pricing is customized based on your specific needs and goals. SEO services typically start at $1,500/month, custom app development projects range from $5,000-$50,000+, and workflow automation implementations start around $2,500. We offer free consultations to discuss your needs and provide a detailed quote. We also have flexible payment options and can work within various budgets.",
    category: "Pricing"
  },
  {
    question: "What's included in a free SEO audit?",
    answer: "Our comprehensive SEO audit includes: technical SEO analysis (site speed, mobile-friendliness, crawlability), on-page SEO review (content, meta tags, headings), backlink profile analysis, competitive analysis, keyword opportunity assessment, and a prioritized action plan. You'll receive a detailed report with specific recommendations to improve your search visibility.",
    category: "Pricing"
  },
  {
    question: "How do you communicate progress and results?",
    answer: "We believe in transparent communication. You'll receive: monthly detailed reports showing key metrics and progress, access to a client dashboard for real-time data, regular strategy calls to discuss performance and next steps, email updates on important developments, and 24/7 access to our project management system. We're always available to answer questions and adjust strategies based on results.",
    category: "Process"
  },
  {
    question: "Can you work with our existing team or systems?",
    answer: "Absolutely! We're experienced in collaborating with in-house teams and integrating with existing systems. Whether you need us to train your team, work alongside your developers, or integrate with your current CMS/CRM, we're flexible and adaptive. Our goal is to enhance your capabilities, not replace them.",
    category: "Process"
  }
];