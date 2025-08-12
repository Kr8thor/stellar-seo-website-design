// Service Definitions for Marden SEO Payment Integration
import { PaymentService } from '../types/payment';

export const seoServices: PaymentService[] = [
  {
    id: 'seo-basic',
    name: 'SEO Starter Package',
    description: 'Perfect for small businesses looking to improve their online visibility',
    type: 'subscription',
    basePrice: 150000, // $1500 in cents
    billingPeriod: 'monthly',
    category: 'seo',
    stripePriceId: 'price_basic_seo_monthly', // To be set when Stripe is configured
    features: [
      'Comprehensive SEO audit',
      'Keyword research (up to 20 keywords)',
      'On-page optimization for 10 pages',
      'Monthly performance reports',
      'Google My Business optimization',
      'Basic link building strategy'
    ]
  },
  {
    id: 'seo-advanced',
    name: 'SEO Growth Package',
    description: 'Ideal for businesses ready to dominate their market',
    type: 'subscription',
    basePrice: 350000, // $3500 in cents
    billingPeriod: 'monthly',
    category: 'seo',
    stripePriceId: 'price_advanced_seo_monthly',
    popular: true,
    features: [
      'Everything in Starter Package',
      'Keyword research (up to 50 keywords)',
      'On-page optimization for 25 pages',
      'Advanced link building campaign',
      'Content strategy and creation (4 articles/month)',
      'Competitor analysis and monitoring',
      'Bi-weekly strategy calls'
    ]
  },
  {
    id: 'seo-enterprise',
    name: 'SEO Enterprise Package',
    description: 'Comprehensive SEO solution for large businesses',
    type: 'subscription',
    basePrice: 750000, // $7500 in cents
    billingPeriod: 'monthly',
    category: 'seo',
    stripePriceId: 'price_enterprise_seo_monthly',
    features: [
      'Everything in Growth Package',
      'Unlimited keyword research',
      'Full website optimization',
      'Advanced technical SEO',
      'Content creation (10 articles/month)',
      'Dedicated account manager',
      'Weekly strategy calls',
      'Custom reporting dashboard'
    ]
  }
];

// One-time Services & Custom Projects
export const oneTimeServices: PaymentService[] = [
  {
    id: 'seo-audit',
    name: 'Comprehensive SEO Audit',
    description: 'In-depth analysis of your website\'s SEO performance',
    type: 'one-time',
    basePrice: 99900, // $999 in cents
    category: 'audit',
    features: [
      'Technical SEO analysis',
      'On-page optimization review',
      'Backlink profile analysis',
      'Competitor analysis',
      'Keyword opportunity assessment',
      'Detailed action plan',
      '60-minute consultation call'
    ],
    deliverables: ['50+ page audit report', 'Prioritized action items', 'Implementation roadmap']
  },
  {
    id: 'keyword-research',
    name: 'Keyword Research Package',
    description: 'Comprehensive keyword research and strategy',
    type: 'one-time',
    basePrice: 75000, // $750 in cents
    category: 'research',
    features: [
      'Industry keyword analysis',
      'Competitor keyword gaps',
      'Search volume and difficulty data',
      'User intent mapping',
      'Content recommendations',
      'Keyword clustering and prioritization'
    ],
    deliverables: ['Keyword research spreadsheet', 'Content strategy guide', 'Implementation checklist']
  },
  {
    id: 'consultation',
    name: 'SEO Consultation Call',
    description: 'One-on-one SEO strategy session',
    type: 'hourly',
    basePrice: 20000, // $200/hour in cents
    category: 'consultation',
    features: [
      'Personalized SEO advice',
      'Strategy planning',
      'Q&A session',
      'Follow-up notes',
      'Recorded session (optional)'
    ]
  }
];

export const developmentServices: PaymentService[] = [
  {
    id: 'app-landing',
    name: 'Landing Page Development',
    description: 'High-converting landing page with modern design',
    type: 'one-time',
    basePrice: 250000, // $2500 in cents
    category: 'development',
    features: [
      'Custom React development',
      'Mobile-responsive design',
      'SEO optimization',
      'Contact form integration',
      'Analytics setup',
      'Performance optimization',
      '30 days of support'
    ],
    deliverables: ['Fully functional landing page', 'Source code', 'Deployment assistance']
  },
  {
    id: 'app-business',
    name: 'Business Web Application',
    description: 'Custom web application tailored to your business needs',
    type: 'custom',
    basePrice: 1500000, // $15000 in cents
    category: 'development',
    popular: true,
    customPricing: {
      min: 1500000, // $15,000
      max: 5000000, // $50,000
      description: 'Pricing varies based on project complexity and requirements'
    },
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
    deliverables: ['Complete web application', 'Documentation', 'Training materials', 'Source code']
  },
  {
    id: 'app-ecommerce',
    name: 'E-commerce Platform',
    description: 'Complete online store with payment processing',
    type: 'custom',
    basePrice: 2500000, // $25000 in cents
    category: 'development',
    customPricing: {
      min: 2500000, // $25,000
      max: 10000000, // $100,000
      description: 'Pricing based on features, integrations, and complexity'
    },
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
    deliverables: ['E-commerce platform', 'Admin panel', 'Documentation', 'Training']
  },
  {
    id: 'workflow-automation',
    name: 'Workflow Automation',
    description: 'Business process automation with n8n',
    type: 'custom',
    basePrice: 250000, // $2500 base in cents
    category: 'automation',
    customPricing: {
      min: 250000, // $2,500
      max: 1500000, // $15,000
      description: 'Pricing based on workflow complexity and integrations'
    },
    features: [
      'Complete n8n setup and configuration',
      'Up to 15 custom workflows',
      'CRM integration',
      'Marketing automation',
      'Data synchronization',
      'Custom API connections',
      'Advanced logic and conditions',
      '60 days of support'
    ]
  }
];

