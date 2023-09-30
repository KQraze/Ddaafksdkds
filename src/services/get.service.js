import axios from 'axios';

export const ProductService = {

    async getProducts() {
        const response = await axios.get('https://jurapro.bhuser.ru/api-shop/products')

    return response.data;
    
    }

}