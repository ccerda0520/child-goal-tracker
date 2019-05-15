import { Field, Formik } from 'formik';
import React from 'React';
import styled from 'styled-components';
import * as Yup from 'yup';
import { RegisterComponent } from '../generated/apolloComponents';
import InputField from './formikFields/InputField';
import { Button } from './presentational/CommonStyles';

const registerFormValidationSchema = Yup.object().shape({
    registerFirstName: Yup.string().required('First Name is required'),
    registerLastName: Yup.string().required('Last Name is required'),
    registerEmail: Yup.string()
        .email('Email must be a valid email')
        .required('Email is required'),
    registerPassword: Yup.string()
        .required('Password is required')
        .length(5, 'Password must be at least 5 characters'),
});
const Form = styled('form')`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 25px;
    margin-bottom: 25px;
`;

const RegisterButton = styled(Button)`
    width: 100%;
`;

const RegisterForm: React.FunctionComponent<{}> = () => {
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
                            console.log('err: ', err.graphQLErrors[0].extensions.exception.validationErrors);
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
                        <Form onSubmit={handleSubmit}>
                            <Field
                                name="registerFirstName"
                                type="text"
                                placeholder="First Name"
                                label="First Name"
                                isLabelVisible={false}
                                component={InputField}
                            />
                            <Field
                                name="registerLastName"
                                type="text"
                                placeholder="Last Name"
                                label="Last Name"
                                isLabelVisible={false}
                                component={InputField}
                            />
                            <Field name="registerEmail" type="email" placeholder="Email" label="Email" isLabelVisible={false} component={InputField} />
                            <Field
                                name="registerPassword"
                                type="password"
                                placeholder="Password"
                                label="Password"
                                isLabelVisible={false}
                                component={InputField}
                            />
                            <RegisterButton type="submit" disabled={isSubmitting}>
                                Register
                            </RegisterButton>
                        </Form>
                    )}
                </Formik>
            )}
        </RegisterComponent>
    );
};
export default RegisterForm;
