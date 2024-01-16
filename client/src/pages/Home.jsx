import  { useEffect, useState } from "react";
import axios from "axios";
import { RestaurantCard } from "../components/RestaurantCard.jsx";
import { useNavigate } from "react-router-dom";
import "./Css/Home.css";

function Home() {
  // eslint-disable-next-line
  const [customer, setCustomer] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/getCustomer",
          { email: userEmail } // Use userEmail from localStorage
        );
  
        const fetchedCustomer = response.data.customer;
  
        if (fetchedCustomer) {
          console.log("Customer data:", fetchedCustomer);
          setCustomer(fetchedCustomer);
        } else {
          console.log("Email not found in customers table");
          // Handle the case where the customer is not found
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
        // Handle other errors
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
          const filteredRestaurants = response.data.filter((restaurant) => {
            try {
              const deliveryRadiusArray = restaurant.delivery_radius.split(",").map(item => item.replace(/^"|"$/g, '').trim());
              // console.log("Customer Zip Code:", customer?.zip);
              // console.log("Delivery Radius Array:", deliveryRadiusArray);
          
              if (Array.isArray(deliveryRadiusArray)) {
                // without quotes for comparison
                const customerZip = customer?.zip.toString();
          
                const includesCustomerZip = deliveryRadiusArray.includes(customerZip);
                console.log("Includes Customer Zip:", includesCustomerZip);
          
                return includesCustomerZip;
              } else {
                console.error("Invalid delivery_radius format:", restaurant.delivery_radius);
                return false; // Exclude restaurants with invalid delivery_radius
              }
            } catch (error) {
              console.error("Error parsing delivery_radius:", error);
              return false; // Exclude restaurants with invalid delivery_radius
            }
          });
          setRestaurants(filteredRestaurants);
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


  const handleRestaurantClick = (restaurant) => {
    navigate(`/menu/${restaurant.id}`);
  };

  return (
    <>
      {/* <p>Email: {customer.email}</p> */}
  

      <h2>Restaurants</h2>

      <div className="restaurants-container">
        {restaurants.length > 0 &&
          restaurants.map((restaurant, index) => {
            return (
              <RestaurantCard
                key={index}
                restaurant={restaurant}
                onClick={() => handleRestaurantClick(restaurant)}
              />
            );
          })}
      </div>
    </>
  );
}

export default Home;