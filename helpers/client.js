import { ApolloClient, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://mobileapi.wp.pl/v1/graphql',
    cache: new InMemoryCache()
  });

export default client
