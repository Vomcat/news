import styles from './ArticleHero.module.scss'

const ArticleHero = ({ title, articleBody, img }) => {
    return (
        <div className={styles['article']}>
            <div className='container sm'>
                <h1 className={styles['article__title']}>{title}</h1>
                <picture>
                    <img className={styles['article__image']} src={img}/>
                </picture>
                {articleBody.map((bodyData, index) =>(<div key={index} className={styles["article__content"]} dangerouslySetInnerHTML={{ __html: bodyData.data}}></div>))}
            </div>
        </div>
    )
}

export default ArticleHero