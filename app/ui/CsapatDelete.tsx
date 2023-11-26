import { deleteCsapat } from "@/app/lib/actions";
import { Button } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { Csapat } from "@/app/lib/definitions";

export default function DeleteCsapat({ csapat }: { csapat: Csapat }) {
  const deleteCsapatwID = deleteCsapat.bind(null, csapat.csapatID);

  return (
    <form action={deleteCsapatwID}>
      <Button variant="light" size="sm" isIconOnly color="danger" type="submit" className="">
        <MdDelete size={20} />
      </Button>
    </form>
  );
}
