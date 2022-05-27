import styles from './ArticleBox.module.scss'
import Link from 'next/link'


const ArticleBox = ({ name, img, url ,id}) => {
    return (
        <div className={styles['article-box']}>
            <Link href="/article">
                <div>
                    {name}
                </div>
            </Link>
        </div>
    )
}

export default ArticleBox