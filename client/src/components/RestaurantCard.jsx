import { useState } from "react";
import "./RestaurantCard.css";

export const RestaurantCard = ({ restaurant }) => {
 // eslint-disable-next-line 
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  
  return (
    <div className="restaurant-card">
      <img
        className="restaurant-image"
        src={restaurant.image}
        alt={restaurant.name}
      />

      <h2 className="restaurant-name">{restaurant.name}</h2>


      <div className="restaurant-footer">
        <button
          className="restaurant-preview-button"
          style={{ color: "white" }}
          onClick={() => setSelectedRestaurant(restaurant)}
        >
          Preview
        </button>
      </div>
    </div>
  );
};
