import UserTable from "@/app/(protected)/_components/UserTable";
import { getAllUsers } from "@/lib/actions/users";

const Users = async () => {
  const users = await getAllUsers();

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center">Users</h1>
      <UserTable users={users} />
    </div>
  );
};

export default Users;
