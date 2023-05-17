import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

// Import your local resolvers
import { resolvers } from './graphql/resolvers';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([]), // Set an empty array of links for local-only operations
  resolvers,
});