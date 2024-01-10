import axios from "axios";
import { useEffect, useState } from "react";
import "./MenuCard.css";

export const MenuCard = ({ item }) => {
 // eslint-disable-next-line 

  
 return (
    <div className="menu-card">
      <img
        className="menu-image"
        src={item.image}
        alt={item.name}
      />

      <h2 className="menu-name">{item.name}</h2>
      <h2 className="menu-name">{item.price}</h2>

      <div className="menu-footer">
        <button className="menu-preview-button" style={{ color: "white" }}>
          Add
        </button>
      </div>
    </div>
  );
};

export default MenuCard;