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
import { AtlagEletkorString } from "@/app/lib/definitions";

export default function AtlagEletkor({
  atlagEletkor,
}: {
  atlagEletkor: AtlagEletkorString[];
}) {

  console.log("atlagEletkor", atlagEletkor);  
  return (
    <>
      <div className="flex justify-center">
        <Card className="mb-10 w-[400px]">
          <CardHeader className="flex justify-center py-2">
            <span className="text-2xl flex-1 text-center font-bold">
              Csapatok átlag életkora
            </span>
          </CardHeader>
          <CardBody className="pt-1 px-3 pb-2">
            <Table
              aria-label="Example table with dynamic content"
              removeWrapper
              selectionMode="single"
            >
              <TableHeader>
                <TableColumn className=" text-sm ">Csapatnév</TableColumn>
                <TableColumn className="text-sm ">Átlag</TableColumn>
                
              </TableHeader>
              <TableBody>
                {atlagEletkor.map((atlag) => (
                  <TableRow key={atlag.csapatnev}>
                    <TableCell className="text-sm">{atlag.csapatnev}</TableCell>
                    <TableCell className="text-sm">{atlag.atlag}</TableCell>
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