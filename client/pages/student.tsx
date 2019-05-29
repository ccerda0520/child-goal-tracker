import { withRouter } from 'next/router';
import React from 'react';
import { isArray } from 'util';
import GoalList from '../components/goals/GoalList';
import Layout from '../components/Layout';
import { StudentProvider } from '../context/StudentContext';
import { useUser } from '../context/UserContext';
import { useGoalsQuery } from '../generated/apolloComponents';

const Student = withRouter((props) => {
    const [initialLoading, setInitialLoading] = React.useState(true);
    const [goals, setGoals] = React.useState();

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

    const { data, loading, errors } = useGoalsQuery({
        suspend: false,
        fetchPolicy: 'cache-and-network',
        variables: {
            studentId: studentId,
        },
    });

    if (loading) {
        return (
            <Layout>
                <div>loading...</div>{' '}
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
        <Layout title="Student Dashboard">
            <StudentProvider student={student}>
                <GoalList goals={goals} />
            </StudentProvider>
        </Layout>
    );
});

export default Student;
