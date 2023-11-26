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
import { CsapatEredmenyekGolok } from "@/app/lib/definitions";

export default function CsapatEredmenyekTable({
  csapatEredmenyek,
}: {
  csapatEredmenyek: CsapatEredmenyekGolok[];
}) {
  return (
    <>
      <div className="flex justify-center">
        <Card className="mb-10 w-[800px]">
          <CardHeader className="flex justify-center py-2">
            <span className="text-2xl flex-1 text-center font-bold">
              Tabella
            </span>
          </CardHeader>
          <CardBody className="pt-1 px-3 pb-2">
            <Table
              aria-label="Example table with dynamic content"
              removeWrapper
              selectionMode="single"
            >
              <TableHeader>
                <TableColumn className="w-1/12 text-center text-sm ">Helyezés</TableColumn>
                <TableColumn className="text-sm ">Csapat</TableColumn>
                <TableColumn className="w-1/12 text-center text-sm">P</TableColumn>
                <TableColumn className="w-1/12 text-center text-sm">Gy</TableColumn>
                <TableColumn className="w-1/12 text-center text-sm">D</TableColumn>
                <TableColumn className="w-1/12 text-center text-sm">V</TableColumn>
                <TableColumn className="w-1/12 text-center text-sm">HG</TableColumn>
                <TableColumn className="w-1/12 text-center text-sm">VG</TableColumn>
                <TableColumn className="w-1/12 text-center text-sm">G</TableColumn>
              </TableHeader>
              <TableBody>
                {csapatEredmenyek.map((eredmeny, index) => (
                  <TableRow key={eredmeny.csapatnev}>
                    <TableCell className=" text-center text-sm">{index + 1}.</TableCell>
                    <TableCell className="text-sm">{eredmeny.csapatnev}</TableCell>
                    <TableCell className="text-center text-sm">{eredmeny.pontok}</TableCell>
                    <TableCell className="text-center text-sm">{eredmeny.gyozelmek}</TableCell>
                    <TableCell className="text-center text-sm">{eredmeny.dontetlenek}</TableCell>
                    <TableCell className="text-center text-sm">{eredmeny.veresegek}</TableCell>
                    <TableCell className="text-center text-sm">{eredmeny.hazaiGolok}</TableCell>
                    <TableCell className="text-center text-sm">{eredmeny.vendegGolok}</TableCell>
                    <TableCell className="text-center text-sm">{eredmeny.osszesGol}</TableCell>
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