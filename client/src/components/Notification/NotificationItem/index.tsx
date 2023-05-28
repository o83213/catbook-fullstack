import Image from "next/image";
//
import { BodySTY } from "./style";
import AvatarWraper from "@components/AvatarWrapper";
import { useGetProfileQuery } from "@generated/graphql";
//
interface Props {
  requestUserId: string;
  onAcceptFriend: () => void;
  onRejectFriend: () => void;
}
//
const NotificationItem = ({
  requestUserId,
  onAcceptFriend,
  onRejectFriend
}: Props) => {
  const { data, loading } = useGetProfileQuery({
    variables: { userId: requestUserId }
  });

  if (loading || !data) {
    return <div>loading...</div>;
  }
  return (
    <BodySTY>
      <div className="notification-info">
        <AvatarWraper userId={requestUserId}>
          <Image
            src={data.getProfile?.avatarImage}
            fill
            alt={"author avatar"}
          ></Image>
        </AvatarWraper>
        <div className="notification-content">
          <b>{data.getProfile?.user.name}</b>
          <span> wants to be your friend!</span>
        </div>
      </div>
      <div className="notification-options">
        <button className="accept" onClick={() => onAcceptFriend()}>
          accept
        </button>
        <button className="reject" onClick={() => onRejectFriend()}>
          reject
        </button>
      </div>
    </BodySTY>
  );
};

export default NotificationItem;
