import { GetUserfriendsQuery } from "@generated/graphql";
type Friends = GetUserfriendsQuery["getUserfriends"];
export const createFriendsMap = (friends: Friends) => {
  const friendsMap: { [key: string]: any } = {};
  friends.forEach((friend) => {
    friendsMap[friend.id] = true;
  });
  return friendsMap;
};
