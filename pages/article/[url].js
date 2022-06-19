import {gql } from '@apollo/client';

import client from '../../helpers/client';

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

export async function getServerSideProps(context){
  const {params} = context
  const {url} = params


    const queryUrl = "https://film.wp.pl/" + url

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
      props:{
        article: data.article,
        url
      }
    }
}
