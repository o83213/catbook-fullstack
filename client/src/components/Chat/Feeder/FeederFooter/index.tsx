import { useState } from "react";
import { BiSend } from "react-icons/bi";
import { BodySTY, StyledInputBox } from "./style";
import { useSendMessageMutation, MessagesQuery } from "@generated/graphql";
import MessagesQueryNode from "@graphql/queries/messages.query";
import { v4 as uuid } from "uuid";
interface MessageInputProps {
  userInfo: {
    id: string;
    name: string;
  };
  conversationId: string;
}
const FeederFooter = ({ userInfo, conversationId }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [sendMessage] = useSendMessageMutation();
  const onSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setMessage("");
      const newMessage = {
        id: uuid(),
        senderId: userInfo.id,
        conversationId,
        body: message
      };
      const { data, errors } = await sendMessage({
        variables: { ...newMessage },
        optimisticResponse: {
          sendMessage: true
        },
        update: (cache) => {
          const exsiting = cache.readQuery<MessagesQuery>({
            query: MessagesQueryNode,
            variables: { conversationId }
          }) as MessagesQuery;
          cache.writeQuery<MessagesQuery, { conversationId: string }>({
            query: MessagesQueryNode,
            variables: { conversationId },
            data: {
              ...exsiting,
              messages: [
                {
                  __typename: "Message",
                  id: newMessage.id,
                  sender: {
                    __typename: "User",
                    id: newMessage.senderId,
                    name: userInfo.name
                  },
                  body: newMessage.body,
                  createdAt: new Date(Date.now())
                },
                ...exsiting.messages
              ]
            }
          });
        }
      });

      if (!data?.sendMessage || errors)
        throw new Error("Message sent failed...");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <BodySTY onSubmit={onSendMessage}>
      <StyledInputBox>
        <input
          placeholder="Message..."
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
      </StyledInputBox>
      <button className="icon" type="submit">
        <BiSend />
      </button>
    </BodySTY>
  );
};
export default FeederFooter;
