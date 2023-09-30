import styles from '../ProductBlock.module.css';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../../Providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pitem = ({ data }) => { 
    
    

    const {response, setResponse} = useContext(AuthContext)
    
    const [responses, setResponses] = useState("")

    const {baskets, setBaskets} = useContext(AuthContext)



    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${response.user_token !== null ? response.user_token : " "}`
    }
    
    const AddBitem = e => {
        e.preventDefault();
        axios.post(`https://jurapro.bhuser.ru/api-shop/cart/${data.id}`, {
        },
            {
                headers: headers
            },
        )
        .then((responses) => {
            setResponses(responses.data);
            if (responses.status === 201) {
                alert(responses.data.data.message);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return (
        <>
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
                    .format(data.price)}
            </p>
        </div>
        {!!response ? <button 
        className={styles.btn}
        onClick={(e) => {AddBitem(e)}}>
            Добавить в корзину
        </button>: <></>}
    </div>
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
    </>)
}

export default Pitem;