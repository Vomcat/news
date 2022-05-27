import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Article({country}) {
  return (
    <div>
      <h1>ds</h1>
      <div>
        {country.name}
      </div>
    </div>
  )
}

export async function getStaticProps({params}) {
    const id = params.id
    const client = new ApolloClient({
      uri: 'https://countries.trevorblades.com/',
      cache: new InMemoryCache()
    });

    const {data} = await client.query({
      query: gql`
        query Test($id: ID!) {
            country(code: $id){
            name
          }
        }
      `,
      variables: {
          id,
      }
    });



    return {
      props: {
        country: data.country
      }
    }
  }


  export async function getStaticPaths(){
    const client = new ApolloClient({
        uri: 'https://countries.trevorblades.com/',
        cache: new InMemoryCache()
      });

    const { data } = await client.query({
        query: gql`
          query {
            countries {
              name
              code
            }
          }
        `,
      });

  return {
    paths : data.countries.map((country)=> ({params: {id : country.code}})),
    fallback: false,
  }
}