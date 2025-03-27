import React from 'react';
import { Category } from '../types/categories';

type SidebarProps = {
  category: Category;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  className?: string; 
  newProduct?: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ setCategory }) => {
  return (
    <div id="sidebar">
      <h3 onClick={() => setCategory(Category.ALL)}>All</h3>
      <h3 onClick={() => setCategory(Category.Accessories)}>Accessories</h3>
      <h3 onClick={() => setCategory(Category.Sports)}>Sports</h3>
      <h3 onClick={() => setCategory(Category.Electronics)}>Electronics</h3>
      <h3 onClick={() => setCategory(Category.Sportswear)}>Sportswear</h3>
      <h3 onClick={() => setCategory(Category.Furniture)}>Furniture</h3>
      <h3 onClick={() => setCategory(Category.NewProduct)}>New Products</h3> 
      <h3 onClick={() => setCategory(Category.Homme)}>Homme</h3>
      <h3 onClick={() => setCategory(Category.Femme)}>Femme</h3>
    </div>
  );
};

export default Sidebar;