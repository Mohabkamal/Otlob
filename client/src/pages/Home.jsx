import React, { useEffect, useState } from "react";
import axios from "axios";
import { RestaurantCard } from "../components/RestaurantCard.jsx";
import { Link } from "react-router-dom";
import "./Css/Home.css";

function Home() {
  // eslint-disable-next-line
  const [customer, setCustomer] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/getAllRestaurants",
          { email: userEmail }
        );
        setCustomer(response.data.customer);
        console.log("customer data:", customer);
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
        console.log("Response:", response.data);
        // Filter restaurants based on zip code
        // const filteredRestaurants = response.data.restaurants.filter(
        //   (restaurant) => restaurant.zip === customer?.zip
        // );
        // setRestaurants(filteredRestaurants);

        if (Array.isArray(response.data)) {
          setRestaurants(response.data);
        } else {
          console.error(
            "Invalid data format for restaurants:",
            response.data.restaurants
          );
        }
      } catch (error) {
        console.error("Error fetching all restaurants:", error);
      }
    };

    fetchAllRestaurants();
  }, [customer]);

  return (
    <>
      {/* <p>Email: {customer.email}</p> */}
      <br />
      <Link to="/menu">
        <br />
        <button>Menu</button>
      </Link>

      <h2>Restaurants</h2>

      <div className="restaurants-container">
        {restaurants.length > 0 &&
          restaurants.map((restaurant, index) => {
            return <RestaurantCard key={index} restaurant={restaurant} />;
          })}
      </div>
    </>
  );
}

export default Home;
