import * as React from 'react';
import Layout from '../components/Layout';
import Students from '../components/Students';
import { withAuth } from '../components/withAuth';

const StudentsPage: React.FunctionComponent = () => {
    return (
        <Layout title="Students Dashboard">
            <h1>Students</h1>
            <Students />
        </Layout>
    );
};

export default withAuth(StudentsPage);
