import { getAllUsers } from "@/lib/actions/users";
import UserTable from "../../_components/UserTable";

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
