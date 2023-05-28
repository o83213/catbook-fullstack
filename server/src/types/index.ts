import { PrismaClient, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import {
  conversationPopulated,
  participantPopulated,
} from "@resolvers/conversation/Conversation";
import { Context } from "graphql-ws/lib/server";
import { PubSub } from "graphql-subscriptions";
import { messagePopulated } from "@resolvers/message/Message";
import { DataLoader } from "../loader";
/*
Server Configuration
*/
export interface SubscriptionContext extends Context {
  req: Request;
  res: Response;
  connectionParams: {
    accessToken: string;
  };
}

export interface MyContext {
  req: Request;
  res: Response;
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  pubsub: PubSub;
  dataLoader: DataLoader;
  userInfo: {
    userId: string;
  };
}
//
export type ConversationPopulated = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;

export type ParticipantPopulated = Prisma.ConversationParticipantGetPayload<{
  include: typeof participantPopulated;
}>;

/**
 * Message
 */

export interface SendMessageArguments {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
}

export interface MessageSentSubscriptionPayload {
  messageSent: MessagePopulated;
}

export type MessagePopulated = Prisma.MessageGetPayload<{
  include: typeof messagePopulated;
}>;

export interface ConversationCreatedSubscriptionPayload {
  conversationCreated: {
    conversation: ConversationPopulated;
  };
}
export interface ConversationUpdatedSubscriptionPayload {
  conversationUpdated: {
    conversation: ConversationPopulated;
  };
}
export interface ConversationDeletedSubscriptionPayload {
  conversationDeleted: {
    conversation: ConversationPopulated;
  };
}
