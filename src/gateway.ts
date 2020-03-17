import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ENV } from './env';

interface ServiceInfo {
  name: string;
  url: string;
}

const serviceList: ServiceInfo[] = [
  {
    name: 'catalog-gql',
    url: `http://localhost:5001/graphql`,
  },
  {
    name: 'user-gql',
    url: `https://localhost:5002/graphql`,
  },
];

export const gateway = new ApolloGateway({
  serviceList: serviceList,
  buildService({ url }) {
    return new RemoteGraphQLDataSource({
      url,
      willSendRequest<Context>({ request, context }) {
      },
    });
  },
});
