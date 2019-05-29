import React from 'react';
import styled from 'styled-components';
import GoalGroup from './GoalGroup';

interface Props {
    goals: Goal[];
}
type Goal = {
    id: number;
    name: string;
    description: string;
    category: string;
};

const GoalListWrapper = styled('div')`
    div {
        &:not(:last-of-type) {
            margin-bottom: 25px;
        }
    }
`;

const GoalList: React.FC<Props> = ({ goals }) => {
    const languageGoals = React.useMemo(() => {
        return goals.filter((goal) => goal.category === 'language');
    }, [goals]);
    const selfHelpGoals = React.useMemo(() => {
        return goals.filter((goal) => goal.category === 'self-help');
    }, [goals]);
    const ssbGoals = React.useMemo(() => {
        return goals.filter((goal) => goal.category === 'ssb');
    }, [goals]);

    return (
        <GoalListWrapper>
            <h1>Goals</h1>
            <GoalGroup goals={languageGoals} title="Language" category="language" />
            <GoalGroup goals={selfHelpGoals} title="Self Help" category="self-help" />
            <GoalGroup goals={ssbGoals} title="SSB" category="ssb" />
            <GoalGroup goals={ssbGoals} title="SSB" category="ssb" />
            <GoalGroup goals={ssbGoals} title="SSB" category="ssb" />
        </GoalListWrapper>
    );
};

export default GoalList;
