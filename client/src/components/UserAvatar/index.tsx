import Image from "next/image";
//
interface Props {
  avatarImage: string;
  onClick?: () => void;
}

const UserAvatar = ({ avatarImage, onClick }: Props) => {
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <Image
        src={avatarImage}
        width={40}
        height={40}
        alt={"userAvatar"}
        style={{ borderRadius: "50%", objectFit: "contain" }}
      ></Image>
    </div>
  );
};

export default UserAvatar;
