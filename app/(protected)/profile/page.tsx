"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const Profile = () => {
  const user = useCurrentUser();

  return (
    <div className="flex flex-col">
      <div id="profile">Profile</div>
      <div id="orders">Orders</div>
    </div>
  );
};

export default Profile;
