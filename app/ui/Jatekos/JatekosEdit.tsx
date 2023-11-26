import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { MdModeEdit } from "react-icons/md";
// import { Jatekos } from "@/app/lib/definitions";
import { updateJatekos } from "@/app/lib/actions";
import { posztok } from "@/app/lib/data";

type Jatekos = {
  jatekosID: number;
  jatekosnev: string;
  szul_datum: string;
  allampolgarsag: string;
  poszt: string;
  csapatID: number;
};

export default function JatekosEdit({ jatekos }: { jatekos: Jatekos }) {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();

  const updateJatekoswID = updateJatekos.bind(null, jatekos.jatekosID);

  return (
    <>
      <Button
        // id={csapat.csapatID.toString()}
        variant="light"
        size="sm"
        isIconOnly
        color="default"
        onPress={onOpenEdit}
        className=""
      >
        <MdModeEdit size={18} />
      </Button>
      <Modal
        isOpen={isOpenEdit}
        onOpenChange={onOpenChangeEdit}
        isDismissable={false}
        size="xs"
        backdrop="blur"
      >
        <ModalContent>
          {(onCloseEdit) => (
            <>
              <form action={updateJatekoswID}>
                <ModalHeader className="flex justify-center ">
                  Játékos szerkesztese
                </ModalHeader>
                <ModalBody className="gap-1">
                  <Input
                    defaultValue={jatekos.jatekosnev}
                    name="jatekosnev"
                    type="text"
                    label="Játékos neve"
                    labelPlacement="outside"
                    autoFocus
                    description="Add meg a játékos teljes nevét"
                  />
                  <Input
                    defaultValue={jatekos.szul_datum.toString()}
                    name="szul_datum"
                    type="date"
                    label="Születési dátum"
                    labelPlacement="outside"
                    description="Add meg a játékos születési dátumját"
                  />
                  <Input
                    defaultValue={jatekos.allampolgarsag}
                    name="allampolgarsag"
                    type="text"
                    label="Állampolgárság"
                    labelPlacement="outside"
                    description="Add meg a játékos állampolgárságát"
                  />
                  <Select
                    name="poszt"
                    items={posztok}
                    defaultSelectedKeys={[jatekos.poszt]}
                    placeholder="Poszt kiválasztása"
                    className="max-w-xs"
                  >
                    {(posztok) => (
                      <SelectItem key={posztok.value}>
                        {posztok.label}
                      </SelectItem>
                    )}
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={onCloseEdit}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" onClick={onCloseEdit}>
                    Mentés
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
