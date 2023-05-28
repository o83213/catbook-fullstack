import { isAuth } from "@middlewares/isAuth";
import { MyContext } from "@/types";
import { Profile } from "@prisma/client";
import { matchString } from "@/utils/matchString";
//
interface UpdateProfileArgs {
  bio: string;
  avatarImage?: string;
  coverImage?: string;
}
//
export const profileResolvers = {
  Profile: {
    async user(parent, args, { prisma }: MyContext) {
      const user = await prisma.user.findUnique({
        where: {
          id: parent.userId,
        },
      });
      return user;
    },
  },
  Query: {
    async getProfile(
      parent,
      { userId }: { userId: string },
      { prisma }: MyContext
    ): Promise<Profile> {
      const profile = await prisma.profile.findUnique({
        where: { userId },
      });
      return profile;
    },
  },
  Mutation: {
    async updateProfile(
      parent,
      { bio, avatarImage, coverImage }: UpdateProfileArgs,
      context: MyContext
    ): Promise<Profile> {
      const user = await isAuth(context);
      const { prisma } = context;
      const profile = await prisma.profile.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (profile.userId !== user.id) {
        throw new Error(
          "You are not the profile user, operation not authorized!"
        );
      }

      await prisma.profile.update({
        where: { userId: user.id },
        data: {
          bio,
          avatarImage,
          coverImage,
        },
      });

      return profile;
    },
  },
};
