import { ApolloServer } from 'apollo-server-express';
import { gateway } from './gateway';
import {ReqAttributes} from "./const/ReqAttibutes";

export const server = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => {
    const userInfo = req[ReqAttributes.USER_INFO];
    return {userInfo};
  },
});
