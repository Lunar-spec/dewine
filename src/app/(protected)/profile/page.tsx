import { auth } from "@/auth";
import SignOut from "@/components/shared/SignOut/SignOut";

const Profile = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col">
      {JSON.stringify(session)}
      <SignOut />
    </div>
  );
};

export default Profile;
