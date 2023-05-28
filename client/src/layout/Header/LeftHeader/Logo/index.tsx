import Link from "next/link";
import Image from "next/image";
//
import { LogoSTY } from "./style";
const Logo = () => {
  return (
    <LogoSTY>
      <Link href={"/home"} legacyBehavior>
        <a>
          <Image
            src={"/images/meme_cat.jpg"}
            width={40}
            height={40}
            alt={"catbook logo"}
            style={{ borderRadius: "50%" }}
          ></Image>
        </a>
      </Link>
    </LogoSTY>
  );
};

export default Logo;
