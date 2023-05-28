import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo } from "react";
//
import { GetAllUsersQuery, GetUserfriendsQuery } from "@generated/graphql";
import { BodySTY } from "./style";
import { createFriendsMap } from "@utils/createFriendsMap";
//
type Users = GetAllUsersQuery["getUsers"];
type Friends = GetUserfriendsQuery["getUserfriends"];
interface Props {
  users: Users;
  currentUserFriends: Friends;
}
//

//
const ProfileList = ({ users, currentUserFriends }: Props) => {
  const router = useRouter();
  const moveToProfile = (userId: string) => {
    router.push(`/profile/${userId}`);
  };
  const friendsMap = useMemo(
    () => createFriendsMap(currentUserFriends),
    [currentUserFriends]
  );
  return (
    <BodySTY>
      {users.length === 0 ? (
        <div>No user found...</div>
      ) : (
        users.map((user) => {
          return (
            <div
              key={user.profile.id}
              className="profile-item"
              onClick={moveToProfile.bind(null, user.id)}
            >
              <Image
                src={user.profile.avatarImage!}
                alt="avatar"
                width={32}
                height={32}
                style={{ borderRadius: "50%" }}
              />
              <div className="profile-info">
                <div>{user.name}</div>
                {user.id in friendsMap && <div>friend</div>}
              </div>
            </div>
          );
        })
      )}
    </BodySTY>
  );
};
export default ProfileList;
