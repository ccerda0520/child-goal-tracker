import { gql } from 'apollo-boost';

export const meStudentsQuery = gql`
    query MeStudents {
        me {
            email
            id
            students {
                firstName
                lastName
                id
            }
        }
    }
`;
