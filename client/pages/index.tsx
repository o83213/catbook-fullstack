import React from "react";
import { NextPageWithLayout } from "next";
import { useRouter } from "next/router";
interface PageProps {
  userInfo: {
    id: string;
  };
}
const Index: NextPageWithLayout<PageProps> = (props) => {
  const router = useRouter();
  React.useEffect(() => {
    if (!!props.userInfo) {
      router.push("/home");
    } else {
      router.push("/auth");
    }
  }, [props.userInfo, router]);

  return null;
};

export default Index;
