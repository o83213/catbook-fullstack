import React from "react";
import { BodySTY } from "./style";
import cx from "classnames";

interface I_Button {
  name: string;
  className?: string | any;
  onCallBack?: (e: any) => void;
}

const Button: React.FC<I_Button> = (props) => {
  const { name, className, onCallBack } = props;
  return (
    <BodySTY className={cx({ [className]: className })}>
      <button
        onClick={(e) => {
          e.preventDefault();
          onCallBack && onCallBack(e);
        }}
      >
        {name}
      </button>
    </BodySTY>
  );
};

export default Button;
