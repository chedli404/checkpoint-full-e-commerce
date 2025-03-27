import { useEffect, useState } from "react";
import { UserType as User, UserLoginType as UserLogin } from "../types/userTypes";
import { login as serverLogin } from "../api/auth"

function useAuth() {

    const [authInfo, setAuthInfo] = useState<User | null>(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    })

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(authInfo));
    }, [authInfo]);

    async function login(user: UserLogin) {
        try {
            const userData = await serverLogin(user);
            if (userData) {
                setAuthInfo(userData);
            }
        }catch(err){
            console.log(err)
            throw new Error('Invalid credentials');
        }
    }

    function logout() {
        setAuthInfo(null);
    }

    return { authInfo, login, logout };
}

export default useAuth;