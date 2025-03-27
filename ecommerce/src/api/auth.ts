import { UserLoginType as UserLogin } from "../types/userTypes";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export async function login(UserLogin: UserLogin) {
    const response = await axios.post(`${apiUrl}/auth/login`, UserLogin);
    return response.data;
}