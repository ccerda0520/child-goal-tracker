import React from 'react';
import { useAsync } from 'react-async';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import { meStudentsQuery } from '../graphql/user/query/meStudents';
import initApollo from '../lib/initApollo';

const AuthContext = React.createContext<any>(undefined);

const getUser = async () => {
    const apolloClient = initApollo(
        {},
        {
            getToken: () => '',
        },
    );
    const response = await apolloClient.query({
        query: meStudentsQuery,
    });
    if (!response || !response.data || !response.data.me) {
        return { user: null };
    }

    return {
        user: response.data.me,
    };
};

const removeUser = () => {
    user: undefined;
};

const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (typeof context === 'undefined') {
        throw new Error('useUser must be used within a AuthProvider');
    }
    return context;
};

const AuthProvider = (props: any) => {
    const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
    const { data = { user: null }, error, isRejected, isPending, isSettled, reload } = useAsync({
        promiseFn: getUser,
    });

    // Use the useAsync hook with useeffect in order to fetch a user, but only once
    React.useEffect(() => {
        if (isSettled) {
            setFirstAttemptFinished(true);
        }
    }, [isSettled]);

    if (!firstAttemptFinished) {
        if (isPending) {
            return (
                <Layout>
                    <Spinner />
                </Layout>
            );
        }
        if (isRejected) {
            return (
                <div>
                    <p>Uh oh... There's a problem. Try refreshing the app.</p>
                    <pre>{error!.message}</pre>
                </div>
            );
        }
    }

    return (
        <AuthContext.Provider
            value={{
                data,
                authLogin: reload,
                authLogout: reload,
            }}
            {...props}
        />
    );
};

export { AuthProvider, useAuth };
