import { gql } from "@apollo/client";
export default gql`
  query GetAllUsers($searchName: String) {
    getUsers(searchName: $searchName) {
      id
      name
      profile {
        id
        avatarImage
      }
    }
  }
`;
