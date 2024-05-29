CREATE DATABASE  IF NOT EXISTS `school-dev` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `school-dev`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: school-dev
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `classroom_members`
--

DROP TABLE IF EXISTS `classroom_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classroom_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `classroom_id` int DEFAULT NULL,
  `std_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_44dce22b6af24d8bbcd339d967c` (`classroom_id`),
  KEY `FK_68d1c95d84cc8ed19b496e8b5ff` (`std_id`),
  CONSTRAINT `FK_44dce22b6af24d8bbcd339d967c` FOREIGN KEY (`classroom_id`) REFERENCES `classrooms` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_68d1c95d84cc8ed19b496e8b5ff` FOREIGN KEY (`std_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom_members`
--

LOCK TABLES `classroom_members` WRITE;
/*!40000 ALTER TABLE `classroom_members` DISABLE KEYS */;
INSERT INTO `classroom_members` VALUES (1,1,1),(2,1,2),(7,2,3),(8,3,4),(9,4,5),(10,4,6),(11,6,7),(12,6,8),(13,7,9),(14,7,10);
/*!40000 ALTER TABLE `classroom_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classrooms`
--

DROP TABLE IF EXISTS `classrooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classrooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_number` varchar(255) NOT NULL,
  `room_name` varchar(255) NOT NULL,
  `school_year` year NOT NULL,
  `teacher_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classrooms`
--

LOCK TABLES `classrooms` WRITE;
/*!40000 ALTER TABLE `classrooms` DISABLE KEYS */;
INSERT INTO `classrooms` VALUES (1,'G101','Grade101',2021,'John'),(2,'G102','Grade102',2021,'Jane'),(3,'G201','Grade201',2022,'Jim'),(4,'G202','Grade202',2022,'Joey'),(6,'G301','Grade301',2023,'Jissy'),(7,'G302','Grade302',2023,'Jasica');
/*!40000 ALTER TABLE `classrooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `std_id` varchar(255) NOT NULL,
  `prefix` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `birthday` date NOT NULL,
  `grade_level` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ST101','Mr.','Student1','Surname1','Male','2024-05-01',1),(2,'ST102','Mr.','Student2','Surname2','Male','2024-05-02',1),(3,'ST103','Ms.','Student3','Surname3','Female','2024-05-03',1),(4,'ST201','Mr.','Student4','Surname4','Non-binary','2024-05-04',2),(5,'ST202','Ms.','Student5','Surname5','Other','2024-05-05',2),(6,'ST203','Mr.','Student6','Surname6','Non-binary','2024-05-06',2),(7,'ST301','Mr.','Student7','Surname7','Other','2024-05-07',3),(8,'ST302','Ms.','Student8','Surname8','Female','2024-05-08',3),(9,'ST303','Mr.','Student9','Surname9','Male','2024-05-09',3),(10,'ST304','Ms.','Student10','Surname10','Other','2024-05-10',3),(11,'ST305','Ms.','Student11','Surname11','Female','2024-05-11',3),(12,'ST306','Mr.','Student12','Surname12','Non-binary','2024-05-12',3);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-29  2:02:34
