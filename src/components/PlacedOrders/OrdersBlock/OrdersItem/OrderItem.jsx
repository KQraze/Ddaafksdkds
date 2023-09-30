import React from "react";
import styles from '../OrdersBlock.module.css'

const OItem = ({ data }) => {
    return (
        <div key={data.id} className={styles.buy}>

        <h1 className={styles.name}>
            Заказ: {}
        </h1>
        <div className={styles.desprice}>
            <p className={styles.price}>
                {new Intl.NumberFormat("ru-RU",
                    {style: 'currency',
                    currency: 'RUB',
                    currencyDisplay: 'narrowSymbol'})
                    .format(data.order_price)}
            </p>
        </div>
    </div>
    )
}

export default OItem;