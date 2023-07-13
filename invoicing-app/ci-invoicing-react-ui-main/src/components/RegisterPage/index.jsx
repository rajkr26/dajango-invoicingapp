

import { useFormik } from "formik";
import * as Yup from "yup";
import { Link,useNavigate } from "react-router-dom";
import styles from "./styles.module.css"
import axios from "axios"
import { useState } from "react";


const RegisterPage = () => {

    const naviagt = useNavigate()

    const[reqstRes, setreqstRes] = useState({
        resMassage:"",
        alertClass:""
    })

    const initialValues = {
        name: "",
        email: "",
        mobile: "",
        password: ""
    };

    const onSubmit = (values) => {
        console.log(values)
        axios.post("http://127.0.0.1:8000/api/user/signup/", values)

            .then(
                (res) => {
                    console.log(res.data.message)
                    
                    setreqstRes({
                        resMassage:res.data.message,
                        alertClass: "alert alert-success"
                    })

                    if(res.data.user_id){
                        naviagt("/")
                    }
                },
                (error) => {
                    console.log(error.response.data.message)
                    setreqstRes({
                        resMassage:error.response.data.message,
                        alertClass: "alert alert-danger"
                    })
                }
            )
            .catch(error => { console.log(error) })
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("first name is required"),
        email: Yup.string().required("email is required").email("email should be a valid email"),
        mobile: Yup.string().required("mobile is required"),
        password: Yup.string().required("password is required").min(6, "password must be at least 6 characters"),
    })




    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnMount: true,
    })


    return (
        <div className="container">
            <div className="row">
                <div div className="col-md-3"></div>
                <div className="col-md-6 mb-4">
                    <div className={styles.wrapper}>

                        <div className={reqstRes.alertClass} role="alert">
                            {/* {console.log(reqstRes.resMassage)} */}
                            {reqstRes.resMassage}
                        </div>

                        <h2>Register</h2>
                        <hr />
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">First Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className={formik.touched.name && formik.errors.name ? "form-control is-invalid" : "form-control"}
                                    value={formik.values.name}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange} />
                                {formik.errors.name && formik.touched.name ? (<small className="text-danger">{formik.errors.name}</small>) : null}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className={formik.touched.email && formik.errors.email ? "form-control is-invalid" : "form-control"}
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange} />
                                {formik.errors.email && formik.touched.email ? (<small className="text-danger">{formik.errors.email}</small>) : null}

                            </div>
                            <div className="form-group">
                                <label htmlFor="mobile">Mobile</label>
                                <input
                                    type="text"
                                    name="mobile"
                                    id="mobile"
                                    className={formik.touched.mobile && formik.errors.mobile ? "form-control is-invalid" : "form-control"}
                                    value={formik.values.mobile}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange} />
                                {formik.errors.mobile && formik.touched.mobile ? (<small className="text-danger">{formik.errors.mobile}</small>) : null}

                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className={formik.touched.password && formik.errors.password ? "form-control is-invalid" : "form-control"}
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange} />
                                {formik.errors.password && formik.touched.password ? (<small className="text-danger">{formik.errors.password}</small>) : null}

                            </div>
                            <input type="submit" value="Register" className="btn btn-primary btn-block" disabled={!formik.isValid} />
                        </form>
                        <br />
                        <p className="text-center">
                            Already registerd? <Link to="/">Click Here</Link>
                        </p>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}


export default RegisterPage;