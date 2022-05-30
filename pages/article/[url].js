import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import ArticleHero from '../../components/ArticleHero/ArticleHero';

export default function Article({article}) {
  return (
      <ArticleHero
        title={article.title}
        articleBody={article.body}
        img={article.img.url}
      />
  )
}

const client = new ApolloClient({
  uri: 'https://mobileapi.wp.pl/v1/graphql',
  cache: new InMemoryCache()
});

export async function getStaticProps({params}) {
    const queryUrl = "https://film.wp.pl/" + params.url

    const {data} = await client.query({
      query: gql`
        query Test($queryUrl: String!) {
          article(url: $queryUrl) {
            title
            url
            img {
              url
            }
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

    const { data } = await client.query({
        query: gql`
          query {
            articles(t:Article cid:4 offset:1) {
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