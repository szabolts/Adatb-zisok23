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
        <Card className="mt-10 w-[800px]">
          <CardHeader className="flex justify-center py-2">
            <span className="text-xl flex-1 text-center font-bold">
              Csapatok Győzelmek és Vereségek
            </span>
          </CardHeader>
          <CardBody className="pt-1 px-3 pb-2">
            <Table
              aria-label="Example table with dynamic content"
              removeWrapper
              selectionMode="single"
            >
              <TableHeader>
                <TableColumn className="text-sm w-6">Helyezés</TableColumn>
                <TableColumn className="text-sm">Csapat</TableColumn>
                <TableColumn className="text-sm">Pontok</TableColumn>
                <TableColumn className="text-sm">Győzelem</TableColumn>
                <TableColumn className="text-sm">Döntetlen</TableColumn>
                <TableColumn className="text-sm">Vereség</TableColumn>
                {/* <TableColumn className="text-sm">Hazai gól</TableColumn>
                <TableColumn className="text-sm">Vendég gól</TableColumn>
                <TableColumn className="text-sm">Összes gól</TableColumn> */}
              </TableHeader>
              <TableBody>
                {csapatEredmenyek.map((eredmeny, index) => (
                  <TableRow key={eredmeny.csapatnev}>
                    <TableCell className="text-sm">{index + 1}.</TableCell>
                    <TableCell className="text-sm">{eredmeny.csapatnev}</TableCell>
                    <TableCell className="text-sm">{eredmeny.pontok}</TableCell>
                    <TableCell className="text-sm">{eredmeny.gyozelmek}</TableCell>
                    <TableCell className="text-sm">{eredmeny.dontetlenek}</TableCell>
                    <TableCell className="text-sm">{eredmeny.veresegek}</TableCell>
                    {/* <TableCell className="text-sm">{eredmeny.hazaiGolok}</TableCell>
                    <TableCell className="text-sm">{eredmeny.vendegGolok}</TableCell>
                    <TableCell className="text-sm">{eredmeny.osszesGol}</TableCell> */}
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
