import { Link } from "react-router"
import "./AdminSideBar.css"

const AdminSideBar = () => {
  return (
    <div className='admin-sidebar'>
      <div className='admin-product-header'>
        <h3><Link to='/admin/products'>Products</Link></h3>
      </div>
      <div className='admin-user-header'>
       <h3><Link to='/admin/users'>Users</Link></h3>
      </div>




    </div>
  )
}

export default AdminSideBar