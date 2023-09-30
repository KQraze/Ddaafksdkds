import React, { createContext, useContext, useEffect, useState } from "react";
import styles from "./BasketBlock.module.css";
import axios from "axios";
import { ProductService } from "../../../services/get.service";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Basket = () => {

    const {baskets, setBaskets} = useContext(AuthContext)
    const {response, setResponse} = useContext(AuthContext)
    let carts = baskets.reduce((arr, el) => 
    ((arr.find(({product_id}) => el.product_id == product_id) || arr.push(el)), arr)
  , [])
    const navigate = useNavigate();

    const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${response.user_token !== null ? response.user_token : " "}`
        }

    let sum = baskets.reduce((a, b) => a + b.price, 0);

    

    useEffect(() => {
        const axiosData = async () => {
            const responses = await axios.get(`https://jurapro.bhuser.ru/api-shop/cart`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${response.user_token}`
                }
            })
            setBaskets(responses.data.data)
    }
    axiosData()
}, []);

    const toOrder = (e) => {
        e.preventDefault();
        axios
        .post('https://jurapro.bhuser.ru/api-shop/order', {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${response.user_token}`
            }
        }).then(
            setTimeout(navigate('/orders'), 5000))
    }

    const AddItem = (id, e) => {
        e.preventDefault();
        axios.post(`https://jurapro.bhuser.ru/api-shop/cart/${id}`, {
        },
            {
                headers: headers
            },
        )
        .then((responses) => {
            
            if (responses.status === 201) {
                toast.success("Товар добавлен в корзину");
                console.log(baskets)
            }
            carts = carts.map((count) => {
                count.id === id ?
                 {...count, count: count.count + 1}
                  : {}
                })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const minusItem = (id, e) => {
            e.preventDefault();
            axios
            .delete(`https://jurapro.bhuser.ru/api-shop/cart/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${response.user_token}`
                }
            })
            .then((responses) => {
                if (responses.status === 200) {
                    toast.success("Товар удалён из корзины:3")
                }
                carts = carts.map((count) => {
                    count.count = 1;
                    count.product_id === id ?
                     {...count, count: count.count - 1 }
                      : {count}
                    })
            })
            .catch(err => {
                if (err.response.status === 403) {
                    toast.error('Forbidden for you')
            }})
       }

    return (
        <>
        <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
                />
        <div className={styles.dad}>
        {carts.length ? 

            carts.map((data) => (

            <div key={data.id} className={styles.buy}>

        <h1 className={styles.name}>
            {data.name}
        </h1>

        <div className={styles.desprice}>

            <p className={styles.description}>
                {data.description}
            </p>

            <p className={styles.price}>
                {new Intl.NumberFormat("ru-RU",
                    {style: 'currency',
                    currency: 'RUB',
                    currencyDisplay: 'narrowSymbol'})
                    .format(data.price)} <span style={{color: "white"}}>за {data.count} шт.</span>
            </p>

        </div>
        <div className={styles.button}>

        <button
        className={styles.btnp}
        onClick={(e) => {
            AddItem(data.product_id, e);
        }}>
            +
        </button>

        <button
        className={styles.btnm}
        onClick={(e) => {
            minusItem(data.id, e);
        }}>
            -
        </button>

        <button
        onClick={(e) => {
            minusItem(data.id, e);
            }}
        className={styles.btn2}>
            Удалить
        </button>

        </div>
    </div>)
        ): !!response ? <div className={styles.emptydiv}><p className={styles.empty}>Корзина пуста</p></div> : <div className={styles.emptydiv}><p className={styles.empty}>Загрузка данных...</p></div> }
        </div>

        {baskets.length ? 
        
        <div className={styles.order}>
            <span className={styles.offer}>Оформить {baskets.length} шт. товара:</span>
            <div className={styles.buyplace}>

                <span className={styles.money}>
                    {new Intl.NumberFormat("ru-RU",
                    {style: 'currency',
                    currency: 'RUB',
                    currencyDisplay: 'narrowSymbol'})
                    .format(sum)}</span>

                <button 
                className={styles.buybtn}
                onClick={toOrder}>
                    Оформить заказ
                </button>

            </div>
        </div> : 
        
        <div></div>}
        </>)
    
}

export default Basket;