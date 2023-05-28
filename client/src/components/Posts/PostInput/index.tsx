import React from "react";
import Image from "next/image";
//
import { UserInfoSTY, ToolListSTY } from "./style";
import Card from "@components/Card";
import { GetMeQuery } from "@generated/graphql";
import UserAvatar from "@components/UserAvatar";
//
type User = NonNullable<GetMeQuery["getMe"]>;
//
interface PropsType {
  openForm: () => void;
  user: User;
}

const Index = ({ openForm, user }: PropsType) => {
  return (
    <Card>
      <UserInfoSTY>
        <UserAvatar avatarImage={user.profile.avatarImage} />
        <p onClick={openForm}>What's on your mind?</p>
      </UserInfoSTY>
      <ToolListSTY>
        <div className="tool-button-list">
          <button>
            <Image
              src={"/images/icons/1.png"}
              width={20}
              height={20}
              alt="image icon"
            ></Image>
            Add Image
          </button>
          <button>
            <Image
              src={"/images/icons/1.png"}
              width={20}
              height={20}
              alt="image icon"
            ></Image>
            Add Place
          </button>
          <button>
            <Image
              src={"/images/icons/1.png"}
              width={20}
              height={20}
              alt="image icon"
            ></Image>
            Tag Friends
          </button>
        </div>
      </ToolListSTY>
    </Card>
  );
};

export default Index;
