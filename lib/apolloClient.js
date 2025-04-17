
import { ApolloClient, InMemoryCache } from "@apollo/client";

// Check if the environment variable is set
if (!import.meta.env.VITE_WORDPRESS_GRAPHQL_ENDPOINT) {
  throw new Error(
    "Error: VITE_WORDPRESS_GRAPHQL_ENDPOINT is not set in .env.local"
  );
}

export const client = new ApolloClient({
  uri: import.meta.env.VITE_WORDPRESS_GRAPHQL_ENDPOINT, // Use the env variable
  cache: new InMemoryCache(), // Standard cache implementation
});
