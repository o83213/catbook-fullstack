import { gql } from "@apollo/client";
export default gql`
  query GetAllPosts {
    getAllPosts {
      id
      likes {
        user {
          id
        }
      }
      author {
        id
        name
        profile {
          avatarImage
        }
      }
      createdAt
      content
      postImage
    }
  }
`;
