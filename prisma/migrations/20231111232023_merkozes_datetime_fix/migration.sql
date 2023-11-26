/*
  Warnings:

  - You are about to drop the column `datum` on the `Merkozes` table. All the data in the column will be lost.
  - You are about to drop the column `idopont` on the `Merkozes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Merkozes` DROP COLUMN `datum`,
    DROP COLUMN `idopont`,
    ADD COLUMN `datumIdopont` DATETIME NULL;
