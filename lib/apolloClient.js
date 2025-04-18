
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// WordPress GraphQL endpoint
const WORDPRESS_GRAPHQL_ENDPOINT = "https://cms.mardenseo.com/graphql";

const httpLink = createHttpLink({
  uri: WORDPRESS_GRAPHQL_ENDPOINT,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      // Add type policies to properly handle WordPress data
      Post: {
        keyFields: ["id", "slug"],
      },
      Category: {
        keyFields: ["id", "slug"],
      },
      Tag: {
        keyFields: ["id", "slug"],
      }
    }
  }),
});
