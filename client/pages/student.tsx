import Link from 'next/link';
import { withRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { Book } from 'styled-icons/boxicons-regular/Book';
import { Pencil } from 'styled-icons/boxicons-regular/Pencil';
import { Clock } from 'styled-icons/fa-regular/Clock';
import { isArray } from 'util';
import Layout from '../components/Layout';
import { lightBlue } from '../components/presentational/variables';
import { withAuth } from '../components/withAuth';
import { useUser } from '../context/UserContext';

const DashboardLinkContainer = styled('div')`
    display: flex;
    flex-direction: row;
`;

const DashboardLink = styled('a')`
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    width: 150px;
    height: 150px;
    color: ${lightBlue};
    background: white;
    border-radius: 5px;
    box-shadow: 0 1px 3px 3px rgba(31, 36, 38, 0.1);
    transition: all 0.3s ease-in-out;
    &:not(:last-of-type) {
        margin-right: 25px;
    }
    &:hover,
    &:focus {
        margin-top: -15px;
    }
`;

const GoalsIcon = styled(Pencil)`
    color: ${lightBlue};
    width: 60px;
    margin-bottom: 10px;
`;
const SessionIcon = styled(Clock)`
    color: ${lightBlue};
    width: 56px;
    margin-bottom: 14px;
`;
const DatabookIcon = styled(Book)`
    color: ${lightBlue};
    width: 60px;
    margin-bottom: 10px;
`;

const StudentPage = withRouter((props) => {
    const user = useUser();

    const queryArgs = props.router!.query;
    if (!queryArgs || !queryArgs.id) {
        return <div>No student specified</div>;
    }

    const queryArgsId: string = isArray(queryArgs.id) ? queryArgs.id[0] : queryArgs.id;
    const studentId: number = parseInt(queryArgsId);

    const student = user!.students!.find((student) => parseInt(student.id) === studentId);

    if (!student) {
        return <Layout title="Student Dashboard">No Student found with the specified id.</Layout>;
    }

    return (
        <Layout title="Student Dashboard">
            <h1>{student.firstName}'s Dashboard</h1>
            <DashboardLinkContainer>
                <Link href={`/goals?id=${student.id}`}>
                    <DashboardLink href={`/goals?id=${student.id}`}>
                        <GoalsIcon />
                        Goals
                    </DashboardLink>
                </Link>
                <Link href={`/session?id=${student.id}`}>
                    <DashboardLink href={`/session?id=${student.id}`}>
                        <SessionIcon />
                        Session
                    </DashboardLink>
                </Link>
                <Link href={`/databook?id=${student.id}`}>
                    <DashboardLink href={`/databook?id=${student.id}`}>
                        <DatabookIcon />
                        Databook
                    </DashboardLink>
                </Link>
            </DashboardLinkContainer>
        </Layout>
    );
});

export default withAuth(StudentPage);
