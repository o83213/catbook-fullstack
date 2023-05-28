import { BodySTY } from "./style";
import ConversationItem, { ConversationType } from "../ConversationItem";
import { useConversationStore } from "@store/convesationStore";
import {
  useDeleteConversationMutation,
  useConversationDeletedSubscription
} from "@generated/graphql";
import { toast } from "react-hot-toast";
//
interface ConversationListProps {
  conversations: ConversationType[];
  userId: string;
  onViewConversation: (
    conversationId: string,
    hasSeenLatestMessage: boolean | undefined
  ) => void;
}
//
const ConversationList = ({
  conversations,
  userId,
  onViewConversation
}: ConversationListProps) => {
  const { currentConversationId, closeConversation } = useConversationStore(
    (state) => ({
      currentConversationId: state.currentConversationId,
      closeConversation: state.closeConversation
    })
  );
  const [deleteConversation] = useDeleteConversationMutation();
  const {} = useConversationDeletedSubscription({
    onData: ({ client, data }) => {
      const { data: subscriptionData } = data;
      if (!subscriptionData) return;
      const {
        conversationDeleted: {
          conversation: { id }
        }
      } = subscriptionData;
      client.cache.evict({ id: `Conversation:${id}` });
    }
  });
  const onDeleteConversation = async (conversationId: string) => {
    try {
      toast.promise(
        deleteConversation({
          variables: { conversationId },
          update: (cache) => {
            cache.evict({ id: `Conversation:${conversationId}` });
          }
        }),
        {
          loading: "Deleting conversation...",
          success: "Conversation deleted",
          error: "Failed to delete conversation"
        }
      );
      if (currentConversationId === conversationId) {
        closeConversation();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sortedConversations = [...conversations].sort((a, b) => {
    const aDate = new Date(a.updatedAt).getTime();
    const bDate = new Date(b.updatedAt).getTime();
    return bDate - aDate;
  });

  return (
    <BodySTY>
      <h3>Conversations</h3>
      {sortedConversations.length === 0 ? (
        <div>No conversation...</div>
      ) : (
        sortedConversations.map((conversation) => {
          const participant = conversation.participants.find(
            (p) => p.user?.id === userId
          );
          return (
            <ConversationItem
              key={conversation.id}
              userId={userId}
              conversation={conversation}
              onClick={() =>
                onViewConversation(
                  conversation.id!,
                  participant?.hasSeenLatestMessage
                )
              }
              hasSeenLatestMessage={participant?.hasSeenLatestMessage}
              isSelected={currentConversationId === conversation.id}
              onDeleteConversation={onDeleteConversation}
            />
          );
        })
      )}
    </BodySTY>
  );
};
export default ConversationList;
