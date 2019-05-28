import { gql } from 'apollo-boost';

export const CreateStudentMutation = gql`
    mutation CreateStudent($data: CreateStudentInput!) {
        createStudent(data: $data) {
            firstName
            lastName
            id
        }
    }
`;
