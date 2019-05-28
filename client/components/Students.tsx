import React from 'react';
import styled from 'styled-components';
import { useUser } from '../context/UserContext';
import NewStudent from './students/NewStudent';
import StudentList from './students/StudentList';

const StudentsWrapper = styled('div')`
    display: inline-flex;
    flex-direction: row;
`;

const Students: React.FunctionComponent<{}> = () => {
    const user = useUser();
    if (!user || !user!.students!.length) {
        return (
            <div>
                <NewStudent />
            </div>
        );
    }
    return (
        <StudentsWrapper>
            <StudentList students={user.students} />
        </StudentsWrapper>
    );
};

export default Students;
