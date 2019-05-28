import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
const Container = styled('div')`
    display: inline-flex;
    width: auto;
    flex-direction: column;
    align-items: flex-start;
`;
const NewStudentButton = styled('a')`
    background: transparent;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 55px;
    line-height: 1;
    text-decoration: none;
    width: 100px;
    height: 100px;
    border: 2px dashed #585858;
    color: #585858;
    margin-bottom: 10px;
    transition: all 0.3s ease-in-out;
    &:hover,
    &:focus {
        margin-top: -15px;
    }
`;
const NewStudent: React.FunctionComponent<{}> = () => {
    return (
        <Container>
            <Link href="/new-student">
                <NewStudentButton href="/new-student" aria-label="Create New User">
                    +
                </NewStudentButton>
            </Link>
            <h3>New Student</h3>
        </Container>
    );
};

export default NewStudent;
