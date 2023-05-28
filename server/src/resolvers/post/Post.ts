import { MyContext } from "@/types";
import { Post, User, Comment, Like } from "@prisma/client";
import { isAuth } from "@middlewares/isAuth";
//
interface CreatePostArgs {
  title: string;
  content: string;
  postImage: string;
}

interface updatePostArgs extends CreatePostArgs {
  postId: string;
}
//
export const postResolvers = {
  Post: {
    async author(
      parent,
      args,
      { dataLoader: { userLoader } }: MyContext
    ): Promise<User> {
      const author = userLoader.load(parent.authorId);
      return author;
    },
    async comments(parent, args, { prisma }: MyContext): Promise<Comment[]> {
      const comments = await prisma.comment.findMany({
        where: {
          postId: parent.id,
        },
      });
      return comments;
    },
    async likes(parent, args, { prisma }: MyContext): Promise<Like[]> {
      const likes = await prisma.like.findMany({
        where: {
          postId: parent.id,
        },
      });
      return likes;
    },
  },
  Query: {
    async getAllPosts(parent, args, context: MyContext): Promise<Post[]> {
      const { prisma } = context;
      const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
      });
      return posts;
    },
    //
    async getPost(
      parent,
      { postId }: { postId: string },
      { prisma }: MyContext
    ): Promise<Post> {
      const post = await prisma.post.findUnique({
        where: { id: postId },
      });
      return post;
    },
  },
  //
  Mutation: {
    async createPost(
      parent,
      { title, content, postImage }: CreatePostArgs,
      context: MyContext
    ): Promise<Post> {
      const user = await isAuth(context);
      const { prisma } = context;
      if (!user) {
        throw new Error("No such an user");
      }

      // if (user.confirmed === false) {
      //   throw new Error("User no confirm Email, please confirm first!");
      // }
      // check input value
      if (title.trim().length === 0 || content.trim().length === 0) {
        throw new Error("title and content must not be empty!");
      }

      const post = await prisma.post.create({
        data: {
          title,
          content,
          postImage,
          authorId: user.id,
        },
      });

      return post;
    },
    //
    async updatePost(
      parent,
      { postId, title, content, postImage }: updatePostArgs,
      context: MyContext
    ): Promise<Post> {
      const user = await isAuth(context);
      const { prisma } = context;
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post.authorId !== user.id) {
        throw new Error(
          "You are not the post author, operation not authorized!"
        );
      }

      await prisma.post.update({
        where: { id: postId },
        data: {
          title,
          content,
          postImage,
        },
      });

      return post;
    },
    //
    async deletePost(
      parent,
      { postId }: { postId: string },
      context: MyContext
    ): Promise<boolean> {
      const user = await isAuth(context);
      const { prisma } = context;
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post.authorId !== user.id) {
        throw new Error(
          "You are not the post author, operation not authorized!"
        );
      }

      await prisma.post.delete({
        where: { id: postId },
      });

      return true;
    },
  },
};
