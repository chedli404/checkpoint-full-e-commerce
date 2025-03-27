import React, { useRef, useState} from 'react'
import { Category } from '../../types/categories'
import { ProductType } from '../../types/productTypes'
import { createProduct } from '../../api/product'



const ProductForm = ({products,setProducts}: {products: ProductType[] | undefined, setProducts: React.Dispatch<React.SetStateAction<ProductType[] | undefined>>}) => {

    const [err, setErr] = useState<string>('')

    const nameRef = useRef<HTMLInputElement>(null)
    const priceRef = useRef<HTMLInputElement>(null)
    const descRef = useRef<HTMLInputElement>(null)
    const imgRef = useRef<HTMLInputElement>(null)
    const catRef = useRef<HTMLSelectElement>(null)

    const handleAddProduct = async (e: React.FormEvent)=> {
        e.preventDefault()
        if(!nameRef.current || !priceRef.current || !catRef.current) return setErr('missing requierd att')
        const product:ProductType = {
            name: nameRef.current.value,
            price: Number(priceRef.current.value),
            description: descRef.current?.value,
            imageUrl: imgRef.current?.value,
            category: catRef.current.value,
            stock: 1
        }
        const data = await createProduct(product)
        if(!products) return
        setProducts([...products, data])
    }

    return (
        <div>
            <form action="">
                <input type="text" placeholder='name'  ref={nameRef}/>
                <input type="number" placeholder='price'  ref={priceRef}/>
                <input type="text" placeholder='description'  ref={descRef}/>
                <input type="text" placeholder='image Url'  ref={imgRef}/>
                <select defaultValue={Category.ALL} ref={catRef}>
                    <option value={Category.Accessories}>Accessories</option>
                    <option value={Category.Sports}>Sports</option>
                    <option value={Category.Electronics}>Electronics</option>
                    <option value={Category.Sportswear}>Sportswear</option>
                    <option value={Category.Furniture}>Furniture</option>
                    <option value={Category.NewProduct}>New Products</option> 
                    <option value={Category.Homme}>Homme</option>
                    <option value={Category.Femme}>Femme</option>
                    <option value={Category.BestSeller}>BestSeller</option>
                    <option value={Category.HoteTrend}>HoteTrend</option>
                    <option value={Category.Feature}>Feature</option>

                </select>
                {err && <p className='error'>{err}</p>}
                <button onClick={handleAddProduct} className='add-to-cart'>Add product</button>
            </form>
        </div>
    )
}

export default ProductForm