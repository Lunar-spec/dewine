import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EllipsisVertical } from "lucide-react";
import AccountTab from "./AccountTab";

interface IActionTab {
  userId: string;
}

const ActionTab = ({ userId }: IActionTab) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <EllipsisVertical className="h-7 w-7 rounded p-1 m-2 hover:bg-black/10 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="md:w-1/2 w-full flex-center bg-black text-white border-none shadow-lg shadow-white/10 rounded">
        <Tabs defaultValue="account" className="w-full flex-center flex-col gap-2">
          <TabsList className="grid w-full rounded grid-cols-2 gap-4 bg-white/10 h-max">
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-black/50 data-[state=active]:text-white rounded text-white py-2 text-sm"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="role"
              className="rounded data-[state=active]:bg-black/50 data-[state=active]:text-white py-2 text-white text-sm"
            >
              Role
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="account"
            className="bg-white/10 w-full p-2 rounded"
          >
            <AccountTab userId={userId} />
          </TabsContent>
          <TabsContent value="role" className="bg-white/10 w-full p-2 rounded">
            Change your role here.
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ActionTab;
