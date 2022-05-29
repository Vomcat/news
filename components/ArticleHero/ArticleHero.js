import styles from './ArticleHero.module.scss'
import Link from 'next/link'


const ArticleHero = ({ title, articleBody, url }) => {
    return (
        <div className={styles['article']}>
            <div className='container sm'>
                <h1 className={styles['article__title']}>{title}</h1>
                {articleBody.map(bodyData =>(<div className={styles["article__content"]} dangerouslySetInnerHTML={{ __html: bodyData.data}}></div>))}
            </div>
        </div>
    )
}

export default ArticleHero