import { parseJWT } from "./parseJWT";

export const isTokenExpired = (token: string | null) => {
  if (!token) {
    return false;
  }

  try {
    const { exp } = parseJWT(token);
    if (Date.now() >= exp * 1000) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};
