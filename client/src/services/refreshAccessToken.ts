export const refreshAccessToken = async () => {
  return fetch(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_ENDPOINT
        : "http://localhost:4000"
    }/auth/refresh_token`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      const { accessToken } = data;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        return accessToken;
      }
      return "";
    })
    .catch((error) => {
      throw error;
    });
};
