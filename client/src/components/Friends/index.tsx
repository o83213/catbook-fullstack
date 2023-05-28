import { BodySTY } from "./style";
import FriendItem from "./FriendItem";
import {
  useGetUserfriendsQuery,
  useCreateConversationMutation
} from "@generated/graphql";
import { useConversationStore } from "@store/convesationStore";
//
// const DUMMY_DATA = [{ id: uuid(), avatarImage: "/images/meme_cat.jpg", userName: "User 123" }];
//
interface Props {
  userId: string;
}
//
const Messenger = ({ userId }: Props) => {
  const { data, loading, error } = useGetUserfriendsQuery({
    variables: {
      userId
    },
    fetchPolicy: "network-only"
  });
  const [createConversation] = useCreateConversationMutation();
  const toggleConversationOpen = useConversationStore(
    (state) => state.openConversation
  );
  const setCurrentConversationId = useConversationStore(
    (state) => state.setCurrentConversationId
  );
  const createConversationHandler = async (friendId: string) => {
    try {
      const { data } = await createConversation({
        variables: {
          participantsIds: [userId, friendId]
        }
      });
      if (!data) {
        throw new Error("Can't create conversation");
      }
      setCurrentConversationId(data.createConversation.conversationId);
      toggleConversationOpen();
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <div>loading...</div>;
  }
  if (!data || error) {
    return <div>Something went wrong...</div>;
  }
  return (
    <BodySTY>
      <h3 className="list-header">Friends</h3>
      {data.getUserfriends.length === 0 ? (
        <div>You don't have any friend yet!</div>
      ) : (
        data.getUserfriends.map((friend) => {
          return (
            <FriendItem
              key={friend.id}
              avatarImage={friend.profile.avatarImage}
              userName={friend.name!}
              onClick={createConversationHandler.bind(null, friend.id)}
            />
          );
        })
      )}
    </BodySTY>
  );
};

export default Messenger;
