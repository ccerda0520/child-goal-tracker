import React from 'react';
import styled from 'styled-components';
import IGoal from '../../types/Goal';
import { darkBlue, lightBlue } from '../presentational/variables';
import Goal from './Goal';
import NewGoalForm from './NewGoalForm';

const GoalGroupContainer = styled('div')`
    padding: 25px;
    background: white;
    border-radius: 10px;
    display: inline-block;
    width: 100%;
    box-shadow: 0 1px 3px 0 rgba(31, 36, 38, 0.1);
`;
const H2 = styled('h2')`
    font-size: 19px;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 0;
`;

const GoalContainer = styled('ul')`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const GoalListItem = styled('li')`
    padding: 0;
    border-top: 2px solid #337abb;
    font-size: 17px;
    &:last-of-type {
        padding-bottom: 0;
    }
`;

const NewGoalToggleButtonPlus = styled('div')`
    color: ${lightBlue};
    font-weight: 700;
    font-size: 24px;
    background: white;
    border: 2px solid ${lightBlue};
    line-height: 1;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 30px;
`;

const NewGoalToggleButtonLabel = styled('h3')`
    color: ${darkBlue};
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 0;
    margin-left: 10px;
`;

const NewGoalToggleButton = styled('button')`
    background: transparent;
    border: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
    &:hover,
    &:focus {
        ${NewGoalToggleButtonPlus} {
            background: ${lightBlue};
            color: white;
        }
    }
`;

interface Props {
    title: string;
    goals: IGoal[];
    category: string;
}

const GoalGroup: React.FC<Props> = ({ title, goals, category }) => {
    const [showNewGoalForm, setShowNewGoalForm] = React.useState(false);
    const [groupGoals, setGroupGoals] = React.useState(goals);
    const toggleShowNewGoalForm = React.useCallback(() => setShowNewGoalForm(!showNewGoalForm), [showNewGoalForm]);
    const handleCancelNewGoal = React.useCallback(() => setShowNewGoalForm(false), []);
    const handleSubmitCallBack = React.useCallback(
        (newGoal: IGoal) => {
            setGroupGoals([...groupGoals, newGoal]);
            setShowNewGoalForm(false);
        },
        [groupGoals],
    );
    return (
        <GoalGroupContainer>
            <H2>{title}</H2>
            <GoalContainer>
                {groupGoals.map((goal) => {
                    return (
                        <GoalListItem key={goal.id}>
                            <Goal goal={goal} />
                        </GoalListItem>
                    );
                })}
                {groupGoals.length < 10 && !showNewGoalForm && (
                    <GoalListItem>
                        <NewGoalToggleButton onClick={toggleShowNewGoalForm} aria-label="Add New Goal">
                            <NewGoalToggleButtonPlus>+</NewGoalToggleButtonPlus>
                            <NewGoalToggleButtonLabel>Add New Goal</NewGoalToggleButtonLabel>
                        </NewGoalToggleButton>
                    </GoalListItem>
                )}
                {groupGoals.length < 10 && showNewGoalForm && (
                    <NewGoalForm onCancel={handleCancelNewGoal} category={category} onSubmitCallback={handleSubmitCallBack} />
                )}
            </GoalContainer>
        </GoalGroupContainer>
    );
};

export default GoalGroup;
