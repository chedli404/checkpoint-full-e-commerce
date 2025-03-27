import { ProductType as Product } from "../types/productTypes";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

console.log("API URL:", apiUrl);

export async function getProducts() {
    const response = await axios.get(`${apiUrl}/products`);
    return response.data;
}


export async function getProduct(id: string) {
    const response = await axios.get(`${apiUrl}/products/${id}`);
    return response.data;
}

export async function createProduct(product: Product) {
    const response = await axios.post(`${apiUrl}/products`, product);
    return response.data;
}

export async function updateProduct(id: string, product: Product) {
    const response = await axios.put(`${apiUrl}/products/${id}`, product);
    return response.data;
}

export async function deleteProduct(id: string) {
    const response = await axios.delete(`${apiUrl}/products/${id}`);
    return response.data;
}

export async function getCategories() {
    const response = await axios.get(`${apiUrl}/products/categories`);
    return response.data;
}

export async function getProductsByCategory(category: string) {
    const response = await axios.get(`${apiUrl}/products/category/${category}`);
    return response.data;
}

export async function getProductsBySearch(search: string) {
    const response = await axios.get(`${apiUrl}/products/search/${search}`);
    return response.data;
}
