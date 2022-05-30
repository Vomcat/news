import styles from './ArticleBox.module.scss'
import Link from 'next/link'


const ArticleBox = ({ title, img, url }) => {
    return (
        <div className={styles['article-box']}>
            <Link href={"/article/" + url } >
                <a>
                    <div className={styles['article-box__content']}>
                        <div className={styles['article-box__image']}>
                            <picture>
                                <img src={img} />
                            </picture>
                        </div>
                        <div className={styles['article-box__text']}>
                            {title}
                        </div>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default ArticleBox