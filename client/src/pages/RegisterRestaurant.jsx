import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Css/Register.css";


function Registration() {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    address: "",
    password: "",
    opening_hours: "",
    closing_hours: "",
    delievery_radius: "", // Added zip string that should be cut
    description: "",
    image_url: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(15).required(),
    email: Yup.string().min(5).max(30).required(),
    password: Yup.string().min(4).max(20).required(),
    address: Yup.string().min(5).required(),
  });
  const onSubmit = (data, { setSubmitting }) => {
    axios
      .post("http://localhost:3000/api/insertRestaurant", data)
      .then(() => {
        console.log(data, "Registration Restaurant successful");
        // Redirect to the home page
        navigate("/loginrestaurant");
      })
      .catch((error) => {
        console.error("Error Restaurant registering:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <div className="body-container">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
        <div className="input-group"> <label>Name: </label>
          <ErrorMessage name="name" component="span" />
          <Field id="name" name="name" placeholder="(Ex. John123...)" /> </div>
         
          <div className="input-group"> <label> Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field id="email" name="email" placeholder="(exdoe@gmail.com)" /> </div>
         
          <div className="input-group"><label> Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="password"
            name="password"
            placeholder="Your Password ..."
          /> </div>
          
          <div className="input-group"> <label> Address: </label>
          <ErrorMessage name="address" component="span" />
          <Field
            id="address"
            name="address"
            placeholder="(Ex. 123 Main St...)"
          /> </div>
         
         <div className="input-group">
  <label>Delivery Radius (Comma-separated zip codes): </label>
  <ErrorMessage name="delivery_radius" component="span" />
  <Field
    id="delivery_radius"
    name="delivery_radius"
    placeholder="(Ex. 12345,67890,...)"
  />
</div>
        
        <div className="input-group">  <label> Description: </label>
          <ErrorMessage name="description" component="span" />
          <Field
            id="description"
            name="description"
            placeholder="(Restaurant description)"
          /></div>
         
         <div className="input-group"><label> Opening hours: </label>
          <ErrorMessage name="opening_hours" component="span" />
          <Field
            id="opening_hours"
            name="opening_hours"
            placeholder="(Ex. 10)"
          /> </div>
          
          <div className="input-group">  <label> Closing hours: </label>
          <ErrorMessage name="closing_hours" component="span" />
          <Field
            id="closing_hours"
            name="closing_hours"
            placeholder="(Ex. 22)"
          />
 </div>

          <button type="submit" > Register </button>

          <Link to="/registration" className="link-to-register">
          <button>Register a Customer Instead</button>
          </Link>

        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
