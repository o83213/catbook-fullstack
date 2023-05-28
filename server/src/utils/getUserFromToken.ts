import { verify } from "jsonwebtoken";
export const getUserFromToken = (
  token: string | undefined
): { userId: string } => {
  if (!token) {
    return { userId: "" };
  }
  try {
    return verify(token.split(" ")[1], process.env.ACCESS_SECRET_KEY!) as {
      userId: string;
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};
