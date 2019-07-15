import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import SettingsForm from '../components/SettingsForm';

const PageWrapper = styled('div')`
    display: inline-block;
    width: auto;
    background: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px 0 rgba(31, 36, 38, 0.1);
`;
const FormTitle = styled('h1')`
    color: white;
    margin: 0;
    background: #337abb;
    padding: 15px 25px;
    margin-bottom: 35px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    margin-bottom: 15px;
`;

export default () => {
    return (
        <Layout title="Settings">
            <PageWrapper>
                <FormTitle>Settings</FormTitle>
                <SettingsForm />
            </PageWrapper>
        </Layout>
    );
};
