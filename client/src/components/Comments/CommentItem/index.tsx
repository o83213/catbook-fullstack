import Image from "next/image";
//
import { BodySTY } from "./style";
import AvatarWrapper from "@components/AvatarWrapper";
import { GetAllCommentsQuery } from "@generated/graphql";
import { formatRelative } from "date-fns";
import enUs from "date-fns/locale/en-US";
//
const formatRelativeLocale = {
  lastWeek: "eeee",
  yesterday: "'Yesterday",
  today: "p",
  other: "MM/dd/yy"
};
//
type Comment = GetAllCommentsQuery["getAllComments"][0];
interface Props {
  comment: Comment;
}
const Index = ({ comment }: Props) => {
  console.log("comment", comment);
  return (
    <BodySTY>
      <div className="author">
        <AvatarWrapper userId={comment.author.id}>
          <Image
            src={comment.author.profile?.avatarImage}
            width={40}
            height={40}
            alt="comment author avatar"
          ></Image>
        </AvatarWrapper>
      </div>
      <div className="content">
        <h4>{comment.author.name}</h4>
        <div>{comment.content}</div>
      </div>
      <div className="date">
        {formatRelative(new Date(Number(comment.createdAt)), new Date(), {
          locale: {
            ...enUs,
            formatRelative: (token) =>
              formatRelativeLocale[token as keyof typeof formatRelativeLocale]
          }
        })}
      </div>
    </BodySTY>
  );
};

export default Index;
