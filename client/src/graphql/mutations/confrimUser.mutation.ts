import { gql } from "@apollo/client";
export default gql`
  mutation ConfirmUser($confirmUserId: ID!, $token: String!) {
    confirmUser(id: $confirmUserId, token: $token)
  }
`;
