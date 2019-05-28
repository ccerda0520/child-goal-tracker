import { Field, Formik } from 'formik';
import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useCreateStudentMutation } from '../generated/apolloComponents';
import InputField from './formikFields/InputField';
import { Button, Error } from './presentational/CommonStyles';

const newStudentValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
});
const Form = styled('form')`
    width: 450px;
    max-width: 100%;
    margin: 0 auto 0 0;
    border-radius: 5px;
    background: white;
    overflow: hidden;
    padding: 25px;
`;

const NewStudentButton = styled(Button)`
    width: 100%;
`;

const NewStudentForm: React.FunctionComponent<{}> = () => {
    const createStudent = useCreateStudentMutation();
    return (
        <div>
            <Formik
                validationSchema={newStudentValidationSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    const { firstName, lastName } = values;
                    setSubmitting(true);
                    const response = await createStudent({
                        variables: {
                            data: {
                                firstName,
                                lastName,
                            },
                        },
                    }).catch((err) => {
                        console.log('err:', err);
                        setErrors({
                            createStudentFailed: 'Failed to create student.',
                        });
                        setSubmitting(false);
                    });
                    setSubmitting(false);
                    Router.push('/');
                }}
                initialValues={{
                    firstName: '',
                    lastName: '',
                    createStudentFailed: '',
                }}
            >
                {({ errors, isSubmitting, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <h1>Create New Student</h1>
                        <Field name="firstName" placeholder="First Name" type="text" label="First Name" isLabelVisible={false} component={InputField} />
                        <Field name="lastName" placeholder="Last Name" type="text" label="Last Name" isLabelVisible={false} component={InputField} />

                        <NewStudentButton type="submit" disabled={isSubmitting}>
                            Submit
                        </NewStudentButton>
                        {errors['createStudentFailed'] && <Error>{errors['createStudentFailed']}</Error>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewStudentForm;
