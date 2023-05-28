import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
//
import { useGetMeQuery, useGetProfileQuery } from "@generated/graphql";
import { getLayout } from "../../src/layout";
import UserInfo from "@components/UserInfo";
import Spinner from "@components/Spinner";
import Modal from "@components/Modal";

const Index = ({
  profileUserId
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    data: meData,
    loading,
    error
  } = useGetMeQuery({ fetchPolicy: "network-only" });
  const { data: userData, loading: userLoading } = useGetProfileQuery({
    variables: { userId: profileUserId },
    fetchPolicy: "network-only"
  });
  if (loading) {
    return (
      <Modal>
        <Spinner height={32} width={32} />
      </Modal>
    );
  }
  if (error || !meData || !meData.getMe) {
    return <div>You are not login yet, please login first!</div>;
  }
  if (userLoading) {
    return (
      <Modal>
        <Spinner height={32} width={32} />
      </Modal>
    );
  }
  if (!userData) {
    return <div>Opops, no user!</div>;
  }
  return (
    <UserInfo
      currentUser={meData.getMe}
      userProfile={userData.getProfile}
      userId={profileUserId}
    />
  );
};
//
interface Props {
  profileUserId: string;
}
interface Params extends ParsedUrlQuery {
  uid: string;
}
//
export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const { params } = context;
  const uid = params!.uid as string;
  return {
    props: {
      profileUserId: uid
    }
  };
};

Index.getLayout = getLayout;
export default Index;
