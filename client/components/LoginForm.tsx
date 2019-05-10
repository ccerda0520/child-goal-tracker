import { Field, Formik } from "formik";
import Router from "next/router";
import React from "react";
import * as Yup from "yup";
import { LoginComponent } from "../generated/apolloComponents";
import { InputField } from "./formikFields/InputField";

const LoginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid Email")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const LoginForm: React.FunctionComponent<{}> = () => {
    return (
        <LoginComponent>
            {(login) => (
                <Formik
                    validationSchema={LoginValidationSchema}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                        try {
                            const response = await login({
                                variables: {
                                    email: values.email,
                                    password: values.password,
                                },
                            });

                            // Check if login was unsuccessful
                            if (
                                !response ||
                                !response.data ||
                                !response.data.login
                            ) {
                                setErrors({
                                    loginFailed: "Incorrect email or password",
                                });
                                setSubmitting(false);
                                return;
                            }

                            // Redirect user after successful login
                            Router.push("/");
                        } catch (err) {
                            console.log("err:", err);
                            setSubmitting(false);
                        }
                    }}
                    initialValues={{
                        email: "",
                        password: "",
                        loginFailed: "",
                    }}
                >
                    {({ errors, isSubmitting, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Field
                                name="email"
                                placeholder="email"
                                type="email"
                                label="Email"
                                component={InputField}
                            />
                            <Field
                                name="password"
                                placeholder="Password"
                                type="password"
                                label="Password"
                                isLabelVisible={true}
                                component={InputField}
                            />

                            <button type="submit" disabled={isSubmitting}>
                                Login
                            </button>
                            {errors["loginFailed"] && (
                                <div className="error">
                                    {errors["loginFailed"]}
                                </div>
                            )}
                        </form>
                    )}
                </Formik>
            )}
        </LoginComponent>
    );
};

export default LoginForm;
