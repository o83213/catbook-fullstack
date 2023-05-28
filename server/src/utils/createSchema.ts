import { buildSchema } from "type-graphql";
import {
  UserResolver,
  PostResolver,
  CommentResolver,
  FriendResolver,
  ProfileResolver,
  LikeResolver,
  SampleResolver,
  ConversationResolver,
} from "@resolvers/index";
export const createSchema = async () => {
  return buildSchema({
    resolvers: [
      UserResolver,
      PostResolver,
      CommentResolver,
      FriendResolver,
      ProfileResolver,
      LikeResolver,
      SampleResolver,
      ConversationResolver,
    ],
    validate: {
      forbidUnknownValues: false,
    },
  });
};
