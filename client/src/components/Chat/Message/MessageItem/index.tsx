import AvatarWrapper from "@root/components/AvatarWrapper";
import { BodySTY } from "./style";
import Image from "next/image";
import type { Message } from "../MessageList";
import { formatRelative } from "date-fns";
import enUs from "date-fns/locale/en-US";
import { useGetProfileQuery } from "@generated/graphql";
//
const formatRelativeLocale = {
  lastWeek: "eeee",
  yesterday: "'Yesterday at' p",
  today: "p",
  other: "MM/dd/yy"
};
//
interface MessageItemProps {
  isUser: boolean;
  message: Message;
}
const MessageItem = ({ isUser, message }: MessageItemProps) => {
  const { data: profileData } = useGetProfileQuery({
    variables: {
      userId: message.sender!.id
    }
  });
  return (
    <BodySTY isUser={isUser}>
      {!isUser && (
        <AvatarWrapper userId={message.sender!.id}>
          <Image
            src={profileData?.getProfile.avatarImage || "/default-avatar.jpg"}
            width={40}
            height={40}
            alt="user avatar"
          />
        </AvatarWrapper>
      )}

      <div className="message">
        <div className="message-time">
          {formatRelative(new Date(message.createdAt), new Date(), {
            locale: {
              ...enUs,
              formatRelative: (token) =>
                formatRelativeLocale[token as keyof typeof formatRelativeLocale]
            }
          })}
        </div>
        <div className="message-body">{message.body}</div>
      </div>
    </BodySTY>
  );
};

export default MessageItem;
