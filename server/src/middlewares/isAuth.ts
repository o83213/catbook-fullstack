import { MyContext } from "@/types";
import { GraphQLError } from "graphql";
import { verify, decode } from "jsonwebtoken";
import { getUserFromToken } from "@utils/getUserFromToken";
export const isAuth = async ({ req, prisma }: MyContext) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error("No token!");
    }
    // verify token
    const { userId } = getUserFromToken(token);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("No User!");
    }
    return user;
  } catch (err) {
    throw new GraphQLError(err.message, {
      extensions: {
        code: "NOT_AUTHENTICATED",
      },
    });
  }
};
