import Image from "next/image";
import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaTwitter
} from "react-icons/fa";
import { FiMail, FiMoreVertical } from "react-icons/fi";
import { GrLanguage } from "react-icons/gr";
//
import { ProfileSTY } from "./style";
import Modal from "@components/Modal";
import ProfileInputForm from "@components/Profile/InputForm";
import {
  GetMeQuery,
  GetProfileQuery,
  useGetUserfriendsQuery,
  useSendFriendRequestMutation
} from "@generated/graphql";
import getProfileNode from "@graphql/queries/getProfile.query";
import Spinner from "@components/Spinner";
//
type MeInfo = NonNullable<GetMeQuery["getMe"]>;
type Profile = NonNullable<GetProfileQuery["getProfile"]>;
interface Props {
  currentUser: MeInfo;
  userProfile: Profile;
  userId: string;
}
//
const UserInfo = ({ currentUser, userProfile, userId }: Props) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { user, avatarImage, coverImage, bio } = userProfile;
  const [isLoading, setIsLoading] = useState(false);
  const { data: friendsData } = useGetUserfriendsQuery({
    variables: {
      userId: currentUser.id
    }
  });

  const [sendFriendRequestMutation] = useSendFriendRequestMutation({
    refetchQueries: [getProfileNode]
  });
  const relationshipData: string[] = friendsData?.getUserfriends
    ? friendsData?.getUserfriends?.map((friend) => friend.id)
    : [];
  const sendFriendRequestHandler = (addresseeId: string) => {
    if (relationshipData.includes(userId)) {
      return;
    }
    sendFriendRequestMutation({
      variables: {
        addresseeId
      }
    });
  };
  const isCurrentUser = currentUser.id === userId;
  const isFriend = relationshipData.includes(userId);
  const isSendingRequest = user.friendRequests.includes(currentUser.id);
  return (
    <ProfileSTY>
      <div className="images">
        <Image
          src={coverImage ? coverImage : "/images/default_cover.jpg"}
          alt=""
          fill
          style={{ marginTop: "10px", objectFit: "fill", borderRadius: "10px" }}
        />
        <div className="profile-picture">
          <Image
            src={avatarImage ? avatarImage : "/images/meme_cat.jpg"}
            alt=""
            fill
            style={{ objectFit: "fill" }}
          />
        </div>
      </div>

      <div className="user-info">
        <div className="header">
          <div className="name">{user.name}</div>
          <div className="bio">{bio}</div>
        </div>
        <div className="content">
          <div className="left">
            <a href="https://www.facebook.com">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/">
              <FaTwitter />
            </a>
            <a href="https://www.linkedin.com/">
              <FaLinkedin />
            </a>
          </div>
          <div className="center">
            <div className="info">
              <div className="item">
                <FaMapMarkerAlt />
                <span>{"Taiwan"}</span>
              </div>
              <div className="item">
                <GrLanguage />
                <span>{"brian.dev"}</span>
              </div>
            </div>
          </div>
          <div className="right">
            <FiMail />
            <FiMoreVertical />
          </div>
        </div>
        {isCurrentUser ? (
          <button onClick={() => setOpenUpdate(true)}>Update</button>
        ) : isFriend ? (
          <button disabled>Friend</button>
        ) : isSendingRequest ? (
          <button disabled>Sending Request...</button>
        ) : (
          <button onClick={sendFriendRequestHandler.bind(null, userId)}>
            Add Friend
          </button>
        )}
      </div>
      {openUpdate && (
        <Modal
          onConfirm={() => {
            setOpenUpdate(false);
          }}
        >
          {isLoading && <Spinner height={32} width={32} />}
          <ProfileInputForm
            onClose={() => {
              setOpenUpdate(false);
            }}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            profile={userProfile}
            currentUser={currentUser}
          />
        </Modal>
      )}
    </ProfileSTY>
  );
};

export default UserInfo;
