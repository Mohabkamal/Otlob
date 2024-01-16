import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MenuCard from '../components/MenuCard';
import Cart from '../pages/Cart';
import './Css/Menu.css';

function Menu() {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getItemsForRestaurantId/${id}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setItems(res.data);
        } else {
          console.error('Invalid data format for ITEMS:', res.data.items);
        }
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
      });
  }, [id]);

  // Function to sort items by category
  const sortItemsByCategory = () => {
    const categoryOrder = {
      'Appetizer': 1,
      'Main dish': 2,
      'Dessert': 3,
      ' Drink': 4,
    };

    const sortedItems = [...items].sort((a, b) => categoryOrder[a.category] - categoryOrder[b.category]);

    return (
      <div className="menu-items">
        {Object.keys(categoryOrder).map((category) => (
          <div key={category}>
            <h3 style={{ color: 'red', fontWeight: 'bold' }}>{category}s</h3>
            <div className="menu-items-grid">
              {sortedItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="menu-container">
      {sortItemsByCategory()}
      <div className="menu-cart">
        <Cart />
      </div>
    </div>
  );
}

export default Menu;
