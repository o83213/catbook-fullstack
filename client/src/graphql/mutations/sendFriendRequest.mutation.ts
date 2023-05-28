import { gql } from "@apollo/client";
export default gql`
  mutation SendFriendRequest($addresseeId: String!) {
    sendFriendRequest(addresseeId: $addresseeId)
  }
`;
