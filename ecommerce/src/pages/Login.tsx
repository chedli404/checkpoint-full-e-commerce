import { useState } from 'react'
import useAuth from '../utils/useAuth';
import { Link } from 'react-router';

const Login = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<any>(null);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const { login } = useAuth();

    const handleLogin = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        try {
            await login({ email, password });
            setError(null);
            setIsLogin(true);

        } catch (error) {
            setError(error);
        }

    }

    return (
        <div className='login-page' >
            <div className='login-form' >
                <h1>Login</h1>
                <form action="" className='login-info'>
                    <input className='login-input' type="text" placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input className='login-input' type="password" placeholder='enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin} className='login-button' >Login</button>
                    {error && <p className='error'>{error.message}</p>}
                    {isLogin && <p className='success'>Login successful</p>}
                    {isLogin && (window.location.href = '/')}
                </form>
                <p>Don't have an account? <Link to="/signup">Signup now</Link></p>
            </div>

        </div>
    )
}

export default Login