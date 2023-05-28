import { gql } from "@apollo/client";
export default gql`
  query GetProfile($userId: String!) {
    getProfile(userId: $userId) {
      id
      bio
      avatarImage
      coverImage
      user {
        name
        friendRequests
      }
    }
  }
`;
