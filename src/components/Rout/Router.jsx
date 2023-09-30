import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sign from "../LogSign/Signout";
import Login from "../LogSign/Logout";
import Home from "../Home/Home";
import Basket from "../Basket/Basket";
import Orders from "../PlacedOrders/PlacedOrders";
import Header from "../Home/header/Header";
import styles from './Router.module.css'

const Router = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route element={<Home />} path="/"/>
            <Route element={<Sign />} path="/signout"/>
            <Route element={<Login />} path="/logout"/>
            <Route element={<Basket />} path="/basket"/>
            <Route element={<Orders />} path="/orders"/>
            <Route path="*" element={<><Header /><div className={styles.nf}>Not Found</div></>}/>
        </Routes>
    </BrowserRouter>
    )
}

export default Router