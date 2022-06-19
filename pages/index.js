import {gql} from '@apollo/client';

import client from '../helpers/client';
import ArticleBox from '../components/ArticleBox/ArticleBox';

import styles from '../styles/Home.module.scss'


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


export async function getServerSideProps() {

  const { data } = await client.query({
    query: gql`
      query {
        articles(t:Article cid:4 offset:1) {
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
