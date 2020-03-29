import { ENV } from './env';
import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { authentication } from './middleware/authentication';
import { server } from './server';

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(authentication);

app.use('/healthy', async (req, res) => {
  res.send({
    message: 'Marketplace Gateway Healthy',
  });
});

server.applyMiddleware({ app, path: '/graphql' });
console.log(process.env.NODE_ENV);

app.listen({ port: ENV.PORT }, () => {
  console.log(`listening at :${ENV.PORT}...`);
});
