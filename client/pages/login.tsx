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
    margin: 0 auto 0 50px;
    border-radius: 5px;
    margin-top: 50px;
    background: white;
    overflow: hidden;
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
                {currentForm === 'register' && (
                    <div>
                        <h2>Register</h2>
                        <RegisterForm />
                    </div>
                )}
                {currentForm === 'forgot' && (
                    <div>
                        <h2>Forgot Password</h2>
                        <ForgotPasswordForm />
                    </div>
                )}
                <ButtonLinksWrapper>
                    {currentForm !== 'login' && (
                        <ButtonLink type="button" onClick={() => setCurrentForm('login')}>
                            Login
                        </ButtonLink>
                    )}
                    {currentForm !== 'forgot' && (
                        <ButtonLink type="button" onClick={() => setCurrentForm('forgot')}>
                            Forgot Password?
                        </ButtonLink>
                    )}
                    {currentForm !== 'register' && (
                        <ButtonLink type="button" onClick={() => setCurrentForm('register')}>
                            Register Now
                        </ButtonLink>
                    )}
                </ButtonLinksWrapper>
            </PageWrapper>
        </Layout>
    );
};
