/*
  Warnings:

  - You are about to alter the column `datumIdopont` on the `Merkozes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[jatekosID]` on the table `Tagja` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Merkozes` MODIFY `datumIdopont` DATETIME NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Tagja_jatekosID_key` ON `Tagja`(`jatekosID`);
