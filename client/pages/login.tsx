import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';
const RegisterForm = dynamic(() => import('../components/RegisterForm') as any);

const PageWrapper = styled('div')`
    width: 450px;
    max-width: 100%;
    margin: auto;
    border-radius: 5px;
    margin-top: 25px;
    background: white;
    overflow: hidden;
`;
const ALink = styled('a')`
    display: block;
    color: #337abb;
    padding: 0 25px;
    margin-bottom: 10px;
`;
const ButtonLink = styled('button')`
    display: block;
    color: #337abb;
    outline: none;
    border: 0;
    background: none;
    padding: 0 25px;
    margin-bottom: 25px;
`;
export default () => {
    const [showRegisterForm, setShowRegisterForm] = React.useState(false);
    return (
        <Layout title="Login">
            <PageWrapper>
                <LoginForm />
                <Link href="/">
                    <ALink>Forgot Password?</ALink>
                </Link>
                <ButtonLink type="button" onClick={() => setShowRegisterForm(!showRegisterForm)}>
                    Register Now
                </ButtonLink>
                {showRegisterForm && 
                    (
                        <div>
                            <h2>Register</h2>
                            <RegisterForm />
                        </div>
                    )
                }
            </PageWrapper>
        </Layout>
    );
};
