import { decode } from "jsonwebtoken";
export const getDataFromToken = () => {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  let userInfo: { id: string; name: string } | null = null;
  if (accessToken) {
    try {
      const payload = decode(accessToken) as any;
      userInfo = {
        id: payload.userId,
        name: payload.name
      };
    } catch (e) {
      console.log(e);
    }
  }
  return userInfo;
};
