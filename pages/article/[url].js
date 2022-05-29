import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Article({article}) {
  return (
    <div>
      <h1>ds</h1>
      <div>
        {article.title}
      </div>
    </div>
  )
}

export async function getStaticProps({params}) {
    const url = params.url
    const queryUrl = "https://www.pudelek.pl/" + params.url
    console.log(url)
    const client = new ApolloClient({
      uri: 'https://mobileapi.wp.pl/v1/graphql',
      cache: new InMemoryCache()
    });

    const {data} = await client.query({
      query: gql`
        query Test($queryUrl: String!) {
          article(url: $queryUrl) {
            title
          }
        }
      `,
      variables: {
        queryUrl,
      }
    });

    return {
      props: {
        article: data.article
      }
    }
  }


  export async function getStaticPaths(){
    const client = new ApolloClient({
        uri: 'https://mobileapi.wp.pl/v1/graphql',
        cache: new InMemoryCache()
      });

    const { data } = await client.query({
        query: gql`
          query {
            articles(t:Gallery limit:2) {
              url
            }
          }
        `,
      });

  return {
    paths : data.articles.map((el)=> ({params: {url : el.url.split(".pl/")[1]}})),
    fallback: false,
  }
}