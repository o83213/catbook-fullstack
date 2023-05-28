import { gql } from "@apollo/client";
export default gql`
  mutation AcceptFriendRequest($requestorId: String!) {
    acceptFriendRequest(requestorId: $requestorId)
  }
`;
