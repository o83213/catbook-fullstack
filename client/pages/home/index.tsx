import React, { useState } from "react";
import { NextPageWithLayout } from "next";
//
import {
  useGetAllPostsQuery,
  useGetMeQuery,
  useCreatePostMutation,
  CreatePostMutationVariables
} from "@generated/graphql";
import { getLayout } from "@root/layout";
import Posts from "@components/Posts";
import PostInput from "@components/Posts/PostInput";
import Modal from "@components/Modal";
import Spinner from "@components/Spinner";
import InputForm from "@components/Posts/PostForm";
import styled from "styled-components";
import GetAllPostsNode from "@graphql/queries/getAllPosts.query";
//
const BodySTY = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
//
interface PageProps {
  userInfo: {
    id: string;
  };
}

const Home: NextPageWithLayout<PageProps> = ({ userInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openFormHandler = () => {
    setIsModalOpen(true);
  };
  const {
    data: postData,
    loading,
    error
  } = useGetAllPostsQuery({ fetchPolicy: "cache-first" });
  const { data: meData, loading: meLoading } = useGetMeQuery({
    fetchPolicy: "network-only"
  });
  const [createPost, { loading: createPostLoading }] = useCreatePostMutation();
  const createPostHandler = async (postData: CreatePostMutationVariables) => {
    await createPost({
      variables: {
        ...postData
      },
      refetchQueries: [GetAllPostsNode]
    });
  };
  //
  if (loading || meLoading || createPostLoading) {
    return (
      <Modal>
        <Spinner height={32} width={32} />
      </Modal>
    );
  }
  if (!postData || !meData || error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  if (!meData.getMe) {
    return <div>Not logged in</div>;
  }
  return (
    <BodySTY>
      <PostInput openForm={openFormHandler} user={meData.getMe} />
      <Posts posts={postData.getAllPosts} user={meData.getMe} />
      {isModalOpen && (
        <Modal
          onConfirm={() => {
            setIsModalOpen(false);
          }}
        >
          <InputForm
            user={meData.getMe}
            onClose={() => {
              setIsModalOpen(false);
            }}
            createPost={createPostHandler}
          />
        </Modal>
      )}
    </BodySTY>
  );
};
Home.getLayout = getLayout;
export default Home;
