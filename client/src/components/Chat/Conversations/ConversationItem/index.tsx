import React, { useState } from "react";
import { BodySTY, ContentSTY, ContainerSTY, OptionSTY } from "./style";
import { ConversationsQuery } from "@generated/graphql";
import { formatUserNames } from "@utils/formatUserNames";
import { formatRelative } from "date-fns";
import enUs from "date-fns/locale/en-US";
import Image from "next/image";
import { GoPrimitiveDot } from "react-icons/go";
import { FaTrashAlt, FaTimes } from "react-icons/fa";
import Modal from "@root/components/Modal";
import { useGetProfileQuery } from "@generated/graphql";
//
const formatRelativeLocale = {
  lastWeek: "eeee",
  yesterday: "'Yesterday",
  today: "p",
  other: "MM/dd/yy"
};
//
export type ConversationType = ConversationsQuery["conversations"][0];
interface ConversationItemProps {
  userId: string;
  conversation: ConversationType;
  onClick: () => void;
  isSelected: boolean;
  hasSeenLatestMessage: boolean | undefined;
  onDeleteConversation: (conversationId: string) => void;
}
const ConversationItem = ({
  userId,
  conversation,
  onClick,
  isSelected,
  hasSeenLatestMessage,
  onDeleteConversation
}: ConversationItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sender = conversation.participants.find(
    (participant) => participant.user.id !== userId
  );
  const { data: profileData } = useGetProfileQuery({
    variables: {
      userId: sender!.user.id
    }
  });
  const handleClick = (event: React.MouseEvent) => {
    if (event.type === "click") {
      onClick();
    } else if (event.type === "contextmenu") {
      event.preventDefault();
    }
  };
  return (
    <React.Fragment>
      <ContainerSTY>
        <BodySTY isSelected={isSelected} onClick={handleClick}>
          <div style={{ position: "absolute", left: "-12px" }}>
            {!hasSeenLatestMessage && (
              <GoPrimitiveDot size={18} color={"#1c7ed6"} />
            )}
          </div>
          <div className="participants-info">
            <Image
              src={profileData?.getProfile.avatarImage || "/default-avatar.jpg"}
              alt="default avatar"
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            ></Image>
          </div>
          <ContentSTY>
            <div className="content-message">
              <div className="participant-name">
                {formatUserNames(conversation.participants, userId)}
              </div>
              <div className="latest-message">
                {conversation.latestMessage
                  ? conversation.latestMessage.body
                  : "No message"}
              </div>
            </div>
            <div className="content-time">
              {formatRelative(new Date(conversation.updatedAt), new Date(), {
                locale: {
                  ...enUs,
                  formatRelative: (token) =>
                    formatRelativeLocale[
                      token as keyof typeof formatRelativeLocale
                    ]
                }
              })}
            </div>
          </ContentSTY>
        </BodySTY>
        <button
          className="menu-button"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <FaTimes />
        </button>
      </ContainerSTY>

      {isModalOpen && (
        <Modal
          onConfirm={() => {
            setIsModalOpen(false);
          }}
        >
          <OptionSTY>
            <div className="icon">
              <FaTrashAlt />
            </div>
            <div className="warning">
              <h3>Delete Conversation?</h3>
              <p>You'll permanently lost this conversation!</p>
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
              <button
                className="delete"
                onClick={() => {
                  onDeleteConversation(conversation.id);
                  setIsModalOpen(false);
                }}
              >
                Delete
              </button>
            </div>
          </OptionSTY>
        </Modal>
      )}
    </React.Fragment>
  );
};
export default ConversationItem;
