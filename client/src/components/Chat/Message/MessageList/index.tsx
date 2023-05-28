import { MessagesQuery, useMessagesQuery } from "@generated/graphql";
import Spinner from "@components/Spinner";
import { BodySTY } from "./style";
import MessageItem from "../MessageItem";
import MessageSent from "@graphql/subscriptions/messageSent.subscription";
import { useEffect } from "react";
//
export type Message = MessagesQuery["messages"][0];
interface MessageListProps {
  userInfo: {
    id: string;
    name: string;
  };
  conversationId: string;
}

const MessageList = ({ userInfo, conversationId }: MessageListProps) => {
  const { data, loading, subscribeToMore } = useMessagesQuery({
    variables: { conversationId },
    onError: ({ message }) => {
      console.log("message", message);
    },
    fetchPolicy: "network-only"
  });
  const subscribeToMoreMessages = (conversationId: string) => {
    return subscribeToMore({
      document: MessageSent,
      variables: { conversationId },
      updateQuery: (
        prev,
        {
          subscriptionData
        }: { subscriptionData: { data: { messageSent: Message } } }
      ) => {
        if (!subscriptionData.data) return prev;
        const newMessage = subscriptionData.data.messageSent;
        return Object.assign({}, prev, {
          messages:
            newMessage.sender.id === userInfo.id
              ? prev.messages
              : [newMessage, ...prev.messages]
        });
      }
    });
  };
  useEffect(() => {
    const unsubscribe = subscribeToMoreMessages(conversationId);
    return () => unsubscribe();
  }, [conversationId]);
  return (
    <BodySTY>
      {loading && <Spinner height={32} width={32} />}
      {data?.messages &&
        data.messages.map((message) => (
          <MessageItem
            key={message.id}
            isUser={userInfo.id === message.sender?.id}
            message={message}
          />
        ))}
    </BodySTY>
  );
};

export default MessageList;
