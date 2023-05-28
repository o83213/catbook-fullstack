import { BodySTY } from "./style";
import Messenger from "@components/Friends";
import { GetMeQuery } from "@generated/graphql";
//
type MeType = NonNullable<GetMeQuery["getMe"]>;
interface Props {
  meData: MeType;
}
//
const RightBar = ({ meData }: Props) => {
  return (
    <BodySTY>
      <Messenger userId={meData.id} />
    </BodySTY>
  );
};

export default RightBar;
