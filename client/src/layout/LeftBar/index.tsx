import { BodySTY } from "./style";
import Image from "next/image";
const Index = () => {
  return (
    <BodySTY>
      <div className="container">
        <div className="menu">
          <div className="item">
            <Image
              src={"/images/meme_cat.jpg"}
              width={30}
              height={30}
              alt="user icon"
            />
            <span>User 123</span>
          </div>
          <div className="item">
            <Image
              src={"/images/icons/1.png"}
              width={30}
              height={30}
              alt="user icon"
            />
            <span>Friends</span>
          </div>
          <div className="item">
            <Image
              src={"/images/icons/6.png"}
              width={30}
              height={30}
              alt="user icon"
            />
            <span>Events</span>
          </div>
          <div className="item">
            <Image
              src={"/images/icons/7.png"}
              width={30}
              height={30}
              alt="user icon"
            />
            <span>Gaming</span>
          </div>
          <div className="item">
            <Image
              src={"/images/icons/8.png"}
              width={30}
              height={30}
              alt="user icon"
            />
            <span>Gallery</span>
          </div>
          <div className="item">
            <Image
              src={"/images/icons/4.png"}
              width={30}
              height={30}
              alt="user icon"
            />
            <span>Videos</span>
          </div>
          <div className="item">
            <Image
              src={"/images/icons/10.png"}
              width={30}
              height={30}
              alt="user icon"
            />
            <span>Messages</span>
          </div>
        </div>
      </div>
    </BodySTY>
  );
};

export default Index;
