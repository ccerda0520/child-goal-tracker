import React from 'react';
import { MeStudentsQuery } from '../generated/apolloComponents';
import { useAuth } from './AuthContext';
const UserContext = React.createContext<undefined | MeStudentsQuery['me']>(undefined);

const useUser = () => {
    const context = React.useContext(UserContext);
    if (typeof context === 'undefined') {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

const UserProvider = (props: any) => {
    const {
        data: { user },
    } = useAuth();

    return <UserContext.Provider value={user} {...props} />;
};

export { UserProvider, useUser };
