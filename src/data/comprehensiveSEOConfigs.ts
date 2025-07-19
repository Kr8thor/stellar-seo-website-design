// src/data/comprehensiveSEOConfigs.ts
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    type: string;
    url: string;
  };
  twitterCard: {
    card: string;
    site: string;
    image: string;
    title: string;
    description: string;
  };
  schema: any;
  noIndex?: boolean;
}

const baseURL = 'https://mardenseo.com';
const defaultImage = `${baseURL}/og-image.jpg`;
const twitterHandle = '@mardenseo';

export const seoConfigs: Record<string, SEOConfig> = {
  home: {
    title: 'Professional SEO Services & App Development | Boost Rankings Now - Marden SEO',
    description: 'Get expert SEO services that boost organic traffic, improve rankings, and drive conversions. Custom app development and workflow automation. Free SEO audit included.',
    keywords: ['SEO services', 'search engine optimization', 'app development', 'workflow automation', 'digital marketing', 'organic traffic', 'rankings improvement'],
    canonical: baseURL,
    openGraph: {
      title: 'Professional SEO Services & App Development | Marden SEO',
      description: 'Expert SEO services that boost organic traffic, improve rankings, and drive real business results. Get your free SEO audit today.',
      image: defaultImage,
      type: 'website',
      url: baseURL
    },
    twitterCard: {
      card: 'summary_large_image',
      site: twitterHandle,
      image: defaultImage,
      title: 'Professional SEO Services & App Development | Marden SEO',
      description: 'Expert SEO services that boost organic traffic and rankings. Free audit included.'
    },
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Marden SEO',
      description: 'Professional SEO services helping businesses dominate search results and grow organic traffic',
      url: baseURL,
      serviceType: ['Search Engine Optimization', 'App Development', 'Workflow Automation'],
      areaServed: 'Worldwide'
    }
  },

  about: {
    title: 'Expert SEO Team & Proven Methodology | 10+ Years Experience - Marden SEO',
    description: 'Meet our expert SEO team with 10+ years of proven results. Learn about our data-driven methodology that helps businesses dominate search rankings and grow revenue.',
    keywords: ['SEO experts', 'SEO team', 'SEO experience', 'proven methodology', 'search engine optimization experts', 'digital marketing team'],
    canonical: `${baseURL}/about`,
    openGraph: {
      title: 'Expert SEO Team & Proven Methodology | Marden SEO',
      description: 'Meet our expert SEO team with 10+ years of proven results. Data-driven methodology that delivers real business growth.',
      image: defaultImage,
      type: 'website',
      url: `${baseURL}/about`
    },
    twitterCard: {
      card: 'summary_large_image',
      site: twitterHandle,
      image: defaultImage,
      title: 'Expert SEO Team & Proven Methodology | Marden SEO',
      description: 'Meet our expert SEO team with 10+ years of proven results.'
    },
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Marden SEO',
      description: 'Learn about our expert SEO team and proven methodology for search engine optimization success'
    }
  },

  services: {
    title: 'Comprehensive SEO Services & Packages | Boost Organic Traffic - Marden SEO',
    description: 'Complete SEO services including technical audits, on-page optimization, content strategy, and link building. Proven packages that deliver measurable ranking improvements.',
    keywords: ['SEO services', 'SEO packages', 'technical SEO', 'on-page optimization', 'content strategy', 'link building', 'SEO audit'],
    canonical: `${baseURL}/services`,
    openGraph: {
      title: 'Comprehensive SEO Services & Packages | Marden SEO',
      description: 'Complete SEO services including technical audits, on-page optimization, and link building. Proven packages that deliver results.',
      image: defaultImage,
      type: 'website',
      url: `${baseURL}/services`
    },
    twitterCard: {
      card: 'summary_large_image',
      site: twitterHandle,
      image: defaultImage,
      title: 'Comprehensive SEO Services & Packages | Marden SEO',
      description: 'Complete SEO services that deliver measurable ranking improvements.'
    },
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'SEO Services',
      description: 'Comprehensive search engine optimization services including technical SEO, content optimization, and link building'
    }
  },

  'services-pricing': {
    title: 'SEO Services Pricing & Packages | Transparent Rates - Marden SEO',
    description: 'Transparent SEO pricing for all service packages. Choose from basic audits to comprehensive monthly SEO campaigns. No hidden fees, clear deliverables, guaranteed results.',
    keywords: ['SEO pricing', 'SEO packages', 'SEO costs', 'affordable SEO', 'SEO rates', 'transparent pricing', 'SEO investment'],
    canonical: `${baseURL}/services-pricing`,
    openGraph: {
      title: 'SEO Services Pricing & Packages | Marden SEO',
      description: 'Transparent SEO pricing for all service packages. No hidden fees, clear deliverables, guaranteed results.',
      image: defaultImage,
      type: 'website',
      url: `${baseURL}/services-pricing`
    },
    twitterCard: {
      card: 'summary_large_image',
      site: twitterHandle,
      image: defaultImage,
      title: 'SEO Services Pricing & Packages | Marden SEO',
      description: 'Transparent SEO pricing with clear deliverables and guaranteed results.'
    },
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'SEO Services Pricing',
      description: 'Transparent pricing for professional SEO services with clear deliverables and measurable results'
    }
  },

  portfolio: {
    title: 'SEO Success Stories & Client Results | Proven Case Studies - Marden SEO',
    description: 'See real SEO results from our clients: 300% traffic increases, #1 Google rankings, and revenue growth. Detailed case studies with before/after metrics and strategies.',
    keywords: ['SEO results', 'SEO case studies', 'client success', 'traffic increase', 'ranking improvements', 'SEO portfolio', 'proven results'],
    canonical: `${baseURL}/portfolio`,
    openGraph: {
      title: 'SEO Success Stories & Client Results | Marden SEO',
      description: 'See real SEO results: 300% traffic increases, #1 rankings, and revenue growth. Detailed case studies with proven strategies.',
      image: defaultImage,
      type: 'website',
      url: `${baseURL}/portfolio`
    },
    twitterCard: {
      card: 'summary_large_image',
      site: twitterHandle,
      image: defaultImage,
      title: 'SEO Success Stories & Client Results | Marden SEO',
      description: 'Real SEO results: 300% traffic increases and #1 Google rankings.'
    },
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'SEO Portfolio',
      description: 'Case studies and success stories from our SEO clients showing real ranking improvements and traffic growth'
    }
  },

  contact: {
    title: 'Free SEO Consultation & Audit | Get Started Today - Marden SEO',
    description: 'Ready to boost your rankings? Get a free SEO consultation and website audit. Speak with our experts about your goals and receive a custom SEO strategy proposal.',
    keywords: ['SEO consultation', 'free SEO audit', 'SEO quote', 'contact SEO expert', 'SEO strategy', 'website audit', 'SEO proposal'],
    canonical: `${baseURL}/contact`,
    openGraph: {
      title: 'Free SEO Consultation & Audit | Marden SEO',
      description: 'Get a free SEO consultation and website audit. Speak with our experts and receive a custom SEO strategy proposal.',
      image: defaultImage,
      type: 'website',
      url: `${baseURL}/contact`
    },
    twitterCard: {
      card: 'summary_large_image',
      site: twitterHandle,
      image: defaultImage,
      title: 'Free SEO Consultation & Audit | Marden SEO',
      description: 'Get a free SEO consultation and custom strategy proposal.'
    },
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Marden SEO',
      description: 'Get in touch for a free SEO consultation and website audit'
    }
  },

  'app-building': {
    title: 'Custom App Development | React & Mobile Apps - Marden SEO',
    description: 'Professional custom app development services. Build scalable React web apps, mobile applications, and progressive web apps. Full-stack development with modern technologies.',
    keywords: ['app development', 'custom apps', 'React development', 'mobile app development', 'web applications', 'full-stack development', 'progressive web apps'],
    canonical: `${baseURL}/app-building`,
    openGraph: {
      title: 'Custom App Development | React & Mobile Apps | Marden SEO',
      description: 'Professional custom app development services. Build scalable React web apps and mobile applications with modern technologies.',
      image: defaultImage,
      type: 'website',
      url: `${baseURL}/app-building`
    },
    twitterCard: {
      card: 'summary_large_image',
      site: twitterHandle,
      image: defaultImage,
      title: 'Custom App Development | React & Mobile Apps',
      description: 'Professional app development with React and modern technologies.'
    },
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'App Development Services',
      description: 'Custom application development including React web apps, mobile applications, and progressive web apps'
    }
  },

  'workflow-automation': {
    title: 'n8n Workflow Automation Services | Business Process Optimization - Marden SEO',
    description: 'Streamline your business with custom n8n workflow automation. Automate repetitive tasks, integrate systems, and boost productivity with professional automation solutions.',
    keywords: ['workflow automation', 'n8n automation', 'business process automation', 'task automation', 'system integration', 'productivity tools', 'custom workflows'],
    canonical: `${baseURL}/workflow-automation`,
    openGraph: {
      title: 'n8n Workflow Automation Services | Marden SEO',
      description: 'Streamline your business with custom n8n workflow automation. Automate tasks, integrate systems, and boost productivity.',
      image: defaultImage,
      type: 'website',
      url: `${baseURL}/workflow-automation`
    },
    twitterCard: {
      card: 'summary_large_image',
      site: twitterHandle,
      image: defaultImage,
      title: 'n8n Workflow Automation Services',
      description: 'Custom workflow automation to streamline business processes.'
    },
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Workflow Automation Services',
      description: 'Custom n8n workflow automation services to streamline business processes and boost productivity'
    }
  },

  blog: {
    title: 'SEO Tips, Strategies & Industry Insights | Expert Blog - Marden SEO',
    description: 'Expert SEO tips, proven strategies, and latest industry insights. Learn from our SEO professionals with actionable guides that improve rankings and drive traffic.',
    keywords: ['SEO tips', 'SEO strategies', 'SEO blog', 'search engine optimization', 'digital marketing insights', 'SEO guides', 'ranking strategies'],
    canonical: `${baseURL}/blog`,
    openGraph: {
      title: 'SEO Tips, Strategies & Industry Insights | Marden SEO',
      description: 'Expert SEO tips and proven strategies. Learn from our professionals with actionable guides that improve rankings.',
      image: defaultImage,
      type: 'website',
      url: `${baseURL}/blog`
    },
    twitterCard: {
      card: 'summary_large_image',
      site: twitterHandle,
      image: defaultImage,
      title: 'SEO Tips, Strategies & Industry Insights',
      description: 'Expert SEO tips and proven strategies from our professionals.'
    },
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Marden SEO Blog',
      description: 'Expert SEO tips, strategies, and industry insights to help businesses improve their search rankings'
    }
  }
};

export const getSEOConfig = (pageKey: string): SEOConfig => {
  return seoConfigs[pageKey] || seoConfigs['home'];
};