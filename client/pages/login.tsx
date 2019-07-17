import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import GlobalStyle from '../components/presentational/GlobalStyle';
const RegisterForm = dynamic(() => import('../components/RegisterForm') as any);
const ForgotPasswordForm = dynamic(() => import('../components/ForgotPasswordForm') as any);

const Wrapper = styled('div')`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
`;

const PageWrapper = styled('div')`
    width: 450px;
    max-width: 100%;
    margin: 40px auto 0 auto;
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

const Logo = styled('img')`
    width: 150px;
`;

export default () => {
    const [currentForm, setCurrentForm] = React.useState('login');
    return (
        <Wrapper>
            <Head>
                <title>Login</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <GlobalStyle />
            <Logo src="/static/images/logo.png" alt="Site Logo" />
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
        </Wrapper>
    );
};
