import React from "react";
import { BodySTY } from "./style";

interface I_LoginInput {
  type: string; // input的格式
  inputName: string;
  title?: string;
  icon?: string; // google icons
  className?: string;
  onChangeCallback?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: any) => void;
}

const LoginInput: React.FC<I_LoginInput> = (props) => {
  const { type, inputName, title, icon, className, onChangeCallback } = props;

  return (
    <BodySTY className={className}>
      <div className={"input-box"}>
        <div className="label">
          <span className="material-icons">{icon}</span>
          <label htmlFor={inputName}>{title}</label>
        </div>
        <input
          type={type}
          id={inputName}
          onChange={(e) => {
            onChangeCallback && onChangeCallback(e);
          }}
        />
      </div>
    </BodySTY>
  );
};

export default LoginInput;
