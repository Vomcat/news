import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import ArticleHero from '../../components/ArticleHero/ArticleHero';

export default function Article({article}) {
  return (
    <ArticleHero
      title={article.title}
      articleBody={article.body}
    />
  )
}

export async function getStaticProps({params}) {
    const url = params.url
    const queryUrl = "https://film.wp.pl/" + params.url
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
            url
            body{
              data
            }
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
            articles(t:Article cid:4 ) {
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