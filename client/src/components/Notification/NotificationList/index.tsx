import { BodySTY } from "./style";
import NotificationItem from "../NotificationItem";
import {
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
  GetMeQuery,
  GetUserfriendsDocument
} from "@generated/graphql";
import GetMeNode from "@graphql/queries/getMe.query";
//
interface Props {
  friendRequest: string[];
  userId: string;
  onClose: () => void;
}
//
const NotificationList = ({ friendRequest, userId }: Props) => {
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [rejectFriendRequest] = useRejectFriendRequestMutation();
  const handleAccept = async (friendId: string) => {
    try {
      await acceptFriendRequest({
        variables: {
          requestorId: friendId
        },
        optimisticResponse: {
          acceptFriendRequest: true
        },
        update: (cache) => {
          // update notification list
          const oldMeData = cache.readQuery<GetMeQuery>({
            query: GetMeNode
          });
          if (!oldMeData) {
            return;
          }
          cache.writeQuery<GetMeQuery>({
            query: GetMeNode,
            data: {
              getMe: {
                ...oldMeData.getMe!,
                friendRequests: [
                  ...oldMeData.getMe!.friendRequests.filter(
                    (userId) => userId !== friendId
                  )
                ]
              }
            }
          });
        },
        refetchQueries: [
          { query: GetUserfriendsDocument, variables: { userId } }
        ]
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleReject = async (friendId: string) => {
    try {
      await rejectFriendRequest({
        variables: {
          requestorId: friendId
        },
        optimisticResponse: {
          rejectFriendRequest: true
        },
        update: (cache) => {
          const oldMeData = cache.readQuery<GetMeQuery>({
            query: GetMeNode
          });
          if (!oldMeData) {
            return;
          }
          cache.writeQuery<GetMeQuery>({
            query: GetMeNode,
            data: {
              getMe: {
                ...oldMeData.getMe!,
                friendRequests: [
                  ...oldMeData.getMe!.friendRequests.filter(
                    (userId) => userId !== friendId
                  )
                ]
              }
            }
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <BodySTY>
      <h3>Notifications</h3>
      {friendRequest.length === 0 ? (
        <div>No any Friend request</div>
      ) : (
        friendRequest.map((requestUserId) => {
          return (
            <NotificationItem
              key={requestUserId}
              requestUserId={requestUserId}
              onAcceptFriend={handleAccept.bind(null, requestUserId)}
              onRejectFriend={handleReject.bind(null, requestUserId)}
            />
          );
        })
      )}
    </BodySTY>
  );
};
//
export default NotificationList;
