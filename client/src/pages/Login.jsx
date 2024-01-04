// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function login() {
//   const navigate = useNavigate();

//   const initialValues = {
//     password: "",
//     email: ""
//   };

//   const validationSchema = Yup.object().shape({
//     password: Yup.string().min(4).max(20).required(),
//     email: Yup.string().min(5).max(30).required()
//   });

//   const onSubmit = (data, { setSubmitting }) => {
//     axios
//       .post("http://localhost:3000/api/insertCustomer", data)
//       .then(() => {
//         console.log(data, "Registration successful");
//         // Redirect to the home page
//         navigate("/home");
//       })
//       .catch((error) => {
//         console.error("Error registering:", error);
//       })
//       .finally(() => {
//         setSubmitting(false);
//       });
//   };
//   return (
//     <div>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={onSubmit}
//         validationSchema={validationSchema}
//       >
//         <Form className="formContainer">
//           <label> Email: </label>
//           <ErrorMessage name="email" component="span" />
//           <Field id="email" name="email" placeholder="(exdoe@gmail.com)" />

//           <label> Password: </label>
//           <ErrorMessage name="password" component="span" />
//           <Field
//             autoComplete="off"
//             type="password"
//             id="inputCreatePost"
//             name="password"
//             placeholder="Your Password ..."
//           />

//           <button type="submit"> Login </button>
//         </Form>
//       </Formik>
//     </div>
//   );
// }

// export default login;
