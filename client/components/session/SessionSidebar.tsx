import React from 'react';
import styled from 'styled-components';
import { useActiveGoalState } from '../../context/ActiveGoalContext';
import TrialForm from './TrialForm';

export const SessionSidebarWrapper = styled('div')`
    width: calc(34% - 50px);
    margin-left: 50px;
    padding: 25px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px 0 rgba(31, 36, 38, 0.1);
    position: sticky;
    position: -webkit-sticky;
    top: 100px;
`;

const H2 = styled('h2')`
    font-size: 19px;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 0;
`;

const SessionSidebar: React.FC<{}> = () => {
    const activeGoal = useActiveGoalState();

    if (!Object.keys(activeGoal).length) {
        return null;
    }

    return (
        <SessionSidebarWrapper>
            <H2>Session Details</H2>
            <div>
                <TrialForm key={activeGoal.id} trialCount={activeGoal.trialsPerDay} goalId={activeGoal.id} />
            </div>
        </SessionSidebarWrapper>
    );
};

export default SessionSidebar;
