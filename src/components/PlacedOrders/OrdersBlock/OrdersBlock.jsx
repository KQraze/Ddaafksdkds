import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import styles from '../OrdersBlock/OrdersBlock.module.css'
import axios from "axios";

const OBlock = () => {

    const [orders, setOrders] = useState([]);
    const {response, setResponse} = useContext(AuthContext);

    useEffect(() => {
        const axiosData = async () => {
            const responses = await axios.get(`https://jurapro.bhuser.ru/api-shop/order`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${response.user_token}`
                }
            })
            setOrders(responses.data.data)
    }
    axiosData()
}, []);
    
    return (
        <div className={styles.dad}>
            {orders.length ? 
        
            orders.map(data => (

            <div key={data.id} className={styles.order}>

                <h1 className={styles.name}>
                    Заказ № {orders.indexOf(data) + 1}
                </h1>

                <p className={styles.price}>
                Заказано {data.products.length} шт. товара за&nbsp; 
                    <span className={styles.money}>{new Intl.NumberFormat("ru-RU",
                        {style: 'currency',
                        currency: 'RUB',
                        currencyDisplay: 'narrowSymbol'})
                        .format(data.order_price)}</span>
                </p>

            </div>)

            ): !!response ? <p className={styles.empty}>Нет заказов</p> : <p className={styles.empty}>Загрузка данных...</p> }
        </div>)
}

export default OBlock;