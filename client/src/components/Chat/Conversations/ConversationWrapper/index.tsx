import { useEffect } from "react";
import { useRouter } from "next/router";
import { getDataFromToken } from "@utils/getDataFromToken";
import {
  useConversationsQuery,
  ConversationsQuery,
  useMarkConversationAsReadMutation,
  useConversationUpdatedSubscription
} from "@generated/graphql";
import ConversationList from "../ConversationList";
import Spinner from "@components/Spinner";
import { BodySTY } from "./style";
import { useConversationStore } from "@store/convesationStore";
import ConversationCreated from "@graphql/subscriptions/conversationCreated.subscription";
import { cache } from "@lib/cache";
import { gql } from "@apollo/client";

//
type Conversation = ConversationsQuery["conversations"][0];
type Participants = Conversation["participants"];
const ConversationWrapper = () => {
  const router = useRouter();
  const userInfo = getDataFromToken();
  const { data, loading, subscribeToMore } = useConversationsQuery({
    fetchPolicy: "network-only"
  });
  useConversationUpdatedSubscription({
    onData: ({ client, data }) => {
      const { data: subscriptionData } = data;
      if (!subscriptionData) return;
      const {
        conversationUpdated: { conversation: updatedConversation }
      } = subscriptionData;
      const currentlyViewingConversation =
        conversationModalIsOpen &&
        currentConversationId === updatedConversation.id;

      if (currentlyViewingConversation) {
        onViewConversation(currentConversationId, false);
      }
    }
  });
  const [markConversationAsRead] = useMarkConversationAsReadMutation();
  const {
    setCurrentConversationId,
    openConversation,
    currentConversationId,
    isOpen: conversationModalIsOpen
  } = useConversationStore((state) => {
    return {
      setCurrentConversationId: state.setCurrentConversationId,
      openConversation: state.openConversation,
      currentConversationId: state.currentConversationId,
      isOpen: state.isOpen
    };
  });
  useEffect(() => {
    subscribeToNewConversations();
    return () => {
      cache.evict({ fieldName: "conversations" });
      cache.gc();
    };
  }, [cache]);

  const onViewConversation = async (
    conversationId: string,
    hasSeenLatestMessage: boolean | undefined
  ) => {
    setCurrentConversationId(conversationId);
    openConversation();
    if (hasSeenLatestMessage) return;
    try {
      if (!userInfo || !userInfo.id) {
        throw new Error("User not login!");
      }
      await markConversationAsRead({
        variables: {
          conversationId
        },
        optimisticResponse: {
          markConversationAsRead: true
        },
        update: (cache) => {
          const participantFragment = cache.readFragment<{
            participants: Participants;
          }>({
            id: `Conversation:${conversationId}`,
            fragment: gql`
              fragment Participants on Conversation {
                participants {
                  user {
                    id
                    name
                  }
                  hasSeenLatestMessage
                }
              }
            `
          });
          if (!participantFragment) return;
          const participants = [...participantFragment.participants];
          const userParticipantIdx = participants.findIndex(
            (p) => p.user.id === userId
          );
          if (userParticipantIdx === -1) return;
          const userParticipant = participants[userParticipantIdx];
          participants[userParticipantIdx] = {
            ...userParticipant,
            hasSeenLatestMessage: true
          };
          cache.writeFragment({
            id: `Conversation:${conversationId}`,
            fragment: gql`
              fragment UpdateParticipant on Conversation {
                participants
              }
            `,
            data: {
              participants
            }
          });
        }
      });
    } catch (error) {
      console.log("onViewConversation error", error);
    }
  };
  //
  const subscribeToNewConversations = () => {
    return subscribeToMore({
      document: ConversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData
        }: {
          subscriptionData: {
            data: { conversationCreated: { conversation: Conversation } };
          };
        }
      ) => {
        if (!subscriptionData.data) return prev;
        const newConversation =
          subscriptionData.data.conversationCreated.conversation;

        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations]
        });
      }
    });
  };
  //
  if (!userInfo) {
    router.push("/auth");
    return <div>Not log in...</div>;
  }
  if (loading)
    return (
      <BodySTY>
        <Spinner height={32} width={32} />
      </BodySTY>
    );
  if (!data || !data.conversations) return <div>Not found</div>;
  const userId = userInfo.id;
  /*
  Execute the subscribeToNewConversations function when the component is mounted
  */
  return (
    <BodySTY>
      <ConversationList
        userId={userId}
        conversations={data.conversations}
        onViewConversation={onViewConversation}
      />
    </BodySTY>
  );
};

export default ConversationWrapper;
