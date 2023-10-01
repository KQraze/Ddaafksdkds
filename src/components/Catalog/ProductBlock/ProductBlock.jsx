import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductBlock.module.css"
import Pitem from "./ProductItem/ProductItem";
import axios from "axios";
import { ProductService } from "../../../services/get.service";
import { AuthContext } from "../../../Providers/AuthProvider";

const Product = () => {

    const [products, setProducts] = useState([])

    const {baskets, setBaskets} = useContext(AuthContext)

    useEffect(() => {
        const axiosData = async () => {
            const data = await ProductService.getProducts()
            setProducts(data.data) // Берет данные из сервиса
    }
    axiosData()
}, []);
    
    return (
        <div className={styles.dad}>
        {products.length ? 
        
        products.map(data => (
            <Pitem key={data.id} data={data} />)

        ): <div className={styles.loadingdiv}><p className={styles.loading}>Загрузка...</p></div>  }</div>)
    
}

export default Product;