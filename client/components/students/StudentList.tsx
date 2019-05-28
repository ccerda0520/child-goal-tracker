import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Maybe, Student } from '../../generated/apolloComponents';
import NewStudent from './NewStudent';

interface Props {
    students: Maybe<({ __typename?: 'Student' | undefined } & Pick<Student, 'id' | 'firstName' | 'lastName'>)[]>;
}
const List = styled('ul')`
    display: inline-flex;
    flex-direction: row;
    list-style: none;
    padding: 0;
    margin: 0;
`;
const ListItem = styled('li')`
    &:not(:last-of-type) {
        margin-right: 25px;
    }
`;
const CircleChar = styled('div')`
    font-size: 55px;
    color: white;
    background-color: #337abb;
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    box-shadow: 3px 3px 5px 2px rgba(31, 36, 38, 0.1);
`;

const StudentLink = styled('a')`
    color: #555555;
    font-size: 22px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
    &:hover,
    &:focus {
        margin-top: -15px;
    }
`;

const StudentNameWrapper = styled('div')`
    display: inline-flex;
    flex-direction: column;
    margin-top: 10px;
    span {
        line-height: 1;
    }
`;

const StudentList: React.FunctionComponent<Props> = ({ students }) => {
    if (!students || !students.length) {
        return null;
    }
    const studentList = students.map((student) => {
        return (
            <ListItem key={student.id}>
                <Link href={`/student?id=${student.id}`}>
                    <StudentLink href={`/student?id=${student.id}`}>
                        <CircleChar>{student.firstName.charAt(0)}</CircleChar>
                        <StudentNameWrapper>
                            <span>{student.firstName}</span>
                            <span>{student.lastName}</span>
                        </StudentNameWrapper>
                    </StudentLink>
                </Link>
            </ListItem>
        );
    });

    return (
        <List>
            {studentList}
            {
                <ListItem>
                    <NewStudent />
                </ListItem>
            }
        </List>
    );
};
export default StudentList;
