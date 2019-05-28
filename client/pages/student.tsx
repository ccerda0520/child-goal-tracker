import { withRouter } from 'next/router';
import React from 'react';
import { isArray } from 'util';
import GoalList from '../components/goals/GoalList';
import Layout from '../components/Layout';
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
        <Layout>
            <GoalList goals={goals} />
        </Layout>
    );
});

export default Student;
