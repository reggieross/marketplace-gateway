import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ENV } from './env';
import {AuthenticatedDataSource} from "./AuthenticatedDateSource";

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
    return new AuthenticatedDataSource({
      url,
    });
  },
});
