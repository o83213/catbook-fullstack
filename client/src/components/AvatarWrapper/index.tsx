import { useRouter } from "next/router";
import React from "react";
import { BodySTY } from "./style";

interface PropsType {
  children?: React.ReactNode;
  userId: string | undefined;
}

const Index = (props: PropsType) => {
  const router = useRouter();
  if (!props.userId) return <BodySTY>{props.children}</BodySTY>;
  return (
    <BodySTY
      onClick={() => {
        router.push(`/profile/${props.userId}`);
      }}
    >
      {props.children}
    </BodySTY>
  );
};

export default Index;
