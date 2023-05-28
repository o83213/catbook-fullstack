import { BodySTY } from "./style";
import FeederHeader from "./FeederHeader";
import FeederContent from "./FeederContent";
import FeederFooter from "./FeederFooter";
import { useConversationStore } from "@store/convesationStore";
import { getDataFromToken } from "@utils/getDataFromToken";
const Feeder = () => {
  const conversationId = useConversationStore(
    (state) => state.currentConversationId
  );
  const userInfo = getDataFromToken();
  if (!userInfo) {
    return <div>Not Login...</div>;
  }
  return (
    <BodySTY>
      <FeederHeader conversationId={conversationId} userInfo={userInfo} />
      <FeederContent conversationId={conversationId} userInfo={userInfo} />
      <FeederFooter conversationId={conversationId} userInfo={userInfo} />
    </BodySTY>
  );
};

export default Feeder;
