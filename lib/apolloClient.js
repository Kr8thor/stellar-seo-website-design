
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getSecureAuthToken } from '../src/lib/tokenSecurity';

// Your CMS GraphQL endpoint
const CMS_GRAPHQL_ENDPOINT = "https://cms.mardenseo.com/graphql";

// Create HTTP link
const httpLink = createHttpLink({
  uri: CMS_GRAPHQL_ENDPOINT,
});

// Create auth link with secure token handling
const authLink = setContext((_, { headers }) => {
  // Get authentication token securely
  const token = getSecureAuthToken();
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      // Add security headers
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
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

// Enhanced function to set authentication token securely
export const setAuthToken = (token) => {
  // Import here to avoid circular dependency
  import('../src/lib/tokenSecurity').then(({ setSecureAuthToken }) => {
    setSecureAuthToken(token);
  });
};

// Function to check if we're connected to the CMS with security logging
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
    
    // Log successful connection
    import('../src/lib/securityMonitor').then(({ securityMonitor }) => {
      securityMonitor.logEvent('auth_attempt', 'CMS connection successful');
    });
    
    return { connected: true, data: result.data };
  } catch (error) {
    console.error('CMS Connection Error:', error);
    
    // Log connection failure
    import('../src/lib/securityMonitor').then(({ securityMonitor }) => {
      securityMonitor.logEvent('auth_attempt', `CMS connection failed: ${error.message}`);
    });
    
    return { connected: false, error };
  }
};
