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
import { Jatekos, Csapat } from "@/app/lib/definitions";

export default function LegregebbiCsapatTagjaiTable({
  legregebbiCsapat,
}: {
  legregebbiCsapat: { csapat: Csapat, jatekosok: Jatekos[] } | null;
}) {

  if (!legregebbiCsapat) {
    return <div>Nincsenek adatok a legrégebben alapított csapatról.</div>;
  }
  const { csapat, jatekosok } = legregebbiCsapat;
  return (
    <>
      <div className="flex justify-center">
        <Card className="mt-10 w-[800px]">
          <CardHeader className="flex-col justify-center py-2">
            <span className="text-xl flex text-center font-bold">
              A Legrégebben Alapított Csapat Tagjai
            </span>
            <span>Csapat:  {csapat.csapatnev} </span>
            <span>Alapítva: {csapat.alapitva}</span>
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
                <TableColumn className="text-sm">Poszt</TableColumn>
              </TableHeader>
              <TableBody>
                {jatekosok.map((jatekos) => (
                  <TableRow key={jatekos.jatekosID}>
                    <TableCell className="text-sm">{jatekos.jatekosnev}</TableCell>
                    <TableCell className="text-sm">{new Intl.DateTimeFormat("en-US", {
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                      }).format(new Date(jatekos.szul_datum))}</TableCell>
                    <TableCell className="text-sm">{jatekos.poszt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
