import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    // email: Yup.string().email().required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data, { setSubmitting }) => {
    axios
      .post("http://localhost:3000/api/getCustomerPassword", data)  // Adjust the API endpoint for login
      .then(() => {
        console.log(data, "Login successful");
        // Redirect to the home page or the desired destination
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
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
          <label>Email:</label>
          <ErrorMessage name="email" component="span" />
          <Field id="email" name="email" placeholder="(exdoe@gmail.com)" />

          <label>Password:</label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="password"
            name="password"
            placeholder="Your Password ..."
          />

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
