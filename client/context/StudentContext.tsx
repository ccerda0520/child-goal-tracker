import React from 'react';

type Student = {
    id: string;
    firstName: string;
    lastName: string;
};

const StudentContext = React.createContext<undefined | Student>(undefined);

const useStudent = () => {
    const context = React.useContext(StudentContext);
    if (!context) {
        throw Error('useStudent must be used within a StudentProvider');
    }

    return context;
};

interface StudentProviderProps {
    student: Student;
}

const StudentProvider = (props: StudentProviderProps & any) => {
    return <StudentContext.Provider value={props.student} {...props} />;
};

export { useStudent, StudentProvider };
