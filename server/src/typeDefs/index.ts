import { MessageTypeDefs } from "./message";
import { CommentTypeDefs } from "./comment";
import { ConversationTypeDefs } from "./conversation";
import { LikeTypeDefs } from "./like";
import { PostTypeDefs } from "./post";
import { ProfileTypeDefs } from "./profile";
import { UserTypeDefs } from "./user";
import { FriendTypeDefs } from "./friend";

export const typeDefs = [
  UserTypeDefs,
  ProfileTypeDefs,
  PostTypeDefs,
  CommentTypeDefs,
  FriendTypeDefs,
  LikeTypeDefs,
  ConversationTypeDefs,
  MessageTypeDefs,
];
// export const typeDefs = [
//   CommentTypeDefs,
//   ConversationTypeDefs,
//   LikeTypeDefs,
//   PostTypeDefs,
//   ProfileTypeDefs,
//   UserTypeDefs,
// ];
