import React, { useContext } from "react";
import ReactDOM from "react-dom";
import styles from './Catalog.module.css'
import Product from "./ProductBlock/ProductBlock";
import { AuthContext } from "../../Providers/AuthProvider";

const Catalog = () => {
    
    const {response, setResponse} = useContext(AuthContext);
    return (
        <section className={styles.section}>
            <div className={styles.dh1}>
                <span className={styles.h1}>
                    Каталог товаров
                </span>

            </div>
                {!!response ? null : <div className={styles.warningblock}><span className={styles.warning}>Для того, чтобы совершать действия на сайте, авторизуйтесь!</span></div>}  

                <Product />

        </section>
    );
}

export default Catalog;