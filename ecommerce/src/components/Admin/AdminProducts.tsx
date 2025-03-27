import { useEffect, useState } from "react";
import { ProductType } from "../../types/productTypes";
import { deleteProduct, getProducts } from "../../api/product";
import ProductForm from "./ProductForm";
import Sidebar from "../SideBar";
import { Category } from '../../types/categories';
import './AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState<ProductType[]>();
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.ALL);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    await deleteProduct(id);
    setProducts(products?.filter((product: ProductType) => product._id !== id));
  };

  const filteredProducts = products?.filter(product => 
    selectedCategory === Category.ALL ? true : product.category === selectedCategory
  );

  return (
   

      <div className="admin-products">
      <div className="sidebarr">
        <Sidebar 
          category={selectedCategory} 
          setCategory={setSelectedCategory}
          className="admin-sidebar"
        />
      </div>
        <div className="admin-product-list">
          {filteredProducts?.map((product: ProductType) => (
            <div key={product._id} className="admin-product-item">
              <img src={product.imageUrl} alt="" />
              <div className="desc">
                <h2>{product.name}</h2>
                <p>{product.price}</p>
                <p className="cat-tag">{product.category}</p>
                <button className="delete-prod" onClick={() => handleDelete(product._id)}><i className="fa-solid fa-trash-can"></i></button>
              </div>
            </div>
          ))}
        </div>
        <ProductForm products={products} setProducts={setProducts} />
      </div>
   
  );
};

export default AdminProducts;
