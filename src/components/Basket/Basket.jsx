import React from "react";
import styles from './Basket.module.css'
import Header from "../Home/header/Header";
import Basket from "./BasketBlock/BasketBlock";

const Baskets = () => {

    return (
        <>
        <Header />

        <section className={styles.section}>
            <div className={styles.dh1}>
                <span className={styles.h1}>
                    Корзина
                </span>
            </div>

            <Basket />

        </section>
        </>
    );
    
}

export default Baskets;