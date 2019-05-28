import { Field, Formik } from 'formik';
import Router from 'next/router';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useCreateStudentMutation } from '../../generated/apolloComponents';
import InputField, { TextAreaField } from '../formikFields/InputField';
import { Button, Error } from '../presentational/CommonStyles';

interface Props {
    onCancel: any;
}

const newGoalValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
});
const Form = styled('form')`
    width: 100%;
    max-width: 100%;
    margin: 0 auto 0 0;
    background: transparent;
    overflow: hidden;
    padding: 0;
`;

const TwoComponentRowWrapper = styled('div')`
    display: flex;
    flex-direction: row;
    margin-bottom: 0 !important;
    & > div {
        &:first-of-type {
            width: 66%;
            margin-right: 15px;
        }
        &:last-of-type {
            width: 33%;
            margin-left: 15px;
        }
    }
`;

const NewGoalForm: React.FunctionComponent<Props> = ({ onCancel }) => {
    const createGoal = useCreateStudentMutation();
    return (
        <div>
            <Formik
                validationSchema={newGoalValidationSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    const { goalName, goalDescription, goalTrialsPerDay } = values;
                    setSubmitting(true);
                    const response = await createGoal({
                        variables: {
                            data: {
                                firstName,
                                lastName,
                            },
                        },
                    }).catch((err) => {
                        console.log('err:', err);
                        setErrors({
                            createGoalFailed: 'Failed to create Goal.',
                        });
                        setSubmitting(false);
                    });
                    setSubmitting(false);
                    Router.push('/');
                }}
                initialValues={{
                    goalName: '',
                    goalDescription: '',
                    goalTrialsPerDay: '',
                    createGoalFailed: '',
                }}
            >
                {({ errors, isSubmitting, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <h4>Create New Goal</h4>
                        <TwoComponentRowWrapper>
                            <Field name="goalName" placeholder="Goal Name" type="text" label="Goal Name" isLabelVisible={false} component={InputField} />
                            <Field
                                name="goalTrialsPerDay"
                                placeholder="Trials Per Day"
                                type="number"
                                label="Trials Per Day"
                                pattern="^[0–9]$"
                                isLabelVisible={false}
                                component={InputField}
                            />
                        </TwoComponentRowWrapper>
                        <Field
                            name="goalDescription"
                            placeholder="Goal Description"
                            type="textarea"
                            label="Goal Description"
                            isLabelVisible={false}
                            component={TextAreaField}
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            Submit
                        </Button>
                        <Button type="button" onClick={onCancel}>
                            Cancel
                        </Button>
                        {errors['createGoalFailed'] && <Error>{errors['createGoalFailed']}</Error>}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default NewGoalForm;
