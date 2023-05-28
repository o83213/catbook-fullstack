import { BodySTY } from "./style";
const Container = (props: { children?: React.ReactNode }) => {
  return <BodySTY>{props.children}</BodySTY>;
};

export default Container;
