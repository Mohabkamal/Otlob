import { useState } from "react";
import "./RestaurantCard.css";

export const RestaurantCard = ({ restaurant, onClick  }) => {
 // eslint-disable-next-line 
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  
  return (
    <div className="restaurant-card" onClick={() => onClick(restaurant)}>
      <img
        className="restaurant-image"
        src={restaurant.image}
        alt={restaurant.name}
      />

      <h2 className="restaurant-name">{restaurant.name}</h2>

    </div>
  );
};
