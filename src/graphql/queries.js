
import { gql } from '@apollo/client';

// Fragment for common post fields to reuse across queries
export const POST_FRAGMENT = gql`
  fragment PostFields on Post {
    id
    slug
    title
    excerpt
    date
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    categories {
      nodes {
        name
        slug
      }
    }
    author {
      node {
        name
      }
    }
  }
`;

// Query to get all blog posts for the listing page
export const GET_ALL_POSTS = gql`
  ${POST_FRAGMENT}
  query GetAllPosts($first: Int, $after: String) {
    posts(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...PostFields
        # Calculate reading time on the client side or add a custom field in WordPress
      }
    }
  }
`;

// Query to get a single post by slug
export const GET_POST_BY_SLUG = gql`
  ${POST_FRAGMENT}
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...PostFields
      content
      # Additional fields specific to single post view
    }
  }
`;

// Query to get featured post
export const GET_FEATURED_POST = gql`
  ${POST_FRAGMENT}
  query GetFeaturedPost {
    posts(where: { tag: "featured" }, first: 1) {
      nodes {
        ...PostFields
        content
      }
    }
  }
`;

// Query to get posts by category
export const GET_POSTS_BY_CATEGORY = gql`
  ${POST_FRAGMENT}
  query GetPostsByCategory($category: String!, $first: Int, $after: String) {
    posts(where: { categoryName: $category }, first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        ...PostFields
      }
    }
  }
`;
