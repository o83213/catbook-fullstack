import React from "react";
import { FaTimes } from "react-icons/fa";
import Image from "next/image";
//
import { BodySTY } from "./style";
//
interface Props {
  imageUrl: string;
  onClosed: () => void;
}
const Index = ({ imageUrl, onClosed }: Props) => {
  return (
    <BodySTY>
      <div className="close-image" onClick={onClosed}>
        <FaTimes />
      </div>
      <div className="image-container">
        <Image
          src={imageUrl}
          alt="post_img"
          style={{ objectFit: "cover" }}
          fill
        />
      </div>
    </BodySTY>
  );
};
export default Index;
