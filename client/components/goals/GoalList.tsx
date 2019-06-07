import React from 'react';
import styled from 'styled-components';
import IGoal from '../../types/Goal';
import GoalGroup from './GoalGroup';

interface Props {
    goals: IGoal[];
}

export const GoalListWrapper = styled('div')`
    width: 66%;
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
    const socialSkillsGoals = React.useMemo(() => {
        return goals.filter((goal) => goal.category === 'social-skills');
    }, [goals]);
    const ageAppropriateGoals = React.useMemo(() => {
        return goals.filter((goal) => goal.category === 'age-appropriate');
    }, [goals]);

    return (
        <GoalListWrapper>
            <GoalGroup goals={languageGoals} title="Language" category="language" />
            <GoalGroup goals={selfHelpGoals} title="Self Help" category="self-help" />
            <GoalGroup goals={ssbGoals} title="SSB" category="ssb" />
            <GoalGroup goals={socialSkillsGoals} title="Social Skills" category="social-skills" />
            <GoalGroup goals={ageAppropriateGoals} title="Age Appropriate" category="age-appropriate" />
        </GoalListWrapper>
    );
};

export default GoalList;
