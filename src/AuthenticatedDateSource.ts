import { RemoteGraphQLDataSource } from '@apollo/gateway';

export class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest<Context>({ request, context }) {
    request.http.headers.set('cookie', `accessToken=${context.token}`);
  }
}
