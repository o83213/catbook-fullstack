import { gql } from "@apollo/client";
export default gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId)
  }
`;