// Educational Services
export const educationalServices: PaymentService[] = [
  {
    id: 'edu-weekend-intensive',
    name: '1:1 Website in a Weekend',
    description: 'Intensive personal coaching to build your site together',
    type: 'one-time',
    basePrice: 60000, // $600 in cents
    category: 'education',
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
    deliverables: ['Completed website', 'Recording of sessions', 'Resource library access']
  },
  {
    id: 'edu-self-paced',
    name: 'Self-Paced Creator Bundle',
    description: 'Complete course with all tools and templates',
    type: 'one-time',
    basePrice: 19900, // $199 in cents
    category: 'education',
    features: [
      'Comprehensive video content library',
      'Step-by-step tutorials',
      'Template library access',
      'Community forum access',
      '6-month email support',
      'Downloadable resources',
      'Certificate of completion'
    ],
    deliverables: ['Course access', 'Templates', 'Community membership']
  },
  {
    id: 'edu-vip-mentorship',
    name: 'VIP Web Creator Mentorship',
    description: 'Premium mentorship with ongoing support',
    type: 'one-time',
    basePrice: 100000, // $1000 in cents
    category: 'education',
    features: [
      'Monthly 1:1 strategy calls',
      'Unlimited email support',
      'Priority access to new content',
      'Personal project reviews',
      '3-month program duration',
      'Custom learning path',
      'Direct access to instructor'
    ],
    deliverables: ['3 months of mentorship', 'Project reviews', 'Strategy documents']
  },
  {
    id: 'edu-group-workshop',
    name: 'Group Workshop',
    description: 'Interactive group learning experience',
    type: 'one-time',
    basePrice: 30000, // $300 in cents
    category: 'education',
    features: [
      'Full-day interactive workshop',
      'Small group (max 8 people)',
      'Hands-on practice',
      'Group project collaboration',
      'Follow-up Q&A session',
      'Workshop materials',
      'Networking opportunities'
    ],
    deliverables: ['Workshop participation', 'Materials', 'Group project']
  }
];

// Support & Maintenance Services
export const supportServices: PaymentService[] = [
  {
    id: 'support-basic',
    name: 'Basic Support Package',
    description: 'Ongoing support for your digital assets',
    type: 'subscription',
    basePrice: 50000, // $500 in cents
    billingPeriod: 'monthly',
    category: 'support',
    features: [
      'Monthly website backups',
      'Security monitoring',
      'Performance monitoring',
      'Minor content updates (up to 2 hours)',
      'Email support',
      'Monthly health report'
    ]
  },
  {
    id: 'support-premium',
    name: 'Premium Support Package',
    description: 'Comprehensive support and maintenance',
    type: 'subscription',
    basePrice: 150000, // $1500 in cents
    billingPeriod: 'monthly',
    category: 'support',
    features: [
      'Everything in Basic Support',
      'Weekly backups',
      'Priority support',
      'Content updates (up to 10 hours)',
      'Performance optimization',
      'Security updates',
      'A/B testing support',
      'Quarterly strategy review'
    ]
  }
];

// Combine all services
export const allServices: PaymentService[] = [
  ...seoServices,
  ...oneTimeServices,
  ...developmentServices,
  ...educationalServices,
  ...supportServices
];

// Helper function to get service by ID
export const getServiceById = (id: string): PaymentService | undefined => {
  return allServices.find(service => service.id === id);
};

// Helper function to format price
export const formatPrice = (priceInCents: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceInCents / 100);
};

// Helper function to get price in dollars (for compatibility)
export const getPriceInDollars = (priceInCents: number): number => {
  return priceInCents / 100;
};

// Export categories for filtering
export const serviceCategories = [
  'seo',
  'audit', 
  'research',
  'consultation',
  'development',
  'automation',
  'education',
  'support'
] as const;

export type ServiceCategory = typeof serviceCategories[number];