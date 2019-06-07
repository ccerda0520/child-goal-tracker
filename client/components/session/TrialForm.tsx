import React from 'react';
import styled from 'styled-components';
import { useCreateTrialMutation, useCurrentTrialQuery, useUpdateTrialMutation } from '../../generated/apolloComponents';
import { LabelText } from '../presentational/CommonStyles';
import { errorRed, yesGreen } from '../presentational/variables';

interface Props {
    initialFieldValues?: Object;
    trialCount: number;
    goalId: string;
}

const RadioGroup = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

const RadioIconNo = styled('span')`
    font-size: 24px;
    cursor: pointer;
    color: ${errorRed};
    background: white;
    display: inline-flex;
    line-height: 1;
    width: 50px;
    height: 30px;
    justify-content: center;
    align-items: center;
    border: 1px solid ${errorRed};
    box-shadow: 0 1px 3px 0 rgba(31, 36, 38, 0.1);
    transition: 0.3s all ease-in-out;
`;

const RadioIconYes = styled('span')`
    font-size: 24px;
    cursor: pointer;
    color: ${yesGreen};
    background: white;
    display: inline-flex;
    line-height: 1;
    width: 50px;
    height: 30px;
    justify-content: center;
    align-items: center;
    border: 1px solid ${yesGreen};
    box-shadow: 0 1px 3px 0 rgba(31, 36, 38, 0.1);
    transition: 0.3s all ease-in-out;
`;

const RadioInput = styled('input')`
    border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
    word-wrap: normal !important;
    &:focus,
    &.active {
        & ~ ${RadioIconYes} {
            background: ${yesGreen};
            color: white;
        }
        & ~ ${RadioIconNo} {
            background: ${errorRed};
            color: white;
        }
    }
    &:focus {
        & ~ ${RadioIconYes} {
            box-shadow: 0px 0px 4px 1px ${yesGreen};
        }
        & ~ ${RadioIconNo} {
            box-shadow: 0px 0px 4px 1px ${errorRed};
        }
    }
`;

const RadioLabel = styled('label')`
    width: auto;
    &:not(:last-of-type) {
        margin-right: 10px;
    }
    &:hover {
        ${RadioIconYes} {
            background: ${yesGreen};
            color: white;
        }
        ${RadioIconNo} {
            background: ${errorRed};
            color: white;
        }
    }
`;

const trialFormReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'change':
            let newTrials = state.trials;
            newTrials[action.element.target.getAttribute('data-id')] = action.element.target.value === '1' ? true : false;
            return {
                ...state,
                trials: newTrials,
            };
        case 'loadTrialValues':
            return {
                ...state,
                trialsLoaded: true,
                trials: action.trialValues,
                trialId: action.trialId,
            };
        case 'loadNoTrialValues':
            return {
                ...state,
                trialsLoaded: true,
            };
        case 'trialCreated':
            return {
                ...state,
                trialId: action.trialId,
            };
        default:
            throw Error('Not a valid trialFormReducer action type');
    }
};

const TrialForm: React.FC<Props> = ({ trialCount, goalId }) => {
    /**
     * @todo add strict trial order inputing, ex. can only enter trial 3 if trial 1 and 2 are complete
     */
    const initialState = React.useMemo(() => {
        return {
            trialsLoaded: false,
            trialId: null,
            trials: [],
        };
    }, [goalId]);
    const [state, dispatch] = React.useReducer(trialFormReducer, initialState);

    const { data, loading, errors } = useCurrentTrialQuery({
        suspend: false,
        fetchPolicy: 'network-only',
        variables: {
            goalId: parseInt(goalId),
        },
    });
    const createTrial = useCreateTrialMutation();
    const updateTrial = useUpdateTrialMutation();

    const persistTrial = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let newTrials = state.trials;
        const id = e.target.getAttribute('data-id');
        if (id === null) {
            return;
        }
        newTrials[id] = e.target.value === '1' ? true : false;

        // if the trial has already been created, update its values
        if (state.trialId) {
            const response = await updateTrial({
                variables: {
                    data: {
                        id: state.trialId,
                        trialData: newTrials,
                    },
                },
            }).catch((err) => {
                /**
                 * @todo need to add better error handling (like undo edit, and probably a popup error message)
                 */
                console.log(err);
            });

            console.log(response);

            return;
        }

        const response = await createTrial({
            variables: {
                data: {
                    goalId: parseInt(goalId),
                    trialData: newTrials,
                },
            },
        }).catch((err) => {
            /**
             * @todo need to add better error handling (like undo edit, and probably a popup error message)
             */
            console.log(err);
        });

        if (!response) {
            console.log('response not valid');
            return;
        }

        const responseData = response.data;
        if (typeof responseData === 'undefined') {
            console.log('responseData is undefined');
            return;
        }

        // Dispatches an event to set the newly create trial id to the state's trialId so a updateTrial request is triggered next time
        // a trial on this goal is updated
        dispatch({
            type: 'trialCreated',
            trialId: parseInt(responseData.createTrial.id),
        });
    };

    const handleTrialRadioButtonChange = React.useCallback(
        async (e) => {
            e.persist();
            dispatch({
                type: 'change',
                element: e,
            });
            persistTrial(e);
        },
        [state],
    );

    if (loading) {
        return <div>loading...</div>;
    }

    if (errors) {
        return <div>Error Loading the Goal Trials. Try refreshing the page.</div>;
    }

    if (!loading && !state.trialsLoaded) {
        if (data!.currentTrial) {
            dispatch({
                type: 'loadTrialValues',
                trialValues: data!.currentTrial.trialData,
                trialId: parseInt(data!.currentTrial.id),
            });
        } else {
            dispatch({
                type: 'loadNoTrialValues',
            });
        }
    }

    return (
        <div>
            {[...Array(trialCount)].map((e, i) => (
                <div key={i}>
                    <h4>{`Trial ${i + 1}`}</h4>
                    <RadioGroup role="group" aria-label={`Trial Result ${i + 1}`}>
                        <RadioLabel>
                            <LabelText isLabelVisible={false}>{`Trial ${i + 1} No`}</LabelText>
                            <RadioInput
                                type="radio"
                                checked={state.trials[i] === false}
                                value="0"
                                data-id={i}
                                name={`trial_${i}`}
                                onChange={handleTrialRadioButtonChange}
                                className={state.trials[i] === false ? 'active' : ''}
                            />
                            <RadioIconNo>X</RadioIconNo>
                        </RadioLabel>
                        <RadioLabel>
                            <LabelText isLabelVisible={false}>{`Trial ${i + 1} Yes`}</LabelText>
                            <RadioInput
                                type="radio"
                                checked={state.trials[i] === true}
                                value="1"
                                data-id={i}
                                name={`trial_${i}`}
                                onChange={handleTrialRadioButtonChange}
                                className={state.trials[i] === true ? 'active' : ''}
                            />
                            <RadioIconYes>✓</RadioIconYes>
                        </RadioLabel>
                    </RadioGroup>
                </div>
            ))}
        </div>
    );
};

export default TrialForm;
