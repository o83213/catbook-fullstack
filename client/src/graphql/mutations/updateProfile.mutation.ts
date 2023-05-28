import { gql } from "@apollo/client";
export default gql`
  mutation UpdateProfile(
    $bio: String
    $avatarImage: String
    $coverImage: String
  ) {
    updateProfile(
      bio: $bio
      avatarImage: $avatarImage
      coverImage: $coverImage
    ) {
      id
      bio
      avatarImage
      coverImage
    }
  }
`;
