import styles from '../styles/Home.module.scss'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import ArticleBox from '../components/ArticleBox/ArticleBox';


export default function Home({articlesData}) {

  return (
    <div className={styles["home"]}>
      <div className="container flex">
        {articlesData.map((el, index)=>(
            <ArticleBox
              key={index}
              title={el.title}
              img={el.img.url}
              url={el.url.split(".pl/")[1]}
            />
          ))}
      </div>
    </div>
  )
}


export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://mobileapi.wp.pl/v1/graphql',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
      query {
        articles(t:Article cid:4) {
          id
          title
          url
          img {
            url
          }
        }
      }
    `,
  });

  return {
    props: {
      articlesData: data.articles,
    }
  }
}
