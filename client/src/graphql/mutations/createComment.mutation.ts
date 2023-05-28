import { gql } from "@apollo/client";
export default gql`
  mutation CreateComment($postId: ID!, $content: String!) {
    createComment(postId: $postId, content: $content) {
      id
      content
      createdAt
      author {
        id
        name
        profile {
          id
          avatarImage
        }
      }
    }
  }
`;
