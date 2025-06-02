
/**
 * Enhanced adapter for cms.mardenseo.com integration
 * Handles the transition from static data to dynamic CMS content
 */

// Calculate reading time based on content length
export const calculateReadingTime = (content) => {
  if (!content) return "1 min read";
  
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
};

// Extract featured image with fallback
export const extractFeaturedImage = (featuredImage) => {
  if (!featuredImage?.node) {
    return '/assets/blog/default.jpg';
  }
  
  // Try to get an optimized size, fallback to original
  const sizes = featuredImage.node.mediaDetails?.sizes || [];
  const mediumLarge = sizes.find(size => size.name === 'medium_large');
  const large = sizes.find(size => size.name === 'large');
  
  return mediumLarge?.sourceUrl || large?.sourceUrl || featuredImage.node.sourceUrl || '/assets/blog/default.jpg';
};

// Format date consistently
export const formatPostDate = (dateString) => {
  if (!dateString) return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Extract SEO data
export const extractSEOData = (post) => {
  const seo = post.seo || {};
  return {
    title: seo.title || post.title || '',
    description: seo.metaDesc || post.excerpt?.replace(/<[^>]*>/g, '') || '',
    image: seo.opengraphImage?.sourceUrl || extractFeaturedImage(post.featuredImage),
    keywords: seo.metaKeywords || '',
  };
};

// Adapt WordPress post to match our frontend model
export const adaptPost = (wpPost) => {
  if (!wpPost) return null;
  
  const categories = wpPost.categories?.nodes || [];
  const primaryCategory = categories[0];
  
  return {
    id: wpPost.slug || wpPost.databaseId || wpPost.id,
    title: wpPost.title || '',
    category: primaryCategory?.name || 'Uncategorized',
    categorySlug: primaryCategory?.slug || 'uncategorized',
    date: formatPostDate(wpPost.date),
    readTime: calculateReadingTime(wpPost.content || ''),
    image: extractFeaturedImage(wpPost.featuredImage),
    author: wpPost.author?.node?.name || wpPost.author?.node?.firstName + ' ' + wpPost.author?.node?.lastName || 'Admin',
    authorAvatar: wpPost.author?.node?.avatar?.url || null,
    excerpt: wpPost.excerpt?.replace(/<[^>]*>/g, '') || '',
    content: wpPost.content || '',
    slug: wpPost.slug || '',
    tags: (wpPost.tags?.nodes || []).map(tag => ({
      name: tag.name,
      slug: tag.slug
    })),
    seo: extractSEOData(wpPost),
    status: wpPost.status || 'publish',
    modified: wpPost.modified || wpPost.date,
  };
};

// Adapt WordPress posts collection
export const adaptPosts = (wpPosts) => {
  if (!wpPosts || !Array.isArray(wpPosts)) return [];
  return wpPosts.map(post => adaptPost(post)).filter(Boolean);
};

// Adapt page data
export const adaptPage = (wpPage) => {
  if (!wpPage) return null;
  
  return {
    id: wpPage.slug || wpPage.id,
    title: wpPage.title || '',
    content: wpPage.content || '',
    slug: wpPage.slug || '',
    date: formatPostDate(wpPage.date),
    image: extractFeaturedImage(wpPage.featuredImage),
    seo: extractSEOData(wpPage),
    modified: wpPage.modified || wpPage.date,
  };
};

// Adapt categories for filtering
export const adaptCategories = (wpCategories) => {
  if (!wpCategories || !Array.isArray(wpCategories)) return [];
  
  return wpCategories.map(category => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description || '',
    count: category.count || 0,
  })).filter(Boolean);
};

// Adapt menu items for navigation
export const adaptMenuItems = (menuItems) => {
  if (!menuItems || !Array.isArray(menuItems)) return [];
  
  return menuItems.map(item => ({
    id: item.id,
    label: item.label,
    url: item.url,
    target: item.target || '_self',
    cssClasses: item.cssClasses || [],
    description: item.description || '',
    parentId: item.parentId,
  })).filter(Boolean);
};

// Helper to check if content is from CMS or fallback
export const isFromCMS = (content) => {
  return content && typeof content === 'object' && (content.databaseId || content.slug);
};

// Create a unified content structure for both posts and pages
export const adaptContent = (content, type = 'post') => {
  if (!content) return null;
  
  if (type === 'page') {
    return adaptPage(content);
  }
  
  return adaptPost(content);
};
