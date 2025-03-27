import { useState, useEffect } from "react";
import { Category } from "../types/categories";
import { getProducts } from "../api/product";
import { ProductType } from "../types/productTypes";
import { useCartContext } from "../context/cartContext";
import { addToCart } from '../api/cart'


const HeroSection = () => {
  const [category, setCategory] = useState<Category>(Category.ALL);
  const [product, setProduct] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [lastSectionProducts, setLastSectionProducts] = useState<ProductType[]>([]);
  const [cart, setCart] = useCartContext()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProduct(data);
        setFilteredProducts(data);
        setLastSectionProducts(data);
      
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, [  ]);

  
  useEffect(() => {
    if (category === Category.ALL) {
      setFilteredProducts(product);
    } else {
      setFilteredProducts(product.filter((product) => product.category === category));
    }
  }, [category, product]);
  
  const handleAddToCart = async (productId: string) => {
    if (!productId) return;
    const res = await addToCart(cart._id, productId);
    setCart(res);
  }

  return (
    <div>
      <div className="hero-section">
        <div className="hero1">
          <h1>Electronics</h1>
          <p>
            "Upgrade your tech! Find smartphones, laptops, TVs, headphones, smart gadgets & more—all in one place. <br />
            Shop now for the best deals!"
          </p>
          
          <a href="/products "  className="hero1-button">
            Shop Now
          </a>
        </div>
        <div className="hero2">
          <h1>Men's fashion</h1>
          <p>358 items</p>
          <a href="/products" className="hero2-button">
            Shop Now
          </a>
        </div>
        <div className="hero3">
          <h1>Women's fashion</h1>
          <p>657 items</p>
          <a href="/products" className="hero3-button">
            Shop Now
          </a>
        </div>
        <div className="hero4">
          <h1>Accessories</h1>
          <p>428 items</p>
          <a href="/products" className="hero4-button">
            Shop Now
          </a>
        </div>
        <div className="hero5">
          <h1>Sportswear</h1>
          <p>208 items</p>
          <a href="/products" className="hero5-button">
            Shop Now
          </a>
        </div>
      </div>
      <div className="hero-text">
        <div className="hero-text-content">
          <h1>NEW PRODUCT</h1>
        </div>
        <div className="hero-text-nav">
          <h3 onClick={() => setCategory(Category.NewProduct) }>New Products</h3>
          <h3 onClick={() => setCategory(Category.Homme)}>Homme</h3>
          <h3 onClick={() => setCategory(Category.Femme)}>Femme</h3>
        </div>
      </div>
      <div className="category-content">
        <div className="product-grid">
          {filteredProducts
            .filter(
              (product) =>
                product.category === Category.NewProduct ||
                product.category === Category.Homme ||
                product.category === Category.Femme
            )
            .map((product, index) => (
              <div className="product-item" key={product._id || index}>
                <div
                  className="product-image-container"
                  onMouseEnter={() => setHoveredProductId(product._id ?? null)}
                  onMouseLeave={() => setHoveredProductId(null)}
                >
                  <img src={product.imageUrl} alt={product.name} />
                  {hoveredProductId === product._id && (
                    <button onClick={() => handleAddToCart(product._id ?? '')}
                      className="add-to-cart-button"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
              </div>
            ))}
        </div>
      </div>
      
        <div className="adds">
          <div id="addsCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#addsCarousel"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#addsCarousel"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#addsCarousel"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="adds1 d-flex flex-column justify-content-center align-items-center">
                  <h3>The Chole Collection</h3>
                  <h1>The Project Jacket</h1>
                  <p className="caption">Elevate your style with our signature jacket design</p>
                  <a href="/products" className="hero6-button">
                    Shop Now
                  </a>
                </div>
              </div>
              <div className="carousel-item">
                <div className="adds2 d-flex flex-column justify-content-center align-items-center">
                  <h3>The Chole Collection</h3>
                  <h1>The Project Jacket</h1>
                  <p className="caption">Timeless elegance meets modern comfort</p>
                  <a href="/products" className="hero6-button">
                    Shop Now
                  </a>
                </div>
              </div>
              <div className="carousel-item">
                <div className="adds3 d-flex flex-column justify-content-center align-items-center">
                  <h3>The Chole Collection</h3>
                  <h1>The Project Jacket</h1>
                  <p className="caption">Premium quality for the discerning customer</p>
                  <a href="/products" className="hero6-button">
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#addsCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#addsCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
       <div className="last-section">
        
        <div className="best-sellers">
          <h1>Best Sellers</h1>
          {/* add the product of bestsellers */}.
          <div className="best-sellers-products">
            {lastSectionProducts
              .filter((product) => product.category === Category.BestSeller)
              .map((product, index) => (
                <div className="e" key={product._id || index}>
                  <div className="hot-image-container">
                    <img src={product.imageUrl} alt={product.name} />
                    </div>
                  <div className="hot-desc"> 
                    <h3>{product.name}</h3>
                  <p>${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
          </div>
          
        </div>
        <div className="hot-trends">
          <h1>Hot Trends</h1>
          {/* add the product of hot trends */}.
          <div className="hot-trends-products">
            {lastSectionProducts
              .filter((product) => product.category === Category.HoteTrend)
              .map((product, index) => (
                <div className="e" key={product._id || index}>
                  <div className="hot-image-container">
                    <img src={product.imageUrl} alt={product.name} />
                    </div>
                  <div className="hot-desc"> 
                    <h3>{product.name}</h3>
                  <p>${product.price.toFixed(2)}</p>
                  </div>
                  
                </div>
              ))}
          </div>
        </div>
        <div className="feature">
          <h1>Feature</h1>
          {/* add the product of feature */}.   
          <div className="feature-products">
            {lastSectionProducts
              .filter((product) => product.category === Category.Feature)
              .map((product, index) => (
                <div className="e" key={product._id || index}>
                  <div className="hot-image-container">
                    <img src={product.imageUrl} alt={product.name} />
                    </div>
                  <div className="hot-desc"> 
                    <h3>{product.name}</h3>
                  <p>${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}

        </div>

       </div>
    </div>
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content1">
          <h1>Customer Service</h1>
          <p>Help Center</p>
          <p>How to Buy</p>
          <p>Track Your Order</p>
          <p>Returns & Refunds</p>
          <p>Contact Us</p>
        </div>
        <div className="footer-content2">
          <h1>Company</h1>
          <p>About Us</p>
          <p>Careers</p>
          <p>Press</p>
          <p>Corporate Information</p>
          <p>Legal Information</p>
        </div>
        <div className="footer-content3">
          <h1>Resources</h1>
          <p>Find a Store</p>
          <p>Site Feedback</p>
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
          <p>Accessibility</p>
        </div>
        <div className="footer-content4">
          <h1>Follow Us</h1>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
          <p>YouTube</p>
          <p>LinkedIn</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2021 E-commerce. All Rights Reserved</p>
      </div>

              

    </div>
              

    </div>
    
  );
};

export default HeroSection;