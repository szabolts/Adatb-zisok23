"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Csapat, Jatekos } from "@/app/lib/definitions";
import { createCsapat } from "../lib/actions";
import CsapatEdit from "./CsapatEdit";
import CsapatDelete from "./CsapatDelete";

export default function CsapatTable({
  csapatok,
  kapusok,
  vedok,
  kozeppalyasok,
  tamadok,
}: {
  csapatok: Csapat[];
  kapusok: Jatekos[];
  vedok: Jatekos[];
  kozeppalyasok: Jatekos[];
  tamadok: Jatekos[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="flex  justify-center">
        <Card className="mb-10 w-[800px]">
          <CardHeader className="flex justify-center py-2">
            <div className="w-[86px]"></div>
            <span className="text-xl flex-1 text-center font-bold">
              Csapatok
            </span>
            <Button
              size="sm"
              color="default"
              variant="faded"
              radius="full"
              onPress={onOpen}
            >
              Add New +
            </Button>
          </CardHeader>
          <CardBody className="pt-1 px-3 pb-2 ">
            <Table
              aria-label="Example table with dynamic content"
              removeWrapper
              selectionMode="single"
            >
              <TableHeader>
                {/* <TableColumn className="text-sm">Id</TableColumn> */}
                <TableColumn className="text-sm">Csapatnev</TableColumn>
                <TableColumn className="text-sm">Varos</TableColumn>
                <TableColumn className="text-sm">Ev</TableColumn>
                <TableColumn className="text-sm w-24">Action</TableColumn>
              </TableHeader>
              <TableBody>
                {csapatok.map((csapat) => (
                  <TableRow key={csapat.csapatID}>
                    {/* <TableCell className="text-sm">{csapat.csapatID}</TableCell> */}
                    <TableCell className="text-sm">
                      {csapat.csapatnev}
                    </TableCell>
                    <TableCell className="text-sm">{csapat.varos}</TableCell>
                    <TableCell className="text-sm">{csapat.alapitva}</TableCell>
                    <TableCell className="flex flex-row w-auto p-0.5">
                      <CsapatEdit csapat={csapat} kapusok={kapusok} vedok={vedok} kozeppalyasok={kozeppalyasok} tamadok={tamadok} />
                      <CsapatDelete csapat={csapat} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        className=""
        size="sm"
        backdrop="blur"
        hideCloseButton 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form action={createCsapat}>
                <ModalHeader className="flex justify-center ">
                  Csapat hozzáadása
                </ModalHeader>
                <ModalBody className=" ">
                  <Input
                    name="csapatNev"
                    type="text"
                    label="Csapatnév"
                    labelPlacement="outside"
                    autoFocus
                    description="Add meg a csapat nevét"
                  />
                  <Input
                    name="varos"
                    type="text"
                    label="Város"
                    labelPlacement="outside"
                    description="Add meg a várost"
                  />
                  <Input
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
                    items={kapusok.filter((kapus) => kapus.csapatID === null)}
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
                      <SelectItem key={kapusok.jatekosID}>
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
                    items={vedok.filter((vedo) => vedo.csapatID === null)}
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
                      <SelectItem key={vedok.jatekosID}>
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
                    items={kozeppalyasok.filter((kozeppalyas) => kozeppalyas.csapatID === null)}
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
                      <SelectItem key={kozeppalyasok.jatekosID}>
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
                    items={tamadok.filter((tamado) => tamado.csapatID === null)}
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
                      <SelectItem key={tamadok.jatekosID}>
                        {tamadok.jatekosnev}
                      </SelectItem>
                    )}
                  </Select>
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
