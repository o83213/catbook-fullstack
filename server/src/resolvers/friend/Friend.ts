import { Context } from "graphql-ws/lib/server";
import { isAuth } from "@middlewares/isAuth";
import { MyContext } from "@/types";
import { User } from "@prisma/client";

export const friendResolvers = {
  Query: {
    async getUserfriends(
      parent,
      { userId }: { userId: string },
      { prisma }: MyContext
    ) {
      const friendsAsRequest = await prisma.user.findMany({
        where: {
          addressee: {
            some: {
              requestorId: userId,
            },
          },
        },
      });
      const friendsAsAccept = await prisma.user.findMany({
        where: {
          requestor: {
            some: {
              addresseeId: userId,
            },
          },
        },
      });
      return [...friendsAsAccept, ...friendsAsRequest];
    },
  },
  Mutation: {
    async sendFriendRequest(
      parent,
      { addresseeId }: { addresseeId: string },
      context: MyContext
    ) {
      const user = await isAuth(context);
      const { prisma } = context;
      const addressee = await prisma.user.findUnique({
        where: { id: addresseeId },
      });

      if (!addressee) {
        throw new Error(`Friend ID: ${addresseeId} not exist!`);
      }

      const addresseeFriendRequest = addressee.friendRequests;

      if (addresseeFriendRequest.includes(user.id)) {
        console.log("Already send the request");
        return false;
      }

      addresseeFriendRequest.push(user.id);
      await prisma.user.update({
        where: {
          id: addresseeId,
        },
        data: {
          friendRequests: addresseeFriendRequest,
        },
      });
      return true;
    },
    async acceptFriendRequest(
      parent,
      { requestorId }: { requestorId: string },
      context: MyContext
    ) {
      const user = await isAuth(context);
      const { prisma } = context;
      const friendRequests = user.friendRequests;
      // check if the requestorId is in the friendRequests and if requestor is already a friend (old friend request)
      if (!friendRequests.includes(requestorId)) {
        throw new Error(`Friend request: ${requestorId} not exist!`);
      }
      const existingFriendship = await prisma.friendship.findFirst({
        where: {
          OR: [
            { requestorId: requestorId, addresseeId: user.id },
            { requestorId: user.id, addresseeId: requestorId },
          ],
        },
      });
      console.log("existingFriendship", existingFriendship);
      //
      await prisma.friendship.create({
        data: {
          addresseeId: user.id,
          requestorId: requestorId,
        },
      });

      const updateFriendRequests = friendRequests.filter(
        (friendRequest) => friendRequest !== requestorId
      );
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          friendRequests: updateFriendRequests,
        },
      });

      return true;
    },
    async rejectFriendRequest(
      parent,
      { requestorId }: { requestorId: string },
      context: MyContext
    ) {
      const user = await isAuth(context);
      const { prisma } = context;
      const friendRequests = user.friendRequests;

      if (!friendRequests.includes(requestorId)) {
        throw new Error(`Friend request: ${requestorId} not exist!`);
      }

      const updateFriendRequests = friendRequests.filter(
        (friendRequest) => friendRequest !== requestorId
      );

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          friendRequests: updateFriendRequests,
        },
      });

      return true;
    },
    async deleteFriend(
      parent,
      { friendId }: { friendId: string },
      context: MyContext
    ) {
      const user = await isAuth(context);

      if (!user.friendRequests.includes(friendId)) {
        throw new Error(`User does not have friend ${friendId}`);
      }

      return true;
    },
  },
};
