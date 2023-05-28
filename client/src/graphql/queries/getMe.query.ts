import { gql } from "@apollo/client";
export default gql`
  query GetMe {
    getMe {
      id
      email
      friendRequests
      name
      profile {
        avatarImage
      }
    }
  }
`;
