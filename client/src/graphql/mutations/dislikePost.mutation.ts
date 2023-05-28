import { gql } from "@apollo/client";
export default gql`
  mutation DislikePost($postId: ID!) {
    dislikePost(postId: $postId)
  }
`;
