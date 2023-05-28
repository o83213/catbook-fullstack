import MessageList from "@root/components/Chat/Message/MessageList";
interface FeederContentProps {
  conversationId: string;
  userInfo: {
    id: string;
    name: string;
  };
}
const FeederContent = ({ conversationId, userInfo }: FeederContentProps) => {
  return <MessageList conversationId={conversationId} userInfo={userInfo} />;
};
export default FeederContent;
