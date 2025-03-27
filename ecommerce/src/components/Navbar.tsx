import useAuth from '../utils/useAuth';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const { authInfo, logout } = useAuth();

    const [showSearch, setShowSearch] = useState(false);


    return (
        <div className='navbar'>
            <div className='logo'>ShopVibe</div>
            <div className='nav-left'>

                <Link to='/' className='nav-link'>Home</Link>
                <Link to='/products' className='nav-link'>Products</Link>

                {authInfo && <Link to='/cart' className='nav-link'>Cart</Link>}
                {authInfo?.isAdmin && <Link to='/admin' className='nav-link'>Admin</Link>}
            
            
                {showSearch ? (
                    <input className='search-bar' type="text" placeholder='Search...' />
                ) : null}
                <span onClick={() => setShowSearch(!showSearch)}><i className="fa-solid fa-magnifying-glass"></i></span>
            </div>
            <div className='nav-right'>
                {authInfo ? (
                    <>
                        <span>Welcome, {authInfo.name || 'User'}</span>
                        <a onClick={logout} style={{ cursor: 'pointer' }}><i className="fa-solid fa-right-from-bracket"></i></a>
                    </>
                ) : (
                    <div className='auth-links'>
                        <Link to='/login' className='loginBtn'>Login</Link>

                        <span>/</span>

                        <Link to='/signup' className='signupBtn'><i className="fa-solid fa-user-plus"></i></Link>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Navbar