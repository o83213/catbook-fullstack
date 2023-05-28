import { BodySTY } from "./style";
import Image from "next/image";
//
interface Props {
  avatarImage: string;
  userName: string;
  onClick: () => void;
}
//
const FriendItem = ({ avatarImage, userName, onClick }: Props) => {
  return (
    <BodySTY onClick={onClick}>
      <Image src={avatarImage} width={30} height={30} alt="user name avatar"></Image>
      <div>{userName}</div>
    </BodySTY>
  );
};

export default FriendItem;
