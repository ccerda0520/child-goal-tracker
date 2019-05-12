import { Field, Formik } from 'formik';
import React from 'React';
import * as Yup from 'yup';
import { RegisterComponent } from '../generated/apolloComponents';
import InputField from './formikFields/InputField';
const registerFormValidationSchema = Yup.object().shape({
    registerFirstName: Yup.string().required('First Name is required'),
    registerLastName: Yup.string().required('Last Name is required'),
    registerEmail: Yup.string()
        .email('Email must be a valid email')
        .required('Email is required'),
    registerPassword: Yup.string().required('Password is required'),
});
export const RegisterForm: React.FunctionComponent<{}> = () => {
    return (
        <RegisterComponent>
            {(register) => (
                <Formik
                    validationSchema={registerFormValidationSchema}
                    onSubmit={async (values, { setSubmitting, setErrors }) => {
                        try {
                            const response = await register({
                                variables: {
                                    data: {
                                        firstName: values.registerFirstName,
                                        lastName: values.registerLastName,
                                        email: values.registerEmail,
                                        password: values.registerPassword,
                                    },
                                },
                            });
                            setSubmitting(false);
                            console.log(response);
                        } catch (err) {
                            console.log(
                                'err: ',
                                err.graphQLErrors[0].extensions.exception
                                    .validationErrors,
                            );
                            setSubmitting(false);
                        }
                    }}
                    initialValues={{
                        registerFirstName: '',
                        registerLastName: '',
                        registerEmail: '',
                        registerPassword: '',
                    }}
                >
                    {({ errors, isSubmitting, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Field
                                name="registerFirstName"
                                type="text"
                                placeholder="first name"
                                label="First Name"
                                isLabelVisible={false}
                                component={InputField}
                            />
                            <Field
                                name="registerLastName"
                                type="text"
                                placeholder="last name"
                                label="Last Name"
                                isLabelVisible={false}
                                component={InputField}
                            />
                            <Field
                                name="registerEmail"
                                type="email"
                                placeholder="email"
                                label="Email"
                                isLabelVisible={false}
                                component={InputField}
                            />
                            <Field
                                name="registerPassword"
                                type="password"
                                placeholder="password"
                                label="Password"
                                isLabelVisible={false}
                                component={InputField}
                            />
                            <button type="submit" disabled={isSubmitting}>
                                Register
                            </button>
                        </form>
                    )}
                </Formik>
            )}
        </RegisterComponent>
    );
};
