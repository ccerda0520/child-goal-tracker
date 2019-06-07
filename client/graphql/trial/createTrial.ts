import { gql } from 'apollo-boost';

export const createTrialMutation = gql`
    mutation CreateTrial($data: CreateTrialInput!) {
        createTrial(data: $data) {
            id
            trialData
            createdAt
        }
    }
`;
