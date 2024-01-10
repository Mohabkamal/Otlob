import axios from "axios";
import{ useEffect, useState }  from "react";
import { useParams } from "react-router-dom";
import MenuCard from "../components/MenuCard.jsx";


function Menu() {

  const { id } = useParams();
  const [items, setItems] = useState([]);

 useEffect(() => {
    // Fetch items based on the restaurant ID
    axios
      .get(`http://localhost:3000/api/getItemsForRestaurantId/${id}`)
      .then((res) => {
        console.log(res.data, "Items for restaurant ID:", id);
        // console.log(res)
        if (Array.isArray(res.data)) {
          setItems(res.data);
        } else {
          console.error(
            "Invalid data format for ITEMS:",
            res.data.items
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, [id]);

  return (
    <div>
      <h2>Menu</h2>
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default Menu;