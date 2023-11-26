/*
  Warnings:

  - You are about to alter the column `datumIdopont` on the `Merkozes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Merkozes` MODIFY `datumIdopont` DATETIME NULL;
