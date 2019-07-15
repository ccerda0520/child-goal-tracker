import { Menu, MenuButton, MenuItem, MenuList } from '@reach/menu-button';
import React from 'react';
import styled from 'styled-components';
import { useGoalsQuery } from '../../generated/apolloComponents';
import { borderGray, lightBlue } from '../presentational/variables';
import Spinner from '../Spinner';

const MenuWrapper = styled('div')`
    button {
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0.5em 1em;
        border-bottom: 1px solid ${borderGray};
        font-size: 15px;
        text-align: left;
        span {
            float: right;
        }
    }
`;

const GoalMenuList = styled(MenuList)`
    padding: 0;
    width: 280px;
    [data-reach-menu-item] {
        font-size: 15px;
        padding: 10px 15px;
    }
    [data-reach-menu-item][data-selected] {
        background: ${lightBlue};
    }
`;

interface Props {
    studentId: number;
    goalId: string | undefined;
    onChange: any;
}

const GoalsDropdown: React.FC<Props> = ({ studentId, goalId, onChange }) => {
    const { data, loading, errors } = useGoalsQuery({
        suspend: false,
        fetchPolicy: 'cache-and-network',
        variables: {
            studentId: studentId,
        },
    });

    if (loading) {
        return <Spinner />;
    }

    if (errors) {
        return <div>Issues loading goals. Please try refreshing the page.</div>;
    }

    if (!data!.goals) {
        return <div>No goals found for this student.</div>;
    }
    const activeGoal = goalId ? data!.goals.find((e) => e.id === goalId) : null;
    const sortedGoals = data!.goals.sort((a, b) => {
        if (a.category < b.category) {
            return -1;
        }
        if (a.category > b.category) {
            return 1;
        }
        return 0;
    });
    console.log(sortedGoals);
    return (
        <label aria-label={'Please select a goal:'}>
            <MenuWrapper>
                <Menu>
                    <MenuButton>
                        {activeGoal ? activeGoal.name : 'Please select a goal to track:'}
                        <span aria-hidden>▾</span>
                    </MenuButton>

                    <GoalMenuList>
                        {sortedGoals.map((goal) => (
                            <MenuItem
                                key={goal.id}
                                onSelect={() => {
                                    onChange(goal.id);
                                }}
                            >
                                <span>{goal.name}</span>
                            </MenuItem>
                        ))}
                    </GoalMenuList>
                </Menu>
            </MenuWrapper>
        </label>
    );
};

export default GoalsDropdown;
