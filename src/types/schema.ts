/**
 * Enhanced Schema.org Types for Phase 2 Implementation
 * Comprehensive TypeScript interfaces for structured data
 */

// Base Schema interface
export interface BaseSchema {
  "@context": "https://schema.org";
  "@type": string;
}

// Organization Schema (already implemented)
export interface OrganizationSchema extends BaseSchema {
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
  description?: string;
  address?: PostalAddressSchema;
  contactPoint?: ContactPointSchema;
  sameAs?: string[];
}

// Service Schema for service pages
export interface ServiceSchema extends BaseSchema {
  "@type": "Service";
  name: string;
  description: string;
  provider: OrganizationSchema;
  areaServed?: string | string[];
  serviceType?: string[];
  url?: string;
  offers?: OfferSchema[];
}

// Article Schema for blog posts and case studies
export interface ArticleSchema extends BaseSchema {
  "@type": "Article";
  headline: string;
  description: string;
  author: PersonSchema | OrganizationSchema;
  publisher: OrganizationSchema;
  datePublished: string;
  dateModified?: string;
  image?: string | ImageObjectSchema;
  url?: string;
  mainEntityOfPage?: string;
  articleSection?: string;
  wordCount?: number;
}

// Breadcrumb Schema
export interface BreadcrumbListSchema extends BaseSchema {
  "@type": "BreadcrumbList";
  itemListElement: BreadcrumbSchema[];
}

export interface BreadcrumbSchema extends BaseSchema {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
}

// FAQ Schema for rich snippets
export interface FAQPageSchema extends BaseSchema {
  "@type": "FAQPage";
  mainEntity: QuestionSchema[];
}

export interface QuestionSchema extends BaseSchema {
  "@type": "Question";
  name: string;
  acceptedAnswer: AnswerSchema;
}

export interface AnswerSchema extends BaseSchema {
  "@type": "Answer";
  text: string;
}

// HowTo Schema for workflow automation
export interface HowToSchema extends BaseSchema {
  "@type": "HowTo";
  name: string;
  description: string;
  image?: string | ImageObjectSchema;
  estimatedCost?: MonetaryAmountSchema;
  step: HowToStepSchema[];
  tool?: string[];
  supply?: string[];
}

export interface HowToStepSchema extends BaseSchema {
  "@type": "HowToStep";
  name: string;
  text: string;
  image?: string | ImageObjectSchema;
  url?: string;
}

// Supporting Schemas
export interface PostalAddressSchema extends BaseSchema {
  "@type": "PostalAddress";
  addressCountry: string;
  addressLocality?: string;
  addressRegion?: string;
  postalCode?: string;
  streetAddress?: string;
}

export interface ContactPointSchema extends BaseSchema {
  "@type": "ContactPoint";
  contactType: string;
  url?: string;
  telephone?: string;
  email?: string;
}

export interface PersonSchema extends BaseSchema {
  "@type": "Person";
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
}

export interface ImageObjectSchema extends BaseSchema {
  "@type": "ImageObject";
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface OfferSchema extends BaseSchema {
  "@type": "Offer";
  name: string;
  description?: string;
  price?: string;
  priceCurrency?: string;
  availability?: string;
  url?: string;
}

export interface MonetaryAmountSchema extends BaseSchema {
  "@type": "MonetaryAmount";
  currency: string;
  value: number;
}

// Combined Schema types for easier usage
export type EnhancedSchema = 
  | OrganizationSchema
  | ServiceSchema
  | ArticleSchema
  | BreadcrumbListSchema
  | FAQPageSchema
  | HowToSchema;

// Schema data configuration interface
export interface SchemaConfig {
  organization?: OrganizationSchema;
  service?: ServiceSchema;
  article?: ArticleSchema;
  breadcrumbs?: BreadcrumbListSchema;
  faq?: FAQPageSchema;
  howTo?: HowToSchema;
}
