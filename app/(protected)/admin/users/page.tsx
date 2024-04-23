import { getAllUsers } from "@/lib/actions/users";
import UserTable from "../../_components/UserTable";

const Users = async () => {
  const users = await getAllUsers();

  return (
    <div>
      <h1>Users</h1>
      <UserTable users={users} />
    </div>
  );
};

export default Users;
