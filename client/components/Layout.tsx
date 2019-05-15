import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import GlobalStyle from './presentational/GlobalStyle';

type Props = {
    title?: string;
};

const Layout: React.FunctionComponent<Props> = ({ children, title = 'This is the default title' }) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <GlobalStyle />
        <header>
            <nav>
                <Link href="/">
                    <a>Home</a>
                </Link>{' '}
                |{' '}
                <Link href="/list-class">
                    <a>List Example</a>
                </Link>{' '}
                |{' '}
                <Link href="/list-fc">
                    <a>List Example (as Functional Component)</a>
                </Link>{' '}
                |{' '}
                <Link href="/about">
                    <a>About</a>
                </Link>{' '}
                |{' '}
            </nav>
        </header>
        {children}
        <footer />
    </div>
);

export default Layout;