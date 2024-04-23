import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserTable = ({ users }: any) => {
  // console.log(users);
  return (
    <Table>
      <TableCaption>A list of Users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-white/60">Id</TableHead>
          <TableHead className="text-white/60">Name</TableHead>
          <TableHead className="text-white/60">Email</TableHead>
          <TableHead className="text-white/60">Role</TableHead>
          <TableHead className=" text-white/60">Image</TableHead>
          <TableHead className="text-right  text-white/60">
            Created At
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: any) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.image}</TableCell>
            <TableCell className="text-right">
              {user.createdAt.toDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
