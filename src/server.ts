import { ApolloServer } from 'apollo-server-express';
import { gateway } from './gateway';
import { ReqAttributes } from './const/ReqAttibutes';
import { parse } from 'cookie';

export const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => {
    const token = parse(req.headers.cookie)['accessToken'];
    return { token };
  },
});
