import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";

function Admin() {

  const [restaurant, setRestaurant] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  const initialValues = {
    name: "",
    categoryId: "",
    description: "",
    price: "",
    imageUrl: "",
  };

  const [categoryTypes, setCategoryTypes] = useState([
    "breakfast",
    "lunch",
    "dinner",
    "drinks",
  ]);
  
const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    categoryId: Yup.string().required("Product categoryId is required"),
    description: Yup.string().required("Product description is required"),
    price: Yup.number().required("Product price is required"),
    imageUrl: Yup.string().url("Invalid URL"),
  });


    useEffect(() => {
        const fetchRestaurantData = async () => {
          try {
            const response = await axios.get(
              "http://localhost:3000/api/getRestaurant",
              { email: userEmail }
            );
            setRestaurant(response.data.restaurant);
            console.log("restaurant data:", restaurant);
          } catch (error) {
            console.error("Error fetching restaurant data:", error);
          }
        };
    
        fetchRestaurantData();
      }, [userEmail]);


      const onSubmit = (data) => {
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


  return (
    <div className="addingNewProdct">
        <div className="addingNewProdcttitle">
          Fill Form to add a new Product
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
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
            <label htmlFor="type">Category:</label>
            <ErrorMessage
              name="categoryId"
              component="span"
              style={{ color: "red" }}
            />
            <Field  id="AddingProduct" name="categoryId" as="select"    style={{ width: "300px" }} >
              <option value="">Select a category</option>
              {categoryTypes.map((category, index) => (
                <option key={index} value={category}>
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
              name="imageUrl"
              component="span"
              style={{ color: "red" }}
            />
            <Field
              id="AddingProduct"
              name="imageUrl"
              placeholder="(https://photo.com)"
              style={{ width: "80%" }}
            />
            <button type="submit">Add</button>
          </Form>
        </Formik>
      </div>

  )
}

export default Admin
