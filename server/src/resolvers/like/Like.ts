import { isAuth } from "@middlewares/isAuth";
import { MyContext } from "@/types";

export const likeResolvers = {
  Like: {
    async user(parent, args, { prisma }: MyContext) {
      const user = await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      });
      return user;
    },
  },
  Mutation: {
    async likePost(parent, { postId }: { postId: string }, context: MyContext) {
      const user = await isAuth(context);
      const { prisma } = context;
      await prisma.like.create({
        data: {
          postId,
          userId: user.id,
        },
      });
      return true;
    },
    async dislikePost(
      parent,
      { postId }: { postId: string },
      context: MyContext
    ) {
      const user = await isAuth(context);
      const { prisma } = context;
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: user.id,
            postId,
          },
        },
      });
      return true;
    },
  },
};
