import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { isArray } from 'util';
import GoalsDropdown from '../components/databook/GoalsDropdown';
import TrialsDateRangePicker from '../components/databook/TrialsDateRangePicker';
//import TrialsLineChart from '../components/databook/TrialsLineChart';
import Layout from '../components/Layout';
import { withAuth } from '../components/withAuth';
import { useUser } from '../context/UserContext';
const TrialsLineChart = dynamic(() => import('../components/databook/TrialsLineChart'));

interface State {
    from: Date | undefined;
    to: Date | undefined;
    showDatePicker: boolean;
    activeGoalId: number | undefined;
}

const initialState: State = {
    from: undefined,
    to: undefined,
    showDatePicker: false,
    activeGoalId: undefined,
};

const dataBookReducer = (state: State, action: any) => {
    switch (action.type) {
        case 'toggleShowDatePicker': {
            return {
                ...state,
                showDatePicker: !state.showDatePicker,
            };
        }
        case 'changeRange':
            return {
                ...state,
                from: action.from,
                to: action.to,
            };
        case 'resetRange':
            return {
                ...state,
                from: undefined,
                to: undefined,
            };
        case 'changeGoalId':
            return {
                ...state,
                activeGoalId: action.activeGoalId,
            };
        default:
            throw Error('No valid action.type was passed to dateBookReducer');
    }
};

const Databook = withRouter((props) => {
    const [state, dispatch] = React.useReducer(dataBookReducer, initialState);

    const handleDayClick = React.useCallback(
        (day) => {
            const range = DayPicker.DateUtils.addDayToRange(day, { from: state.from, to: state.to });
            dispatch({
                type: 'changeRange',
                from: range.from,
                to: range.to,
            });
        },
        [state],
    );
    const handleResetClick = React.useCallback(() => {
        dispatch({
            type: 'resetRange',
        });
    }, []);

    const handleGoalsDropdownChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: 'changeGoalId',
                activeGoalId: parseInt(e.target.value),
            });
        },
        [state.activeGoalId],
    );

    const queryArgs = props.router!.query;
    if (!queryArgs || !queryArgs.id) {
        return <div>No student specified</div>;
    }

    const queryArgsId: string = isArray(queryArgs.id) ? queryArgs.id[0] : queryArgs.id;
    const studentId: number = parseInt(queryArgsId);

    // check if student ID is inside list of students assigned to user
    const user = useUser();
    if (!user!.students || !user!.students.length) {
        return <Layout>No Students Assigned to User</Layout>;
    }

    const student = user!.students.find((student) => parseInt(student.id) === studentId);
    if (typeof student === 'undefined') {
        return <Layout>No student assigned to this user with this id.</Layout>;
    }

    return (
        <Layout title="Student Databook">
            <h1>{student.firstName}'s Databook</h1>
            <GoalsDropdown studentId={parseInt(student.id)} goalId={state.activeGoalId} onChange={handleGoalsDropdownChange} />
            <TrialsDateRangePicker from={state.from} to={state.to} onDayClick={handleDayClick} onResetClick={handleResetClick} />

            {state.from && state.to && state.activeGoalId && <TrialsLineChart from={state.from} to={state.to} goalId={state.activeGoalId} />}
        </Layout>
    );
});

export default withAuth(Databook);
