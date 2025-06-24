
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

// Your CMS GraphQL endpoint - update this with your actual endpoint
const CMS_GRAPHQL_ENDPOINT = "https://cms.mardenseo.com/graphql";

// Create HTTP link
const httpLink = createHttpLink({
  uri: CMS_GRAPHQL_ENDPOINT,
});

// Create auth link for future authentication needs
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
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
      },
      Page: {
        keyFields: ["id", "slug"],
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
