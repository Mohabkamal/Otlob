import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductPreviewCard from "../components/RestaurantCard";

function Home() {
  const [customer, setCustomer] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/getCustomer",
          { email: userEmail }
        );
        setCustomer(response.data.customer);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, [userEmail]);

  useEffect(() => {
    // Fetch all restaurant data
    const fetchAllRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getAllRestaurants"
        );

        // Filter restaurants based on zip code
        const filteredRestaurants = response.data.restaurants.filter(
          (restaurant) => restaurant.zeip === customer?.zip
        );
        setRestaurants(filteredRestaurants);
      } catch (error) {
        console.error("Error fetching all restaurants:", error);
      }
    };

    fetchAllRestaurants();
  }, [customer]);

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      {customer && (
        <div>
          <p>Email: {customer.email}</p>
          {/* Display other customer details as needed */}
        </div>
      )}
    </div>
  );
}

export default Home;
