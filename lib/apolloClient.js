import { ApolloClient, InMemoryCache } from "@apollo/client";

// Check if the environment variable is set
if (!process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT) {
  throw new Error(
    "Error: NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT is not set in .env.local"
  );
}

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT, // Use the env variable
  cache: new InMemoryCache(), // Standard cache implementation
});