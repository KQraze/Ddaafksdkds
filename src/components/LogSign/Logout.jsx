import React, { useContext, useState } from "react";
import { ReactDOM } from "react";
import styles from './Logout.module.css';
import Header from "../Home/header/Header";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import  { AuthContext }   from "/src/Providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Glaz from "/public/glaz.png"

const Log = () => {

    
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState('')

    const {response, setResponse} = useContext(AuthContext)

    const Link1 = () => {
        if (!!response) {
        <Navigate to="/"/>
        }
    }

    const [ type, setType ] = useState('password');

    const onClick = () => setType((e) => {
        if (e === 'password') {
            return 'text';
        } 
        else {
            return 'password';
        }
    });


    const LoginUser = e => {
        e.preventDefault()
        axios
        .post('https://jurapro.bhuser.ru/api-shop/login', {
            email: data.email,
            password: data.password,
        })
        .then((response) => {
            setResponse(response.data.data);
            alert("Вы успешно авторизовались!")
        })
        .catch((error) => {
            console.log(error.response.status);
            if (error.response.status === 422 || error.response.status === 401) {
                toast.error('Неправильный логин или пароль')
                setErrors(error.response.status)
            }});

        setData({
            email: '',
            password: '',
        })

    }

    return (
        <>
        <Header />

    <section className={styles.section}>
        <h1 className={styles.h1}>Авторизация</h1>
        <form className={styles.form} onSubmit={Link1()}>
            {errors === 401 || errors === 422 ? 
            
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
                placeholder="Пример: catbest001@gmail.com" 
                onChange={(e) => setData(prev => ({
                    ...prev, email: e.target.value
                }))}
                value={data.email}
                />

                

             : 

             <input
             id="email"
             type="email"
             className={styles.input}
             placeholder="Введите E-mail"
             onChange={(e) => setData(prev => ({
                 ...prev, email: e.target.value
             }))}
             />

            }

            {errors === 401 || errors === 422 ? <>
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
                placeholder="Пример: CatBest001"
                onChange={(e) => setData(prev => ({
                    ...prev, password: e.target.value
                }))}
                value={data.password}></input>{<img className={styles.img} src={Glaz} onClick={onClick} width="25px" height="25px"/>}
            </div>
            <p align="center" style={
                {
                    transition: 'all 0.2s ease',
                    fontFamily: 'Comfortaa',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#8B0000'
                }
            }>
                Пароль должен состоять из 8 символов и иметь хотя бы одну заглав. букву и цифру!
            </p></>
                :
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
            }

            <button 
            className={styles.button1}
            onClick={e => {LoginUser(e); setErrors('')}}>
                Войти
            </button>
            
            <Link to="/">
                <button className={styles.button2}>
                    Вернуться на главную
                </button>
            </Link>
        </form>
        {response && (
            <>
                <p>
                Вы успешно авторизовались!
                </p>
                <Navigate to="/"/>
            </>
             )}
        <p className={styles.p}>
            Нет аккаунта?
            <Link className={styles.a} to="/signout">Зарегистрироваться</Link>
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
pauseOnHover={false}
theme="light"
/>
    </>
    )
}

export default Log;