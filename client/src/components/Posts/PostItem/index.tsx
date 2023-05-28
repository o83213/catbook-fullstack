import React, { useState } from "react";
import Image from "next/image";
import {
  FaHeart,
  FaRegCommentDots,
  FaShare,
  FaTimes,
  FaTrashAlt
} from "react-icons/fa";
//
import {
  UserInfoSTY,
  ContainerSTY,
  PostOptionSTY,
  OptionSTY,
  LoadingContainer,
  ImageContainerSTY
} from "./style";
import Card from "../../Card";
import Comments from "@components/Comments";
import {
  GetAllPostsQuery,
  useDeletePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
  GetMeQuery
} from "@generated/graphql";
import AvatarWrapper from "@components/AvatarWrapper";
import Modal from "@components/Modal";
import Spinner from "@components/Spinner";
import GetAllPostsNode from "@graphql/queries/getAllPosts.query";
import { formatRelative } from "date-fns";
import enUs from "date-fns/locale/en-US";
import { gql } from "@apollo/client";
//
const formatRelativeLocale = {
  lastWeek: "eeee",
  yesterday: "'Yesterday",
  today: "p",
  other: "MM/dd/yy"
};
//
type Post = GetAllPostsQuery["getAllPosts"][0];
type User = NonNullable<GetMeQuery["getMe"]>;
type Like = Post["likes"][0];
//
interface Props {
  currentUser: User;
  post: Post;
}
//
const Index = ({ post, currentUser }: Props) => {
  const { content, postImage, author, likes, id: postId } = post;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [deletePost, { loading: deletePostLoading }] = useDeletePostMutation();
  const [likePost, { loading: likePostLoading }] = useLikePostMutation();
  const [dislikePost, { loading: dislikePostLoading }] =
    useDislikePostMutation();
  async function likePostHandler(postId: string) {
    likePost({
      variables: { postId },
      update: (cache, { data }) => {
        const existintPostLikesRef = cache.readFragment<{ likes: Array<Like> }>(
          {
            id: `Post:${postId}`,
            fragment: gql`
              fragment PostLikes on Post {
                likes {
                  user {
                    id
                  }
                }
              }
            `
          }
        )!;
        const newLike = {
          __typename: "Like",
          user: {
            __typename: "User",
            id: currentUser.id
          }
        };
        cache.writeFragment({
          id: `Post:${postId}`,
          fragment: gql`
            fragment PostLikes on Post {
              likes {
                user {
                  id
                }
              }
            }
          `,
          data: {
            likes: [...existintPostLikesRef.likes, newLike]
          }
        });
      }
    });
  }
  async function dislikePostHandler(postId: string) {
    dislikePost({
      variables: { postId },
      update: (cache, { data }) => {
        const existintPostRef = cache.readFragment<{ likes: Array<Like> }>({
          id: `Post:${postId}`,
          fragment: gql`
            fragment PostLikes on Post {
              likes {
                user {
                  id
                }
              }
            }
          `
        });
        const updatedLikes = existintPostRef?.likes.filter(
          (like) => like.user.id !== currentUser.id
        );
        cache.writeFragment({
          id: `Post:${postId}`,
          fragment: gql`
            fragment PostLikes on Post {
              likes {
                user {
                  id
                }
              }
            }
          `,
          data: {
            likes: updatedLikes
          }
        });
      }
    });
  }
  const deletePostHandler = async () => {
    try {
      await deletePost({
        variables: { postId },
        refetchQueries: [GetAllPostsNode]
      });
    } catch (err) {
      throw err;
    }
    setIsModalOpen(false);
  };
  return (
    <React.Fragment>
      <Card>
        <ContainerSTY>
          <UserInfoSTY>
            <AvatarWrapper userId={author.id}>
              <Image
                src={author.profile?.avatarImage}
                width={40}
                height={40}
                alt={"Author avatar"}
              />
            </AvatarWrapper>
            <div className="detail">
              <p className="authorName">{author.name}</p>
              <p className="date">
                {formatRelative(new Date(Number(post.createdAt)), new Date(), {
                  locale: {
                    ...enUs,
                    formatRelative: (token) =>
                      formatRelativeLocale[
                        token as keyof typeof formatRelativeLocale
                      ]
                  }
                })}
              </p>
            </div>
          </UserInfoSTY>
          {currentUser.id === author.id && (
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="edit"
            >
              <FaTimes />
            </button>
          )}
          <div className="textContent">
            <p>{content}</p>
          </div>
        </ContainerSTY>
        {postImage && (
          <ImageContainerSTY>
            <Image
              src={postImage}
              fill
              alt={"post image"}
              style={{ objectFit: "contain" }}
            />
          </ImageContainerSTY>
        )}
        <PostOptionSTY>
          <button
            className="item"
            onClick={() => {
              if (post.likes.find((like) => like.user.id === currentUser.id)) {
                dislikePostHandler(postId);
              } else {
                likePostHandler(postId);
              }
            }}
            disabled={likePostLoading || dislikePostLoading}
          >
            <div
              style={{
                color: `${
                  post.likes.find((like) => like.user.id === currentUser.id)
                    ? "#1c7ed6"
                    : "#333"
                }`,
                transition: "color 0.3s ease"
              }}
            >
              <FaHeart />
              <span> likes</span>
            </div>
          </button>

          <button
            className="item"
            onClick={() => {
              setShowComments((prev) => !prev);
            }}
          >
            <FaRegCommentDots />
            <span>Comments</span>
          </button>
          <button className="item">
            <FaShare />
            <span>Share</span>
          </button>
        </PostOptionSTY>
        {showComments && <Comments postId={postId} currentUser={currentUser} />}
      </Card>
      {isModalOpen && (
        <Modal
          onConfirm={() => {
            setIsModalOpen(false);
          }}
        >
          {deletePostLoading ? (
            <LoadingContainer>
              <Spinner height={32} width={32} />
            </LoadingContainer>
          ) : (
            <OptionSTY>
              <div className="icon">
                <FaTrashAlt />
              </div>
              <div className="warning">
                <h3>Delete Post?</h3>
                <p>You'll permanently lost this post</p>
              </div>
              <div className="option-footer">
                <button
                  className="cancel"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button className="delete" onClick={deletePostHandler}>
                  Delete
                </button>
              </div>
            </OptionSTY>
          )}
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Index;
