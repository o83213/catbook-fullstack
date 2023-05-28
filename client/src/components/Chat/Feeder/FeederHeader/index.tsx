import { BodySTY } from "./style";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
import AvatarWrapper from "@components/AvatarWrapper";
import { useConversationStore } from "@store/convesationStore";
import { useConversationQuery, useGetProfileQuery } from "@generated/graphql";
import { formatUserNames } from "@utils/formatUserNames";
import Spinner from "@components/Spinner";
interface FeederHeaderProps {
  conversationId: string;
  userInfo: { id: string; name: string };
}
const FeederHeader = ({ conversationId, userInfo }: FeederHeaderProps) => {
  const closeConversation = useConversationStore(
    (state) => state.closeConversation
  );
  const { data, loading } = useConversationQuery({
    variables: { conversationId }
  });
  const { data: profileData } = useGetProfileQuery({
    variables: {
      userId: userInfo.id
    }
  });
  const conversation = data?.conversation;
  if (loading) return <Spinner height={32} width={32} />;
  return (
    <BodySTY>
      {!conversation ? (
        <div>Conversation Not Found</div>
      ) : (
        <div className="friend-info">
          <AvatarWrapper userId={userInfo.id}>
            <Image
              src={profileData?.getProfile.avatarImage || "/default-avatar.jpg"}
              width={40}
              height={40}
              alt={"user avatar"}
            />
          </AvatarWrapper>
          <h4>{formatUserNames(conversation.participants, userInfo.id)}</h4>
        </div>
      )}
      <div>
        <div className="option-list">
          <button onClick={closeConversation}>
            <FaTimes />
          </button>
        </div>
      </div>
    </BodySTY>
  );
};
export default FeederHeader;
