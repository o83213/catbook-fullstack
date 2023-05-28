import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: User) => {
  const accessKey = process.env.ACCESS_SECRET_KEY;
  return sign({ userId: user.id, name: user.name }, accessKey, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: User) => {
  const refreshKey = process.env.REFRESH_SECRET_KEY;
  return sign({ userId: user.id }, refreshKey, {
    expiresIn: "30d",
  });
};
