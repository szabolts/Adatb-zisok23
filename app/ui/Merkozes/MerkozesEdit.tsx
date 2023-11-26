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
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { Merkozes, Csapat } from "@/app/lib/definitions";
import { updateMerkozes } from "@/app/lib/actionsMerkozes";
import { posztok } from "@/app/lib/data";

export default function JatekosEdit({
  merkozes,
  csapatok,
}: {
  merkozes: Merkozes;
  csapatok: Csapat[];
}) {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();
  const [hazaiEredmeny, setHazaiEredmeny] = useState(merkozes.hazaiEredmeny || 0);
  const [vendegEredmeny, setVendegEredmeny] = useState(merkozes.vendegEredmeny || 0);

  const handleHazaiEredmenyChange = (amount: number) => {
    setHazaiEredmeny((prevEredmeny) => prevEredmeny + amount);
  };

  const handleVendegEredmenyChange = (amount: number) => {
    setVendegEredmeny((prevEredmeny) => prevEredmeny + amount);
  };

  const csapatNevek = csapatok.map((csapat) => ({
    label: csapat.csapatnev,
    value: csapat.csapatnev,
  }));
  // console.log(csapatok);

  const updateMerkozeswID = updateMerkozes.bind(null, merkozes.merkozesID);
  

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
        size="3xl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form action={updateMerkozeswID}>
                <ModalHeader className="flex justify-center ">
                  Mérkőzés szerkesztése
                </ModalHeader>

                <ModalBody className=" gap-1 ">
                  <div className="grid grid-cols-5 gap-4">
                    {/* Első sor */}
                    <div className="flex items-center col-span-2">
                      <Select
                        name="hazaiCsapatNev"
                        items={csapatNevek}
                        placeholder="Válaszd ki a hazai csapatot"
                        className="max-w-xs"
                        defaultSelectedKeys={merkozes.hazaiCsapatNev ? [merkozes.hazaiCsapatNev] : undefined}
                      >
                        {(csapatNev) => (
                          <SelectItem key={csapatNev.value}>
                            {csapatNev.label}
                          </SelectItem>
                        )}
                      </Select>
                    </div>
                    <div className="flex items-center justify-center col-span-1 text-3xl ">
                      <span>vs</span>
                    </div>
                    <div className="flex items-center col-span-2">
                      <Select
                        name="vendegCsapatNev"
                        items={csapatNevek}
                        placeholder="Válaszd ki a vendég csapatot"
                        className="max-w-xs"
                        defaultSelectedKeys={merkozes.vendegCsapatNev ? [merkozes.vendegCsapatNev] : undefined}
                      >
                        {(csapatNev) => (
                          <SelectItem key={csapatNev.value}>
                            {csapatNev.label}
                          </SelectItem>
                        )}
                      </Select>
                    </div>

                    {/* Második sor */}
                    <div className="flex items-center justify-center text-8xl font-medium col-span-2 gap-4">
                      <Button
                        isDisabled={hazaiEredmeny === 0}
                        radius="full"
                        variant="light"
                        isIconOnly
                        onClick={() => handleHazaiEredmenyChange(-1)}
                        className="text-2xl text-gray-300 "
                      >
                        -
                      </Button>
                      <input
                        type="hidden"
                        name="hazaiEredmeny"
                        value={hazaiEredmeny}
                      />
                      <span>{hazaiEredmeny}</span>
                      <Button
                        radius="full"
                        variant="light"
                        isIconOnly
                        onClick={() => handleHazaiEredmenyChange(1)}
                        className="text-2xl text-gray-300 "
                      >
                        +
                      </Button>
                    </div>
                    <div className="flex items-center justify-center text-8xl font-medium col-span-1">
                      <span>-</span>
                    </div>
                    <div className="flex items-center justify-center text-8xl font-medium col-span-2 gap-4">
                      <Button
                        isDisabled={vendegEredmeny === 0}
                        radius="full"
                        variant="light"
                        isIconOnly
                        onClick={() => handleVendegEredmenyChange(-1)}
                        className="text-2xl text-gray-300 font-light"
                      >
                        -
                      </Button>
                      <input
                        type="hidden"
                        name="vendegEredmeny"
                        value={vendegEredmeny}
                      />
                      <span>{vendegEredmeny}</span>
                      <Button
                        radius="full"
                        variant="light"
                        isIconOnly
                        onClick={() => handleVendegEredmenyChange(1)}
                        className="text-2xl text-gray-300"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-row gap-20 mt-4">
                    <Input
                      name="palya"
                      type="text"
                      label="Pálya"
                      labelPlacement="outside"
                      autoFocus
                      description="Add meg a pályát"
                      defaultValue={merkozes.palya}
                    />
                    <Input
                      name="datumIdopont"
                      type="datetime-local"
                      label="Időpont"
                      labelPlacement="outside"
                      description="Add meg a mérkőzés időpontját"
                      placeholder="éééé-hh-nn óó:pp"
                      defaultValue={merkozes.datumIdopont?.toISOString().slice(0, 16)}
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" onClick={onClose}>
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
