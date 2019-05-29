import { gql } from 'apollo-boost';

export const CreateGoalMutation = gql`
    mutation CreateGoal($data: CreateGoalInput!) {
        createGoal(data: $data) {
            id
            name
            description
            category
        }
    }
`;
