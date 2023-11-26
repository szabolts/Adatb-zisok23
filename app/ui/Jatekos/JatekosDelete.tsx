import { deleteJatekos} from "@/app/lib/actions";
import { Button } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
// import { Jatekos } from "@/app/lib/definitions";

type Jatekos = {
  jatekosID: number;
  jatekosnev: string;
  szul_datum: string;
  allampolgarsag: string;
  poszt: string;
  csapatID: number;
};

export default function JatekosDelete({ jatekos }: { jatekos: Jatekos }) {
  const deleteJatekoswID = deleteJatekos.bind(null, jatekos.jatekosID);

  return (
    <form action={deleteJatekoswID}>
      <Button variant="light" size="sm" isIconOnly color="danger" type="submit" className="">
        <MdDelete size={20} />
      </Button>
    </form>
  );
}
