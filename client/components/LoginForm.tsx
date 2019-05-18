import { Field, Formik } from 'formik';
import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { LoginComponent, MeQuery } from '../generated/apolloComponents';
import { meQuery } from '../graphql/user/query/me';
import InputField from './formikFields/InputField';
import { Button, Error } from './presentational/CommonStyles';

const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid Email')
        .required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const FormWrapper = styled('div')``;

const Form = styled('form')`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 25px;
    margin-bottom: 25px;
`;

const FormTitle = styled('h1')`
    color: white;
    margin: 0;
    background: #337abb;
    padding: 15px 25px;
    margin-bottom: 35px;
`;

const LoginButton = styled(Button)`
    width: 100%;
`;

const LoginForm: React.FunctionComponent<{}> = () => {
    return (
        <LoginComponent>
            {(login) => (
                <FormWrapper>
                    <FormTitle>Login</FormTitle>
                    <Formik
                        validationSchema={loginValidationSchema}
                        onSubmit={async (values, { setSubmitting, setErrors }) => {
                            try {
                                const response = await login({
                                    variables: {
                                        email: values.email,
                                        password: values.password,
                                    },
                                    update: (cache, { data }) => {
                                        if (!data || !data.login) {
                                            return;
                                        }

                                        cache.writeQuery<MeQuery>({
                                            query: meQuery,
                                            data: {
                                                __typename: 'Query',
                                                me: data.login,
                                            },
                                        });
                                    },
                                });

                                // Check if login was unsuccessful
                                if (!response || !response.data || !response.data.login) {
                                    setErrors({
                                        loginFailed: 'Incorrect email or password',
                                    });
                                    setSubmitting(false);
                                    return;
                                }

                                // Redirect user after successful login
                                Router.push('/');
                            } catch (err) {
                                console.log('err:', err);
                                setSubmitting(false);
                            }
                        }}
                        initialValues={{
                            email: '',
                            password: '',
                            loginFailed: '',
                        }}
                    >
                        {({ errors, isSubmitting, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field name="email" placeholder="Email" type="email" label="Email" isLabelVisible={false} component={InputField} />
                                <Field name="password" placeholder="Password" type="password" label="Password" isLabelVisible={false} component={InputField} />

                                <LoginButton type="submit" disabled={isSubmitting}>
                                    Login
                                </LoginButton>
                                {errors['loginFailed'] && <Error>{errors['loginFailed']}</Error>}
                            </Form>
                        )}
                    </Formik>
                </FormWrapper>
            )}
        </LoginComponent>
    );
};

export default LoginForm;
