import { ApolloServer } from 'apollo-server-express';
import { gateway } from './gateway';

export const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => {
    return {};
  },
});
