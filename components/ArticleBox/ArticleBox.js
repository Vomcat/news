import styles from './ArticleBox.module.scss'
import Link from 'next/link'


const ArticleBox = ({ title, img, url }) => {
    return (
        <div className={styles['article-box']}>
            <Link href={"/article/" + url } >
                <div className={styles['article-box__content']}>
                    <picture>
                        <img src={img} />
                    </picture>
                    <div>
                        {title}
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ArticleBox