import { ApolloServer } from 'apollo-server-express';
import { gateway } from './gateway';
import { ReqAttributes } from './const/ReqAttibutes';
import { parse } from 'cookie';
import { CookieMonster } from './client/CookieClient';

export const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => {
    return { token: CookieMonster.get(req, 'access_token') };
  },
  playground: {
    settings: {
      'request.credentials': 'same-origin',
    },
  },
});
