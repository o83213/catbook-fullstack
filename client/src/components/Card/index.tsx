import React from "react";
import { BodySTY } from "./style";
interface PropsType {
  children?: React.ReactNode;
}
const Card = (props: PropsType) => {
  return <BodySTY>{props.children}</BodySTY>;
};

export default Card;
