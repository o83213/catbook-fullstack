import React, { useState } from "react";
import { FaBell, FaFacebookMessenger } from "react-icons/fa";
//
import { BodySTY, IconSTY } from "./style";
import UserAvatar from "@components/UserAvatar";
import NotificationList from "@components/Notification/NotificationList";
import MenuList from "@components/Menu/MenuList";
import ConversationWrapper from "@components/Chat/Conversations/ConversationWrapper";
import { GetMeQuery } from "@generated/graphql";
//
type ToolList = "notification" | "menu" | "messenger";
type MeType = NonNullable<GetMeQuery["getMe"]>;
interface Props {
  meData: MeType;
}
const RightHeader = ({ meData }: Props) => {
  const [openTool, setOpenTool] = useState<ToolList | null>(null);
  const closeHandler = () => {
    setOpenTool(null);
  };
  return (
    <BodySTY>
      <IconSTY
        onClick={() => {
          if (openTool === "messenger") {
            setOpenTool(null);
          } else {
            setOpenTool("messenger");
          }
        }}
      >
        <FaFacebookMessenger />
      </IconSTY>
      <IconSTY
        onClick={() => {
          if (openTool === "notification") {
            setOpenTool(null);
          } else {
            setOpenTool("notification");
          }
        }}
      >
        {meData.friendRequests.length > 0 && (
          <React.Fragment>
            <div className="notification-count">
              {meData.friendRequests.length}
            </div>
          </React.Fragment>
        )}
        <FaBell />
      </IconSTY>
      <UserAvatar
        avatarImage={meData.profile.avatarImage}
        onClick={() => {
          if (openTool === "menu") {
            setOpenTool(null);
          } else {
            setOpenTool("menu");
          }
        }}
      />
      {openTool === "messenger" && (
        <div className="notificationContainer">
          <ConversationWrapper />
        </div>
      )}
      {openTool === "notification" && (
        <div className="notificationContainer">
          <NotificationList
            friendRequest={meData.friendRequests}
            userId={meData.id}
            onClose={closeHandler}
          />
        </div>
      )}
      {openTool === "menu" && (
        <div className="notificationContainer">
          <MenuList userId={meData.id} onClose={closeHandler} />
        </div>
      )}
    </BodySTY>
  );
};

export default RightHeader;
