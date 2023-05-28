import { gql } from "@apollo/client";
export default gql`
  query GetUserfriends($userId: ID!) {
    getUserfriends(userId: $userId) {
      id
      name
      profile {
        avatarImage
      }
    }
  }
`;
