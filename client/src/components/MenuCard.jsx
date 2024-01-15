import axios from "axios";
import { useEffect, useState } from "react";
import "./MenuCard.css";
import { useCart } from "../CartContext/CartContext.jsx";


export const MenuCard = ({ item  }) => {
 // eslint-disable-next-line 

 const { addItem } = useCart();


 const handleAddToCart = () => {
  console.log("item menucard",item)
  addItem(item);
};


 return (
    <div className="menu-card">
      <img
        className="menu-image"
        src={item.image}
        alt={item.name}
      />

      <h2 className="menu-name">{item.name}</h2>
      <h2 className="menu-name">{item.price} $</h2>
      <h2 className="menu-name">{item.description}</h2>

      <div className="menu-footer">
        <button
          className="menu-preview-button"
          style={{ color: "white" }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MenuCard;