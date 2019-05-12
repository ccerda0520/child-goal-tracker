import React from 'react';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';

export default () => {
    return (
        <Layout title="Login">
            <LoginForm />
            <RegisterForm />
        </Layout>
    );
};
