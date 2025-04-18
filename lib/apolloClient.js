
import { ApolloClient, InMemoryCache } from "@apollo/client";

// Default WordPress GraphQL endpoint (replace with your actual endpoint)
const DEFAULT_WORDPRESS_GRAPHQL_ENDPOINT = "https://your-wordpress-site.com/graphql";

// Use environment variable if set, otherwise use default
const wordpressGraphqlEndpoint = import.meta.env.VITE_WORDPRESS_GRAPHQL_ENDPOINT || DEFAULT_WORDPRESS_GRAPHQL_ENDPOINT;

export const client = new ApolloClient({
  uri: wordpressGraphqlEndpoint,
  cache: new InMemoryCache({
    typePolicies: {
      // Add type policies to handle WordPress data caching
      Post: {
        keyFields: ["id", "slug"],
        fields: {
          // Custom field policies can be added here
        }
      }
    }
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all"
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all"
    }
  }
});
