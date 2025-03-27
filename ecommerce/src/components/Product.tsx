import { useCartContext } from '../context/cartContext'
import {  ProductType  } from '../types/productTypes'
import { addToCart } from '../api/cart'
import { Link } from 'react-router'



const Product = ({product}:{product:ProductType ,className?: string;}) => {

    const [cart, setCart] = useCartContext()


    const handleAddToCart = async  ()=>{
        if(!product._id) return 
        const res = await addToCart(cart._id, product._id)
        setCart(res)

    }



  return (
    <div className='products-item'>
        <Link to={`/product/${product._id}`}>
        <img src={product.imageUrl} alt='poster' />
        <div className='desc'>
            <p>{product.name}</p>
            <p>TND {product.price}</p>
            <p>{product.category}</p>
            <p>{product.description}</p>
            {product.stock > 0 ? 'in stock' : 'out of stock'}  
            </div>
            
            </Link>
        <button onClick={handleAddToCart} >add to cart</button>

    </div>
  )
             
}

export default Product