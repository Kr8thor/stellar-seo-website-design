
import { gql } from '@apollo/client';

// Fragment for common post fields
export const POST_FRAGMENT = gql`
  fragment PostFields on Post {
    id
    databaseId
    slug
    title
    excerpt
    date
    modified
    status
    featuredImage {
      node {
        id
        sourceUrl
        altText
        caption
        mediaDetails {
          width
          height
          sizes {
            name
            sourceUrl
            width
            height
          }
        }
      }
    }
    categories {
      nodes {
        id
        name
        slug
        description
      }
    }
    tags {
      nodes {
        id
        name
        slug
      }
    }
    author {
      node {
        id
        name
        firstName
        lastName
        avatar {
          url
        }
        description
      }
    }
    seo {
      title
      metaDesc
      focuskw
      metaKeywords
      opengraphTitle
      opengraphDescription
      opengraphImage {
        sourceUrl
      }
    }
  }
`;

// Query to get all blog posts with pagination
export const GET_ALL_POSTS = gql`
  ${POST_FRAGMENT}
  query GetAllPosts($first: Int = 10, $after: String, $categoryName: String) {
    posts(
      first: $first, 
      after: $after, 
      where: { 
        status: PUBLISH,
        categoryName: $categoryName
      }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        ...PostFields
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
      contentType {
        node {
          name
        }
      }
    }
  }
`;

// Query to get featured posts
export const GET_FEATURED_POSTS = gql`
  ${POST_FRAGMENT}
  query GetFeaturedPosts($first: Int = 1) {
    posts(
      first: $first,
      where: { 
        status: PUBLISH,
        metaQuery: [
          {
            key: "featured_post",
            value: "1",
            compare: EQUAL_TO
          }
        ]
      }
    ) {
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
  query GetPostsByCategory($categorySlug: String!, $first: Int = 10, $after: String) {
    posts(
      first: $first,
      after: $after,
      where: { 
        status: PUBLISH,
        categoryName: $categorySlug
      }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      nodes {
        ...PostFields
      }
    }
  }
`;

// Query to get all categories
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(where: { hideEmpty: true }) {
      nodes {
        id
        name
        slug
        description
        count
      }
    }
  }
`;

// Query to get site settings and navigation
export const GET_SITE_SETTINGS = gql`
  query GetSiteSettings {
    generalSettings {
      title
      description
      url
      language
      timezone
    }
    menus {
      nodes {
        id
        name
        slug
        menuItems {
          nodes {
            id
            label
            url
            target
            cssClasses
            description
            parentId
          }
        }
      }
    }
  }
`;

// Query for pages (for About, Services, etc.)
export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      id
      title
      content
      slug
      date
      modified
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      seo {
        title
        metaDesc
        opengraphTitle
        opengraphDescription
        opengraphImage {
          sourceUrl
        }
      }
    }
  }
`;

// Query for contact form submissions (if using a plugin like Contact Form 7)
export const SUBMIT_CONTACT_FORM = gql`
  mutation SubmitContactForm($input: SubmitContactFormInput!) {
    submitContactForm(input: $input) {
      success
      message
      errors {
        field
        message
      }
    }
  }
`;

// Search query
export const SEARCH_CONTENT = gql`
  ${POST_FRAGMENT}
  query SearchContent($search: String!, $first: Int = 10) {
    posts(where: { search: $search, status: PUBLISH }, first: $first) {
      nodes {
        ...PostFields
      }
    }
    pages(where: { search: $search, status: PUBLISH }, first: $first) {
      nodes {
        id
        title
        slug
        excerpt
        date
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
