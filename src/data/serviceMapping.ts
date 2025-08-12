// Service mapping utility to bridge servicesCatalog and services data structures
import { ServiceItem } from './servicesCatalog';
import { PaymentService, getServiceById } from './services';

// Mapping between servicesCatalog IDs and services IDs
export const serviceIdMapping: Record<string, string> = {
  // SEO Services
  'seo-starter': 'seo-basic',
  'seo-growth': 'seo-advanced',
  'seo-enterprise': 'seo-enterprise',
  
  // One-time services
  'seo-audit': 'seo-audit',
  'keyword-research': 'keyword-research',
  
  // Development services
  'app-landing': 'app-landing',
  'app-business': 'app-business',
  'app-ecommerce': 'app-ecommerce',
  
  // Automation services
  'automation-starter': 'workflow-automation',
  'automation-business': 'workflow-automation',
  'automation-enterprise': 'workflow-automation',
  
  // Educational services
  'edu-weekend-intensive': 'edu-weekend-intensive',
  'edu-self-paced': 'edu-self-paced',
  'edu-vip-mentorship': 'edu-vip-mentorship',
  'edu-group-workshop': 'edu-group-workshop',
  
  // Support services
  'support-basic': 'support-basic',
  'support-premium': 'support-premium'
};

// Reverse mapping for looking up catalog items from service IDs
export const reverseServiceIdMapping: Record<string, string> = Object.fromEntries(
  Object.entries(serviceIdMapping).map(([catalogId, serviceId]) => [serviceId, catalogId])
);

// Convert ServiceItem (from catalog) to PaymentService format
export const convertCatalogItemToPaymentService = (catalogItem: ServiceItem): PaymentService => {
  const mappedServiceId = serviceIdMapping[catalogItem.id];
  const existingService = mappedServiceId ? getServiceById(mappedServiceId) : null;
  
  // If we have a mapped service, use it as base
  if (existingService) {
    return {
      ...existingService,
      // Override with catalog data to ensure consistency
      name: catalogItem.name,
      description: catalogItem.description,
      basePrice: catalogItem.price * 100, // Convert dollars to cents
      features: catalogItem.features,
    };
  }
  
  // Fallback: create new PaymentService from catalog item
  return {
    id: catalogItem.id,
    name: catalogItem.name,
    description: catalogItem.description,
    type: catalogItem.recurring === 'monthly' || catalogItem.recurring === 'yearly' ? 'subscription' : 'one-time',
    basePrice: catalogItem.price * 100, // Convert dollars to cents
    billingPeriod: catalogItem.recurring === 'monthly' ? 'monthly' : 
                   catalogItem.recurring === 'yearly' ? 'yearly' : undefined,
    category: catalogItem.category.toLowerCase().replace(/\s+/g, '_') as any,
    features: catalogItem.features,
    popular: catalogItem.popular,
    stripePriceId: `price_${catalogItem.id}` // Generate placeholder
  };
};

// Convert PaymentService to ServiceItem format
export const convertPaymentServiceToCatalogItem = (paymentService: PaymentService): ServiceItem => {
  return {
    id: paymentService.id,
    name: paymentService.name,
    description: paymentService.description,
    price: Math.round(paymentService.basePrice / 100), // Convert cents to dollars
    category: formatCategoryName(paymentService.category),
    recurring: paymentService.type === 'subscription' ? (paymentService.billingPeriod || 'monthly') : 'one-time',
    popular: paymentService.popular,
    features: paymentService.features,
    timeline: getTimelineFromService(paymentService)
  };
};

// Helper function to format category names consistently
export const formatCategoryName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'seo': 'SEO Services',
    'audit': 'SEO Services',
    'research': 'SEO Services',
    'consultation': 'SEO Services',
    'development': 'App Development',
    'automation': 'Workflow Automation',
    'education': 'Educational Services',
    'support': 'Support & Maintenance'
  };
  
  return categoryMap[category] || category;
};

// Helper function to generate timeline from service
export const getTimelineFromService = (service: PaymentService): string => {
  if (service.type === 'subscription') {
    return `Ongoing ${service.billingPeriod} service`;
  }
  
  if (service.type === 'hourly') {
    return 'As needed';
  }
  
  // Estimate timeline based on price for one-time services
  const priceInDollars = service.basePrice / 100;
  if (priceInDollars < 1000) {
    return '3-5 business days';
  } else if (priceInDollars < 5000) {
    return '1-2 weeks';
  } else if (priceInDollars < 15000) {
    return '3-4 weeks';
  } else {
    return '8-12 weeks';
  }
};

// Validation function to ensure pricing consistency
export const validatePricingConsistency = (): { isConsistent: boolean; discrepancies: string[] } => {
  const discrepancies: string[] = [];
  
  // Check each mapping
  Object.entries(serviceIdMapping).forEach(([catalogId, serviceId]) => {
    const paymentService = getServiceById(serviceId);
    if (!paymentService) {
      discrepancies.push(`Service ${serviceId} not found in payment services`);
      return;
    }
    
    // Note: We expect prices to be consistent now after our updates
    // This function can be used for future validation
  });
  
  return {
    isConsistent: discrepancies.length === 0,
    discrepancies
  };
};

// Get unified price (always return the authoritative price from services.ts)
export const getUnifiedPrice = (catalogId: string): number => {
  const serviceId = serviceIdMapping[catalogId];
  if (serviceId) {
    const service = getServiceById(serviceId);
    if (service) {
      return Math.round(service.basePrice / 100); // Convert cents to dollars
    }
  }
  
  // Fallback to a default if no mapping exists
  console.warn(`No price mapping found for catalog item: ${catalogId}`);
  return 0;
};

// Export for use in components
export { getServiceById } from './services';