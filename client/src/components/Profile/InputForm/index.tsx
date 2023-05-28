import React, { useRef, useState } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import {
  StyledForm,
  StyledInputItem,
  InputContainer,
  StyledButton
} from "./style";
import {
  GetProfileQuery,
  GetProfileDocument,
  GetMeDocument,
  useUpdateProfileMutation,
  UpdateProfileMutationVariables,
  GetMeQuery
} from "@generated/graphql";
import { uploadImage } from "@lib/uploadImage";
//
type MeInfo = NonNullable<GetMeQuery["getMe"]>;
type Profile = GetProfileQuery["getProfile"];
//
interface Props {
  onClose: () => void;
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
  currentUser: MeInfo;
  profile: Profile;
}
const Index = ({
  onClose,
  profile,
  currentUser,
  setIsLoading,
  isLoading
}: Props) => {
  const { coverImage, avatarImage, bio } = profile;
  const [updateProfile] = useUpdateProfileMutation();
  const [cover, setCover] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLInputElement>(null);
  return (
    <StyledForm
      isLoading={isLoading}
      onSubmit={async (event) => {
        event.preventDefault();
        setIsLoading(true);
        let coverUrl: string | null = null;
        let avatarUrl: string | null = null;
        if (cover) coverUrl = await uploadImage(cover);
        if (avatar) avatarUrl = await uploadImage(avatar);
        const newProfile: UpdateProfileMutationVariables = {
          bio: bioRef.current?.value || bio!
        };
        if (coverUrl) newProfile.coverImage = coverUrl;
        if (avatarUrl) newProfile.avatarImage = avatarUrl;
        await updateProfile({
          variables: {
            ...newProfile
          },
          refetchQueries: [GetProfileDocument, GetMeDocument]
        });
        setIsLoading(false);
        onClose();
      }}
    >
      <button className="close" onClick={onClose}>
        <FaTimes />
      </button>
      <h2>Update Your Profile</h2>
      <div className="picture-list">
        <div className="picture-item">
          <h4>Cover picture</h4>
          <label htmlFor="cover">
            <Image
              src={
                cover
                  ? URL.createObjectURL(cover)
                  : coverImage
                  ? coverImage
                  : ""
              }
              width={100}
              height={100}
              style={{ borderRadius: "10px" }}
              alt="cover image"
            />
          </label>
          <input
            type="file"
            id="cover"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files) {
                setCover(e.target.files[0]);
              }
            }}
          />
        </div>
        <div className="picture-item">
          <h4>Profile picture</h4>
          <label htmlFor="profile">
            <Image
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : avatarImage
                  ? avatarImage
                  : ""
              }
              width={100}
              height={100}
              style={{ borderRadius: "10px" }}
              alt="avatar image"
            ></Image>
          </label>
          <input
            type="file"
            id="profile"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files) {
                setAvatar(e.target.files[0]);
              }
            }}
          />
        </div>
      </div>
      <InputContainer>
        <StyledInputItem>
          <h4>Email</h4>
          <input value={currentUser.email} disabled></input>
        </StyledInputItem>
        <StyledInputItem>
          <h4>Name</h4>
          <input value={currentUser.name} ref={nameRef} disabled></input>
        </StyledInputItem>
        <StyledInputItem>
          <h4>Country/City</h4>
          <input placeholder="Taiwan" ref={cityRef}></input>
        </StyledInputItem>
        <StyledInputItem>
          <h4>Biography</h4>
          <input placeholder={bio} ref={bioRef}></input>
        </StyledInputItem>
      </InputContainer>
      <StyledButton>Submit</StyledButton>
    </StyledForm>
  );
};
export default Index;
