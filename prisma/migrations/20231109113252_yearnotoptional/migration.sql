/*
  Warnings:

  - Made the column `alapitva` on table `Csapat` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Csapat` MODIFY `alapitva` YEAR NOT NULL;
