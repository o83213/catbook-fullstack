import { isAuth } from "@middlewares/isAuth";
import {
  MyContext,
  MessageSentSubscriptionPayload,
  MessagePopulated,
} from "@/types";
import { Prisma } from "@prisma/client";
import { withFilter } from "graphql-subscriptions";
import { SendMessageArguments } from "@/types";
import { GraphQLError } from "graphql";
import { conversationPopulated } from "../conversation/Conversation";
export const messageResolvers = {
  Query: {
    async messages(
      parent,
      { conversationId }: { conversationId: string },
      context: MyContext
    ): Promise<Array<MessagePopulated>> {
      const user = await isAuth(context);
      const { prisma } = context;
      const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        include: conversationPopulated,
      });
      if (!conversation) {
        throw new GraphQLError("No conversation!");
      }
      const isParticipant = conversation.participants.some(
        (participant) => participant.userId === user.id
      );
      if (!isParticipant) {
        throw new GraphQLError("No authorized!");
      }
      //
      try {
        const messages = await prisma.message.findMany({
          where: {
            conversationId,
          },
          include: messagePopulated,
          orderBy: {
            createdAt: "desc",
          },
        });
        return messages;
      } catch (error) {
        console.log("messages error", error);
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    async sendMessage(
      parent,
      { id, conversationId, senderId, body }: SendMessageArguments,
      context: MyContext
    ): Promise<boolean> {
      const user = await isAuth(context);
      const { prisma, pubsub } = context;
      if (user.id !== senderId) {
        throw new GraphQLError("No authorized!");
      }
      try {
        /**
         * create new message
         */
        const newMessage = await prisma.message.create({
          data: {
            id,
            senderId,
            conversationId,
            body,
          },
          include: messagePopulated,
        });
        // Find participant entity
        const participant = await prisma.conversationParticipant.findFirst({
          where: {
            userId: user.id,
            conversationId,
          },
        });
        // update conversation entity
        const conversation = await prisma.conversation.update({
          where: {
            id: conversationId,
          },
          data: {
            latestMessageId: newMessage.id,
            participants: {
              update: {
                where: {
                  id: participant.id,
                },
                data: {
                  hasSeenLatestMessage: true,
                },
              },
              updateMany: {
                where: {
                  NOT: {
                    userId: senderId,
                  },
                },
                data: {
                  hasSeenLatestMessage: false,
                },
              },
            },
          },
          include: conversationPopulated,
        });
        //
        pubsub.publish("MESSAGE_SENT", {
          messageSent: newMessage,
        });
        pubsub.publish("CONVERSATION_UPDATED", {
          conversationUpdated: {
            conversation,
          },
        });
      } catch (error) {
        console.log("sendMessage error", error);
        throw new GraphQLError("Error sending message");
      }
      return true;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        (parent, args, { pubsub }: MyContext) => {
          return pubsub.asyncIterator("MESSAGE_SENT");
        },
        (
          payload: MessageSentSubscriptionPayload,
          { conversationId }: { conversationId: string },
          {}: MyContext
        ) => {
          return payload.messageSent.conversationId === conversationId;
        }
      ),
    },
  },
};

export const messagePopulated = Prisma.validator<Prisma.MessageInclude>()({
  sender: {
    select: {
      id: true,
      name: true,
    },
  },
});
