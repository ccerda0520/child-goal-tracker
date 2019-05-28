import React from 'react';
import { useAsync } from 'react-async';
import { meStudentsQuery } from '../graphql/user/query/meStudents';
import initApollo from '../lib/initApollo';
const UserContext = React.createContext(undefined);

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

const useUser = () => {
    const context = React.useContext(UserContext);
    if (typeof context === 'undefined') {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

const UserProvider = (props: any) => {
    const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
    const { data = { user: null }, error, isRejected, isPending, isSettled, reload } = useAsync({
        promiseFn: getUser,
    });

    // Use the useAsync hook with useeffect in order to fetch a user, but only once
    React.useLayoutEffect(() => {
        if (isSettled) {
            setFirstAttemptFinished(true);
        }
    }, [isSettled]);

    if (!firstAttemptFinished) {
        if (isPending) {
            return <div>hi</div>;
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

    return <UserContext.Provider value={data!.user} {...props} />;
};

export { UserProvider, useUser };
