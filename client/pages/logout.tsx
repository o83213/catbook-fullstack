import { useLogoutMutation } from "@generated/graphql";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

const Logout = () => {
  const router = useRouter();
  const [logout, { client }] = useLogoutMutation();
  const logoutHandler = useCallback(() => {
    logout()
      .then(() => {
        localStorage.removeItem("accessToken");
        return client.clearStore();
      })
      .finally(() => {
        router.push("/auth");
      });
  }, []);
  useEffect(() => {
    logoutHandler();
  }, []);
  return <div>Logging out...</div>;
};

export default Logout;
