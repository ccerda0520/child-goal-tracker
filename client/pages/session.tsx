import { DateTime } from 'luxon';
import { withRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { isArray } from 'util';
import GoalList from '../components/goals/GoalList';
import Layout from '../components/Layout';
import SessionSidebar from '../components/session/SessionSidebar';
import Spinner from '../components/Spinner';
import { withAuth } from '../components/withAuth';
import { ActiveGoalProvider } from '../context/ActiveGoalContext';
import { StudentProvider } from '../context/StudentContext';
import { useUser } from '../context/UserContext';
import { useIncompleteGoalsQuery } from '../generated/apolloComponents';
const SessionWrapper = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;

const Session = withRouter((props) => {
    const user = useUser();
    const [initialLoading, setInitialLoading] = React.useState(true);
    const today = React.useMemo(() => {
        const today = DateTime.local().setZone(user!.timeZone);
        const month = today.monthLong;
        const day = today.day;

        return {
            month,
            day,
        };
    }, []);

    const [goals, setGoals] = React.useState();

    const queryArgs = props.router!.query;
    if (!queryArgs || !queryArgs.id) {
        return <div>No student specified</div>;
    }

    const queryArgsId: string = isArray(queryArgs.id) ? queryArgs.id[0] : queryArgs.id;
    const studentId: number = parseInt(queryArgsId);

    // check if student ID is inside list of students assigned to user
    if (!user!.students || !user!.students.length) {
        return <Layout>No Students Assigned to User</Layout>;
    }

    const student = user!.students.find((student) => parseInt(student.id) === studentId);
    if (typeof student === 'undefined') {
        return <Layout>No student assigned to this user with this id.</Layout>;
    }

    const { data, loading, errors } = useIncompleteGoalsQuery({
        suspend: false,
        fetchPolicy: 'cache-and-network',
        variables: {
            studentId: studentId,
        },
    });

    if (loading) {
        return (
            <Layout>
                <Spinner />
            </Layout>
        );
    }

    if (!loading && initialLoading && !errors) {
        setInitialLoading(false);
        setGoals(data!.goals);
    }

    if (errors) {
        return (
            <Layout>
                <div>Error loading the data, please trying refresing the page</div>
            </Layout>
        );
    }

    return (
        <Layout title="Session">
            <StudentProvider student={student}>
                <ActiveGoalProvider>
                    <h1>
                        {student.firstName}'s Session ({today.month} {today.day})
                    </h1>
                    <SessionWrapper>
                        <GoalList goals={goals} />
                        <SessionSidebar />
                    </SessionWrapper>
                </ActiveGoalProvider>
            </StudentProvider>
        </Layout>
    );
});

export default withAuth(Session);
