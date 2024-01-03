import axios from "axios";
import { useEffect } from "react";

function Menu() {
  useEffect(() => {
    // Example of calling the getAllUsers function
    axios
      .get("http://localhost:3000/api/getAllRestaurants")
      .then((res) => {
        console.log(res.data, "All restaurants");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return <div> Menu </div>;
}

export default Menu;
