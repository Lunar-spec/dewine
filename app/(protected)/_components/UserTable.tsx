import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import ActionTab from "./ActionTab";

const UserTable = ({ users }: any) => {
  // console.log(users);
  return (
    <Table>
      <TableCaption>A list of Users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-white/60">Created At</TableHead>
          <TableHead className=" text-white/60">Image</TableHead>
          <TableHead className="text-white/60">Name</TableHead>
          <TableHead className="text-white/60">Email</TableHead>
          <TableHead className="text-white/60">Role</TableHead>
          <TableHead className="w-[100px] text-white/60">User Id</TableHead>
          <TableHead className="w-[50px] text-white/60">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user: any) => (
          <TableRow key={user.id}>
            <TableCell>{user.createdAt.toDateString()}</TableCell>
            <TableCell>
              <Image
                src={user.image}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>
              <ActionTab />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
