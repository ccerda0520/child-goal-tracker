import React from 'react';
import styled from 'styled-components';
import { darkBlue, lightBlue } from '../presentational/variables';
import NewGoalForm from './NewGoalForm';

interface Props {
    title: string;
    goals: Goal[];
    category: string;
}
type Goal = {
    id: number;
    name: string;
    description: string;
    category: string;
};
const GoalGroupContainer = styled('div')`
    padding: 25px;
    background: white;
    border-radius: 10px;
    display: inline-block;
    width: 66%;
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
    padding: 15px 0;
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
    &:hover,
    &:focus {
        ${NewGoalToggleButtonPlus} {
            background: ${lightBlue};
            color: white;
        }
    }
`;

const GoalGroup: React.FC<Props> = ({ title, goals }) => {
    const [showNewGoalForm, setShowNewGoalForm] = React.useState(false);
    const toggleShowNewGoalForm = React.useCallback(() => setShowNewGoalForm(!showNewGoalForm), [showNewGoalForm]);
    const handleCancelNewGoal = React.useCallback(() => setShowNewGoalForm(false), []);
    return (
        <GoalGroupContainer>
            <H2>{title}</H2>
            <GoalContainer>
                {goals.map((goal) => {
                    return <GoalListItem key={goal.id}>{goal.name}</GoalListItem>;
                })}
                {!showNewGoalForm && (
                    <GoalListItem>
                        <NewGoalToggleButton onClick={toggleShowNewGoalForm} aria-label="Add New Goal">
                            <NewGoalToggleButtonPlus>+</NewGoalToggleButtonPlus>
                            <NewGoalToggleButtonLabel>Add New Goal</NewGoalToggleButtonLabel>
                        </NewGoalToggleButton>
                    </GoalListItem>
                )}
                {showNewGoalForm &&
                    <NewGoalForm onCancel={handleCancelNewGoal}/>
                }
            </GoalContainer>
        </GoalGroupContainer>
    );
};

export default GoalGroup;
