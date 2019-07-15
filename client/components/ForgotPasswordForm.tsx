import { Field, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { ForgotPasswordComponent } from '../generated/apolloComponents';
import InputField from './formikFields/InputField';
import { Button, Error } from './presentational/CommonStyles';
import { lightBlue } from './presentational/variables';

const Form = styled('form')`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 25px;
    margin-bottom: 25px;
`;

const ForgotButton = styled(Button)`
    width: 100%;
`;

const FormTitle = styled('h1')`
    color: white;
    margin: 0;
    background: ${lightBlue};
    padding: 15px 25px;
    margin-bottom: 35px;
`;

const ForgotPasswordForm: React.FunctionComponent<{}> = () => {
    return (
        <ForgotPasswordComponent>
            {(forgotPassword) => (
                <div>
                    <FormTitle>Forgot Password</FormTitle>
                    <Formik
                        onSubmit={async (values, { setSubmitting, setErrors }) => {
                            try {
                                await forgotPassword({
                                    variables: {
                                        email: values.forgotEmail,
                                    },
                                });
                                setSubmitting(false);
                            } catch (err) {
                                console.log(err);
                                setErrors({
                                    forgotPasswordFormSubmissionError: 'Email failed to send.',
                                });
                                setSubmitting(false);
                            }
                        }}
                        initialValues={{
                            forgotEmail: '',
                            forgotPasswordFormSubmissionError: '',
                        }}
                    >
                        {({ errors, isSubmitting, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Field name="forgotEmail" type="email" placeholder="Email" label="Email" isLabelVisible={false} component={InputField} />
                                <ForgotButton type="submit" disabled={isSubmitting}>
                                    Send Email
                                </ForgotButton>
                                {errors['forgotPasswordFormSubmissionError'] && <Error>{errors['forgotPasswordFormSubmissionError']}</Error>}
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
        </ForgotPasswordComponent>
    );
};

export default ForgotPasswordForm;
