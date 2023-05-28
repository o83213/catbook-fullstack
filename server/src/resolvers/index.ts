import { userResolvers } from "./user/User";
import { postResolvers } from "./post/Post";
import { commentResolvers } from "./comment/Comment";
import { friendResolvers } from "./friend/Friend";
import { profileResolvers } from "./profile/Profile";
import { likeResolvers } from "./like/Like";
import { conversationResolvers } from "./conversation/Conversation";
import { messageResolvers } from "./message/Message";

export const resolvers = [
  userResolvers,
  profileResolvers,
  postResolvers,
  commentResolvers,
  friendResolvers,
  likeResolvers,
  conversationResolvers,
  messageResolvers,
];
