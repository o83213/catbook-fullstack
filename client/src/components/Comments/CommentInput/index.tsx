import { useState } from "react";
import { BodySTY } from "./style";
import { GetMeQuery } from "@generated/graphql";
import UserAvatar from "@components/UserAvatar";
//
type User = NonNullable<GetMeQuery["getMe"]>;
//
interface Props {
  submitHandler: (content: string) => void;
  currentUser: User;
}
//
const Index = ({ submitHandler, currentUser }: Props) => {
  const [content, setContent] = useState("");
  return (
    <BodySTY
      onSubmit={(event) => {
        event.preventDefault();
        submitHandler(content);
        setContent("");
      }}
    >
      <div className="author">
        <UserAvatar avatarImage={currentUser.profile.avatarImage} />
      </div>
      <input
        type="text"
        placeholder="write some comments..."
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
    </BodySTY>
  );
};

export default Index;
