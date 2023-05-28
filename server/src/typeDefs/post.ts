export const PostTypeDefs = `#graphql
  type Post {
    id: ID!
    title: String!
    content: String!
    postImage: String!
    createdAt: String!
    updatedAt: String!
    author: User!
    comments: [Comment!]!
    likes: [Like!]!
  }

  type Query {
    getAllPosts: [Post!]!
    getPost(postId: ID!): Post!
  }

  type Mutation {
    createPost(title: String!, content: String!, postImage: String): Post!
    updatePost(postId: ID!, title: String, content: String, postImage: String): Post!
    deletePost(postId:ID!): Boolean!
  }
`;
// export const PostTypeDefs = `#graphql
//   type Post {
//     id: ID!
//     title: String!
//     content: String!
//     postImage: String!
//     createdAt: String!
//     updatedAt: String!
//     author: User!
//     comments: [Comment!]!
//     likes: [Like!]!
//   }
// `;
