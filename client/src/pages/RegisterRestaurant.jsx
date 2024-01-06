import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Name: </label>
          <ErrorMessage name="name" component="span" />
          <Field id="name" name="name" placeholder="(Ex. John123...)" />

          <label> Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field id="email" name="email" placeholder="(exdoe@gmail.com)" />

          <label> Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="password"
            name="password"
            placeholder="Your Password ..."
          />

          <label> Address: </label>
          <ErrorMessage name="address" component="span" />
          <Field
            id="address"
            name="address"
            placeholder="(Ex. 123 Main St...)"
          />

          <label> delievery_radius: </label>
          <ErrorMessage name="delievery_radius" component="span" />
          <Field
            id="delievery_radius"
            name="delievery_radius"
            placeholder="(Ex. 12345...)"
          />

          <label> Description: </label>
          <ErrorMessage name="description" component="span" />
          <Field
            id="description"
            name="description"
            placeholder="(Ex. 123 Main St...)"
          />

          <label> Opening hours: </label>
          <ErrorMessage name="address" component="span" />
          <Field
            id="opening_hours"
            name="opening_hours"
            placeholder="(Ex. 123 Main St...)"
          />

          <label> Closing hours: </label>
          <ErrorMessage name="address" component="span" />
          <Field
            id="closing_hours"
            name="closing_hours"
            placeholder="(Ex. 123 Main St...)"
          />

          <button type="submit"> Register </button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
