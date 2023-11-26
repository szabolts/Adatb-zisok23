import { deleteMerkozes } from "@/app/lib/actionsMerkozes";
import { Button } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { Merkozes } from "@/app/lib/definitions";

export default function MerkozesDelete({ merkozes }: { merkozes: Merkozes }) {
  const deleteMerkozeswID = deleteMerkozes.bind(null, merkozes.merkozesID);

  return (
    <form action={deleteMerkozeswID}>
      <Button variant="light" size="sm" isIconOnly color="danger" type="submit" className="">
        <MdDelete size={20} />
      </Button>
    </form>
  );
}