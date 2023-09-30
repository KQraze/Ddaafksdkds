import React, { useEffect } from "react";
import styles from "./NavigateBar.module.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
import  { AuthContext }   from "/src/Providers/AuthProvider";
import axios from "axios";

const Nav = () => {

    const {response, setResponse} = useContext(AuthContext);

    const deleteToken = () => {
        axios
        .get('https://jurapro.bhuser.ru/api-shop/logout', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${response.user_token}`
            }
        })
        .then(setResponse(''))
    }

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navlist}>
                {!!response ? <>
                <li className={styles.navitem}>
                    <Link to="/" className={styles.navlink}>Каталог товаров</Link>
                </li>
                <li className={styles.navitem}>
                    <Link to="/basket"className={styles.navlink}>Корзина</Link>
                </li>
                <li className={styles.navitem}>
                    <Link to="/orders" className={styles.navlink}>Мои заказы</Link>
                </li>
                <li className={styles.navitem}>
                    <Link to="/logout" className={styles.navlink}>
                        {!!response ? <span onClick={deleteToken}>
                            Выйти
                        </span> : 
                        <span>
                            Войти
                        </span>
                        }
                    </Link>
                </li></>: 
                <>
                <li className={styles.navitem}>
                    <Link to="/" className={styles.navlink}>Каталог товаров</Link>
                </li>
                <li className={styles.navitem}>
                    <Link to="/logout" className={styles.navlink}>
                        {!!response ? <span onClick={deleteToken}>
                            Выйти
                        </span> : 
                        <span>
                            Войти
                        </span>
                        }
                    </Link>
                </li>
                </>}
            </ul>
        </nav>
    )
        
}

export default Nav;