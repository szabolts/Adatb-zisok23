-- CreateTable
CREATE TABLE `Felhasznalo` (
    `felhasznaloID` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `jelszo` VARCHAR(191) NOT NULL,
    `nev` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`felhasznaloID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `adminID` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `jelszo` VARCHAR(191) NOT NULL,
    `nev` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`adminID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Csapat` (
    `csapatID` INTEGER NOT NULL AUTO_INCREMENT,
    `csapatnev` VARCHAR(191) NOT NULL,
    `varos` VARCHAR(191) NOT NULL,
    `alapitva` YEAR NULL,

    PRIMARY KEY (`csapatID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Jatekos` (
    `jatekosID` INTEGER NOT NULL AUTO_INCREMENT,
    `jatekosnev` VARCHAR(191) NOT NULL,
    `szul_datum` DATE NULL,
    `allampolgarsag` VARCHAR(191) NULL,
    `poszt` VARCHAR(191) NULL,

    PRIMARY KEY (`jatekosID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Merkozes` (
    `merkozesID` INTEGER NOT NULL AUTO_INCREMENT,
    `palya` VARCHAR(191) NULL,
    `datum` DATE NULL,
    `idopont` TIME NULL,
    `hazaiCsID` INTEGER NULL,
    `vendegCsID` INTEGER NULL,
    `hazaiEredmeny` INTEGER NULL,
    `vendegEredmeny` INTEGER NULL,

    PRIMARY KEY (`merkozesID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resztvesz` (
    `csapatID` INTEGER NOT NULL,
    `tornaID` INTEGER NOT NULL,

    PRIMARY KEY (`csapatID`, `tornaID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tagja` (
    `jatekosID` INTEGER NOT NULL,
    `csapatID` INTEGER NOT NULL,

    PRIMARY KEY (`jatekosID`, `csapatID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Torna` (
    `tornaID` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(191) NOT NULL,
    `datum` DATE NULL,
    `helyszin` VARCHAR(191) NULL,

    PRIMARY KEY (`tornaID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Merkozes` ADD CONSTRAINT `Merkozes_hazaiCsID_fkey` FOREIGN KEY (`hazaiCsID`) REFERENCES `Csapat`(`csapatID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Merkozes` ADD CONSTRAINT `Merkozes_vendegCsID_fkey` FOREIGN KEY (`vendegCsID`) REFERENCES `Csapat`(`csapatID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resztvesz` ADD CONSTRAINT `Resztvesz_csapatID_fkey` FOREIGN KEY (`csapatID`) REFERENCES `Csapat`(`csapatID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Resztvesz` ADD CONSTRAINT `Resztvesz_tornaID_fkey` FOREIGN KEY (`tornaID`) REFERENCES `Torna`(`tornaID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tagja` ADD CONSTRAINT `Tagja_jatekosID_fkey` FOREIGN KEY (`jatekosID`) REFERENCES `Jatekos`(`jatekosID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tagja` ADD CONSTRAINT `Tagja_csapatID_fkey` FOREIGN KEY (`csapatID`) REFERENCES `Csapat`(`csapatID`) ON DELETE RESTRICT ON UPDATE CASCADE;
