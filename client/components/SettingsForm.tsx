import { Field, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useUser } from '../context/UserContext';
import { useUpdateUserMutation } from '../generated/apolloComponents';
import InputField from './formikFields/InputField';
import TimezoneSelect from './formikFields/TimezoneSelect';
import { Button } from './presentational/CommonStyles';
import Spinner from './Spinner';

const settingsFormValidationSchema = Yup.object().shape({
    userFirstName: Yup.string().required('First Name is required'),
    userLastName: Yup.string().required('Last Name is required'),
    userTimezone: Yup.string().required('Timezone is required'),
    userPassword: Yup.string()
        .nullable()
        .min(5, 'Password must be at least 5 characters'),
    userConfirmPassword: Yup.string().when(['userPassword'], {
        is: function(userPassword: string) {
            return !!userPassword;
        },
        then: Yup.string()
            .oneOf([Yup.ref('userPassword')], 'Confirmation password does not match password.')
            .required('Confirmation Password Required'),
    }),
});

const FormWrapper = styled('div')`
    width: 450px;
    padding: 5px 25px 25px 25px;
    max-width: 100%;
    button[data-reach-menu-button] {
        background: white;
    }
`;

const SettingsForm = () => {
    const user = useUser();
    const updateUser = useUpdateUserMutation();
    const [message, setMessage] = React.useState<string>('');

    if (!user) {
        return <Spinner />;
    }

    return (
        <FormWrapper>
            <Formik
                initialValues={{
                    userFirstName: user.firstName,
                    userLastName: user.lastName,
                    userTimezone: user.timeZone,
                    userPassword: '',
                    userConfirmPassword: '',
                }}
                validationSchema={settingsFormValidationSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    const response = await updateUser({
                        variables: {
                            data: {
                                firstName: values.userFirstName,
                                lastName: values.userLastName,
                                timeZone: values.userTimezone,
                                password: values.userConfirmPassword ? values.userPassword : null,
                            },
                        },
                    }).catch((err) => {
                        setMessage('Failed to update settings. Refresh the page and try again.');
                        console.log(err);
                    });

                    if (!response || !response.data || !response.data.updateUser) {
                        setMessage('Failed to update settings. Refresh the page and try again.');
                    } else {
                        setMessage('Successfully updated settings!');
                    }

                    setSubmitting(false);
                }}
            >
                {({ errors, isSubmitting, handleSubmit }) => (
                    <>
                        <form onSubmit={handleSubmit}>
                            <Field name="userFirstName" type="text" label="First Name" isLabelVisible={true} component={InputField} />
                            <Field name="userLastName" type="text" label="Last Name" isLabelVisible={true} component={InputField} />
                            <Field name="userTimezone" type="select" label="Timezone" isLabelVisible={true} component={TimezoneSelect} />
                            <Field name="userPassword" type="password" label="New Password" isLabelVisible={true} component={InputField} />
                            <Field name="userConfirmPassword" type="password" label="Confirm New Password" isLabelVisible={true} component={InputField} />
                            <Button type="submit" disabled={isSubmitting}>
                                Submit
                            </Button>
                        </form>
                        <span>{message}</span>
                    </>
                )}
            </Formik>
        </FormWrapper>
    );
};

export default SettingsForm;
