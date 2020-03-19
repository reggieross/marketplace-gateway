import { ENV } from './env';
import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import {authentication} from "./middleware/Authentication";
import {gateway} from "./gateway";
import {ApolloServer} from "apollo-server-express";
import {ReqAttributes} from "./const/ReqAttibutes";

(async () => {
  const loadedGateway = await gateway.load();
  const schema = loadedGateway.schema;
  const executor = loadedGateway.executor;

  const server = new ApolloServer({
    gateway,
    schema,
    executor,
    subscriptions: false,
    context: ({ req }) => {
      const userInfo = req[ReqAttributes.USER_INFO];
      return {userInfo};
    },
  });

  const app = express();
  app.use(cors());
  app.use(cookieParser());
  app.use(authentication);


  app.use('/healthy', async (req, res) => {
    res.send({
      message: 'Marketplace Gateway up',
    });
  });

  app.use('/', (req, res) => {
    res.redirect('/graphql');
  });


  server.applyMiddleware({ app, path: '/graphql' });
  app.listen({ port: ENV.PORT }, () => {
    console.log(`listening at :${ENV.PORT}...`);
  });
})().catch(e => {
  console.log(e);
  process.exit(1);
});
