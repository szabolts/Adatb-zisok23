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
  Checkbox,
} from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Merkozes, Csapat } from "@/app/lib/definitions";
import { createMerkozes } from "@/app/lib/actionsMerkozes";
import { useState } from "react";
import MerkozesEdit from "./MerkozesEdit";
import MerkozesDelete from "@/app/ui/Merkozes/MerkozesDelete";

export default function MerkozesTable({
  merkozesek,
  csapatok,
}: {
  merkozesek: Merkozes[];
  csapatok: Csapat[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [hazaiEredmeny, setHazaiEredmeny] = useState(0);
  const [vendegEredmeny, setVendegEredmeny] = useState(0);

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

  return (
    <>
      <div className="flex  justify-center">
        <Card className="mb-10 w-[800px]">
          <CardHeader className="flex justify-center py-2">
            <div className="w-[86px]"></div>
            <span className="text-xl flex-1 text-center font-bold">
              Merkőzések
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
                <TableColumn className="text-sm">Időpont</TableColumn>
                <TableColumn className="text-sm">Hazai</TableColumn>
                <TableColumn className="text-sm w-24">Eredmény</TableColumn>
                <TableColumn className="text-sm w-24">Vendég</TableColumn>
                <TableColumn className="text-sm">Palya</TableColumn>
                <TableColumn className="text-sm w-24">Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {merkozesek.map((meccs) => {
                  const formattedDate = meccs.datumIdopont
                    ? new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: false,
                      }).format(new Date(meccs.datumIdopont))
                    : "";
                  return (
                    <TableRow key={meccs.merkozesID} >
                      <TableCell className="text-sm w-[120px]">{formattedDate}</TableCell>
                      <TableCell className="text-sm w-[200px]">
                        {meccs.hazaiCsapatNev}
                      </TableCell>
                      <TableCell className="text-sm">
                        {meccs.hazaiEredmeny} - {meccs.vendegEredmeny}
                      </TableCell>
                      <TableCell className="text-sm w-[200px]">
                      {meccs.vendegCsapatNev}
                      </TableCell>
                      <TableCell className="text-sm">{meccs.palya}</TableCell>
                      <TableCell className="flex flex-row  p-0.5">
                      
                      <MerkozesEdit merkozes={meccs} csapatok={csapatok} />
                      <MerkozesDelete merkozes={meccs} />
                    </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size="3xl"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form action={createMerkozes}>
                <ModalHeader className="flex justify-center ">
                  Mérkőzés hozzáadása
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
                      <input type="hidden" name="hazaiEredmeny" value={hazaiEredmeny} />
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
                      <input type="hidden" name="vendegEredmeny" value={vendegEredmeny} />
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
                    
                    description="Add meg a pályát"
                    
                  />
                  <Input
                    name="datumIdopont"
                    type="datetime-local"
                    label="Időpont"
                    labelPlacement="outside"
                    description="Add meg a mérkőzés időpontját"
                    placeholder="éééé-hh-nn óó:pp"
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
