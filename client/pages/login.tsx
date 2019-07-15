import dynamic from 'next/dynamic';
import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
const RegisterForm = dynamic(() => import('../components/RegisterForm') as any);
const ForgotPasswordForm = dynamic(() => import('../components/ForgotPasswordForm') as any);

const PageWrapper = styled('div')`
    width: 450px;
    max-width: 100%;
    margin: 0 auto 0 0;
    border-radius: 5px;
    background: white;
    overflow: hidden;
    box-shadow: 0 1px 3px 0 rgba(31, 36, 38, 0.1);
`;

const ButtonLink = styled('button')`
    display: block;
    color: #337abb;
    outline: none;
    border: 0;
    padding: 0;
    background: none;
    &:not(:last-of-type) {
        margin-bottom: 10px;
    }
`;
const ButtonLinksWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0 25px;
    margin-bottom: 25px;
`;

export default () => {
    const [currentForm, setCurrentForm] = React.useState('login');
    return (
        <Layout title="Login">
            <PageWrapper>
                {currentForm === 'login' && <LoginForm />}
                {currentForm === 'register' && <RegisterForm />}
                {currentForm === 'forgot' && <ForgotPasswordForm />}
                <ButtonLinksWrapper>
                    {currentForm !== 'login' && (
                        <ButtonLink type="button" onClick={() => setCurrentForm('login')}>
                            Login
                        </ButtonLink>
                    )}
                    {currentForm !== 'register' && (
                        <ButtonLink type="button" onClick={() => setCurrentForm('register')}>
                            Register Now
                        </ButtonLink>
                    )}
                    {currentForm !== 'forgot' && (
                        <ButtonLink type="button" onClick={() => setCurrentForm('forgot')}>
                            Forgot Password?
                        </ButtonLink>
                    )}
                </ButtonLinksWrapper>
            </PageWrapper>
        </Layout>
    );
};
