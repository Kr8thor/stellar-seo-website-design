
import { gql } from "@apollo/client";

// Get all blog posts
export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        slug
        title
        date
        excerpt
        content
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

// Get single blog post by slug
export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      slug
      title
      date
      content
      excerpt
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

// Get posts by category
export const GET_POSTS_BY_CATEGORY = gql`
  query GetPostsByCategory($category: String!) {
    posts(where: { categoryName: $category, orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        slug
        title
        date
        excerpt
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

// Get all categories
export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    categories {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;
