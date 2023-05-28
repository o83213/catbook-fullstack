import React from "react";
import { BodySTY } from "./style";
import LeftHeader from "./LeftHeader";
import RightHeader from "./RightHeader";
import { GetMeQuery } from "@generated/graphql";
//
type MeType = NonNullable<GetMeQuery["getMe"]>;
interface Props {
  meData: MeType;
}
//
const Header = ({ meData }: Props) => {
  return (
    <BodySTY>
      <LeftHeader />
      <RightHeader meData={meData} />
    </BodySTY>
  );
};

export default Header;
