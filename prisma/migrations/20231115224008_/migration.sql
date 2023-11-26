/*
  Warnings:

  - You are about to alter the column `datumIdopont` on the `Merkozes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- DropForeignKey
ALTER TABLE `Jatekos` DROP FOREIGN KEY `Jatekos_jatekosID_fkey`;

-- AlterTable
ALTER TABLE `Jatekos` ADD COLUMN `csapatID` INTEGER NULL;

-- AlterTable
ALTER TABLE `Merkozes` MODIFY `datumIdopont` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `Jatekos` ADD CONSTRAINT `Jatekos_csapatID_fkey` FOREIGN KEY (`csapatID`) REFERENCES `Csapat`(`csapatID`) ON DELETE SET NULL ON UPDATE CASCADE;
