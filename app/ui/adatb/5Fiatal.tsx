"use client"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
  CardHeader
} from "@nextui-org/react";
import { FiatalJatekos } from "@/app/lib/definitions";

export default function FiatalJatekosokTable({
  jatekosok,
}: {
  jatekosok: FiatalJatekos[];
}) {
//   console.log("Jatekosok in table:", jatekosok);
  

  return (
    <>
      <div className="flex justify-center">
        <Card className="mt-10 w-[800px]">
          <CardHeader className="flex justify-center py-2">
            <span className="text-xl flex-1 text-center font-bold">
              Öt Legfiatalabb Játékos
            </span>
          </CardHeader>
          <CardBody className="pt-1 px-3 pb-2">
            <Table
              aria-label="Example table with dynamic content"
              removeWrapper
              selectionMode="single"
            >
              <TableHeader>
                <TableColumn className="text-sm">Név</TableColumn>
                <TableColumn className="text-sm">Születési Dátum</TableColumn>
                <TableColumn className="text-sm">Csapat</TableColumn>
              </TableHeader>
              <TableBody>
                {jatekosok.map((jatekos) => {
                  const formattedDate = jatekos.szul_datum
                    ? new Intl.DateTimeFormat("en-US", {
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                      }).format(new Date(jatekos.szul_datum))
                    : "Ismeretlen";
                    // console.log(jatekos.csapatnev);
                  return (
                    <TableRow key={jatekos.jatekosID}>
                      <TableCell className="text-sm">{jatekos.jatekosnev}</TableCell>
                      <TableCell className="text-sm">{formattedDate}</TableCell>
                      <TableCell className="text-sm">{jatekos.csapatnev}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
