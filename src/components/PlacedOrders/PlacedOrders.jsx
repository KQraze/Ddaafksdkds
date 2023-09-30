import React from "react";
import Header from "../Home/header/Header";
import styles from "./PlacedOrders.module.css"
import OBlock from "./OrdersBlock/OrdersBlock";

const Orders = () => {
    return (
        <>
        <Header />

        <section className={styles.section}>
            <div className={styles.dh1}>
                <span className={styles.h1}>
                    Оформленные заказы
                </span>
            </div>

            <OBlock />

        </section>
        </>
    );
}

export default Orders;