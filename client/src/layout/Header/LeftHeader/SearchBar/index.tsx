import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
//
import { BodySTY, StyledInputBox, StyledSearchResult } from "./style";
import {
  useGetUserfriendsLazyQuery,
  useGetAllUsersLazyQuery
} from "@generated/graphql";
import ProfileList from "../ProfileList";
import { getDataFromToken } from "@utils/getDataFromToken";
import { useRouter } from "next/router";
//
const SearchBar = () => {
  const [filterString, setFilterString] = useState<string>("");
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const router = useRouter();
  const [fetchUser, { data: usersData }] = useGetAllUsersLazyQuery({
    fetchPolicy: "no-cache"
  });
  const [fetchFriends, { data: friendsData }] = useGetUserfriendsLazyQuery({
    fetchPolicy: "no-cache"
  });
  useEffect(() => {
    const userInfo = getDataFromToken();
    if (!userInfo || !userInfo.id) {
      router.push("/auth");
    } else {
      fetchFriends({
        variables: {
          userId: userInfo.id
        }
      });
    }
  }, [fetchFriends, router]);
  useEffect(() => {
    if (filterString.trim() === "") {
      return;
    }
    setShowLoading(true);
    const timer = setTimeout(() => {
      fetchUser({
        variables: {
          searchName: filterString
        }
      }).then(() => {
        setShowLoading(false);
      });
    }, 500);
    return () => {
      setShowLoading(false);
      clearTimeout(timer);
    };
  }, [filterString, fetchUser]);
  return (
    <BodySTY>
      <StyledInputBox>
        <span className="material-icons">{<FaSearch />}</span>
        <input
          placeholder="Search..."
          onChange={(e) => {
            setFilterString(e.target.value);
          }}
        />
      </StyledInputBox>
      <StyledSearchResult>
        {showLoading ? (
          <div>Loading...</div>
        ) : usersData && filterString.trim() !== "" && friendsData ? (
          <ProfileList
            users={usersData.getUsers!}
            currentUserFriends={friendsData.getUserfriends}
          />
        ) : (
          <div>No result...</div>
        )}
      </StyledSearchResult>
    </BodySTY>
  );
};

export default SearchBar;
