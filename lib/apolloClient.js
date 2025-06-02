
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

// Your CMS GraphQL endpoint
const CMS_GRAPHQL_ENDPOINT = "https://cms.mardenseo.com/graphql";

// Create HTTP link
const httpLink = createHttpLink({
  uri: CMS_GRAPHQL_ENDPOINT,
});

// Create auth link for potential authentication
const authLink = setContext((_, { headers }) => {
  // Get authentication token from localStorage if available
  const token = localStorage.getItem('cmsAuthToken');
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      // Add any additional headers your CMS requires
      'Content-Type': 'application/json',
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        keyFields: ["id", "slug"],
        fields: {
          categories: {
            merge: false,
          },
          tags: {
            merge: false,
          }
        }
      },
      Page: {
        keyFields: ["id", "slug"],
      },
      MediaItem: {
        keyFields: ["id"],
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all"
    },
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all"
    }
  }
});

// Function to set authentication token
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('cmsAuthToken', token);
  } else {
    localStorage.removeItem('cmsAuthToken');
  }
};

// Function to check if we're connected to the CMS
export const checkCMSConnection = async () => {
  try {
    const result = await client.query({
      query: gql`
        query CheckConnection {
          generalSettings {
            title
            url
          }
        }
      `,
      fetchPolicy: 'network-only'
    });
    return { connected: true, data: result.data };
  } catch (error) {
    console.error('CMS Connection Error:', error);
    return { connected: false, error };
  }
};
