import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { AuthProvider } from '../context/AuthContext';
import { UserProvider } from '../context/UserContext';
import withApollo from '../lib/withApollo';
import '../static/css/app.css';

class MyApp extends App<any> {
    render() {
        const { Component, pageProps, apolloClient } = this.props;
        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <ApolloHooksProvider client={apolloClient}>
                        <AuthProvider>
                            <UserProvider>
                                <Component {...pageProps} />
                            </UserProvider>
                        </AuthProvider>
                    </ApolloHooksProvider>
                </ApolloProvider>
            </Container>
        );
    }
}

export default withApollo(MyApp);
