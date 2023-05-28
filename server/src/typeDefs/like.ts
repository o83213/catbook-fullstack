export const LikeTypeDefs = `#graphql
  type Like {
    id: ID!
    user: User!
    post: Post!
  }

  type Mutation {
    likePost(postId: ID!): Boolean!
    dislikePost(postId: ID!): Boolean!
  }
`;
