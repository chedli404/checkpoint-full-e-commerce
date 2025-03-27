import {Routes, Route} from 'react-router'
import AdminSideBar from '../components/Admin/AdminSideBar'
import AdminProducts from '../components/Admin/AdminProducts'
import Users from '../components/Admin/Users'
import useAuth from '../utils/useAuth'

const Admin = () => {

    const {authInfo} = useAuth()


    if(!authInfo) return <h1>you are not authorized</h1>

  return (
    <div className='admin-page'>
        <AdminSideBar/>
        
        <Routes>
            <Route path='products' element={<AdminProducts/>} />
            <Route path='users' element={<Users/>} />
        </Routes>
    </div>
  )
}

export default Admin