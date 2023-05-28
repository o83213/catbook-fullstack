import { isAuth } from "@middlewares/isAuth";
import {
  MyContext,
  ConversationPopulated,
  ConversationCreatedSubscriptionPayload,
  ConversationUpdatedSubscriptionPayload,
  ConversationDeletedSubscriptionPayload,
} from "@/types";
import { Prisma } from "@prisma/client";
import { withFilter } from "graphql-subscriptions";
import { messagePopulated } from "@resolvers/message/Message";
import { GraphQLError } from "graphql";

export const conversationResolvers = {
  Query: {
    async conversations(
      parent,
      args,
      context: MyContext
    ): Promise<Array<ConversationPopulated>> {
      const user = await isAuth(context);
      const { prisma } = context;
      const conversations = await prisma.conversation.findMany({
        where: {
          participants: {
            some: {
              userId: user.id,
            },
          },
        },
        include: conversationPopulated,
      });
      return conversations;
    },

    async conversation(
      parent,
      { conversationId }: { conversationId: string },
      { prisma }: MyContext
    ): Promise<ConversationPopulated> {
      const conversation = await prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
        include: conversationPopulated,
      });
      return conversation;
    },
  },
  Mutation: {
    async createConversation(
      parent,
      { participantsIds }: { participantsIds: string[] },
      context: MyContext
    ): Promise<{ conversationId: string }> {
      const user = await isAuth(context);
      const { prisma, pubsub } = context;
      const conversations = await prisma.conversation.findMany({
        where: {
          participants: {
            every: {
              userId: {
                in: participantsIds,
              },
            },
          },
        },
        include: {
          participants: {
            select: {
              userId: true,
            },
          },
        },
      });
      let conversation = conversations.find((conversation) => {
        return conversation.participants.length === participantsIds.length;
      });
      if (!conversation) {
        conversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: participantsIds.map((id) => ({
                  userId: id,
                  hasSeenLatestMessage: id === user.id,
                })),
              },
            },
          },
          include: conversationPopulated,
        });
        // emit a conversation_create event using pubsub
        const x = pubsub.publish("CONVERSATION_CREATED", {
          conversationCreated: { conversation },
        });
      }
      // emit a conversation event to all participants

      return { conversationId: conversation.id };
    },
    async markConversationAsRead(
      parent,
      { conversationId }: { conversationId: string },
      context: MyContext
    ): Promise<boolean> {
      try {
        const user = await isAuth(context);
        const { prisma } = context;
        const participant = await prisma.conversationParticipant.findFirst({
          where: {
            userId: user.id,
            conversationId,
          },
        });
        if (!participant) {
          throw new GraphQLError("Participant not found");
        }
        await prisma.conversationParticipant.update({
          where: { id: participant.id },
          data: { hasSeenLatestMessage: true },
        });
        return true;
        // await prisma.conversationParticipant.updateMany({});
      } catch (error) {
        console.log("markConversationAsRead error", error);
        throw new GraphQLError(error.message);
      }
    },
    async deleteConversation(
      parent,
      { conversationId }: { conversationId: string },
      context: MyContext
    ): Promise<boolean> {
      const user = await isAuth(context);
      const { prisma, pubsub } = context;
      try {
        const participant = await prisma.conversationParticipant.findFirst({
          where: {
            userId: user.id,
            conversationId,
          },
        });
        if (!participant) {
          throw new GraphQLError("Participant not found");
        }
        //
        const deleteConversation = await prisma.conversation.delete({
          where: {
            id: conversationId,
          },
          include: conversationPopulated,
        });
        // emit a conversation_delete event using pubsub
        pubsub.publish("CONVERSATION_DELETED", {
          conversationDeleted: { conversation: deleteConversation },
        });
        return true;
      } catch (error) {
        console.log("deleteConversation error", error);
        throw new GraphQLError("Fail to delete conversation");
      }
    },
  },
  Subscription: {
    conversationCreated: {
      subscribe: withFilter(
        (parent, args, { pubsub }: MyContext) => {
          return pubsub.asyncIterator("CONVERSATION_CREATED");
        },
        // TODO not sure is async working...
        (
          payload: ConversationCreatedSubscriptionPayload,
          variable,
          { userInfo }: MyContext
        ) => {
          const {
            conversationCreated: {
              conversation: { participants },
            },
          } = payload;
          // const isParticipant = !!participants.find(
          //   (participant) => participant.userId === userId
          // );
          const isParticipant = !!participants.find(
            (participant) => participant.userId === userInfo.userId
          );
          return isParticipant;
        }
      ),
    },
    conversationUpdated: {
      subscribe: withFilter(
        (parent, args, { pubsub }: MyContext) => {
          return pubsub.asyncIterator("CONVERSATION_UPDATED");
        },
        (
          payload: ConversationUpdatedSubscriptionPayload,
          variable,
          { userInfo }: MyContext
        ) => {
          const {
            conversationUpdated: {
              conversation: { participants },
            },
          } = payload;
          // const isParticipant = !!participants.find(
          //   (participant) => participant.userId === userId
          // );
          const isParticipant = !!participants.find(
            (participant) => participant.userId === userInfo.userId
          );
          return isParticipant;
        }
      ),
    },
    conversationDeleted: {
      subscribe: withFilter(
        (parent, args, { pubsub }: MyContext) => {
          return pubsub.asyncIterator("CONVERSATION_DELETED");
        },
        (
          payload: ConversationDeletedSubscriptionPayload,
          variable,
          { userInfo }: MyContext
        ) => {
          const {
            conversationDeleted: {
              conversation: { participants },
            },
          } = payload;
          const isParticipant = !!participants.find(
            (participant) => participant.userId === userInfo.userId
          );
          return isParticipant;
        }
      ),
    },
  },
};

export const participantPopulated =
  Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
      select: {
        id: true,
        name: true,
      },
    },
  });

export const conversationPopulated =
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: participantPopulated,
    },
    latestMessage: {
      include: messagePopulated,
    },
  });
