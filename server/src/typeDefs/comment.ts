export const CommentTypeDefs = `#graphql
  type Comment {
    id: ID!
    content: String!
    author: User!
    createdAt: String!
    updatedAt: String!
    post: Post!
  }

  type Query {
    getAllComments(postId: ID!): [Comment!]!
  }

  type Mutation {
    createComment(postId: ID!, content: String!): Comment!
    updateComment(postId: ID!, content: String!): Comment!
    deleteComment(postId:ID!): Boolean!
  }
`;
