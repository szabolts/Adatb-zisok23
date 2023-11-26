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
  Chip,
} from "@nextui-org/react";

import { MdModeEdit } from "react-icons/md";
import { Csapat, Jatekos } from "@/app/lib/definitions";
import { updateCsapat } from "../lib/actions";

export default function JatekosEdit({
  csapat,
  kapusok,
  vedok,
  kozeppalyasok,
  tamadok,
}: {
  csapat: Csapat;
  kapusok: Jatekos[];
  vedok: Jatekos[];
  kozeppalyasok: Jatekos[];
  tamadok: Jatekos[];
}) {
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();
  // console.log("Kapusok:", kapusok);
  // console.log("kapusok típusa:", typeof kapusok);
  // console.log("csapat típusa:", typeof csapat);

  // console.log(
  //   "defaultSelectedKeys:",
  //   kapusok
  //     .filter((kapus) => kapus.csapatID === csapat.csapatID)
  //     .map((kapus) => kapus.jatekosID)
  // );
  const updateCsapatwID = updateCsapat.bind(null, csapat.csapatID);

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
        size="sm"
        backdrop="blur"
      >
        <ModalContent>
          {(onCloseEdit) => (
            <>
              <form action={updateCsapatwID}>
                <ModalHeader className="flex justify-center ">
                  Csapat szerkesztese
                </ModalHeader>
                <ModalBody className="gap-1">
                  <Input
                    defaultValue={csapat.csapatnev}
                    name="csapatNev"
                    type="text"
                    label="Csapatnév"
                    labelPlacement="outside"
                    autoFocus
                    description="Add meg a csapat nevét"
                  />
                  <Input
                    defaultValue={csapat.varos}
                    name="varos"
                    type="text"
                    label="Város"
                    labelPlacement="outside"
                    description="Add meg a várost"
                  />
                  <Input
                    defaultValue={csapat.alapitva.toString()}
                    name="alapitva"
                    type="number"
                    label="Alapítás éve"
                    labelPlacement="outside"
                    description="Csak évszám"
                  />
                  <Select
                    label="Kapus"
                    labelPlacement="outside"
                    selectionMode="multiple"
                    isMultiline={true}
                    size="md"
                    name="kapus"
                    items={kapusok.filter((kapus) => kapus.csapatID === null || kapus.csapatID === csapat.csapatID)}
                    defaultSelectedKeys={
                      kapusok
                        .filter((kapus) => kapus.csapatID === csapat.csapatID)
                        .map((kapus) => kapus.jatekosID.toString()) // Konvertáljuk stringgé
                    }
                    placeholder="Kapus kiválasztása"
                    classNames={{
                      base: "max-w-sm",
                      trigger: "min-h-unit-12 py-2",
                    }}
                    renderValue={(kapusok) => {
                      return (
                        <div className="flex flex-wrap gap-2">
                          {kapusok.map((kapus) => (
                            <Chip color="primary" size="sm" key={kapus.key}>
                              {kapus.data?.jatekosnev}
                            </Chip>
                          ))}
                        </div>
                      );
                    }}
                  >
                    {(kapusok) => (
                      <SelectItem
                        key={kapusok.jatekosID.toString()}
                        value={kapusok.jatekosID.toString()}
                      >
                        {kapusok.jatekosnev}
                      </SelectItem>
                    )}
                  </Select>
                  <Select
                    label="Védő"
                    labelPlacement="outside"
                    selectionMode="multiple"
                    isMultiline={true}
                    size="md"
                    name="vedo"
                    items={vedok.filter((vedo) => vedo.csapatID === null || vedo.csapatID === csapat.csapatID)}
                    defaultSelectedKeys={
                      vedok
                        .filter((vedo) => vedo.csapatID === csapat.csapatID)
                        .map((vedo) => vedo.jatekosID.toString()) // Konvertáljuk stringgé
                    }
                    placeholder="Védő kiválasztása"
                    classNames={{
                      base: "max-w-sm",
                      trigger: "min-h-unit-12 py-2",
                    }}
                    renderValue={(vedok) => {
                      return (
                        <div className="flex flex-wrap gap-2 ">
                          {vedok.map((vedo) => (
                            <Chip color="primary" size="sm" key={vedo.key}>
                              {vedo.data?.jatekosnev}
                            </Chip>
                          ))}
                        </div>
                      );
                    }}
                  >
                    {(vedok) => (
                      <SelectItem
                        key={vedok.jatekosID.toString()}
                        value={vedok.jatekosID.toString()}
                      >
                        {vedok.jatekosnev}
                      </SelectItem>
                    )}
                  </Select>

                  <Select
                    label="Középpályás"
                    selectionMode="multiple"
                    isMultiline
                    labelPlacement="outside"
                    size="md"
                    name="kozeppalyas"
                    items={kozeppalyasok.filter((kozeppalyas) => kozeppalyas.csapatID === null || kozeppalyas.csapatID === csapat.csapatID)}
                    defaultSelectedKeys={
                      kozeppalyasok
                        .filter(
                          (kozeppalyas) =>
                            kozeppalyas.csapatID === csapat.csapatID
                        )
                        .map((kozeppalyas) => kozeppalyas.jatekosID.toString()) // Konvertáljuk stringgé
                    }
                    placeholder="Középpályás kiválasztása"
                    classNames={{
                      base: "max-w-sm",
                      trigger: "min-h-unit-12 py-2",
                    }}
                    renderValue={(kozeppalyasok) => {
                      return (
                        <div className="flex flex-wrap gap-2">
                          {kozeppalyasok.map((kozeppalyas) => (
                            <Chip
                              color="primary"
                              size="sm"
                              key={kozeppalyas.key}
                            >
                              {kozeppalyas.data?.jatekosnev}
                            </Chip>
                          ))}
                        </div>
                      );
                    }}
                  >
                    {(kozeppalyasok) => (
                      <SelectItem key={kozeppalyasok.jatekosID.toString()}>
                        {kozeppalyasok.jatekosnev}
                      </SelectItem>
                    )}
                  </Select>

                  <Select
                    label="Támadó"
                    selectionMode="multiple"
                    isMultiline
                    labelPlacement="outside"
                    size="md"
                    name="tamado"
                    items={tamadok.filter((tamado) => tamado.csapatID === null || tamado.csapatID === csapat.csapatID)}
                    defaultSelectedKeys={
                      tamadok
                        .filter((tamado) => tamado.csapatID === csapat.csapatID)
                        .map((tamado) => tamado.jatekosID.toString()) // Konvertáljuk stringgé
                    }
                    placeholder="Támadó kiválasztása"
                    classNames={{
                      base: "max-w-sm",
                      trigger: "min-h-unit-12 py-2",
                    }}
                    renderValue={(tamadok) => {
                      return (
                        <div className="flex flex-wrap gap-2">
                          {tamadok.map((tamado) => (
                            <Chip color="primary" size="sm" key={tamado.key}>
                              {tamado.data?.jatekosnev}
                            </Chip>
                          ))}
                        </div>
                      );
                    }}
                  >
                    {(tamadok) => (
                      <SelectItem key={tamadok.jatekosID.toString()}>
                        {tamadok.jatekosnev}
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
