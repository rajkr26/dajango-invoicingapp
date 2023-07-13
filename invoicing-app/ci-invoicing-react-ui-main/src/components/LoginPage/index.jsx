// import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigat = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const [requestResponse, setrequestResponse] = useState({
    resMassage: "",
    alertClass: "",
  });

  const onSubmit = (values) => {
    console.log(values);
    axios
      .post("http://127.0.0.1:8000/api/user/signin/", values)
      .then(
        (res) => {
          // console.log(res)
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);

            setrequestResponse({
              resMassage: res.data.message,
              alertClass: "alert alert-success",
            });

            navigat("/invoicelist");
          } else {
            setrequestResponse({
              resMassage: res.data.message,
              alertClass: "alert alert-danger",
            });
          }
        },
        (error) => {
          console.log(error.response.data.message);
          setrequestResponse({
            resMassage: error.response.data.message,
            alertClass: "alert alert-danger",
          });
        }
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("email should be a valid email"),
    password: Yup.string()
      .required("password is required")
      .min(6, "password must be at least 6 characters"),
  });

  return (
    <div className="container">
      <div className="row">
        <div div className="col-md-3"></div>
        <div className="col-md-6 mb-4">
          <div className={styles.wrapper}>
            <div className={requestResponse.alertClass} role="alert">
              {console.log(requestResponse.resMassage)}
              {requestResponse.resMassage}
            </div>

            <h2>Login</h2>
            <hr />

            <Formik
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              initialValues={initialValues}
              validateOnMount
            >
              {(formik) => {
                return (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className={
                          formik.touched.email && formik.errors.email
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />
                      <ErrorMessage name="email">
                        {(errorMessage) => (
                          <small className="text-danger">{errorMessage}</small>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className={
                          formik.touched.password && formik.errors.password
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                      />

                      <ErrorMessage name="password">
                        {(errorMessage) => (
                          <small className="text-danger">{errorMessage}</small>
                        )}
                      </ErrorMessage>

                      {/* <small className="text-danger">{formik.errors.email}</small> */}
                    </div>
                    <input
                      type="submit"
                      value="Login"
                      className="btn btn-primary btn-block"
                      disabled={!formik.isValid}
                    />
                  </Form>
                );
              }}
            </Formik>

            <br />

            <p className="text-center">
              Don't Have Account? <Link to="/signup">Click Here</Link>
            </p>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default LoginPage;
