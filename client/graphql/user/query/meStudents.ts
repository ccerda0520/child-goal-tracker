import { gql } from 'apollo-boost';

export const meStudentsQuery = gql`
    query MeStudents {
        me {
            email
            firstName
            lastName
            id
            students {
                firstName
                lastName
                id
            }
            timeZone
        }
    }
`;
