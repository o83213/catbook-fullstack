import { BodySTY } from "./style";
import { BsGearFill, BsFillDoorOpenFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useLogoutMutation } from "@generated/graphql";
import { useCallback } from "react";
//
interface Props {
  userId: string;
  onClose: () => void;
}
//
const MenuList = ({ userId, onClose }: Props) => {
  const router = useRouter();
  const [logout, { client }] = useLogoutMutation();
  const logoutHandler = useCallback(() => {
    logout()
      .then(() => {
        localStorage.removeItem("accessToken");
        return client.clearStore();
      })
      .finally(() => {
        router.push("/");
        onClose();
      });
  }, [client, logout, onClose, router]);
  return (
    <BodySTY>
      <button
        className="menu-item"
        onClick={() => {
          router.push(`/profile/${userId}`);
          onClose();
        }}
      >
        <div className="icon-container">
          <BsGearFill size={16} />
        </div>
        <div className="item-content">查看個人檔案</div>
      </button>
      <button className="menu-item" onClick={logoutHandler}>
        <div className="icon-container">
          <BsFillDoorOpenFill size={16} />
        </div>
        <div className="item-content">登出</div>
      </button>
    </BodySTY>
  );
};

export default MenuList;
