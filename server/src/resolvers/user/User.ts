import { createAccessToken, createRefreshToken } from "@utils/auth";
import bcrypt from "bcryptjs";
import { decode, sign, verify } from "jsonwebtoken";
// ...
import { MyContext } from "@/types";
import { isAuth } from "@middlewares/index";
import { sendRefreshToken } from "@utils/sendRefreshToken";
import { sendEmail } from "@utils/sendEmail";
import { createConfirmationUrl } from "@utils/createConfirmationUrl";
import { User } from "@prisma/client";
import { matchString } from "@/utils/matchString";

interface RegisterArgs {
  email: string;
  password: string;
  name: string;
}

interface ChangePasswordArgs {
  id: string;
  token: string;
  newPassword: string;
}

export const userResolvers = {
  // field resolvers
  User: {
    async posts(parent, args, { prisma }: MyContext) {
      const posts = await prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
      });
      return posts;
    },
    async comments(parent, args, { prisma }: MyContext) {
      const comments = await prisma.comment.findMany({
        where: {
          authorId: parent.id,
        },
      });
      return comments;
    },
    async profile(parent, args, { prisma }: MyContext) {
      return prisma.profile.findUnique({
        where: {
          userId: parent.id,
        },
      });
    },
    async likes(parent, args, { prisma }: MyContext) {
      const likes = await prisma.like.findMany({
        where: {
          userId: parent.id,
        },
      });
      return likes;
    },
  },
  Query: {
    //All user
    async getUsers(
      parent,
      { searchName }: { searchName?: string },
      { prisma, userInfo }: MyContext
    ): Promise<Array<User>> {
      let users = await prisma.user.findMany();
      if (searchName) {
        users = users.filter(
          (user) =>
            matchString(user.name, searchName) && user.id !== userInfo.userId
        );
      }
      return users;
    },
    // Get me
    async getMe(parent, args, context: MyContext): Promise<User> {
      const user = await isAuth(context);
      return user;
    },
    //
  },
  // Mutation
  Mutation: {
    async register(
      parent,
      { email, password, name }: RegisterArgs,
      { prisma }: MyContext
    ): Promise<User> {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
          data: {
            email,
            password: hashedPassword,
            name,
          },
        });
        const profile = await prisma.profile.create({
          data: {
            userId: user.id,
            bio: "A new user!",
            avatarImage: "/images/default-avatar.jpg",
            coverImage: "/images/default-cover.jpg",
          },
        });
        return user;
      } catch (err) {
        console.log(err);
      }
    },
    // Login
    async login(
      parent,
      { email, password }: RegisterArgs,
      { res, prisma }: MyContext
    ): Promise<{
      accessToken: string;
    }> {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error("could not find user!");
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("bad password!");
      }

      // if (!user.confirmed) {
      //   throw new Error("Please confirm your email first!");
      // }
      await prisma.user.update({
        data: {
          isLogin: true,
        },
        where: { id: user.id },
      });
      const refreshToken = createRefreshToken(user);
      sendRefreshToken(res, refreshToken);
      const accessToken = createAccessToken(user);
      return {
        accessToken: accessToken,
      };
    },
    // Logout
    async logout(parent, args, context: MyContext) {
      const { res, prisma, userInfo } = context;
      const { userId } = userInfo;
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (user) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            isLogin: false,
          },
        });
      }
      sendRefreshToken(res, "");
      return true;
    },
    // Confirm user
    async confirmUser(
      parent,
      { id, token }: { id: string; token: string },
      { prisma }: MyContext
    ) {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error("could not find user!");
      }

      if (user.confirmed === true) {
        throw new Error("User has been confirmed!");
      }

      const userSecretKey = process.env.USER_SECRET_KEY + user.password;
      try {
        verify(token, userSecretKey);
        await prisma.user.update({
          data: {
            confirmed: true,
          },
          where: {
            id,
          },
        });
        return true;
      } catch (err) {
        throw err;
      }
    },
    async forgotPassword(
      parent,
      { email }: { email: string },
      { prisma }: MyContext
    ): Promise<boolean> {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new Error("No user!");
      }
      const userSecretKey = process.env.USER_SECRET_KEY + user.password;
      const userInfo = { userId: user.id };
      const token = sign(userInfo, userSecretKey, {
        expiresIn: "15m",
      });
      await sendEmail(
        email,
        `http://localhost:3000/change-password/${user.id}/${token}`
      );
      return true;
    },
    //
    async changePassword(
      parent,
      { id, token, newPassword }: ChangePasswordArgs,
      { prisma }: MyContext
    ) {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error("could not find user!");
      }

      const userSecretKey = process.env.USER_SECRET_KEY + user.password;
      try {
        const userInfo = verify(token, userSecretKey);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
          where: { id },
          data: { password: hashedPassword },
        });
        return user;
      } catch (err) {
        throw err;
      }
    },
  },
};
