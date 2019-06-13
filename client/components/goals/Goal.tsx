import React from 'react';
import styled from 'styled-components';
import { useActiveGoalDispatch, useActiveGoalState } from '../../context/ActiveGoalContext';
import IGoal from '../../types/Goal';
import { lightBlue } from '../presentational/variables';
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
    padding: 15px 0;
    position: relative;
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
            transform: scale(1.1);
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

const Goal: React.FC<Props> = ({ goal }) => {
    const activeGoal = useActiveGoalState();
    const setActiveGoal: any = useActiveGoalDispatch();
    const handleClick = React.useCallback(() => {
        const newGoal = goal;
        setActiveGoal({
            type: 'update',
            goal: newGoal,
        });
    }, [activeGoal]);

    return (
        <GoalNameButton className={activeGoal.id === goal.id ? 'active' : ''} onClick={handleClick}>
            <span>{goal.name}</span>
        </GoalNameButton>
    );
};

export default Goal;
