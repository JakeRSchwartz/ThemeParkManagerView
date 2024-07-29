CREATE DATABASE  IF NOT EXISTS `coogsparkdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `coogsparkdb`;
-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: coogsparkdb.c1wwoyeg8st9.us-east-2.rds.amazonaws.com    Database: coogsparkdb
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `Attendant_Assignment`
--

DROP TABLE IF EXISTS `Attendant_Assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attendant_Assignment` (
  `attendant_id` int unsigned NOT NULL,
  `assignment_id` int unsigned NOT NULL AUTO_INCREMENT,
  `ride_id` int unsigned NOT NULL,
  `shift_id` int unsigned NOT NULL,
  PRIMARY KEY (`assignment_id`),
  UNIQUE KEY `assignment_id` (`assignment_id`),
  KEY `attendant_id` (`attendant_id`),
  KEY `ride_id` (`ride_id`),
  KEY `shift_id_fk_idx` (`shift_id`),
  CONSTRAINT `Attendant_Assignment_ibfk_1` FOREIGN KEY (`attendant_id`) REFERENCES `User_Account` (`account_id`),
  CONSTRAINT `Attendant_Assignment_ibfk_2` FOREIGN KEY (`ride_id`) REFERENCES `Rides` (`ride_id`),
  CONSTRAINT `shift_id_fk` FOREIGN KEY (`shift_id`) REFERENCES `Shifts` (`shit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attendant_Assignment`
--

LOCK TABLES `Attendant_Assignment` WRITE;
/*!40000 ALTER TABLE `Attendant_Assignment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Attendant_Assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Attendent_Schedule`
--

DROP TABLE IF EXISTS `Attendent_Schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attendent_Schedule` (
  `shift_id` int unsigned NOT NULL AUTO_INCREMENT,
  `shifts` enum('8:00am-12:00pm','12:00pm-4:00pm','4:00pm-8:00','8:00-11:30') DEFAULT NULL,
  `shift_date` date DEFAULT NULL,
  `ride_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`shift_id`),
  UNIQUE KEY `shift_id` (`shift_id`),
  KEY `ride_fk1_idx` (`ride_id`),
  CONSTRAINT `ride_fk1` FOREIGN KEY (`ride_id`) REFERENCES `Rides` (`ride_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attendent_Schedule`
--

LOCK TABLES `Attendent_Schedule` WRITE;
/*!40000 ALTER TABLE `Attendent_Schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `Attendent_Schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Attraction`
--

DROP TABLE IF EXISTS `Attraction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attraction` (
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `picture` varchar(150) NOT NULL,
  `age_restriction` int NOT NULL,
  `rained_out` tinyint(1) NOT NULL,
  `attraction_id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`attraction_id`),
  UNIQUE KEY `attraction_id_UNIQUE` (`attraction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attraction`
--

LOCK TABLES `Attraction` WRITE;
/*!40000 ALTER TABLE `Attraction` DISABLE KEYS */;
/*!40000 ALTER TABLE `Attraction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Attraction_Rainout`
--

DROP TABLE IF EXISTS `Attraction_Rainout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attraction_Rainout` (
  `attendant_id` int unsigned NOT NULL,
  `attraction_id` int unsigned NOT NULL,
  `rainout_id` int unsigned NOT NULL AUTO_INCREMENT,
  `date_rainout` date NOT NULL,
  PRIMARY KEY (`rainout_id`),
  UNIQUE KEY `rainout_id` (`rainout_id`),
  KEY `attraction_id` (`attraction_id`),
  KEY `attendant_id` (`attendant_id`),
  CONSTRAINT `Attraction_Rainout_ibfk_1` FOREIGN KEY (`attraction_id`) REFERENCES `Attraction` (`attraction_id`),
  CONSTRAINT `Attraction_Rainout_ibfk_2` FOREIGN KEY (`attendant_id`) REFERENCES `User_Account` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attraction_Rainout`
--

LOCK TABLES `Attraction_Rainout` WRITE;
/*!40000 ALTER TABLE `Attraction_Rainout` DISABLE KEYS */;
/*!40000 ALTER TABLE `Attraction_Rainout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Attraction_Visited`
--

DROP TABLE IF EXISTS `Attraction_Visited`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attraction_Visited` (
  `account_id` int unsigned NOT NULL,
  `attraction_visited` int unsigned NOT NULL,
  `visit_date` date NOT NULL,
  `attraction_visit_id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`attraction_visit_id`),
  UNIQUE KEY `attraction_visit_id` (`attraction_visit_id`),
  KEY `attraction_visited` (`attraction_visited`),
  KEY `Attraction_Visited_ibfk_1_idx` (`account_id`),
  CONSTRAINT `Attraction_Visited_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `User_Account` (`account_id`),
  CONSTRAINT `Attraction_Visited_ibfk_2` FOREIGN KEY (`attraction_visited`) REFERENCES `Attraction` (`attraction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attraction_Visited`
--

LOCK TABLES `Attraction_Visited` WRITE;
/*!40000 ALTER TABLE `Attraction_Visited` DISABLE KEYS */;
/*!40000 ALTER TABLE `Attraction_Visited` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customer_Info`
--

DROP TABLE IF EXISTS `Customer_Info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customer_Info` (
  `customerinfo_id` int unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int unsigned DEFAULT NULL,
  `height` int NOT NULL,
  PRIMARY KEY (`customerinfo_id`),
  UNIQUE KEY `customerinfo_id` (`customerinfo_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `Customer_Info_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `User_Account` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer_Info`
--

LOCK TABLES `Customer_Info` WRITE;
/*!40000 ALTER TABLE `Customer_Info` DISABLE KEYS */;
/*!40000 ALTER TABLE `Customer_Info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Entry_Pass`
--

DROP TABLE IF EXISTS `Entry_Pass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Entry_Pass` (
  `entry_pass_id` int unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int unsigned DEFAULT NULL,
  `date_purchased` datetime NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`entry_pass_id`),
  UNIQUE KEY `entry_pass_id` (`entry_pass_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `Entry_Pass_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `User_Account` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Entry_Pass`
--

LOCK TABLES `Entry_Pass` WRITE;
/*!40000 ALTER TABLE `Entry_Pass` DISABLE KEYS */;
/*!40000 ALTER TABLE `Entry_Pass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Maintenance_Request`
--

DROP TABLE IF EXISTS `Maintenance_Request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Maintenance_Request` (
  `breakdown_date` datetime NOT NULL,
  `breakdown_id` int unsigned NOT NULL AUTO_INCREMENT,
  `maintainer_id` int unsigned DEFAULT NULL,
  `fixed_date` datetime NOT NULL,
  `description` varchar(150) NOT NULL,
  `requester_id` int unsigned NOT NULL,
  `ride_id` int unsigned NOT NULL,
  PRIMARY KEY (`breakdown_id`),
  UNIQUE KEY `breakdown_id_UNIQUE` (`breakdown_id`),
  KEY `Maintenance_Request_ibfk_1` (`maintainer_id`),
  KEY `attendant_req_fk_idx` (`requester_id`),
  KEY `maintenance_ride?_fk_idx` (`ride_id`),
  CONSTRAINT `attendant_req_fk` FOREIGN KEY (`requester_id`) REFERENCES `User_Account` (`account_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `Maintenance_Request_ibfk_1` FOREIGN KEY (`maintainer_id`) REFERENCES `User_Account` (`account_id`),
  CONSTRAINT `maintenance_ride?_fk` FOREIGN KEY (`ride_id`) REFERENCES `Rides` (`ride_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Maintenance_Request`
--

LOCK TABLES `Maintenance_Request` WRITE;
/*!40000 ALTER TABLE `Maintenance_Request` DISABLE KEYS */;
/*!40000 ALTER TABLE `Maintenance_Request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ride_Rainout`
--

DROP TABLE IF EXISTS `Ride_Rainout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ride_Rainout` (
  `attendant_id` int unsigned NOT NULL,
  `ride_id` int unsigned NOT NULL,
  `rainout_id` int unsigned NOT NULL AUTO_INCREMENT,
  `date_rainout` date NOT NULL,
  PRIMARY KEY (`rainout_id`),
  UNIQUE KEY `rainout_id` (`rainout_id`),
  KEY `ride_id` (`ride_id`),
  KEY `attendant_id` (`attendant_id`),
  CONSTRAINT `Ride_Rainout_ibfk_1` FOREIGN KEY (`ride_id`) REFERENCES `Rides` (`ride_id`),
  CONSTRAINT `Ride_Rainout_ibfk_2` FOREIGN KEY (`attendant_id`) REFERENCES `User_Account` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ride_Rainout`
--

LOCK TABLES `Ride_Rainout` WRITE;
/*!40000 ALTER TABLE `Ride_Rainout` DISABLE KEYS */;
/*!40000 ALTER TABLE `Ride_Rainout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ride_Visited`
--

DROP TABLE IF EXISTS `Ride_Visited`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ride_Visited` (
  `account_id` int unsigned NOT NULL,
  `ride_visited` int unsigned NOT NULL,
  `visit_date` date NOT NULL,
  `ride_visit_id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ride_visit_id`),
  UNIQUE KEY `ride_visit_id` (`ride_visit_id`),
  KEY `ride_visited` (`ride_visited`),
  KEY `Ride_Visited_ibfk_1_idx` (`account_id`),
  CONSTRAINT `Ride_Visited_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `User_Account` (`account_id`),
  CONSTRAINT `Ride_Visited_ibfk_2` FOREIGN KEY (`ride_visited`) REFERENCES `Rides` (`ride_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ride_Visited`
--

LOCK TABLES `Ride_Visited` WRITE;
/*!40000 ALTER TABLE `Ride_Visited` DISABLE KEYS */;
/*!40000 ALTER TABLE `Ride_Visited` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rides`
--

DROP TABLE IF EXISTS `Rides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rides` (
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `broken` tinyint(1) NOT NULL,
  `picture` varchar(100) NOT NULL,
  `age_restriction` int NOT NULL,
  `height_restriction` int NOT NULL,
  `rained_out` tinyint(1) NOT NULL,
  `ride_id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ride_id`),
  UNIQUE KEY `ride_id_UNIQUE` (`ride_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rides`
--

LOCK TABLES `Rides` WRITE;
/*!40000 ALTER TABLE `Rides` DISABLE KEYS */;
/*!40000 ALTER TABLE `Rides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shifts`
--

DROP TABLE IF EXISTS `Shifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Shifts` (
  `shit_id` int unsigned NOT NULL AUTO_INCREMENT,
  `shift_date` date NOT NULL,
  `shift_type` enum('8:00a-12:00p','12:00p-4:00p','4:00p-8:00p','8:00p-11:30p') NOT NULL COMMENT 'Shift times:\\n8:00-12;00\\n12:00-4:00\\n4:00-8:00\\n8:00-11:30\\nCan be indexed via (1,2,3,4)',
  PRIMARY KEY (`shit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shifts`
--

LOCK TABLES `Shifts` WRITE;
/*!40000 ALTER TABLE `Shifts` DISABLE KEYS */;
/*!40000 ALTER TABLE `Shifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Account`
--

DROP TABLE IF EXISTS `User_Account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Account` (
  `dob` date NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(50) NOT NULL,
  `account_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_type` enum('customer','attendant','maintanence','admin') NOT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `Email_UNIQUE` (`email`),
  UNIQUE KEY `Account_id_UNIQUE` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Account`
--

LOCK TABLES `User_Account` WRITE;
/*!40000 ALTER TABLE `User_Account` DISABLE KEYS */;
/*!40000 ALTER TABLE `User_Account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'coogsparkdb'
--

--
-- Dumping routines for database 'coogsparkdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-25 18:59:09
