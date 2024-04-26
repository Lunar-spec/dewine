import { fetchUserDetailById } from "@/lib/actions/users";
import { Badge } from "@/components/ui/badge";

interface IAccount {
  userId: string;
}
const AccountTab = async ({ userId }: IAccount) => {
  const user = await fetchUserDetailById(userId);
  return (
    <div className="flex px-2 flex-col items-start gap-2">
      <div className="flex gap-4 items-start">
        <div className="font-semibold">Id</div> <div>{user?.id}</div>
      </div>
      <div className="flex gap-4 items-start">
        <div className="font-semibold">Name</div> <div>{user?.name}</div>
      </div>
      <div className="flex gap-4 items-start">
        <div className="font-semibold">Image</div>
        <div>
          {user?.image ? (
            user?.image.substring(0, 45) + "..."
          ) : (
            <Badge className="bg-white/50">No image</Badge>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-start">
        <div className="font-semibold">Email</div> <div>{user?.email}</div>
      </div>
      <div className="flex gap-4 items-start">
        <div className="font-semibold">Verified</div>
        <div>{user?.emailVerified?.toDateString()}</div>
      </div>
      <div className="flex gap-4 items-start">
        <div className="font-semibold">Created</div>
        <div>{user?.createdAt.toDateString()}</div>
      </div>
      <div className="flex gap-4 items-start">
        <div className="font-semibold">Social Login</div>
        <Badge className="bg-white/50">{!user?.password ? "Yes" : "No"}</Badge>
      </div>
      <div className="flex gap-4 items-start">
        <div className="font-semibold">Address Present</div>
        <Badge className="bg-white/50">
          {user?.address?.length ?? 0 > 0 ? "Yes" : "No"}
        </Badge>
      </div>
    </div>
  );
};

export default AccountTab;
