import { Field, Formik } from 'formik';
import React from 'react';
import { ForgotPasswordComponent } from '../generated/apolloComponents';
import InputField from './formikFields/InputField';
import { Button, Error } from './presentational/CommonStyles';
import styled from 'styled-components';

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

const ForgotPasswordForm: React.FunctionComponent<{}> = () => {
    return (
        <ForgotPasswordComponent>
            {(forgotPassword) => (
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
            )}
        </ForgotPasswordComponent>
    );
};

export default ForgotPasswordForm;
