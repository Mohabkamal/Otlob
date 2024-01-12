import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Css/Register.css";


function LoginRestaurant() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    // email: Yup.string().email().required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = async (data, { setSubmitting }) => {
    // console.log(data.email)
    try {
      const response = await axios.post(
        "http://localhost:3000/api/getRestaurantPassword",
        { email: data.email }
      );

      const storedPassword = response.data.password;
      console.log("res pass in server side", storedPassword);
      if (data.password === storedPassword) {
        console.log(data, "Login successful");
        localStorage.setItem("RestaurantEmail", data.email);
        // edit to navigate to add items
        navigate("/");
      } else {
        console.error("Invalid password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div  className="body-container">
       <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
        <div className="input-group"> <label>Email:</label>
          <ErrorMessage name="email" component="span" />
          <Field id="email" name="email" placeholder="(exdoe@gmail.com)" />
        </div>

        <div className="input-group"> <label>Password:</label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="password"
            name="password"
            placeholder="Your Password ..."
          /> </div>

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginRestaurant;
