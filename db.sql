-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: csapatsport3
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `csapatsport3`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `csapatsport3` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `csapatsport3`;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Admin` (
  `adminID` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(191) NOT NULL,
  `jelszo` varchar(191) NOT NULL,
  `nev` varchar(191) NOT NULL,
  PRIMARY KEY (`adminID`),
  UNIQUE KEY `Admin_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Csapat`
--

DROP TABLE IF EXISTS `Csapat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Csapat` (
  `csapatID` int(11) NOT NULL AUTO_INCREMENT,
  `csapatnev` varchar(191) NOT NULL,
  `varos` varchar(191) NOT NULL,
  `alapitva` year(4) NOT NULL,
  PRIMARY KEY (`csapatID`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Csapat`
--

LOCK TABLES `Csapat` WRITE;
/*!40000 ALTER TABLE `Csapat` DISABLE KEYS */;
INSERT INTO `Csapat` VALUES (23,'Szatymaz Thunder','Szatymaz',1990),(24,'Domaszék Falcons','Domaszék',1997),(25,'Deszk Timberwolves','Deszk',1995),(26,'Algyő Wizards','Algyő',2001),(27,'Csólyospálos Magic','Csólyospálos',1992),(28,'Ásotthalom Warriors','Ásotthalom',1999),(29,'Zsombó Raiders','Zsombó',1994),(30,'Röszke Vikings','Röszke',1998);
/*!40000 ALTER TABLE `Csapat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Jatekos`
--

DROP TABLE IF EXISTS `Jatekos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Jatekos` (
  `jatekosID` int(11) NOT NULL AUTO_INCREMENT,
  `jatekosnev` varchar(191) NOT NULL,
  `szul_datum` date DEFAULT NULL,
  `allampolgarsag` varchar(191) DEFAULT NULL,
  `poszt` varchar(191) DEFAULT NULL,
  `csapatID` int(11) DEFAULT NULL,
  PRIMARY KEY (`jatekosID`),
  KEY `Jatekos_csapatID_fkey` (`csapatID`),
  CONSTRAINT `Jatekos_csapatID_fkey` FOREIGN KEY (`csapatID`) REFERENCES `Csapat` (`csapatID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Jatekos`
--

LOCK TABLES `Jatekos` WRITE;
/*!40000 ALTER TABLE `Jatekos` DISABLE KEYS */;
INSERT INTO `Jatekos` VALUES (1,'Ronaldinho','1980-03-21','brazil','Támadó',24),(2,'Zlatan Ibrahimovic','1981-10-03','svéd','Támadó',30),(3,'David Beckham','1975-05-02','angol','Középpályás',24),(4,'Luis Figo','1972-11-04','portugál','Középpályás',28),(5,'Ronaldo Nazário','1976-09-22','brazil','Támadó',26),(6,'Andrea Pirlo','1979-05-19','olasz','Középpályás',27),(7,'Pavel Nedvěd','1972-08-30','cseh','Középpályás',23),(8,'Kaká','1982-04-22','brazil','Középpályás',26),(9,'Thierry Henry','1977-08-17','francia','Támadó',23),(10,'Fabio Cannavaro','1973-09-13','olasz','Védő',24),(11,'Samuel Eto\'o','1981-03-10','kameruni','Támadó',NULL),(12,'Frank Lampard','1978-06-20','angol','Középpályás',25),(13,'Paolo Maldini','1968-06-26','olasz','Védő',29),(14,'Didier Drogba','1978-03-11','elefántcsontparti','Támadó',29),(15,'Gianluigi Buffon','1978-01-28','olasz','Kapus',24),(16,'Alessandro Del Piero','1974-11-09','olasz','Támadó',25),(18,'Xavi Hernandez','1980-01-25','spanyol','Középpályás',NULL),(19,'Michael Ballack','1976-09-26','német','Középpályás',NULL),(20,'Cafu','1970-06-07','brazil','Védő',23),(21,'Patrick Vieira','1976-06-23','francia','Középpályás',NULL),(22,'Luís García','1978-06-24','spanyol','Középpályás',NULL),(23,'Roberto Carlos','1973-04-10','brazil','Védő',27),(24,'Pablo Aimar','1979-11-03','argentin','Középpályás',30),(25,'Javier Zanetti','1973-08-10','argentin','Védő',NULL),(26,'Freddie Ljungberg','1977-04-16','svéd','Középpályás',NULL),(27,'Gennaro Gattuso','1978-01-09','olasz','Középpályás',NULL),(28,'Francesco Totti','1976-09-27','olasz','Támadó',NULL),(29,'Juan Román Riquelme','1978-06-24','argentin','Középpályás',NULL),(30,'Dida','1973-10-07','brazil','Kapus',23),(31,'Ryan Giggs','1973-11-29','walesi','Középpályás',NULL),(32,'Roy Keane','1971-08-10','ír','Középpályás',NULL),(33,'Petr Čech','1982-05-20','cseh','Kapus',23),(34,'Gianfranco Zola','1966-07-05','olasz','Támadó',NULL),(35,'Fabio Grosso','1977-11-28','olasz','Védő',NULL),(36,'Juninho Pernambucano','1975-01-30','brazil','Középpályás',NULL),(37,'Alessandro Nesta','1976-03-19','olasz','Védő',NULL),(38,'Cesc Fàbregas','1987-05-04','spanyol','Középpályás',NULL),(39,'Luca Toni','1977-05-26','olasz','Támadó',NULL),(41,'Arjen Robben','1984-01-23','holland','Támadó',27),(42,'Guti','1976-10-31','spanyol','Középpályás',NULL),(44,'Raul Gonzalez','1977-06-27','spanyol','Támadó',NULL),(46,'Michael Ballack','1976-09-26','német','Középpályás',NULL),(47,'Andriy Shevchenko','1976-09-29','ukrán','Támadó',NULL),(49,'Lionel Messi','1987-06-24','argentin','Támadó',NULL),(50,'Neymar Jr.','1992-02-05','brazil','Támadó',28),(51,'Kylian Mbappé','1998-12-20','francia','Támadó',NULL),(52,'Robert Lewandowski','1988-08-21','lengyel','Támadó',NULL),(53,'Mohamed Salah','1992-06-15','egyiptomi','Támadó',NULL),(54,'Harry Kane','1993-07-28','angol','Támadó',NULL),(55,'Erling Haaland','2000-07-21','norvég','Támadó',NULL),(56,'Romelu Lukaku','1993-05-13','belga','Támadó',NULL),(57,'Sadio Mané','1992-04-10','senegáli','Támadó',NULL),(58,'Sergio Ramos','1986-03-30','spanyol','Védő',25),(59,'Virgil van Dijk','1991-07-08','holland','Védő',26),(60,'Ruben Dias','1997-05-14','portugál','Védő',NULL),(61,'Andrew Robertson','1994-03-11','skót','Védő',30),(62,'Joshua Kimmich','1995-02-08','német','Védő',NULL),(63,'Trent Alexander-Arnold','1998-10-07','angol','Védő',23),(64,'Marquinhos','1994-05-14','brazil','Védő',NULL),(65,'Raphael Varane','1993-04-25','francia','Védő',NULL),(66,'Aymeric Laporte','1994-05-27','spanyol','Védő',NULL),(67,'Kalidou Koulibaly','1991-06-20','szenegáli','Védő',NULL),(68,'Kevin De Bruyne','1991-06-28','belga','Középpályás',NULL),(69,'Luka Modric','1985-09-09','horvát','Középpályás',29),(70,'Bruno Fernandes','1994-09-08','portugál','Középpályás',NULL),(71,'Jorginho','1991-12-20','olasz','Középpályás',NULL),(72,'Jordan Henderson','1990-06-17','angol','Középpályás',NULL),(73,'Frenkie de Jong','1997-05-12','holland','Középpályás',NULL),(74,'Saul Niguez','1994-11-21','spanyol','Középpályás',NULL),(75,'Thomas Müller','1989-09-13','német','Középpályás',NULL),(76,'Erling Braut Haaland','2000-07-21','norvég','Támadó',NULL),(77,'Riyad Mahrez','1991-02-21','algériai','Támadó',NULL),(78,'Christian Pulisic','1998-09-18','amerikai','Támadó',NULL),(79,'Lautaro Martínez','1997-08-22','argentin','Támadó',NULL),(80,'Ansu Fati','2002-10-31','spanyol','Támadó',NULL),(81,'Ferran Torres','2000-02-29','spanyol','Támadó',NULL),(82,'Mason Mount','1999-01-10','angol','Középpályás',NULL),(83,'Phil Foden','2000-05-28','angol','Középpályás',NULL),(84,'Jadon Sancho','2000-03-25','angol','Támadó',NULL),(85,'Kai Havertz','1999-06-11','német','Középpályás',NULL),(86,'Giovanni Reyna','2002-11-13','amerikai','Középpályás',NULL),(87,'João Cancelo','1994-05-27','portugál','Védő',28),(88,'Ben Chilwell','1996-12-21','angol','Védő',NULL),(89,'Lucas Hernandez','1996-02-14','francia','Védő',NULL),(90,'Achraf Hakimi','1998-11-04','marokkói','Védő',NULL),(91,'Aaron Wan-Bissaka','1997-11-26','angol','Védő',NULL),(92,'Nicolo Barella','1997-02-07','olasz','Középpályás',NULL),(93,'Sergej Milinkovic-Savic','1995-02-27','szerb','Középpályás',NULL),(94,'Federico Valverde','1998-07-22','uruguayi','Középpályás',NULL),(95,'Declan Rice','1999-01-14','angol','Középpályás',NULL),(96,'Rodri','1996-06-22','spanyol','Középpályás',NULL),(98,'Pedri','2002-11-25','spanyol','Középpályás',NULL),(99,'Eduardo Camavinga','2002-11-10','francia','Középpályás',NULL),(100,'Luis Suárez','1987-01-24','uruguayi','Támadó',NULL),(101,'Eden Hazard','1991-01-07','belga','Támadó',NULL),(102,'Dusan Tadic','1988-11-20','szerb','Középpályás',NULL),(103,'Hakim Ziyech','1993-03-19','marokkói','Középpályás',NULL),(104,'Diogo Jota','1996-12-04','portugál','Támadó',NULL),(105,'Manuel Neuer','1986-03-27','német','Kapus',25),(106,'Alisson Becker','1992-10-02','brazil','Kapus',27),(107,'Ederson','1993-08-17','brazil','Kapus',26),(108,'Keylor Navas','1986-12-15','costarica-i','Kapus',28),(109,'Thibaut Courtois','1992-05-11','belga','Kapus',29),(110,'Marc-André ter Stegen','1992-04-30','német','Kapus',30),(111,'Hugo Lloris','1986-12-26','francia','Kapus',NULL),(112,'David de Gea','1990-11-07','spanyol','Kapus',26),(113,'Gianluigi Donnarumma','1999-02-25','olasz','Kapus',NULL),(114,'Szoboszlai Dominik','2000-10-25','Magyar','Középpályás',NULL);
/*!40000 ALTER TABLE `Jatekos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Merkozes`
--

DROP TABLE IF EXISTS `Merkozes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Merkozes` (
  `merkozesID` int(11) NOT NULL AUTO_INCREMENT,
  `palya` varchar(191) DEFAULT NULL,
  `hazaiCsID` int(11) DEFAULT NULL,
  `vendegCsID` int(11) DEFAULT NULL,
  `hazaiEredmeny` int(11) DEFAULT NULL,
  `vendegEredmeny` int(11) DEFAULT NULL,
  `datumIdopont` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`merkozesID`),
  KEY `Merkozes_hazaiCsID_fkey` (`hazaiCsID`),
  KEY `Merkozes_vendegCsID_fkey` (`vendegCsID`),
  CONSTRAINT `Merkozes_hazaiCsID_fkey` FOREIGN KEY (`hazaiCsID`) REFERENCES `Csapat` (`csapatID`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Merkozes_vendegCsID_fkey` FOREIGN KEY (`vendegCsID`) REFERENCES `Csapat` (`csapatID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Merkozes`
--

LOCK TABLES `Merkozes` WRITE;
/*!40000 ALTER TABLE `Merkozes` DISABLE KEYS */;
INSERT INTO `Merkozes` VALUES (11,'B',23,24,1,0,'2023-11-13 16:08:00.000'),(12,'A',23,25,0,1,'2023-11-14 16:09:00.000'),(15,'A',29,23,1,0,'2023-11-20 13:37:00.000'),(17,'A',23,29,1,0,'2023-11-21 12:42:00.000'),(18,'A',25,23,1,2,'2023-11-19 11:58:00.000'),(19,'A',23,28,5,1,'2023-11-15 13:51:00.000');
/*!40000 ALTER TABLE `Merkozes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Resztvesz`
--

DROP TABLE IF EXISTS `Resztvesz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Resztvesz` (
  `csapatID` int(11) NOT NULL,
  `tornaID` int(11) NOT NULL,
  PRIMARY KEY (`csapatID`,`tornaID`),
  KEY `Resztvesz_tornaID_fkey` (`tornaID`),
  CONSTRAINT `Resztvesz_csapatID_fkey` FOREIGN KEY (`csapatID`) REFERENCES `Csapat` (`csapatID`) ON UPDATE CASCADE,
  CONSTRAINT `Resztvesz_tornaID_fkey` FOREIGN KEY (`tornaID`) REFERENCES `Torna` (`tornaID`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Resztvesz`
--

LOCK TABLES `Resztvesz` WRITE;
/*!40000 ALTER TABLE `Resztvesz` DISABLE KEYS */;
/*!40000 ALTER TABLE `Resztvesz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Torna`
--

DROP TABLE IF EXISTS `Torna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Torna` (
  `tornaID` int(11) NOT NULL AUTO_INCREMENT,
  `nev` varchar(191) NOT NULL,
  `datum` date DEFAULT NULL,
  `helyszin` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`tornaID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Torna`
--

LOCK TABLES `Torna` WRITE;
/*!40000 ALTER TABLE `Torna` DISABLE KEYS */;
/*!40000 ALTER TABLE `Torna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('clp5zts0n0000d1yt3yji2645','asdasd2@gmail.com','$2b$10$V03NNFFdMsNIzX6CxAE4femlwhreQ/NqVS4wVttrQe.qJqQP02reG','szabi'),('clp8l4v620000j9yt6c3u596l','asdasd@gmail.com','$2b$10$vdINtmyT1Cbu1XYawlW4gOUxBQZf3zfNYyltNsigydJVUx4h47yyC','Szabi'),('clp8uh1pf0000j9ytctz2h0fw','asdasd@asd.com','$2b$10$Wmdi.87Br8lhhjpV.cWtzOuvehgq85NVHxDltDMXosYSlvU6/C4RO','asd');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('138983ac-9c20-4ba6-8e93-c2ca4e336eb8','f7dd88f2a71cdeaf505a7d6bb96610e0173f90f6c2cb7c03b4896ea13e5b6b56','2023-11-16 15:02:46.909','20231116150246_',NULL,NULL,'2023-11-16 15:02:46.895',1),('70fe6d85-9efe-4cc8-be9c-758dadb142a1','35b27693a03b2044118f76cb4d56786ace97729f39581f0fcae4ed52dc799871','2023-11-16 15:03:34.273','20231116150334_',NULL,NULL,'2023-11-16 15:03:34.241',1),('7cd1a692-53aa-44de-8047-7c5044c3c144','b8cab7686ba526068f11cfd06aa50ed9abdc11cc35795d5d5ce1b60f79295a0b','2023-11-15 22:40:07.334','20231107220558_user_cuid',NULL,NULL,'2023-11-15 22:40:07.309',1),('7dd5c1b3-c1d2-46fb-b359-c8e76a9d5cf5','4a87e8e196237a0f6f74cba1571772d541bccfa1a22bdf0fcb34181d5b326278','2023-11-15 22:40:07.404','20231108000659_felhasznalo_to_user',NULL,NULL,'2023-11-15 22:40:07.382',1),('8cdf4507-eb68-4cd0-b63f-2c965008f4ef','f7dd88f2a71cdeaf505a7d6bb96610e0173f90f6c2cb7c03b4896ea13e5b6b56','2023-11-16 15:01:10.002','20231116150109_',NULL,NULL,'2023-11-16 15:01:09.978',1),('8d0fa43b-887f-4a5e-9cc6-f219b9466f46','5133715ac1d6efe0decf3eff303e855e69c15bc23412a31fd7e34bef45a4cc41','2023-11-15 22:40:08.746','20231115224008_',NULL,NULL,'2023-11-15 22:40:08.676',1),('af8b0a8b-8e54-472b-8e8e-88fcd0052b32','010545a828f065f44d0b3bf9b28823a97d5ab0011587d0be6d0c1d4d2325c6a3','2023-11-15 22:40:07.547','20231115223307_tagja_delete',NULL,NULL,'2023-11-15 22:40:07.483',1),('c0997bbf-8e41-4ba6-927c-496c616e40c9','82837ba9a46ce56f6d044767726bb2151abb1059d133e5abdafa525cf8ee0682','2023-11-15 22:40:07.426','20231109113252_yearnotoptional',NULL,NULL,'2023-11-15 22:40:07.405',1),('e2728a20-2fd0-46f9-83e2-e0b8dd381818','b26daf9eeb3a042ecd5d3c793ed92f26781ae3e043022e1e2a397d6b415eaf11','2023-11-15 22:40:07.446','20231111232023_merkozes_datetime_fix',NULL,NULL,'2023-11-15 22:40:07.427',1),('effc3e88-2370-4669-80a5-8ef531fa3644','590621241f1ac2f529b1be3cd68dda56e39ffb69a14c8af2d9680eecb64b5a84','2023-11-15 22:40:07.482','20231115215630_egyjatekos_egycsapat',NULL,NULL,'2023-11-15 22:40:07.447',1),('f668a937-17ba-4b23-9692-2e342b2f215f','273b6b57300b15b23d387215741534ff1fa53468fd7cac718ab511e4019e3ae8','2023-11-15 22:40:07.381','20231107231849_',NULL,NULL,'2023-11-15 22:40:07.335',1),('f955d267-77de-4fe3-9b21-fb95c81e60a5','c2e468706aaa21dfef7cb85cb7dca3b434a712f474bf29b6450ddcc776d73277','2023-11-15 22:40:07.308','20231102233829_v1_0',NULL,NULL,'2023-11-15 22:40:07.075',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-26 18:19:16
