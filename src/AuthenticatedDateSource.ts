import { RemoteGraphQLDataSource } from  '@apollo/gateway';

export class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    // Pass the user's id from the context to underlying services
    // as a header called `user-id`
    request.http.headers.set('user', context.userInfo || '');
  }
}