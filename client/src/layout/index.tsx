// import { getDataFromToken } from "../utils/getDataFromToken";
// import Head from "next/head";
import React, { FC, ReactNode } from "react";
import Header from "./Header";
import { BodySTY } from "./style";
import Container from "./Container";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import Feeder from "@components/Chat/Feeder";
import { useGetMeQuery } from "@generated/graphql";
import Modal from "@root/components/Modal";
import Spinner from "@components/Spinner";
import { useConversationStore } from "@store/convesationStore";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { data, loading, error } = useGetMeQuery();
  const isOpen = useConversationStore((state: any) => state.isOpen);
  if (loading) {
    return (
      <Modal>
        <Spinner height={32} width={32} />
      </Modal>
    );
  }
  //
  if (error || !data || !data.getMe) {
    return <div>You are not login yet, please login first!</div>;
  }
  return (
    <BodySTY>
      <Header meData={data.getMe} />
      <Container>
        <LeftBar />
        <div className="page-container">{children}</div>
        <RightBar meData={data.getMe} />
      </Container>
      {isOpen && <Feeder />}
    </BodySTY>
  );
};

export const getLayout = (page: ReactNode) => <Layout>{page}</Layout>;
