import { gql } from 'apollo-boost';

export const incompleteGoalsQuery = gql`
    query IncompleteGoals($studentId: Float!) {
        goals(studentId: $studentId) {
            id
            name
            description
            category
            trialsPerDay
        }
    }
`;
