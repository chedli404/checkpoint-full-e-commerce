import {UserType as User   } from '../types/userTypes'
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export async function getUsers(){
    const response = await axios.get(`${apiUrl}/users`);
    return response.data;

}

export async function getUser(id:string){
    const response = await axios.get(`${apiUrl}/users/${id}`);
    return response.data;

}
 export async function createUser(user:User){
    const response = await axios.post(`${apiUrl}/users`,user);
    return response.data;

}
export async function updateUser(id:string, user:User){
    const response = await axios.put(`${apiUrl}/users/${id}`, user);
    return response.data;

}
export async function deleteUser(id:string){
    const response = await axios.delete(`${apiUrl}/users/${id}`);
    return response.data;

}