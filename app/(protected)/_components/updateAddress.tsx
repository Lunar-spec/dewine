import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Address = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="text-brand-primary cursor-pointer">
          Update Address
        </span>
      </SheetTrigger>
      <SheetContent side={"bottom"} className="h-3/4">
        <SheetHeader>
          <SheetTitle>Update Address</SheetTitle>
          <SheetDescription>
            Make changes to your address here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div>
          {/* //TODO Add the address form here */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, eveniet
          accusantium? In minima voluptatem ducimus sapiente corrupti,
          necessitatibus ipsam quasi exercitationem iure alias repudiandae?
          Itaque aliquam cupiditate saepe libero? Atque.
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button size={"sm"} type="submit">
              Save
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Address;
