"use client"
import React, { useState, useEffect } from 'react';
import {
  Select,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
  CardHeader,
  SelectItem
} from "@nextui-org/react";
import { Csapat, JatekosCsoportositas } from '@/app/lib/definitions';

export default function CsapatAllampTable() {
  const [csapatok, setCsapatok] = useState<Csapat[]>([]); // Csapatok listája
  const [kivalasztottCsapat, setKivalasztottCsapat] = useState(''); // Kiválasztott csapat
  const [statisztika, setStatisztika] = useState<JatekosCsoportositas[]>([]); // Statisztika eredmények
// console.log("Csapatok", csapatok)
// console.log("KivalasztottCsapat: ", kivalasztottCsapat)
  // Csapatok betöltése
  useEffect(() => {
    fetch('/api/adatb/csapatok') // feltételezve, hogy van ilyen API végpontod
      .then(response => response.json())
      .then(data => setCsapatok(data))
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  // Statisztika lekérdezése, amikor a kiválasztott csapat megváltozik
  useEffect(() => {
    if (kivalasztottCsapat) {
      fetch(`/api/adatb/${kivalasztottCsapat}`)
        .then(response => response.json())
        .then(data => setStatisztika(data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [kivalasztottCsapat]);

  return (
    <>
      <div className="flex justify-center">
        <Card className="mt-10 w-[800px]">
          <CardHeader className="flex-col justify-center py-2">
            <span className="text-xl text-center font-bold">
              Csapat Játékos Statisztika
            </span>
            <Select
              onChange={(e) => setKivalasztottCsapat(e.target.value)}
              size='sm'
              placeholder="Válassz csapatot"
              value={kivalasztottCsapat}
              className="mt-2 w-[200px]"
              aria-label="Válassz csapatot"
            >
              {csapatok.map(csapat => (
                <SelectItem key={csapat.csapatID} value={csapat.csapatnev}>{csapat.csapatnev}</SelectItem>
              ))}
            </Select>
          </CardHeader>
          <CardBody className="pt-1 px-3 pb-2">
            <Table
              aria-label="Example table with dynamic content"
              removeWrapper
              selectionMode="single"
            >
              <TableHeader>
                <TableColumn className="text-sm">Állampolgárság</TableColumn>
                <TableColumn className="text-sm">Játékosok Száma</TableColumn>
              </TableHeader>
              <TableBody>
                {statisztika.map((elem, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-sm">{elem.allampolgarsag}</TableCell>
                    <TableCell className="text-sm">{elem.darab}</TableCell>
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
