import { Field, Formik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { useStudent } from '../../context/StudentContext';
import { useCreateGoalMutation } from '../../generated/apolloComponents';
import InputField, { TextAreaField } from '../formikFields/InputField';
import { Button, Error } from '../presentational/CommonStyles';
import { lightBlue } from '../presentational/variables';

const newGoalValidationSchema = Yup.object().shape({
    goalName: Yup.string().required('Goal Name is required'),
    goalDescription: Yup.string().required('Description is required'),
    goalTrialsPerDay: Yup.number().required('Trials Per Day is required'),
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

const CancelButton = styled(Button)`
    margin-left: 10px;
`;

const FormWrapper = styled('div')`
    padding: 0 25px 15px 25px;
    border-top: 2px solid ${lightBlue};
`;

interface Props {
    onCancel: any;
    category: string;
    onSubmitCallback: Function;
}

const NewGoalForm: React.FunctionComponent<Props> = ({ onCancel, category, onSubmitCallback }) => {
    const student = useStudent();
    const createGoal = useCreateGoalMutation();
    return (
        <FormWrapper>
            <Formik
                validationSchema={newGoalValidationSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    const { goalName, goalDescription, goalTrialsPerDay } = values;
                    setSubmitting(true);
                    const response: any = await createGoal({
                        variables: {
                            data: {
                                name: goalName,
                                description: goalDescription,
                                trialsPerDay: 5,
                                category: category,
                                studentId: parseFloat(student.id),
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
                    onSubmitCallback(response.data.createGoal);
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
                        <Field name="goalName" placeholder="Goal Name" type="text" label="Goal Name" isLabelVisible={false} component={InputField} />

                        {/* <TwoComponentRowWrapper>
                            <Field
                                name="goalTrialsPerDay"
                                placeholder="Trials Per Day"
                                type="number"
                                label="Trials Per Day"
                                pattern="^[0–9]$"
                                isLabelVisible={false}
                                component={InputField}
                            />
                        </TwoComponentRowWrapper> */}
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
                        <CancelButton type="button" onClick={onCancel}>
                            Cancel
                        </CancelButton>
                        {errors['createGoalFailed'] && <Error>{errors['createGoalFailed']}</Error>}
                    </Form>
                )}
            </Formik>
        </FormWrapper>
    );
};

export default NewGoalForm;
