import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();

  const initialValues = {
    first_name: "",
    last_name: "", // Added last_name
    address: "", // Added address
    zip: "", // Added zip
    password: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().min(3).max(15).required(),
    last_name: Yup.string().min(3).max(15).required(), // Added last_name validation
    address: Yup.string().min(5).required(), // Added address validation
    zip: Yup.string().min(5).required(), // Added zip validation
    password: Yup.string().min(4).max(20).required(),
    email: Yup.string().min(5).max(30).required(),
  });
  // edit the onSubmit for login
  const onSubmit = (data, { setSubmitting }) => {
    axios
      .post("http://localhost:3000/api/insertCustomer", data)
      .then(() => {
        console.log(data, "Registration successful");
        // Redirect to the home page
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error registering:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label> First Name: </label>
          <ErrorMessage name="first_name" component="span" />
          <Field
            id="first_name"
            name="first_name"
            placeholder="(Ex. John123...)"
          />

          <label> Last Name: </label>
          <ErrorMessage name="last_name" component="span" />
          <Field id="last_name" name="last_name" placeholder="(Ex. Doe...)" />

          <label> Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field id="email" name="email" placeholder="(exdoe@gmail.com)" />

          <label> Address: </label>
          <ErrorMessage name="address" component="span" />
          <Field
            id="address"
            name="address"
            placeholder="(Ex. 123 Main St...)"
          />
          <label> ZIP: </label>
          <ErrorMessage name="zip" component="span" />
          <Field id="zip" name="zip" placeholder="(Ex. 12345...)" />

          <label> Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your Password ..."
          />

          <button type="submit"> Register </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
