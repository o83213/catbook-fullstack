import { gql } from "@apollo/client";
export default gql`
  query GetAllComments($postId: ID!) {
    getAllComments(postId: $postId) {
      id
      author {
        id
        name
        profile {
          avatarImage
        }
      }
      createdAt
      content
    }
  }
`;
