import * as React from 'react';
import Layout from '../components/Layout';
import Students from '../components/Students';
import { withAuth } from '../components/withAuth';

const IndexPage: React.FunctionComponent = () => {
    return (
        <Layout title="Home Dashboard">
            <h1>Students</h1>
            <Students />
        </Layout>
    );
};

export default withAuth(IndexPage);
