import { gql } from "@apollo/client";
export default gql`
  mutation CreatePost($title: String!, $content: String!, $postImage: String) {
    createPost(title: $title, content: $content, postImage: $postImage) {
      id
      title
      content
      postImage
      author {
        id
      }
    }
  }
`;
