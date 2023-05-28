// import { confirmUserPrefix } from "../modules/constants/redisPrefixes";
import { sign } from "jsonwebtoken";
import { User } from "@generated/type-graphql";
export const createConfirmationUrl = async (user: User) => {
  const userSecretKey = process.env.USER_SECRET_KEY + user.password;
  const userInfo = { userId: user.id };
  return `http://localhost:3000/auth/verify/${user.id}/${sign(
    userInfo,
    userSecretKey,
    { expiresIn: "15m" }
  )}`;
};
