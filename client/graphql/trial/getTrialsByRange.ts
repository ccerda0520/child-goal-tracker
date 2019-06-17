import { gql } from 'apollo-boost';

export const getTrialsByRangeQuery = gql`
    query GetTrialsByRange($data: GetTrialsByRangeInput!) {
        getTrialsByRange(data: $data) {
            id
            trialData
            createdAt
            goal {
                trialsPerDay
            }
        }
    }
`;
