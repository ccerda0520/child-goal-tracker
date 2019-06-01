import React from 'react';

type Goal = {
    id: number;
    name: string;
    description: string;
    category: string;
};

const ActiveGoalStateContext = React.createContext<undefined | Goal>(undefined);
const ActiveGoalDispatchContext = React.createContext<any>(undefined);

const activeGoalReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'update': {
            return action.goal;
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

const ActiveGoalProvider = ({ children }: any) => {
    const [state, setActiveGoal] = React.useReducer(activeGoalReducer, undefined);
    return (
        <ActiveGoalStateContext.Provider value={state}>
            <ActiveGoalDispatchContext.Provider value={setActiveGoal}>{children}</ActiveGoalDispatchContext.Provider>
        </ActiveGoalStateContext.Provider>
    );
};

const useActiveGoalState = () => {
    const context = React.useContext(ActiveGoalStateContext);
    if (!context) {
        throw Error('useActiveGoal must be used within a ActiveGoalProvider');
    }

    return context;
};

const useActiveGoalDispatch = () => {
    const context = React.useContext(ActiveGoalDispatchContext);
    if (!context) {
        throw Error('useActiveGoal must be used within a ActiveGoalProvider');
    }

    return context;
};

export { ActiveGoalProvider, useActiveGoalState, useActiveGoalDispatch };
