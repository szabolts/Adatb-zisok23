/*
  Warnings:

  - You are about to alter the column `datumIdopont` on the `Merkozes` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `Tagja` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Tagja` DROP FOREIGN KEY `Tagja_csapatID_fkey`;

-- DropForeignKey
ALTER TABLE `Tagja` DROP FOREIGN KEY `Tagja_jatekosID_fkey`;

-- AlterTable
ALTER TABLE `Merkozes` MODIFY `datumIdopont` DATETIME NULL;

-- DropTable
DROP TABLE `Tagja`;

-- AddForeignKey
ALTER TABLE `Jatekos` ADD CONSTRAINT `Jatekos_jatekosID_fkey` FOREIGN KEY (`jatekosID`) REFERENCES `Csapat`(`csapatID`) ON DELETE RESTRICT ON UPDATE CASCADE;
