import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import Image from "next/image";
//
import AvatarWrapper from "@components/AvatarWrapper";
import ResizeTextArea from "../../ResizeTextArea";
import ImageBox from "@components/ImageBox";
import { BodySTY } from "./style";
import { uploadImage } from "@lib/uploadImage";
import { GetMeQuery, CreatePostMutationVariables } from "@generated/graphql";
import Spinner from "@components/Spinner";
//
type User = NonNullable<GetMeQuery["getMe"]>;
//
interface FormProps {
  onClose: () => void;
  createPost: (postData: CreatePostMutationVariables) => Promise<void>;
  user: User;
}

const InputForm = ({ onClose, user, createPost }: FormProps) => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [isloading, setIsLoading] = useState(false);
  const [textContent, setTextContent] = useState("");
  return (
    <BodySTY
      onSubmit={async (event) => {
        event.preventDefault();
        setIsLoading(true);
        let imageUrl = "";
        if (imageUpload) imageUrl = await uploadImage(imageUpload);
        await createPost({
          content: textContent,
          postImage: imageUrl,
          title: "Title"
        });
        setIsLoading(false);
        onClose();
      }}
    >
      {isloading && (
        <div className="loading">
          <Spinner height={32} width={32} />
        </div>
      )}
      <button className="close" onClick={onClose}>
        <FaTimes />
      </button>
      <div className="header">
        <h3 className="formTitle">建立貼文</h3>
      </div>
      <div className="container">
        <div className="userInfo">
          <AvatarWrapper userId={user.id}>
            <Image
              src={user.profile.avatarImage}
              width={40}
              height={40}
              alt={"Author avatar"}
            />
          </AvatarWrapper>
          <p className="authorName">{user.name}</p>
        </div>
        <div className="content">
          <ResizeTextArea
            className="textBox"
            placeholder="What's on your mind..."
            saveContent={(content) => {
              setTextContent(content);
            }}
          />
          {imageUpload && (
            <ImageBox
              imageUrl={URL.createObjectURL(imageUpload)}
              onClosed={() => setImageUpload(null)}
            />
          )}
        </div>
        <div className="footer">
          <div className="tool_list">
            <div>新增到貼文</div>
            <div className="icon_list">
              <div className="tool">
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files) {
                      setImageUpload(e.target.files[0]);
                    }
                  }}
                />
                <label htmlFor="file">
                  <Image
                    src={"/images/icons/8.png"}
                    width={30}
                    height={30}
                    alt="image icon"
                  />
                </label>
              </div>
              <div className="tool">
                <button
                  onClick={() => {
                    alert("Tag friends");
                  }}
                >
                  <Image
                    src={"/images/icons/1.png"}
                    width={30}
                    height={30}
                    alt="image icon"
                  />
                </button>
              </div>
              <FiMoreHorizontal />
            </div>
          </div>
        </div>
        <button className="save" type="submit">
          發佈
        </button>
      </div>
    </BodySTY>
  );
};

export default InputForm;
