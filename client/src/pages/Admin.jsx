import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "./Css/Admin.css";

function Admin() {

  const [restaurant, setRestaurant] = useState([]);
  const RestaurantEmail = localStorage.getItem("RestaurantEmail");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedField, setSelectedField] = useState("");

  const initialValues = {
    name: "",
    category: "",
    description: "",
    price: "",
    image_url: "",
  };

  const [categoryTypes, setCategoryTypes] = useState([
    "Appetizer",
    "Main dish",
    "Dessert",
    "Drink",
  ]);
  
const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    category: Yup.string().required("Product category is required"),
    description: Yup.string().required("Product description is required"),
    price: Yup.number().required("Product price is required"),
  });

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/getRestaurant",
          { email: RestaurantEmail }
        );
        console.log("response restaurant:" ,response.data.restaurant);
        setRestaurant(response.data.restaurant);
        console.log("restaurant data:", response.data.restaurant);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };
  
    fetchRestaurantData();
  }, [RestaurantEmail]);
  

      useEffect(() => {
        const fetchRestaurantData = async () => {
          try {
            const response = await axios.post(
              "http://localhost:3000/api/getRestaurant",
              { email: RestaurantEmail }
            );
            setRestaurant(response.data.restaurant);
          } catch (error) {
            console.error("Error fetching restaurant data:", error);
          }
        };
    
        const fetchAllItems = async () => {
          try {
            const response = await axios.get(
              "http://localhost:3000/api/getItemsForRestaurantId/" +
                restaurant.id
            );
            setItems(response.data);
          } catch (error) {
            console.error("Error fetching items:", error);
          }
        };
    
        fetchRestaurantData();
        fetchAllItems();
      }, [RestaurantEmail, restaurant.id]);

  

    const onAddSubmit = (data) => {

        data.restaurant_id = restaurant.id;

        axios
          .post("http://localhost:3000/api/insertItem", data)
          .then((response) => {
            console.log("Product added successfully", response.data);
            // If needed, you can update the state or perform other actions here
          })
          .catch((error) => {
            console.error("Error adding product:", error);
            // Handle the error, show a message, or perform other actions
          });
      };

      
      const handleItemClick = (item) => {
        setSelectedItem(item);
      };

      const handleEditItemField = (field) => {
        setSelectedField(field);
      };

      const handleDeleteItem = (itemId) => {
        axios
          .delete(`http://localhost:3000/api/deleteItem/${itemId}`)
          .then((response) => {
            console.log("Item deleted successfully", response.data);
            setSelectedField("");
            // If needed, you can update the state or perform other actions here
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            // Handle the error, show a message, or perform other actions
          });
      };
      
      

      const handleUpdateItem = (data) => {
        if (selectedField && selectedItem) {
          const updatedItem = {
            id: selectedItem.id,
            field: selectedField,
            newValue: data[selectedField],
          };
     console.log("Admin >> updatedItem ",updatedItem )
          axios
            .put("http://localhost:3000/api/updateItem", updatedItem)
            .then((response) => {
              console.log("Item updated successfully", response.data);
              setSelectedField("");
            })
            .catch((error) => {
              console.error("Error updating item:", error);
            });
        }
      };

  return (
<>

    <div className="addingNewProdct">
        <div className="addingNewProdcttitle">
          Fill Form to add a new Product
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onAddSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>Name:</label>
            <ErrorMessage
              name="name"
              component="span"
              style={{ color: "red" }}
            />
            <Field id="AddingProduct" name="name" placeholder="(Ex. Burger, Pizza ...)" style={{ width: "300px" }} 
            />

          <label htmlFor="category">Category:</label>
            <ErrorMessage
              name="category"
              component="span"
              style={{ color: "red" }}
            />
            <Field
              as="select"
              id="category"
              name="category"
              style={{ width: "300px" }}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categoryTypes.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Field>


            <label> Description:</label>
            <ErrorMessage
              name="description"
              component="span"
              style={{ color: "red" }}
            />


            <Field
              id="AddingProduct"
              name="description"
              placeholder="Components for Ex. Rice, Macaroni ..."
              style={{ width: "300px" }}
            />
            <label> Price:</label>
            <ErrorMessage
              name="price"
              component="span"
              style={{ color: "red" }}
            />
            <Field id="AddingProduct" name="price" placeholder=" € " />


            <label className="attachment-label"> Picture Url in Cloud:</label>
            <div className="urlExample">
              Url Ex. https://drive.google.com/uc?id= "put id here"
            </div>
            <ErrorMessage
              name="image_url"
              component="span"
              style={{ color: "red" }}
            />
            <Field
              id="AddingProduct"
              name="image_url"
              placeholder="(https://photo.com)"
              style={{ width: "80%" }}
            />
            <button type="submit">Add</button>
          </Form>
        </Formik>
      </div>
      <div className="all-items-container">
        <h3>All Items</h3>
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className={selectedItem && selectedItem.id === item.id ? "selected-item" : ""}
            >
              <span
                onClick={() => handleItemClick(item)}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

    {selectedItem && (
  <div className="selected-item-details">
    <h3>Selected Item: {selectedItem.name}</h3>
    <Formik
     initialValues={initialValues}
      onSubmit={handleUpdateItem}

    >
      <Form className="formContainer">
        <label>Select Field to Edit:</label>
        <Field
          as="select"
          id="fieldSelector"
          name="fieldSelector"
          onChange={(e) => setSelectedField(e.target.value)}
        >
          <option value="" disabled>
            Select a field
          </option>
          {Object.keys(selectedItem).map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </Field>

        {/* Show corresponding input field based on the selected field */}
        {selectedField && (
          <>
            <label htmlFor={selectedField}>New {selectedField}:</label>
            <ErrorMessage
              name={selectedField}
              component="span"
              style={{ color: "red" }}
            />
            <Field
              id={selectedField}
              name={selectedField}
              placeholder={`New ${selectedField}`}
            />
          </>
        )}

  <button type="submit" >Update</button>
  <button type="button" className="delete-button" onClick={() => handleDeleteItem(selectedItem.id)}>Delete</button>
      </Form>
    </Formik>
  </div>
)}
    </>
  );
};

export default Admin;