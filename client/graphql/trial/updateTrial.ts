import { gql } from 'apollo-boost';

export const updateTrialMutation = gql`
    mutation UpdateTrial($data: UpdateTrialInput!) {
        updateTrial(data: $data) {
            id
            trialData
            createdAt
        }
    }
`;
