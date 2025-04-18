
/**
 * This adapter handles the transition from static blog data to WordPress data
 * It ensures the WordPress API data matches the structure expected by our components
 */

// Calculate reading time based on content length
export const calculateReadingTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
};

// Adapt WordPress post to match our frontend model
export const adaptPost = (wpPost) => {
  if (!wpPost) return null;
  
  return {
    id: wpPost.slug || wpPost.id,
    title: wpPost.title || '',
    category: wpPost.categories?.nodes?.[0]?.name || 'Uncategorized',
    date: new Date(wpPost.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    readTime: calculateReadingTime(wpPost.content || ''),
    image: wpPost.featuredImage?.node?.sourceUrl || '/assets/blog/default.jpg',
    author: wpPost.author?.node?.name || 'Admin',
    excerpt: wpPost.excerpt?.replace(/<[^>]*>/g, '') || '',
    content: wpPost.content || '',
  };
};

// Adapt WordPress posts collection
export const adaptPosts = (wpPosts) => {
  if (!wpPosts || !Array.isArray(wpPosts)) return [];
  return wpPosts.map(post => adaptPost(post));
};
