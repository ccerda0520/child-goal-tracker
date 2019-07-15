import { Field, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { RegisterComponent } from '../generated/apolloComponents';
import InputField from './formikFields/InputField';
import TimezoneSelect from './formikFields/TimezoneSelect';
import { Button, Error } from './presentational/CommonStyles';
import { lightBlue } from './presentational/variables';

const registerFormValidationSchema = Yup.object().shape({
    registerFirstName: Yup.string().required('First Name is required'),
    registerLastName: Yup.string().required('Last Name is required'),
    registerEmail: Yup.string()
        .email('Email must be a valid email')
        .required('Email is required'),
    registerPassword: Yup.string()
        .required('Password is required')
        .min(5, 'Password must be at least 5 characters'),
    registerTimezone: Yup.string().required('Timezone is required'),
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

const FormTitle = styled('h1')`
    color: white;
    margin: 0;
    background: ${lightBlue};
    padding: 15px 25px;
    margin-bottom: 35px;
`;

const RegisterForm: React.FunctionComponent<{}> = () => {
    return (
        <RegisterComponent>
            {(register) => (
                <div>
                    <FormTitle>Register</FormTitle>
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
                                            timeZone: values.registerTimezone,
                                        },
                                    },
                                });
                                setSubmitting(false);
                                console.log(response);
                            } catch (err) {
                                let registerErrors: string = '';
                                err.graphQLErrors[0].extensions.exception.validationErrors.forEach((e: any) => {
                                    const constraints: string[] = e!.constraints ? Object.keys(e!.constraints).map((k) => e!.constraints[k]) : [];
                                    constraints.forEach((e: any) => {
                                        registerErrors = registerErrors + e;
                                    });
                                });
                                setErrors({
                                    registerFailed: registerErrors,
                                });
                                setSubmitting(false);
                            }
                        }}
                        initialValues={{
                            registerFirstName: '',
                            registerLastName: '',
                            registerEmail: '',
                            registerPassword: '',
                            registerTimezone: '',
                            registerFailed: '',
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
                                <Field name="registerTimezone" type="select" isLabelVisible={false} component={TimezoneSelect} />
                                <RegisterButton type="submit" disabled={isSubmitting}>
                                    Register
                                </RegisterButton>
                                {errors['registerFailed'] && <Error>{errors['registerFailed']}</Error>}
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
        </RegisterComponent>
    );
};
export default RegisterForm;
