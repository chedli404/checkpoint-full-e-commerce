import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { ProductType } from "../types/productTypes"
import { getProduct } from "../api/product"
import { addToCart } from "../api/cart"
import { useCartContext } from "../context/cartContext"



const ProductDetails = () => {

    const { id } = useParams()

    const [product, setProduct] = useState<ProductType>()
    useEffect(() => {
        async function fetchProduct() {
            if (!id) return
            const data = await getProduct(id)
            setProduct(data)
        }
        fetchProduct()
    })

    const [cart, setCart] = useCartContext()

    const handleAddToCart = async () => {
        if (!id) return
        const res = await addToCart(cart._id, id)
        setCart(res)
    }

    if (!product) return <h1>Loading ... if this takes a lot pease check ur connection</h1>

    return (
        <div className="product-detail">
            <img src={product.imageUrl} alt="" />
            <div className="desc ">
                <p>{product.name}</p>
                <p>$ {product.price}</p>
                <p>{product.description}</p>
                <p className="cat-tag">{product.category}</p>
                <button onClick={handleAddToCart} className="add-to-cart"><i className="fa-solid fa-circle-plus"></i>  Add to cart</button>
            </div>
        </div>
    )
}

export default ProductDetails