import { useRef } from 'react';
import { createUser } from '../api/user';
import { UserType as User } from '../types/userTypes';
import { Link } from 'react-router-dom';
import { useState } from 'react';



const Signup = () => {
    const[error, setError] = useState<any>(null);
    const[success, setSuccess] = useState<boolean>(false);

    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);   
    const password = useRef<HTMLInputElement>(null);
    const confirmPassword = useRef<HTMLInputElement>(null);

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password.current?.value !== confirmPassword.current?.value) {
            setError({message: "Passwords do not match"});
            return;
        }
        try {
            const user: User = {
                name: name.current?.value || '',
                email: email.current?.value || '',
                password: password.current?.value || '',
                isAdmin: false
            }
            await createUser(user);
            setError(null);
            setSuccess(true);
        } catch (error) {
            setError(error);
        }
    }

    return (
        <div className='signup-page'>
            <div className='signup-form'>
            <form className='signup-info' onSubmit={handleSignup}>
                <h1>Sign Up</h1>
                <input className='signup-input' 
                    type="text" 
                    placeholder='Enter your name'  
                    ref={name}
                />
                <input className='signup-input' 
                    type="email" 
                    placeholder='Enter your email' 
                    ref={email} 
                />
                <input className='signup-input'
                    type="password" 
                    placeholder='Enter your password' 
                    ref={password} 
                />
                <input className='signup-input' 
                    type="password" 
                    placeholder='Confirm your password' 
                    ref={confirmPassword} 
                />
                <button type="submit" className='signup-button'>Sign Up</button>
                {error && <p className='error'>{error.message}</p>}
                {success && <p className='success'>Signup successful</p>}
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
            </div>
        </div>
    );
}

export default Signup;