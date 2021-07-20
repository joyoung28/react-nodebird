import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/dist/next-server/lib/head";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
  const followingList = [
    { nickname: "제로초" },
    { nickname: "영은" },
    { nickname: "노드버드" },
  ];
  const followerList = [
    { nickname: "제로초" },
    { nickname: "영은" },
    { nickname: "노드버드" },
  ];

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList} />
        <FollowList header="팔로워 목록" data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
