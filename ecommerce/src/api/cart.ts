import axios from "axios";
import { CartType } from "../types/cartTypes";

const apiUrl = import.meta.env.VITE_API_URL;

// Get user's cart
export const getCart = async (userId: string): Promise<CartType> => {
  const response = await axios.get(`${apiUrl}/cart/${userId}`);
  return response.data;
};

// Add product to cart
export const addToCart = async (cartId: string, productId: string): Promise<CartType> => {
  const response = await axios.put(`${apiUrl}/cart/${cartId}/add-product/${productId}`);
  return response.data;
};

// Remove product from cart
export const removeFromCart = async (cartId: string, productId: string): Promise<CartType> => {
  const response = await axios.put(`${apiUrl}/cart/${cartId}/remove-product/${productId}`);
  return response.data;
};

// Update product quantity in cart
export const updateQuantity = async (
  cartId: string,
  productId: string,
  newQuantity: number
): Promise<CartType> => {
  const response = await axios.put(
    `${apiUrl}/cart/${cartId}/update-quantity/${productId}`,
    { quantity: newQuantity } // Send quantity in the request body
  );
  return response.data;
};

// Empty cart
export const emptyCart = async (cartId: string): Promise<CartType> => {
  const response = await axios.put(`${apiUrl}/cart/empty/${cartId}`);
  return response.data;
};