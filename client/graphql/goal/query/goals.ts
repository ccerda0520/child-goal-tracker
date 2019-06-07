import { gql } from 'apollo-boost';

export const goalsQuery = gql`
    query Goals($studentId: Float!) {
        goals(studentId: $studentId) {
            id
            name
            description
            category
            trialsPerDay
        }
    }
`;
