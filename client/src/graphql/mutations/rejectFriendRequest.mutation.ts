import { gql } from "@apollo/client";
export default gql`
  mutation RejectFriendRequest($requestorId: String!) {
    rejectFriendRequest(requestorId: $requestorId)
  }
`;
