import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from 'formik';

import authService from '../../services/authService';
import preferenceService from '../../services/preferenceService';


function Login() {

    const[apiErrorMsg, setApiErrorMsg] = useState('')
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Email address must be valid")
                .required("Email address is required")
                .label("Email address"),
            password: Yup.string()
                .min(8, "Password should be a minimum of 8 characters")
                .required("Password is required")
                .label("Password")
        }),
        onSubmit: values => {
            console.log(values);
            handleSubmit(values)
        },
    });

    const handleSubmit = async(body) => {
        try {
          const res = await authService.login({
            'email':body.email,
            'password':body.password
            })
          localStorage.setItem('user', JSON.stringify(res.data));
          getPreferences(res.data.id)
          navigate('/');
         
        }catch (err){
            console.log(err.response.data.message);
            setApiErrorMsg(err.response.data.message)
        }
    }


    const getPreferences = async (user_id)=>{
        try {
            
        const res = await preferenceService.getPreference({"user_id" : user_id});
        localStorage.setItem('preferences', JSON.stringify(res));
        } catch (err) {
        console.log(err);
        }
    }



    return (
        <>
            <main id="content" role="main" className="main pt-0">
                {/* Content */}
                <div className="container-fluid px-3">
                    <div className="row">
                        <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center min-vh-lg-100 position-relative bg-light px-0">
                            {/* Logo & Language */}
                            <div className="position-absolute top-0 start-0 end-0 mt-3 mx-3">
                                <div className="d-none d-lg-flex justify-content-between">
                                    <a href="./index.html">
                                        <img className="w-100" src="./assets/svg/logos/logo.svg" alt="Image Description" data-hs-theme-appearance="default" style={{ minWidth: '7rem', maxWidth: '7rem' }} />
                                        <img className="w-100" src="./assets/svg/logos-light/logo.svg" alt="Image Description" data-hs-theme-appearance="dark" style={{ minWidth: '7rem', maxWidth: '7rem' }} />
                                    </a>
                                    {/* Select */}

                                    {/* End Select */}
                                </div>
                            </div>
                            {/* End Logo & Language */}
                            <div style={{ maxWidth: '23rem' }}>
                                <div className="text-center mb-5">
                                    <img className="img-fluid" src="./assets/svg/illustrations/oc-chatting.svg" alt="Image Description" style={{ width: '12rem' }} data-hs-theme-appearance="default" />
                                    <img className="img-fluid" src="./assets/svg/illustrations-light/oc-chatting.svg" alt="Image Description" style={{ width: '12rem' }} data-hs-theme-appearance="dark" />
                                </div>
                                <div className="mb-5">
                                    <h2 className="display-5">Build digital products with:</h2>
                                </div>
                                {/* List Checked */}
                                <ul className="list-checked list-checked-lg list-checked-primary list-py-2">
                                    <li className="list-checked-item">
                                        <span className="d-block fw-semibold mb-1">All-in-one tool</span>
                                        Build, run, and scale your apps - end to end
                                    </li>
                                    <li className="list-checked-item">
                                        <span className="d-block fw-semibold mb-1">Easily add &amp; manage your services</span>
                                        It brings together your tasks, projects, timelines, files and more
                                    </li>
                                </ul>
                                {/* End List Checked */}
                                <div className="row justify-content-between mt-5 gx-3">
                                    <div className="col">
                                        <img className="img-fluid" src="./assets/svg/brands/gitlab-gray.svg" alt="Logo" />
                                    </div>
                                    {/* End Col */}
                                    <div className="col">
                                        <img className="img-fluid" src="./assets/svg/brands/fitbit-gray.svg" alt="Logo" />
                                    </div>
                                    {/* End Col */}
                                    <div className="col">
                                        <img className="img-fluid" src="./assets/svg/brands/flow-xo-gray.svg" alt="Logo" />
                                    </div>
                                    {/* End Col */}
                                    <div className="col">
                                        <img className="img-fluid" src="./assets/svg/brands/layar-gray.svg" alt="Logo" />
                                    </div>
                                    {/* End Col */}
                                </div>
                                {/* End Row */}
                            </div>
                        </div>
                        {/* End Col */}
                        <div className="col-lg-6 d-flex justify-content-center align-items-center min-vh-lg-100">
                            <div className="w-100 content-space-t-4 content-space-t-lg-2 content-space-b-1" style={{ maxWidth: '25rem' }}>

                                <form onSubmit={formik.handleSubmit} className="js-validate needs-validation">
                                    <div className="text-center">
                                        <div className="mb-5">
                                            <h1 className="display-5">Sign in</h1>
                                            <p>
                                                Don't have an account yet?  <Link
                                                to="/register"
                                                className="link"
                                            >
                                                Sign up here
                                            </Link>
                    
                                            </p>
                                        </div>
                                        <span className="divider-center text-muted mb-4">OR</span>
                                    </div>

                                    <span className="api-error-msg">{apiErrorMsg &&`${apiErrorMsg}`}</span>

                                    <div className="mb-4">
                                        <label className="form-label" htmlFor="signinSrEmail">Your email</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                            type="email"
                                            className={`form-control form-control-lg ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                            name="email"
                                            id="email"
                                            tabIndex={1}
                                            placeholder="email@address.com"
                                            aria-label="email@address.com"
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <span className="invalid-feedback">{formik.errors.email}</span>
                                        ) : null}
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label" htmlFor="signinSrEmail">Forgot Password?</label>
                                        <input
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                            type="password"
                                            className={`form-control form-control-lg ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                            name="password"
                                            id="password"
                                            tabIndex={1}
                                            placeholder="8+ characters required"
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <span className="invalid-feedback">{formik.errors.password}</span>
                                        ) : null}
                                    </div>

                                    {/* <div className="mb-4">
                                        <label className="form-label w-100" htmlFor="signupSrPassword" tabIndex={0}>
                                            <span className="d-flex justify-content-between align-items-center">
                                                <span>Password</span>
                                                <a className="form-label-link mb-0" href="./authentication-reset-password-cover.html">Forgot Password?</a>
                                            </span>
                                        </label>
                                        <div className="input-group input-group-merge">
                                            <input
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.password}
                                                type="password"
                                                className={`form-control form-control-lg ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                                name="password"
                                                id="password"
                                                placeholder="8+ characters required"
                                                aria-label="8+ characters required"
                                                minLength={8}
                                            />
                                            <a id="changePassTarget" className="input-group-append input-group-text" href="javascript:;">
                                                <i id="changePassIcon" className="bi-eye" />
                                            </a>
                                        </div>
                                        {formik.touched.password && formik.errors.password ? (
                                            <span className="invalid-feedback">{formik.errors.password}</span>
                                        ) : null}
                                    </div> */}

                                    <div className="form-check mb-4">
                                        <input className="form-check-input" type="checkbox" id="termsCheckbox" />
                                        <label className="form-check-label" htmlFor="termsCheckbox">
                                            Remember me
                                        </label>
                                    </div>

                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary btn-lg">Sign in</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* End Col */}
                    </div>
                    {/* End Row */}
                </div>
                {/* End Content */}
            </main>
        </>
    );
}

export default Login;