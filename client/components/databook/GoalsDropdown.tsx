import React from 'react';
import { useGoalsQuery } from '../../generated/apolloComponents';
import Spinner from '../Spinner';

interface Props {
    studentId: number;
    goalId: number | undefined;
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

    return (
        <label aria-label={'Please select a goal:'}>
            <select value={goalId ? goalId : 'none'} onChange={onChange}>
                <option value="none" disabled>
                    Please Select a goal:
                </option>
                {data!.goals.map((goal) => (
                    <option key={goal.id} value={goal.id}>
                        {goal.name}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default GoalsDropdown;
