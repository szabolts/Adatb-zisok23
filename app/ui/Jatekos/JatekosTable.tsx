"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Pagination,
} from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
// import { Jatekos } from "@/app/lib/definitions";
import { createJatekos } from "@/app/lib/actions";
import JatekosEdit from "@/app/ui/Jatekos/JatekosEdit";
import JatekosDelete from "@/app/ui/Jatekos/JatekosDelete";
import { posztok } from "@/app/lib/data";
import { useState, useMemo } from "react";
import { SelectXs } from "@/app/ui/extendNextui/SelectXs";

type Jatekos = {
  jatekosID: number;
  jatekosnev: string;
  szul_datum: string;
  allampolgarsag: string;
  poszt: string;
  csapatID: number;
};

export default function JatekosTable({ jatekosok }: { jatekosok: Jatekos[] }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [startDate, setStartDate] = useState(new Date());

  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  const pages = Math.ceil(jatekosok.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return jatekosok.slice(start, end);
  }, [page, jatekosok]);

  return (
    <>
      <div className="flex  justify-center">
        <Card className="mb-10 w-[800px] ">
          <CardHeader className="flex justify-center py-2">
            <div className="w-[86px]"></div>
            <span className="text-xl flex-1 text-center font-bold">
              Játékosok
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
              bottomContent={
                <div className="flex w-full justify-center my-1">
                  <Pagination
                    variant="light"
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }              
            >
              <TableHeader>
                {/* <TableColumn className="text-sm">Id</TableColumn> */}
                <TableColumn className="text-sm w-60">Nev</TableColumn>
                <TableColumn className="text-sm">Szül. dátum</TableColumn>
                <TableColumn className="text-sm">Állampolgárság</TableColumn>
                <TableColumn className="text-sm ">Poszt</TableColumn>
                <TableColumn className="text-sm w-24">Action</TableColumn>
              </TableHeader>
              <TableBody items={items}  >
                {(jatekos) => (
                  <TableRow key={jatekos.jatekosID}>
                    {/* <TableCell className="text-sm">{csapat.csapatID}</TableCell> */}
                    <TableCell className="text-sm">
                      {jatekos.jatekosnev}
                    </TableCell>
                    <TableCell className="text-sm">
                      {jatekos.szul_datum.toString()}
                    </TableCell>
                    <TableCell className="text-sm">
                      {jatekos.allampolgarsag}
                    </TableCell>
                    <TableCell className="text-sm">{jatekos.poszt}</TableCell>
                    <TableCell className="flex flex-row w-auto p-0.5">
                      
                      <JatekosEdit jatekos={jatekos} />
                      <JatekosDelete jatekos={jatekos} />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size="xs"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form action={createJatekos}>
                <ModalHeader className="flex justify-center ">
                  Játékos hozzáadása
                </ModalHeader>
                <ModalBody className="gap-1">
                  <Input
                    name="jatekosNev"
                    type="text"
                    label="Játékos neve"
                    labelPlacement="outside"
                    autoFocus
                    description="Add meg a játékos teljes nevét"
                    />
                  <Input
                    defaultValue="éééé-hh-nn"
                    name="szul_datum"
                    type="date"
                    label="Születési dátum"
                    labelPlacement="outside"
                    description="Add meg a játékos születési dátumját"
                    />
                  <Input
                    name="allampolgarsag"
                    type="text"
                    label="Állampolgárság"
                    labelPlacement="outside"
                    description="Add meg a játékos állampolgárságát"
                  />
                  <Select
                    name="poszt"
                    items={posztok}
                    size="sm"
                    radius="lg"
                    placeholder="Poszt kiválasztása"
                    className="max-w-xs "
                  >
                    {(posztok) => (
                      <SelectItem key={posztok.value}>
                        {posztok.label}
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
