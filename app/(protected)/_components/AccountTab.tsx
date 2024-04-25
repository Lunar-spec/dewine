import { fetchUserDetailById } from "@/lib/actions/users";

interface IAccount {
  userId: string;
}
const AccountTab = async ({ userId }: IAccount) => {
  const user = await fetchUserDetailById(userId);
  console.log(user);
  return <div>{JSON.stringify(user)}</div>;
};

export default AccountTab;
