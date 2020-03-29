import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ENV } from './env';
import {AuthenticatedDataSource} from "./AuthenticatedDateSource";
import {Environment, resolveURL} from "./util/resolveURL";

interface ServiceInfo {
  name: string;
  url: string;
}

const serviceList: ServiceInfo[] = [
  {
    name: 'catalog-gql',
    url: `${resolveURL('catalog-gql', ENV.ENVIRONMENT as Environment)}/graphql`,
  },
  // {
  //   name: 'user-gql',
  //   url: `https://localhost:5002/graphql`,
  // },
];

export const gateway = new ApolloGateway({
  serviceList: serviceList,
  buildService({ url }) {
    return new AuthenticatedDataSource({
      url,
    });
  },
});
