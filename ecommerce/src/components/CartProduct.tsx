import { useState, useEffect } from "react";
import { ProductType } from "../types/productTypes";
import { getProduct } from "../api/product";
import { useCartContext } from "../context/cartContext";
import { removeFromCart, updateQuantity } from "../api/cart";
import "./CartProduct.css";

const CartProduct = ({ productId, quantity }: { productId: string; quantity: number }) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useCartContext();


  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const data = await getProduct(productId);
        setProduct(data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError("Product not available");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  
  const handleRemove = async () => {
    if (!cart?._id) return;
    setIsLoading(true);
    try {
      const updatedCart = await removeFromCart(cart._id, productId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to remove product:", error);
      setError("Failed to remove product");
    } finally {
      setIsLoading(false);
    }
  };


  const handleAddQte = async () => {
    if (!cart?._id) return;
    setIsLoading(true);
    try {
      const updatedCart = await updateQuantity(cart._id, productId, quantity + 1);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to increase quantity:", error);
      setError("Failed to update quantity");
    } finally {
      setIsLoading(false);
    }
  };

 
  const handleSubQte = async () => {
    if (!cart?._id || quantity <= 1) return;
    setIsLoading(true);
    try {
      const updatedCart = await updateQuantity(cart._id, productId, quantity - 1);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
      setError("Failed to update quantity");
    } finally {
      setIsLoading(false);
    }
  };

  const totalPrice = product ? Number((product.price * quantity).toFixed(2)) : 0;

  if (isLoading && !product) return <div className="loading">Loading product...</div>;
  
  if (error) {
    return (
      <div className="product-error">
        <p>{error}</p>
        <button 
          className="remove-prod" 
          onClick={handleRemove}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Remove from cart"}
        </button>
      </div>
    );
  }

  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="cart">
      <img src={product.imageUrl} alt={product.name} />
      <div className="desc">
        <p>{product.name}</p>
        <p>TND {product.price}</p>
        <div className="qte">
          <button 
            onClick={handleSubQte} 
            disabled={isLoading || quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <p>{quantity}</p>
          <button 
            onClick={handleAddQte} 
            disabled={isLoading}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <p>Total Price: ${totalPrice}</p>
        <button 
          className="remove-prod" 
          onClick={handleRemove}
          disabled={isLoading}
          aria-label="Remove product"
        >
          {isLoading ? "Processing..." : "Remove"}
        </button>
      </div>
    </div>
  );
};

export default CartProduct;