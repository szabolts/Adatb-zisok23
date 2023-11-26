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
  import { Merkozes } from "@/app/lib/definitions";
  
  export default function Merkozes7NapTable({
    merkozesek,
  }: {
    merkozesek: Merkozes[];
  }) {
   
    // console.log("Merkozesek in table:",merkozesek);
  
    return (
      <>
        <div className="flex justify-center">
          <Card className="mt-10 w-[800px]">
            <CardHeader className="flex justify-center py-2">
              <span className="text-xl flex-1 text-center font-bold">
                Következő 7 Nap Mérkőzései
              </span>
            </CardHeader>
            <CardBody className="pt-1 px-3 pb-2">
              <Table
                aria-label="Example table with dynamic content"
                removeWrapper
                selectionMode="single"
              >
                <TableHeader>
                  <TableColumn className="text-sm">Időpont</TableColumn>
                  <TableColumn className="text-sm">Hazai</TableColumn>
                  <TableColumn className="text-sm w-24">Eredmény</TableColumn>
                  <TableColumn className="text-sm w-24">Vendég</TableColumn>
                  <TableColumn className="text-sm">Pálya</TableColumn>
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
                      console.log(meccs);
                    return (
                      <TableRow key={meccs.merkozesID}>
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
  