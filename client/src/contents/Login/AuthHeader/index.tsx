import React from "react";
import Image from "next/image";
import { BodySTY } from "./style";

const AuthHeader = () => {
  return (
    <BodySTY>
      <div className="logo">
        <Image
          priority={true}
          src={"/images/login_cat.jpeg"}
          width={180}
          height={180}
          alt={"login_cat"}
        ></Image>
      </div>
      <p>Welcome!</p>
    </BodySTY>
  );
};

export default AuthHeader;
