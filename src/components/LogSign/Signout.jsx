import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from './Signout.module.css'
import Header from "../Home/header/Header";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Glaz from "/public/glaz.png"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Sign = () => {

    const [data, setData] = useState({
        fio: '',
        email: '',
        password: '',
    })
    const [response, setResponse] = useState("")

    const [ type, setType ] = useState('password');

    const [errors, setErrors] = useState('')

    const onClick = () => setType((e) => {
        if (e === 'password') {
            return 'text';
        } 
        else {
            return 'password';
        }
    });

    const SignUser = e => {
        e.preventDefault()
        axios
        .post('https://jurapro.bhuser.ru/api-shop/signup', {
            fio: data.fio,
            email: data.email,
            password: data.password,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        },
        )
        .then((response) => {
            setResponse(response.data.data);
            alert("Вы успешно зарегистрировались!")
        })
        .catch((error) => {
            if(error.response.status === 422) {
                toast.error('Введите корректные данные')
                setErrors(error.response.status)
            };
        });

        setData({
            fio: '',
            email: '',
            password: ''
        })
    };

    return (
        <>
        <Header />

        <section className={styles.section}>
            <h1 className={styles.h1}>Регистрация</h1>

            <form className={styles.form}>
                {errors === 422 ?
                <>
                <input 
                style={
                    {
                    transition: 'all 0.2s ease',
                    border: '2px solid #ff4f4f',
                    boxShadow: '0px 0px 8px 0px #ff4f4f',
                    }
                }
                className={styles.input}
                placeholder="Введите ФИО"
                onChange={(e) => setData(prev => ({
                    ...prev, fio: e.target.value
                }))}
                value={data.fio}
                />

                <input
                style={
                    {
                    transition: 'all 0.2s ease',
                    border: '2px solid #ff4f4f',
                    boxShadow: '0px 0px 8px 0px #ff4f4f',
                    }
                }
                type="email"
                className={styles.input}
                placeholder="Введите E-mail" 
                onChange={(e) => setData(prev => ({
                    ...prev, email: e.target.value
                }))}
                value={data.email}
                />

                <div 
                style={
                {
                transition: 'all 0.2s ease',
                border: '2px solid #ff4f4f',
                boxShadow: '0px 0px 8px 0px #ff4f4f',
                }
                }
                className={styles.visible}>
                    <input 
                    type={type}
                    className={styles.inputpass}
                    placeholder="Введите пароль"
                    onChange={(e) => setData(prev => ({
                        ...prev, password: e.target.value
                    }))}
                    value={data.password}></input>{<img className={styles.img} src={Glaz} onClick={onClick} width="25px" height="25px"/>}
                </div></> : 
                <>
                <input 
                className={styles.input}
                placeholder="Введите ФИО"
                onChange={(e) => setData(prev => ({
                    ...prev, fio: e.target.value
                }))}
                value={data.fio}
                />

                <input
                type="email"
                className={styles.input}
                placeholder="Введите E-mail" 
                onChange={(e) => setData(prev => ({
                    ...prev, email: e.target.value
                }))}
                value={data.email}
                />

                <div className={styles.visible}>
                    <input 
                    type={type}
                    className={styles.inputpass}
                    placeholder="Введите пароль"
                    onChange={(e) => setData(prev => ({
                        ...prev, password: e.target.value
                    }))}
                    value={data.password}></input>{<img className={styles.img} src={Glaz} onClick={onClick} width="25px" height="25px"/>}
                </div>
                </>
                
                }
                

                <button 
                className={styles.button1}
                onClick={e => {SignUser(e); setErrors('')}}>
                    Зарегистрироваться
                </button>

                <Link className={styles.link} to="/">
                    <button className={styles.button2}>
                        Вернуться на главную
                    </button>
                </Link>

            </form>
            {response && (
                <>
                <p>
                    Данные успешно отправлены
                </p>
                <Navigate to="/logout"/>
                </>
             )}
            <p className={styles.p}>
                Уже зарегистрированы?
                <Link className={styles.a} to="/logout">Войти</Link>
            </p>
        </section>
        <ToastContainer
position="top-center"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover = {false}
theme="light"
/>
    </>
    )
}

export default Sign;