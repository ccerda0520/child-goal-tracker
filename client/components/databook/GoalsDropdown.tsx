import { Menu, MenuButton, MenuItem, MenuList } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import React from 'react';
import styled from 'styled-components';
import { useGoalsQuery } from '../../generated/apolloComponents';
import { borderGray } from '../presentational/variables';
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
    console.log(data!.goals);
    const activeGoal = goalId ? data!.goals.find((e) => e.id === goalId) : null;
    return (
        <label aria-label={'Please select a goal:'}>
            <MenuWrapper>
                <Menu>
                    <MenuButton>
                        {activeGoal ? activeGoal.name : 'Please Select a goal:'}
                        <span aria-hidden>▾</span>
                    </MenuButton>

                    <MenuList style={{ width: '280px' }}>
                        {data!.goals.map((goal) => (
                            <MenuItem
                                key={goal.id}
                                onSelect={() => {
                                    onChange(goal.id);
                                }}
                            >
                                <span>{goal.name}</span>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </MenuWrapper>
        </label>
    );
};

export default GoalsDropdown;
