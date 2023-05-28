import React, { useState } from "react";
import { BodySTY } from "./style";
import LoginForm from "@components/Form/LoginForm";
import RegisterForm from "@components/Form/RegisterForm";
//
interface Props {
  setModalLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
//
const AuthForm = ({ setModalLoading }: Props) => {
  const [isLogin, setIsLogin] = useState(true);
  //
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }
  return (
    <BodySTY>
      <h2>👋{isLogin ? "Welcome back." : "Welcome to CatBook!"}📣</h2>
      <h2>Let's {isLogin ? "sign in." : "sign up."}</h2>
      {isLogin ? (
        <LoginForm setModalLoading={setModalLoading} />
      ) : (
        <RegisterForm setModalLoading={setModalLoading} />
      )}
      <button type="button" className="toggle" onClick={switchAuthModeHandler}>
        {isLogin ? "Not have account?" : "Login with existing account."}
      </button>
    </BodySTY>
  );
};

export default AuthForm;
