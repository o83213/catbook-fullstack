export const ProfileTypeDefs = `#graphql
  type Profile {
    id: ID!
    bio: String!
    coverImage: String!
    avatarImage: String!
    user: User!
  }

  type Query {
    getAllProfiles(name: String): [Profile!]!
    getProfile(userId: String!): Profile!
  }

  type Mutation {
    updateProfile(bio: String, name: String, avatarImage: String, coverImage: String): Profile!
  }
`;
