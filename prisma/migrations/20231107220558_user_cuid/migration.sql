/*
  Warnings:

  - The primary key for the `Felhasznalo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `Felhasznalo` DROP PRIMARY KEY,
    MODIFY `felhasznaloID` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`felhasznaloID`);
