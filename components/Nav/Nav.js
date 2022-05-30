import styles from './Nav.module.scss'
import Link from 'next/link'

const Nav = () => {
    return (
        <nav className={styles['nav']}>
            <div className="container xs">
                <Link href='/'>
                    <a>
                        Film news
                    </a>
                </Link>
            </div>
        </nav>
    )
}

export default Nav
