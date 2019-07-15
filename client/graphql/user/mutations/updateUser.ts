import gql from 'graphql-tag';

export const updateUserMutation = gql`
    mutation UpdateUser($data: UpdateUserInput!) {
        updateUser(data: $data)
    }
`;
