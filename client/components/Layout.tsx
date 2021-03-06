import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import styled from 'styled-components';
import { LogOut } from 'styled-icons/boxicons-regular/LogOut';
import { Face } from 'styled-icons/material/Face';
import { Gear } from 'styled-icons/octicons/Gear';
import { MeComponent } from '../generated/apolloComponents';
import { LabelText } from './presentational/CommonStyles';
import GlobalStyle from './presentational/GlobalStyle';
import { fontGray, sidebarGray } from './presentational/variables';

type Props = {
    title?: string;
};

const Header = styled('header')``;

const LogoImg = styled('img')`
    height: 35px;
`;
const SideBar = styled('nav')`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 20px;
`;
const SideBarWrapper = styled('div')`
    position: fixed;
    top: 0ff;
    left: 0;
    width: 65px;
    padding: 15px;
    height: 100%;
    background: white;
    box-shadow: 0 1px 3px 0 rgba(31, 36, 38, 0.1);
    z-index: 100;
`;
const MainWrapper = styled('main')`
    padding: 35px 50px 50px 50px;
    margin-top: 0;
    margin-left: 60px;
    width: 1170px;
    max-width: calc(100% - 60px);
`;

const StudentIcon = styled(Face)`
    width: 30px;
`;
const LogoutIcon = styled(LogOut)`
    margin-left: -3px;
    width: 31px;
`;
const SettingsIcon = styled(Gear)`
    width: 27px;
    margin-left: 1px;
`;

const LinkWrapper = styled('a')`
    position: relative;
    display: inline-block;
    &:not(:last-of-type) {
        margin-bottom: 15px;
    }
    &:hover,
    &:focus {
        ${LabelText} {
            height: auto;
            clip: initial;
            clip-path: initial;
            position: absolute;
            overflow: initial;
            width: auto;
            margin: 0;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            background: white;
            box-shadow: 0 1px 3px 0 rgba(31, 36, 38, 0.1);
            margin-left: 5px;
            color: ${fontGray};
            padding: 2px 5px;
            &:after {
                display: inline-block;
                content: '';
                width: 0px;
                height: 0px;
                border-top: 5px solid transparent;
                border-bottom: 5px solid transparent;
                border-right: 5px solid white;
                position: absolute;
                left: -5px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
`;

const IconLinks = styled('div')`
    margin-top: 15px;
    border-top: 1px solid ${sidebarGray};
    padding-top: 15px;
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
            <SideBarWrapper>
                <SideBar>
                    <MeComponent>
                        {({ data, loading }) => {
                            if (!data || loading || !data.me) {
                                return (
                                    <div>
                                        <Link href="/">
                                            <a href="/">
                                                <LabelText isLabelVisible={false}>Logo Linking to Home Page</LabelText>
                                                <LogoImg src="/static/images/logo.png" alt="Site Logo" />
                                            </a>
                                        </Link>
                                    </div>
                                );
                            }

                            return (
                                <div>
                                    <Link href="/" prefetch>
                                        <a href="/">
                                            <LabelText isLabelVisible={false}>Logo Linking to Home Page</LabelText>
                                            <LogoImg src="/static/images/logo.png" alt="Site Logo" />
                                        </a>
                                    </Link>
                                    <IconLinks>
                                        <Link href="/students" prefetch>
                                            <LinkWrapper href="/students">
                                                <StudentIcon />
                                                <LabelText isLabelVisible={false}>Students</LabelText>
                                            </LinkWrapper>
                                        </Link>
                                        <Link href="/settings" prefetch>
                                            <LinkWrapper href="/settings">
                                                <SettingsIcon />
                                                <LabelText isLabelVisible={false}>Settings</LabelText>
                                            </LinkWrapper>
                                        </Link>
                                        <Link href="/logout">
                                            <LinkWrapper href="/logout">
                                                <LogoutIcon />
                                                <LabelText isLabelVisible={false}>Logout</LabelText>
                                            </LinkWrapper>
                                        </Link>
                                    </IconLinks>
                                </div>
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
