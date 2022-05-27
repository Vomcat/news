import styles from '../styles/Home.module.scss'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import ArticleBox from '../components/ArticleBox/ArticleBox';


export default function Home({countriesData}) {
  return (
    <div className={styles.container}>
      {countriesData.map((el, index)=>(
          <ArticleBox
            key={index}
            name={el.name}
            id={el.code}
          />
        ))}
        {console.log(countriesData)}
    </div>
  )
}


export async function getStaticProps() {
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
    props: {
      countriesData: data.countries,
    }
  }
}
