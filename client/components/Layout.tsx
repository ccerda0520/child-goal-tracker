import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';
import { MeComponent } from '../generated/apolloComponents';
import { LabelText } from './presentational/CommonStyles';
import GlobalStyle from './presentational/GlobalStyle';

type Props = {
    title?: string;
};

const Header = styled('header')`
    height: 70px;
`;

const LogoImg = styled('img')`
    height: 35px;
`;
const TopBar = styled('nav')`
    width: 1270px;
    padding: 15px;
    margin: 0 auto 0 0;
    max-width: 100%;
    height: 70px;
`;
const TopBarWrapper = styled('div')`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #1e3054;
    z-index: 100;
`;
const SideBar = styled('nav')``;
const SideBarWrapper = styled('div')`
    position: fixed;
    top: 70px;
    left: 0;
    width: 75px;
    padding: 15px;
    height: 100%;
    background: white;
    box-shadow: 0 1px 3px 0 rgba(31, 36, 38, 0.1);
    z-index: 100;
`;
const MainWrapper = styled('main')`
    padding: 35px 50px 50px 50px;
    margin-top: 0;
    margin-left: 75px;
    width: 1170px;
    max-width: 100%;
`;

const Layout: React.FunctionComponent<Props> = ({ children, title = 'This is the default title' }) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <GlobalStyle />
        <Header>
            <TopBarWrapper>
                <TopBar>
                    <Link href="/">
                        <a>
                            <LabelText isLabelVisible={false}>Logo Linking to Home Page</LabelText>
                            <LogoImg src="/static/images/logo.png" alt="Site Logo" />
                        </a>
                    </Link>
                </TopBar>
            </TopBarWrapper>
            <SideBarWrapper>
                <SideBar>
                    <Link href="/">
                        <a>Home</a>
                    </Link>{' '}
                    |{' '}
                    <Link href="/about">
                        <a>About</a>
                    </Link>{' '}
                    |{' '}
                    <Link href="/login">
                        <a>Login</a>
                    </Link>{' '}
                    |{' '}
                    <MeComponent>
                        {({ data, loading }) => {
                            if (!data || loading || !data.me) {
                                return null;
                            }

                            return (
                                <Link href="/logout">
                                    <a>Logout</a>
                                </Link>
                            );
                        }}
                    </MeComponent>
                </SideBar>
            </SideBarWrapper>
        </Header>
        <MainWrapper>{children}</MainWrapper>
        <footer />
    </div>
);

export default Layout;
