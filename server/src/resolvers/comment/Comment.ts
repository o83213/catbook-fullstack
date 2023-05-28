import { GraphQLError } from "graphql";
import { isAuth } from "@middlewares/index";
import { MyContext } from "@/types";
import { Comment, User } from "@prisma/client";
interface CreateCommentArgs {
  content: string;
  postId: string;
}

interface UpdateCommentArgs {
  content: string;
  commentId: string;
}

export const commentResolvers = {
  Comment: {
    author: async (
      parent,
      args,
      { prisma, dataLoader }: MyContext
    ): Promise<User> => {
      const { userLoader } = dataLoader;
      const author = userLoader.load(parent.authorId);
      return author;
    },
  },
  Query: {
    async getAllComments(
      parent,
      { postId }: { postId: string },
      { prisma }: MyContext
    ): Promise<Comment[]> {
      const comments = await prisma.comment.findMany({
        where: {
          postId: postId,
        },
        orderBy: { createdAt: "desc" },
      });
      return comments;
    },
  },
  Mutation: {
    async createComment(
      parent,
      { content, postId }: CreateCommentArgs,
      context: MyContext
    ): Promise<Comment> {
      const user = await isAuth(context);
      const { prisma } = context;
      // if (user.confirmed === false) {
      //   throw new Error("User no confirm Email, please confirm first!");
      // }
      // check input value
      if (content.trim().length === 0) {
        throw new GraphQLError("content must not be empty!");
      }

      const comment = await prisma.comment.create({
        data: {
          content,
          authorId: user.id,
          postId: postId,
        },
      });

      return comment;
    },
    async updateComment(
      parent,
      { content, commentId }: UpdateCommentArgs,
      context: MyContext
    ): Promise<Comment> {
      const user = await isAuth(context);
      const { prisma } = context;
      const comment = await prisma.comment.findUnique({
        where: {
          id: commentId,
        },
      });

      if (comment.authorId !== user.id) {
        throw new GraphQLError(
          "You are not the comment author, operation not authorized!"
        );
      }

      await prisma.comment.update({
        where: { id: commentId },
        data: {
          content,
        },
      });

      return comment;
    },
    async deleteComment(
      parent,
      { commentId }: { commentId: string },
      context: MyContext
    ): Promise<boolean> {
      const user = await isAuth(context);
      const { prisma } = context;
      const comment = await prisma.comment.findUnique({
        where: {
          id: commentId,
        },
      });

      if (comment.authorId !== user.id) {
        throw new GraphQLError(
          "You are not the post author, operation not authorized!"
        );
      }

      await prisma.comment.delete({
        where: { id: commentId },
      });

      return true;
    },
  },
};
