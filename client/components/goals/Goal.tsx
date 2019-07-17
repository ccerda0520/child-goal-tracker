import React from 'react';
import styled from 'styled-components';
import { Pencil } from 'styled-icons/boxicons-solid/Pencil';
import { useActiveGoalDispatch, useActiveGoalState } from '../../context/ActiveGoalContext';
import { useUpdateGoalMutation } from '../../generated/apolloComponents';
import IGoal from '../../types/Goal';
import { darkBlue, lightBlue } from '../presentational/variables';
interface Props {
    goal: IGoal;
}

const GoalNameButton = styled('button')`
    line-height: 1.1;
    display: flex;
    width: 100%;
    margin: 0;
    background: white;
    border: 0;
    padding: 15px 25px;
    position: relative;
    min-height: 47px;
    &:before {
        display: block;
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        transition: 0.3s all ease-in-out;
    }
    &:hover,
    &:focus,
    &.active {
        &:before {
            transform: scale(1.05);
            box-shadow: 0 0.4rem 1.6rem 0 rgba(31, 36, 38, 0.16);
            background: white;
            outline-style: solid;
            outline-width: 2px;
            outline-color: ${lightBlue};
        }
    }
    span {
        font-size: 16px;
        z-index: 2;
    }
`;

const EditGoalNameButton = styled('div')`
    color: ${lightBlue};
    z-index: 3;
    padding: 0;
    background: none;
    border: none;
    margin-left: auto;
    width: auto;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    transition: 0.3s all ease-in-out;
    &:hover,
    &:focus {
        color: ${darkBlue};
    }
`;

const PencilIcon = styled(Pencil)`
    width: 25px;
`;

const GoalNameInput = styled('input')`
    position: absolute;
    left: 15px;
    top: 8px;
    z-index: 3;
    font-size: 16px;
    line-height: 1;
    padding: 5px 15px;
    width: 90%;
    border: 1px solid ${darkBlue};
`;

const Goal: React.FC<Props> = ({ goal }) => {
    const activeGoal = useActiveGoalState();
    const setActiveGoal: any = useActiveGoalDispatch();
    const [editGoal, setEditGoal] = React.useState<boolean>(false);
    const [goalName, setGoalName] = React.useState<string>(goal.name);
    const goalNameInputRef = React.useRef<HTMLInputElement | null>();
    const updateGoal = useUpdateGoalMutation();
    const handleClick = React.useCallback(() => {
        // Reset Goal state if this goal is is no longer active
        if (activeGoal.id !== goal.id) {
            setEditGoal(false);
        }

        const newGoal = goal;
        setActiveGoal({
            type: 'update',
            goal: newGoal,
        });
    }, [activeGoal]);

    React.useEffect(() => {
        if (activeGoal.id !== goal.id) {
            setEditGoal(false);
        }
    }, [activeGoal]);

    React.useEffect(() => {
        if (editGoal && goalNameInputRef.current) {
            goalNameInputRef.current.focus();
        }
    }, [editGoal]);

    return (
        <GoalNameButton className={activeGoal.id === goal.id ? 'active' : ''} onClick={handleClick}>
            {editGoal === false && <span>{goalName}</span>}
            {activeGoal.id === goal.id && editGoal === false && (
                <EditGoalNameButton
                    role="button"
                    aria-pressed="false"
                    aria-label="Edit Goal Name"
                    tabIndex={0}
                    onClick={() => setEditGoal(true)}
                    onKeyPress={(e) => {
                        e.persist();
                        e.preventDefault();
                        // handle "button click" when Enter or Space key is pressed
                        if ([13, 32].includes(e.charCode)) {
                            setEditGoal(true);
                        }
                    }}
                >
                    <PencilIcon />
                </EditGoalNameButton>
            )}
            {activeGoal.id === goal.id && editGoal === true && (
                <GoalNameInput
                    type="text"
                    defaultValue={goalName}
                    onKeyDown={async (e) => {
                        e.persist();
                        // handle "button click" when Enter key is pressed
                        if ([13].includes(e.keyCode)) {
                            setGoalName(e.currentTarget.value);
                            setEditGoal(false);
                            const response = await updateGoal({
                                variables: {
                                    data: {
                                        id: parseInt(goal.id),
                                        name: e.currentTarget.value,
                                    },
                                },
                            });
                        }
                        // handle "button cancel" when Esc key is pressed
                        else if ([27].includes(e.keyCode)) {
                            setEditGoal(false);
                        }
                    }}
                    ref={(input) => {
                        goalNameInputRef.current = input;
                    }}
                />
            )}
        </GoalNameButton>
    );
};

export default Goal;
