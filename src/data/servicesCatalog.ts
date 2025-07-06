export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  recurring?: 'monthly' | 'yearly' | 'one-time';
  popular?: boolean;
  features: string[];
  deliverables?: string[];
  timeline?: string;
}

export const servicesCatalog: ServiceItem[] = [
  // SEO Services
  {
    id: 'seo-starter',
    name: 'SEO Starter Package',
    description: 'Perfect for small businesses looking to improve their online visibility',
    price: 1500,
    category: 'SEO Services',
    recurring: 'monthly',
    features: [
      'Comprehensive SEO audit',
      'Keyword research (up to 20 keywords)',
      'On-page optimization for 10 pages',
      'Monthly performance reports',
      'Google My Business optimization',
      'Basic link building strategy'
    ],
    timeline: 'Ongoing monthly service'
  },
  {
    id: 'seo-growth',
    name: 'SEO Growth Package',
    description: 'Ideal for businesses ready to dominate their market',
    price: 3500,
    category: 'SEO Services',
    recurring: 'monthly',
    popular: true,
    features: [
      'Everything in Starter Package',
      'Keyword research (up to 50 keywords)',
      'On-page optimization for 25 pages',
      'Advanced link building campaign',
      'Content strategy and creation (4 articles/month)',
      'Competitor analysis and monitoring',
      'Bi-weekly strategy calls'
    ],
    timeline: 'Ongoing monthly service'
  },
  {
    id: 'seo-enterprise',
    name: 'SEO Enterprise Package',
    description: 'Comprehensive SEO solution for large businesses',
    price: 7500,
    category: 'SEO Services',
    recurring: 'monthly',
    features: [
      'Everything in Growth Package',
      'Unlimited keyword research',
      'Full website optimization',
      'Advanced technical SEO',
      'Content creation (10 articles/month)',
      'Dedicated account manager',
      'Weekly strategy calls',
      'Custom reporting dashboard'
    ],
    timeline: 'Ongoing monthly service'
  },
  // One-time SEO Services
  {
    id: 'seo-audit',
    name: 'Comprehensive SEO Audit',
    description: 'In-depth analysis of your website\'s SEO performance',
    price: 999,
    category: 'SEO Services',
    recurring: 'one-time',
    features: [
      'Technical SEO analysis',
      'On-page optimization review',
      'Backlink profile analysis',
      'Competitor analysis',
      'Keyword opportunity assessment',
      'Detailed action plan',
      '60-minute consultation call'
    ],
    deliverables: ['50+ page audit report', 'Prioritized action items', 'Implementation roadmap'],
    timeline: '5-7 business days'
  },
  {
    id: 'keyword-research',
    name: 'Keyword Research Package',
    description: 'Comprehensive keyword research and strategy',
    price: 750,
    category: 'SEO Services',
    recurring: 'one-time',
    features: [
      'Industry keyword analysis',
      'Competitor keyword gaps',
      'Search volume and difficulty data',
      'User intent mapping',
      'Content recommendations',
      'Keyword clustering and prioritization'
    ],
    deliverables: ['Keyword research spreadsheet', 'Content strategy guide', 'Implementation checklist'],
    timeline: '3-5 business days'
  },

  // App Development Services
  {
    id: 'app-landing',
    name: 'Landing Page Development',
    description: 'High-converting landing page with modern design',
    price: 2500,
    category: 'App Development',
    recurring: 'one-time',
    features: [
      'Custom React development',
      'Mobile-responsive design',
      'SEO optimization',
      'Contact form integration',
      'Analytics setup',
      'Performance optimization',
      '30 days of support'
    ],
    deliverables: ['Fully functional landing page', 'Source code', 'Deployment assistance'],
    timeline: '2-3 weeks'
  },  {
    id: 'app-business',
    name: 'Business Web Application',
    description: 'Custom web application tailored to your business needs',
    price: 15000,
    category: 'App Development',
    recurring: 'one-time',
    popular: true,
    features: [
      'Full-stack React application',
      'Custom backend development',
      'Database design and setup',
      'User authentication system',
      'Admin dashboard',
      'API integrations',
      'Responsive design',
      '90 days of support'
    ],
    deliverables: ['Complete web application', 'Documentation', 'Training materials', 'Source code'],
    timeline: '8-12 weeks'
  },
  {
    id: 'app-ecommerce',
    name: 'E-commerce Platform',
    description: 'Complete online store with payment processing',
    price: 25000,
    category: 'App Development',
    recurring: 'one-time',
    features: [
      'Custom e-commerce platform',
      'Product management system',
      'Shopping cart and checkout',
      'Payment gateway integration',
      'Order management',
      'Customer accounts',
      'Inventory tracking',
      'SEO optimization',
      '6 months of support'
    ],
    deliverables: ['E-commerce platform', 'Admin panel', 'Documentation', 'Training'],
    timeline: '12-16 weeks'
  },

  // Workflow Automation Services
  {
    id: 'automation-starter',
    name: 'Workflow Automation Starter',
    description: 'Basic automation setup for common business processes',
    price: 2500,
    category: 'Workflow Automation',
    recurring: 'one-time',
    features: [
      'n8n platform setup',
      'Up to 5 workflow automations',
      'Email automation',
      'Basic integrations',
      'Testing and deployment',
      'Documentation',
      '30 days of support'
    ],
    deliverables: ['Configured workflows', 'Documentation', 'Training session'],
    timeline: '1-2 weeks'
  },  {
    id: 'automation-business',
    name: 'Business Process Automation',
    description: 'Comprehensive automation solution for your business',
    price: 5000,
    category: 'Workflow Automation',
    recurring: 'one-time',
    popular: true,
    features: [
      'Complete n8n setup and configuration',
      'Up to 15 custom workflows',
      'CRM integration',
      'Marketing automation',
      'Data synchronization',
      'Custom API connections',
      'Advanced logic and conditions',
      '60 days of support'
    ],
    deliverables: ['All configured workflows', 'Integration documentation', 'Training materials', 'Best practices guide'],
    timeline: '3-4 weeks'
  },
  {
    id: 'automation-enterprise',
    name: 'Enterprise Automation Suite',
    description: 'Full-scale automation transformation',
    price: 15000,
    category: 'Workflow Automation',
    recurring: 'one-time',
    features: [
      'Unlimited workflow creation',
      'Complex business process automation',
      'Multi-system integration',
      'Custom development as needed',
      'Performance optimization',
      'Security and compliance setup',
      'Team training',
      '6 months of support'
    ],
    deliverables: ['Complete automation system', 'Documentation suite', 'Training program', 'Maintenance guide'],
    timeline: '8-12 weeks'
  },

  // Support & Maintenance
  {
    id: 'support-basic',
    name: 'Basic Support Package',
    description: 'Ongoing support for your digital assets',
    price: 500,
    category: 'Support & Maintenance',
    recurring: 'monthly',
    features: [
      'Monthly website backups',
      'Security monitoring',
      'Performance monitoring',
      'Minor content updates (up to 2 hours)',
      'Email support',
      'Monthly health report'
    ],
    timeline: 'Ongoing monthly service'
  },
  {
    id: 'support-premium',
    name: 'Premium Support Package',
    description: 'Comprehensive support and maintenance',
    price: 1500,
    category: 'Support & Maintenance',
    recurring: 'monthly',
    features: [
      'Everything in Basic Support',
      'Weekly backups',
      'Priority support',
      'Content updates (up to 10 hours)',
      'Performance optimization',
      'Security updates',
      'A/B testing support',
      'Quarterly strategy review'
    ],
    timeline: 'Ongoing monthly service'
  },

  // Educational Services
  {
    id: 'edu-weekend-intensive',
    name: '1:1 Website in a Weekend',
    description: 'Intensive personal coaching to build your site together',
    price: 600,
    category: 'Educational Services',
    recurring: 'one-time',
    popular: true,
    features: [
      'Intensive 1:1 mentoring sessions',
      'Weekend intensive format',
      'Live website building',
      'Personalized guidance',
      'Lifetime access to recordings',
      'All tools and resources included',
      'Post-workshop support'
    ],
    deliverables: ['Completed website', 'Recording of sessions', 'Resource library access'],
    timeline: '2 days (weekend)'
  },
  {
    id: 'edu-self-paced',
    name: 'Self-Paced Creator Bundle',
    description: 'Complete course with all tools and templates',
    price: 199,
    category: 'Educational Services',
    recurring: 'one-time',
    features: [
      'Comprehensive video content library',
      'Step-by-step tutorials',
      'Template library access',
      'Community forum access',
      '6-month email support',
      'Downloadable resources',
      'Certificate of completion'
    ],
    deliverables: ['Course access', 'Templates', 'Community membership'],
    timeline: 'Self-paced (6 months access)'
  },
  {
    id: 'edu-vip-mentorship',
    name: 'VIP Web Creator Mentorship',
    description: 'Premium mentorship with ongoing support',
    price: 1000,
    category: 'Educational Services',
    recurring: 'one-time',
    features: [
      'Monthly 1:1 strategy calls',
      'Unlimited email support',
      'Priority access to new content',
      'Personal project reviews',
      '3-month program duration',
      'Custom learning path',
      'Direct access to instructor'
    ],
    deliverables: ['3 months of mentorship', 'Project reviews', 'Strategy documents'],
    timeline: '3 months'
  },
  {
    id: 'edu-group-workshop',
    name: 'Group Workshop',
    description: 'Interactive group learning experience',
    price: 300,
    category: 'Educational Services',
    recurring: 'one-time',
    features: [
      'Full-day interactive workshop',
      'Small group (max 8 people)',
      'Hands-on practice',
      'Group project collaboration',
      'Follow-up Q&A session',
      'Workshop materials',
      'Networking opportunities'
    ],
    deliverables: ['Workshop participation', 'Materials', 'Group project'],
    timeline: '1 day workshop'
  }
];