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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `Attendant_Game_Assignment`
--

DROP TABLE IF EXISTS `Attendant_Game_Assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attendant_Game_Assignment` (
  `game_id` int unsigned NOT NULL,
  `attendant_id` int unsigned NOT NULL,
  `shift_id` int unsigned NOT NULL,
  `assignment_id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`assignment_id`),
  UNIQUE KEY `assignment_id` (`assignment_id`),
  KEY `Attendant_Game_Assignment_ibfk_1` (`shift_id`),
  KEY `Attendant_Game_Assignment_ibfk_2` (`game_id`),
  KEY `Attendant_Game_Assignment_ibfk_3` (`attendant_id`),
  CONSTRAINT `Attendant_Game_Assignment_ibfk_1` FOREIGN KEY (`shift_id`) REFERENCES `Shifts` (`shift_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Attendant_Game_Assignment_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `Games` (`game_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Attendant_Game_Assignment_ibfk_3` FOREIGN KEY (`attendant_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attendant_Game_Assignment`
--

LOCK TABLES `Attendant_Game_Assignment` WRITE;
/*!40000 ALTER TABLE `Attendant_Game_Assignment` DISABLE KEYS */;
INSERT INTO `Attendant_Game_Assignment` VALUES (827465,31,5,41),(731824,34,19,44),(608938,35,50,45),(942176,36,7,46);
/*!40000 ALTER TABLE `Attendant_Game_Assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Attendant_Ride_Assignment`
--

DROP TABLE IF EXISTS `Attendant_Ride_Assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attendant_Ride_Assignment` (
  `attendant_id` int unsigned NOT NULL,
  `assignment_id` int unsigned NOT NULL AUTO_INCREMENT,
  `ride_id` int unsigned NOT NULL,
  `shift_id` int unsigned NOT NULL,
  PRIMARY KEY (`assignment_id`),
  UNIQUE KEY `assignment_id` (`assignment_id`),
  KEY `shift_id_fk_idx` (`shift_id`),
  KEY `Attendant_Ride_Assignment_ibfk_1` (`attendant_id`),
  KEY `Attendant_Ride_Assignment_ibfk_2` (`ride_id`),
  CONSTRAINT `Attendant_Ride_Assignment_ibfk_1` FOREIGN KEY (`attendant_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Attendant_Ride_Assignment_ibfk_2` FOREIGN KEY (`ride_id`) REFERENCES `Rides` (`ride_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shift_id_fk` FOREIGN KEY (`shift_id`) REFERENCES `Shifts` (`shift_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attendant_Ride_Assignment`
--

LOCK TABLES `Attendant_Ride_Assignment` WRITE;
/*!40000 ALTER TABLE `Attendant_Ride_Assignment` DISABLE KEYS */;
INSERT INTO `Attendant_Ride_Assignment` VALUES (62,1,891634,4),(64,3,163927,3),(65,4,216398,4),(66,5,295847,18),(67,6,347562,96),(68,7,409273,91),(69,8,502746,1),(71,10,582910,98),(73,12,625198,38),(74,13,736841,30),(75,14,748315,32);
/*!40000 ALTER TABLE `Attendant_Ride_Assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Attendent_Schedule`
--

DROP TABLE IF EXISTS `Attendent_Schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attendent_Schedule` (
  `shift_id` int unsigned NOT NULL AUTO_INCREMENT,
  `shifts` int NOT NULL,
  `shift_date` date DEFAULT NULL,
  `attendant_id` int unsigned NOT NULL,
  `attraction_id` int unsigned DEFAULT NULL,
  `game_id` int unsigned DEFAULT NULL,
  `ride_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`shift_id`),
  UNIQUE KEY `shift_id` (`shift_id`),
  KEY `attendant_id_idx` (`attendant_id`),
  KEY `fk_attendant_attraction` (`attraction_id`),
  KEY `fk_attendant_game` (`game_id`),
  KEY `fk_attendant_ride` (`ride_id`),
  KEY `fk_time_idx` (`shifts`),
  CONSTRAINT `fk_attendant_attraction` FOREIGN KEY (`attraction_id`) REFERENCES `Attraction` (`attraction_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_attendant_game` FOREIGN KEY (`game_id`) REFERENCES `Games` (`game_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_attendant_ride` FOREIGN KEY (`ride_id`) REFERENCES `Rides` (`ride_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_attendant_user_id` FOREIGN KEY (`attendant_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `shift_time_fk` FOREIGN KEY (`shifts`) REFERENCES `Shift_Time` (`shift_time_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attendent_Schedule`
--

LOCK TABLES `Attendent_Schedule` WRITE;
/*!40000 ALTER TABLE `Attendent_Schedule` DISABLE KEYS */;
INSERT INTO `Attendent_Schedule` VALUES (3,1,'2024-04-17',31,NULL,NULL,736841),(4,1,'2024-04-17',62,NULL,NULL,736841),(5,1,'2024-04-17',35,NULL,NULL,736841),(6,3,'2024-04-17',34,207564,NULL,NULL),(7,1,'2024-04-17',67,207564,NULL,NULL),(8,1,'2024-04-17',75,NULL,NULL,830172),(9,2,'2024-04-17',157,473628,NULL,NULL),(11,1,'2024-04-18',157,NULL,608937,NULL),(12,3,'2024-04-18',157,NULL,428509,NULL),(13,3,'2024-04-23',64,NULL,NULL,216398);
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
  `broken` tinyint(1) NOT NULL DEFAULT '0',
  `cost` decimal(10,2) NOT NULL DEFAULT '12.00',
  PRIMARY KEY (`attraction_id`),
  UNIQUE KEY `attraction_id_UNIQUE` (`attraction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=914373 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attraction`
--

LOCK TABLES `Attraction` WRITE;
/*!40000 ALTER TABLE `Attraction` DISABLE KEYS */;
INSERT INTO `Attraction` VALUES ('Foam Disco','The Foam Disco is a Cougar\'s Park favorite party with us and have fun in the foam!','../../assets/Attractions/FoamDisco.png',18,0,207564,0,12.50),('Laser Tags','Build your team and prepare to combat soldier, Come to the Laser Tags to start the fun!','../../assets/Attractions/LaserTags.png',10,0,473628,0,12.00),('Children Farm','The Children Farm is the perfect place to spend time with your children and pet cute animals.','../../assets/Attractions/ChildrenFarm.png',10,1,539871,0,12.00),('Horror House','Do you like to get spooked? enter to Horror House and be ready to face your fears!','../../assets\\Attractions\\HorrorHouse.png',0,0,825419,0,12.00),('Rodeo Bar','Feeling Rowdy? Rodeo Bar is the perfect place to party like if you were at the Frontier Fiesta.','../../assets/Attractions/RodeoBar.png',21,0,914372,0,12.50);
/*!40000 ALTER TABLE `Attraction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AttractionMaintenanceSeen`
--

DROP TABLE IF EXISTS `AttractionMaintenanceSeen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AttractionMaintenanceSeen` (
  `seen_id` int NOT NULL AUTO_INCREMENT,
  `trigger_id` int NOT NULL,
  `user_id` int unsigned NOT NULL,
  `seen` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`seen_id`),
  KEY `fk_trigger_id5` (`trigger_id`),
  KEY `fk_user_id5` (`user_id`),
  CONSTRAINT `fk_trigger_id5` FOREIGN KEY (`trigger_id`) REFERENCES `Trigger_AttractionMaintenance` (`trigger_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_id5` FOREIGN KEY (`user_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AttractionMaintenanceSeen`
--

LOCK TABLES `AttractionMaintenanceSeen` WRITE;
/*!40000 ALTER TABLE `AttractionMaintenanceSeen` DISABLE KEYS */;
INSERT INTO `AttractionMaintenanceSeen` VALUES (1,1,156,1),(2,2,156,1),(3,1,155,1),(4,2,155,1),(5,3,155,1),(6,3,156,1),(7,4,156,1),(8,4,157,1),(9,3,157,1),(10,2,157,1),(11,1,157,1),(12,4,155,1),(13,4,158,1),(14,1,158,1),(15,2,158,1),(16,3,158,1);
/*!40000 ALTER TABLE `AttractionMaintenanceSeen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AttractionRainoutSeen`
--

DROP TABLE IF EXISTS `AttractionRainoutSeen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AttractionRainoutSeen` (
  `seen_id` int NOT NULL AUTO_INCREMENT,
  `trigger_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `seen` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`seen_id`),
  UNIQUE KEY `trigger_id` (`trigger_id`,`user_id`),
  KEY `AttractionRainoutSeen_ibfk_2` (`user_id`),
  CONSTRAINT `AttractionRainoutSeen_ibfk_1` FOREIGN KEY (`trigger_id`) REFERENCES `Trigger_AttractionRainout` (`trigger_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `AttractionRainoutSeen_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AttractionRainoutSeen`
--

LOCK TABLES `AttractionRainoutSeen` WRITE;
/*!40000 ALTER TABLE `AttractionRainoutSeen` DISABLE KEYS */;
/*!40000 ALTER TABLE `AttractionRainoutSeen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Attraction_Cart`
--

DROP TABLE IF EXISTS `Attraction_Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attraction_Cart` (
  `Attraction_Cart_id` int NOT NULL AUTO_INCREMENT,
  `attraction_id` int unsigned NOT NULL,
  `account_id` int unsigned NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `purchased` tinyint(1) NOT NULL DEFAULT '0',
  `quantity` int NOT NULL,
  PRIMARY KEY (`Attraction_Cart_id`),
  KEY `fk_attraction` (`attraction_id`),
  KEY `fka_account` (`account_id`),
  CONSTRAINT `fk_attraction` FOREIGN KEY (`attraction_id`) REFERENCES `Attraction` (`attraction_id`) ON DELETE CASCADE,
  CONSTRAINT `fka_account` FOREIGN KEY (`account_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attraction_Cart`
--

LOCK TABLES `Attraction_Cart` WRITE;
/*!40000 ALTER TABLE `Attraction_Cart` DISABLE KEYS */;
INSERT INTO `Attraction_Cart` VALUES (2,539871,158,12.00,1,1),(5,207564,158,12.00,1,1),(6,914372,175,12.50,1,1),(7,914372,178,12.50,1,1),(8,914372,180,0.50,1,0);
/*!40000 ALTER TABLE `Attraction_Cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Attraction_Maintenance_Request`
--

DROP TABLE IF EXISTS `Attraction_Maintenance_Request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attraction_Maintenance_Request` (
  `breakdown_id` int NOT NULL AUTO_INCREMENT,
  `attraction_id` int unsigned DEFAULT NULL,
  `maintainer_id` int unsigned DEFAULT NULL,
  `requester_id` int unsigned DEFAULT NULL,
  `breakdown_date` date NOT NULL,
  `fixed_date` date DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  PRIMARY KEY (`breakdown_id`),
  KEY `fk2_attraction` (`attraction_id`),
  KEY `fk_maintainer` (`maintainer_id`),
  KEY `fk_requester` (`requester_id`),
  CONSTRAINT `fk2_attraction` FOREIGN KEY (`attraction_id`) REFERENCES `Attraction` (`attraction_id`),
  CONSTRAINT `fk_maintainer` FOREIGN KEY (`maintainer_id`) REFERENCES `User_Account` (`account_id`),
  CONSTRAINT `fk_requester` FOREIGN KEY (`requester_id`) REFERENCES `User_Account` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attraction_Maintenance_Request`
--

LOCK TABLES `Attraction_Maintenance_Request` WRITE;
/*!40000 ALTER TABLE `Attraction_Maintenance_Request` DISABLE KEYS */;
INSERT INTO `Attraction_Maintenance_Request` VALUES (1,207564,156,156,'2024-04-16','2024-04-16','Nothing'),(2,207564,156,156,'2024-04-16','2024-04-16','Nothing'),(3,473628,156,156,'2024-04-16','2024-04-16','Foam not working'),(4,473628,156,156,'2024-04-16','2024-04-16','Laser is not Lasering');
/*!40000 ALTER TABLE `Attraction_Maintenance_Request` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `AfterAttractionMaintenance` AFTER INSERT ON `Attraction_Maintenance_Request` FOR EACH ROW BEGIN
    INSERT INTO Trigger_AttractionMaintenance(attraction_id, date, broken, type)
    VALUES (NEW.attraction_id, NOW(), 1, 'AM');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `date_end` date DEFAULT NULL,
  PRIMARY KEY (`rainout_id`),
  UNIQUE KEY `rainout_id` (`rainout_id`),
  KEY `Attraction_Rainout_ibfk_2` (`attendant_id`),
  KEY `Attraction_Rainout_ibfk_1` (`attraction_id`),
  CONSTRAINT `Attraction_Rainout_ibfk_1` FOREIGN KEY (`attraction_id`) REFERENCES `Attraction` (`attraction_id`),
  CONSTRAINT `Attraction_Rainout_ibfk_2` FOREIGN KEY (`attendant_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attraction_Rainout`
--

LOCK TABLES `Attraction_Rainout` WRITE;
/*!40000 ALTER TABLE `Attraction_Rainout` DISABLE KEYS */;
/*!40000 ALTER TABLE `Attraction_Rainout` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `AfterAttractionRainout1` AFTER INSERT ON `Attraction_Rainout` FOR EACH ROW BEGIN
    INSERT INTO Trigger_AttractionRainout(attraction_id, date, rainout, type)
    VALUES (NEW.attraction_id, NOW(), 1,'AR');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Attraction_Visited`
--

DROP TABLE IF EXISTS `Attraction_Visited`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attraction_Visited` (
  `account_id` int unsigned NOT NULL,
  `attraction_id` int unsigned NOT NULL,
  `visit_date` date NOT NULL,
  `attraction_visit_id` int unsigned NOT NULL AUTO_INCREMENT,
  `cost` decimal(5,2) NOT NULL DEFAULT '12.00',
  `num_tickets` int NOT NULL,
  PRIMARY KEY (`attraction_visit_id`),
  UNIQUE KEY `attraction_visit_id` (`attraction_visit_id`),
  KEY `Attraction_Visited_ibfk_1_idx` (`account_id`),
  KEY `Attraction_Visited_ibfk_2` (`attraction_id`),
  CONSTRAINT `Attraction_Visited_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `User_Account` (`account_id`),
  CONSTRAINT `Attraction_Visited_ibfk_2` FOREIGN KEY (`attraction_id`) REFERENCES `Attraction` (`attraction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attraction_Visited`
--

LOCK TABLES `Attraction_Visited` WRITE;
/*!40000 ALTER TABLE `Attraction_Visited` DISABLE KEYS */;
INSERT INTO `Attraction_Visited` VALUES (138,539871,'2024-01-15',4,12.00,1),(138,825419,'2024-02-03',5,12.00,1),(134,473628,'2024-03-05',6,12.00,1),(140,914372,'2024-03-19',7,12.00,1),(139,207564,'2024-03-20',8,12.00,1),(140,914372,'2024-04-04',10,12.00,1),(158,207564,'2024-04-15',12,12.00,1),(175,914372,'2024-04-18',13,12.50,1),(178,914372,'2024-04-18',14,12.50,1),(180,914372,'2024-04-18',15,12.50,1);
/*!40000 ALTER TABLE `Attraction_Visited` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CreditCards`
--

DROP TABLE IF EXISTS `CreditCards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CreditCards` (
  `card_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int unsigned NOT NULL,
  `card_number` varchar(255) NOT NULL,
  `card_holder_name` varchar(255) NOT NULL,
  `expire_date` varchar(10) NOT NULL,
  `cvv` varchar(5) NOT NULL,
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `zip_code` varchar(10) NOT NULL,
  PRIMARY KEY (`card_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `CreditCards_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `User_Account` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CreditCards`
--

LOCK TABLES `CreditCards` WRITE;
/*!40000 ALTER TABLE `CreditCards` DISABLE KEYS */;
INSERT INTO `CreditCards` VALUES (1,158,'1111111111111111','Jake Schwartz','09/28','222','100 Space St.','','Houston','Texas','88995');
/*!40000 ALTER TABLE `CreditCards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customer_Info`
--

DROP TABLE IF EXISTS `Customer_Info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customer_Info` (
  `customerinfo_id` int unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int unsigned NOT NULL,
  `height` int NOT NULL,
  PRIMARY KEY (`customerinfo_id`),
  UNIQUE KEY `customerinfo_id` (`customerinfo_id`),
  KEY `Customer_Info_ibfk_1` (`account_id`),
  CONSTRAINT `Customer_Info_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer_Info`
--

LOCK TABLES `Customer_Info` WRITE;
/*!40000 ALTER TABLE `Customer_Info` DISABLE KEYS */;
INSERT INTO `Customer_Info` VALUES (19,133,43),(20,135,36),(21,136,77),(22,137,54),(23,138,60),(24,139,39),(25,140,45),(26,141,42),(27,143,65),(28,144,61),(29,145,52),(30,147,57),(31,158,56),(32,160,100),(33,161,46),(34,162,55),(35,169,52),(36,134,0),(37,171,30),(38,175,58),(39,177,60),(40,178,44),(41,180,43),(43,183,56),(44,184,30);
/*!40000 ALTER TABLE `Customer_Info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee_Salary`
--

DROP TABLE IF EXISTS `Employee_Salary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Employee_Salary` (
  `account_id` int unsigned NOT NULL,
  `wage` decimal(10,2) NOT NULL,
  `salary_id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`salary_id`),
  UNIQUE KEY `salary_id_UNIQUE` (`salary_id`),
  KEY `fk_employee_account1` (`account_id`),
  CONSTRAINT `fk_employee_account1` FOREIGN KEY (`account_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee_Salary`
--

LOCK TABLES `Employee_Salary` WRITE;
/*!40000 ALTER TABLE `Employee_Salary` DISABLE KEYS */;
INSERT INTO `Employee_Salary` VALUES (174,8.50,1),(179,8.00,3),(181,10.00,4);
/*!40000 ALTER TABLE `Employee_Salary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Entry_Pass`
--

DROP TABLE IF EXISTS `Entry_Pass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Entry_Pass` (
  `entry_pass_id` int unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int unsigned NOT NULL,
  `entry_date` date NOT NULL,
  `expire_date` date NOT NULL,
  `cost` decimal(10,2) NOT NULL DEFAULT '10.00',
  PRIMARY KEY (`entry_pass_id`),
  UNIQUE KEY `entry_pass_id` (`entry_pass_id`),
  KEY `Entry_Pass_ibfk_1` (`account_id`),
  CONSTRAINT `Entry_Pass_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `User_Account` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Entry_Pass`
--

LOCK TABLES `Entry_Pass` WRITE;
/*!40000 ALTER TABLE `Entry_Pass` DISABLE KEYS */;
INSERT INTO `Entry_Pass` VALUES (1,134,'2024-03-01','2024-03-02',10.00),(2,138,'2024-03-10','2024-03-11',10.00),(3,60,'2024-03-02','2024-03-03',10.00),(4,136,'2024-03-02','2024-03-03',10.00),(5,137,'2024-03-10','2024-03-11',10.00),(6,139,'2024-03-16','2024-03-17',10.00),(7,140,'2024-03-19','2024-03-20',10.00),(8,141,'2024-03-21','2024-03-22',10.00),(9,52,'2024-03-10','2024-03-11',10.00),(10,47,'2024-03-10','2024-03-12',10.00),(11,58,'2024-03-10','2024-03-11',10.00),(12,51,'2024-03-19','2024-03-20',10.00),(13,49,'2024-03-01','2024-03-02',10.00),(14,50,'2024-03-16','2024-03-17',10.00),(15,53,'2024-03-23','2024-03-24',10.00),(16,59,'2024-03-23','2024-03-24',10.00),(17,46,'2024-03-23','2024-03-24',10.00),(18,57,'2024-03-23','2024-03-24',10.00),(19,43,'2024-03-23','2024-03-24',10.00),(20,55,'2024-03-23','2024-03-24',10.00),(51,158,'2024-04-13','2024-04-14',10.00),(52,158,'2024-04-13','2024-04-14',10.00),(53,158,'2024-04-13','2024-04-14',10.00),(54,158,'2024-04-13','2024-04-14',10.00),(55,158,'2024-04-12','2024-04-13',10.00),(56,158,'2024-04-20','2024-04-21',10.00),(57,158,'2024-04-14','2024-04-15',10.00),(58,158,'2024-04-27','2024-04-28',10.00),(81,49,'2024-04-22','2024-04-23',10.00),(82,59,'2024-04-22','2024-04-23',10.00),(83,57,'2024-04-22','2024-04-23',10.00),(84,55,'2024-04-22','2024-04-23',10.00),(85,43,'2024-04-22','2024-04-23',10.00),(86,141,'2024-04-22','2024-04-23',10.00),(87,60,'2024-04-22','2024-04-23',10.00),(88,134,'2024-04-22','2024-04-23',10.00),(89,169,'2024-04-15','2024-04-16',10.00),(90,158,'2024-04-15','2024-04-16',10.00),(91,169,'2024-04-16','2024-04-17',10.00),(92,158,'2024-04-16','2024-04-17',10.00),(93,169,'2024-04-17','2024-04-18',10.00),(94,175,'2024-04-17','2024-04-18',10.00),(95,158,'2024-04-23','2024-04-24',10.00),(96,158,'2024-04-25','2024-04-26',10.00),(97,178,'2024-04-17','2024-04-18',10.00),(98,180,'2024-04-17','2024-04-18',10.00),(99,155,'2024-04-17','2024-04-18',10.00),(100,158,'2024-04-17','2024-04-18',10.00),(101,158,'2024-04-18','2024-04-19',10.00),(102,184,'2024-04-23','2024-04-24',10.00),(103,184,'2024-04-27','2024-04-28',10.00),(104,171,'2024-04-22','2024-04-23',10.00),(105,158,'2024-04-22','2024-04-23',10.00),(106,184,'2024-04-22','2024-04-23',10.00),(107,184,'2024-04-25','2024-04-26',10.00),(108,175,'2024-04-22','2024-04-23',10.00),(109,175,'2024-04-27','2024-04-28',10.00),(110,180,'2024-04-23','2024-04-24',10.00),(111,178,'2024-04-23','2024-04-24',10.00),(112,171,'2024-04-23','2024-04-24',10.00),(113,175,'2024-04-24','2024-04-25',10.00),(114,60,'2024-04-24','2024-04-25',10.00),(115,138,'2024-04-24','2024-04-25',10.00),(116,141,'2024-04-25','2024-04-26',10.00),(117,49,'2024-04-25','2024-04-26',10.00),(118,134,'2024-04-25','2024-04-26',10.00),(119,158,'2024-04-26','2024-04-27',10.00),(120,47,'2024-04-26','2024-04-27',10.00),(121,175,'2024-04-26','2024-04-27',10.00),(122,162,'2024-04-27','2024-04-28',10.00),(123,50,'2024-04-27','2024-04-28',10.00),(124,171,'2024-04-27','2024-04-28',10.00),(125,184,'2024-04-27','2024-04-28',10.00),(126,158,'2024-04-28','2024-04-29',10.00),(127,169,'2024-04-28','2024-04-29',10.00);
/*!40000 ALTER TABLE `Entry_Pass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GameMaintenanceSeen`
--

DROP TABLE IF EXISTS `GameMaintenanceSeen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GameMaintenanceSeen` (
  `seen_id` int NOT NULL AUTO_INCREMENT,
  `trigger_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `seen` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`seen_id`),
  UNIQUE KEY `trigger_id` (`trigger_id`,`user_id`),
  KEY `GameMaintenanceSeen_ibfk_2` (`user_id`),
  CONSTRAINT `GameMaintenanceSeen_ibfk_1` FOREIGN KEY (`trigger_id`) REFERENCES `Trigger_GameMaintenance` (`trigger_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `GameMaintenanceSeen_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GameMaintenanceSeen`
--

LOCK TABLES `GameMaintenanceSeen` WRITE;
/*!40000 ALTER TABLE `GameMaintenanceSeen` DISABLE KEYS */;
INSERT INTO `GameMaintenanceSeen` VALUES (10,44,155,1),(11,41,155,1),(12,43,155,1),(13,45,156,1),(14,44,156,1),(15,43,156,1),(16,41,156,1),(17,45,155,1),(18,45,133,1),(19,44,133,1),(20,43,133,1),(21,46,133,1),(22,46,155,1),(23,46,156,1),(24,46,157,1),(25,45,157,1),(26,44,157,1),(27,43,157,1),(28,41,157,1),(29,47,157,1),(30,47,158,1),(31,46,158,1),(32,45,158,1),(33,44,158,1),(34,43,158,1),(35,41,158,1),(36,47,155,1);
/*!40000 ALTER TABLE `GameMaintenanceSeen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GameRainoutSeen`
--

DROP TABLE IF EXISTS `GameRainoutSeen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GameRainoutSeen` (
  `seen_id` int NOT NULL AUTO_INCREMENT,
  `trigger_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `seen` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`seen_id`),
  KEY `GameRainoutSeen_ibfk_1_idx` (`trigger_id`),
  KEY `GameRainoutSeen_ibfk_2` (`user_id`),
  CONSTRAINT `GameRainoutSeen_ibfk_1` FOREIGN KEY (`trigger_id`) REFERENCES `Trigger_GameRainout` (`trigger_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `GameRainoutSeen_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GameRainoutSeen`
--

LOCK TABLES `GameRainoutSeen` WRITE;
/*!40000 ALTER TABLE `GameRainoutSeen` DISABLE KEYS */;
INSERT INTO `GameRainoutSeen` VALUES (6,24,157,1),(7,24,158,1),(8,24,155,1);
/*!40000 ALTER TABLE `GameRainoutSeen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Game_Cart`
--

DROP TABLE IF EXISTS `Game_Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Game_Cart` (
  `Game_Cart_id` int NOT NULL AUTO_INCREMENT,
  `game_id` int unsigned NOT NULL,
  `account_id` int unsigned NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `purchased` tinyint(1) NOT NULL DEFAULT '0',
  `quantity` int NOT NULL,
  PRIMARY KEY (`Game_Cart_id`),
  KEY `fk_game` (`game_id`),
  KEY `fkg_account` (`account_id`),
  CONSTRAINT `fk_game` FOREIGN KEY (`game_id`) REFERENCES `Games` (`game_id`) ON DELETE CASCADE,
  CONSTRAINT `fkg_account` FOREIGN KEY (`account_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Game_Cart`
--

LOCK TABLES `Game_Cart` WRITE;
/*!40000 ALTER TABLE `Game_Cart` DISABLE KEYS */;
INSERT INTO `Game_Cart` VALUES (13,608938,158,15.00,1,5),(16,608938,158,3.00,1,1),(18,608938,158,3.00,1,1),(21,608938,175,3.50,1,1),(23,942176,180,3.00,1,1),(24,608937,155,3.00,0,1),(26,428509,171,3.00,1,1),(27,608937,171,6.00,0,2);
/*!40000 ALTER TABLE `Game_Cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Game_Maintenance_Request`
--

DROP TABLE IF EXISTS `Game_Maintenance_Request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Game_Maintenance_Request` (
  `game_id` int unsigned NOT NULL,
  `description` varchar(150) NOT NULL,
  `maintainer_id` int unsigned DEFAULT NULL,
  `requester_id` int unsigned NOT NULL,
  `breakdown_date` date NOT NULL,
  `fixed_date` date DEFAULT NULL,
  `breakdown_id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`breakdown_id`),
  UNIQUE KEY `game_breakdown_id_UNIQUE` (`breakdown_id`),
  KEY `game_maintainer_idfk` (`maintainer_id`) /*!80000 INVISIBLE */,
  KEY `game_requester_idfk` (`requester_id`) /*!80000 INVISIBLE */,
  KEY `game_idfk` (`game_id`),
  CONSTRAINT `fk_game_maintenance_game_id` FOREIGN KEY (`game_id`) REFERENCES `Games` (`game_id`),
  CONSTRAINT `game_maintainer_idfk` FOREIGN KEY (`maintainer_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `game_requester_idfk` FOREIGN KEY (`requester_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Game_Maintenance_Request`
--

LOCK TABLES `Game_Maintenance_Request` WRITE;
/*!40000 ALTER TABLE `Game_Maintenance_Request` DISABLE KEYS */;
INSERT INTO `Game_Maintenance_Request` VALUES (827465,'stuck bowling ball',76,66,'2024-01-21','2024-01-22',1),(942176,'5 teeth will not reset',85,62,'2024-01-21','2024-01-23',2),(731824,'need to replace 20 broken glass bottles',81,65,'2024-02-16','0000-00-00',3),(827465,'stuck bowling pin',76,66,'2024-03-21','2024-03-22',4),(827465,'stuck bowling ball',76,66,'2024-03-21',NULL,35),(428509,'Game is broken.',156,155,'2024-04-06','2024-04-08',36),(608937,'Testing',156,155,'2024-04-07','2024-04-08',37),(428509,'Dart board is broken and not functioning',156,133,'2024-04-11','2024-04-12',38),(428509,'Game is missing darts',156,156,'2024-04-18','2024-04-18',39);
/*!40000 ALTER TABLE `Game_Maintenance_Request` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `AfterGameMaintenance` AFTER INSERT ON `Game_Maintenance_Request` FOR EACH ROW BEGIN
    INSERT INTO Trigger_GameMaintenance(game_id, date, broken, type)
    VALUES (NEW.game_id, NOW(), 1, 'GM');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Game_Rainout`
--

DROP TABLE IF EXISTS `Game_Rainout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Game_Rainout` (
  `attendant_id` int unsigned NOT NULL,
  `game_id` int unsigned NOT NULL,
  `game_rainout_id` int unsigned NOT NULL AUTO_INCREMENT,
  `date_rainout` date NOT NULL,
  `date_end` date DEFAULT NULL,
  PRIMARY KEY (`game_rainout_id`),
  UNIQUE KEY `game_rainout_id` (`game_rainout_id`),
  KEY `Game_Rainout_ibfk_1` (`attendant_id`),
  KEY `Game_Rainout_ibfk_2` (`game_id`),
  CONSTRAINT `Game_Rainout_ibfk_1` FOREIGN KEY (`attendant_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Game_Rainout_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `Games` (`game_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Game_Rainout`
--

LOCK TABLES `Game_Rainout` WRITE;
/*!40000 ALTER TABLE `Game_Rainout` DISABLE KEYS */;
INSERT INTO `Game_Rainout` VALUES (133,428509,15,'2024-03-30','2024-04-07'),(155,428509,16,'2024-04-07','2024-04-07'),(155,428509,17,'2024-04-18','2024-04-18');
/*!40000 ALTER TABLE `Game_Rainout` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `AfterGameRainout5` AFTER INSERT ON `Game_Rainout` FOR EACH ROW BEGIN
    INSERT INTO Trigger_GameRainout(game_id, date, rainout, type)
    VALUES (NEW.game_id, NOW(), 1, 'GR');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Game_Visited`
--

DROP TABLE IF EXISTS `Game_Visited`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Game_Visited` (
  `account_id` int unsigned NOT NULL,
  `date_visited` date NOT NULL,
  `game_id` int unsigned NOT NULL,
  `game_visited_id` int unsigned NOT NULL AUTO_INCREMENT,
  `cost` decimal(5,2) NOT NULL DEFAULT '3.00',
  `num_tickets` int NOT NULL,
  PRIMARY KEY (`game_visited_id`),
  UNIQUE KEY `game_visited_id` (`game_visited_id`),
  KEY `Game_Visited_ibfk_2` (`game_id`),
  KEY `Game_Visited_ibfk_1` (`account_id`),
  CONSTRAINT `Game_Visited_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `User_Account` (`account_id`),
  CONSTRAINT `Game_Visited_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `Games` (`game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Game_Visited`
--

LOCK TABLES `Game_Visited` WRITE;
/*!40000 ALTER TABLE `Game_Visited` DISABLE KEYS */;
INSERT INTO `Game_Visited` VALUES (134,'2024-03-01',428509,1,3.00,1),(158,'2024-04-15',608938,19,3.00,1),(158,'2024-04-15',608938,20,3.00,1),(175,'2024-04-18',608938,21,3.50,1),(180,'2024-04-18',942176,22,3.00,1),(171,'2024-04-20',428509,23,3.00,1);
/*!40000 ALTER TABLE `Game_Visited` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Games`
--

DROP TABLE IF EXISTS `Games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Games` (
  `name` varchar(50) NOT NULL,
  `description` varchar(150) NOT NULL,
  `picture` varchar(100) NOT NULL,
  `game_id` int unsigned NOT NULL AUTO_INCREMENT,
  `broken` tinyint(1) NOT NULL,
  `rained_out` tinyint(1) NOT NULL,
  `cost` decimal(10,2) NOT NULL DEFAULT '3.00',
  PRIMARY KEY (`game_id`),
  UNIQUE KEY `game_id` (`game_id`) /*!80000 INVISIBLE */
) ENGINE=InnoDB AUTO_INCREMENT=942177 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Games`
--

LOCK TABLES `Games` WRITE;
/*!40000 ALTER TABLE `Games` DISABLE KEYS */;
INSERT INTO `Games` VALUES ('Balloon Darts','Ready to take aim and let your skills shine? Picture yourself surrounded by vibrant balloons, each offering a chance for excitement!','../../assets/Games/BalloonDarts.png',428509,0,0,3.00),('Duck Shoot',' So, what are you waiting for? Come on down to Cougar Park and experience the thrill of the Duck Shoot for yourself! ','../../assets/Games/DuckShoot.png',608937,0,0,3.00),('Roll A Ball','So, what are you waiting for? Step right up and experience the thrill of the Ball Roll game at Cougar Park! It\'s a delightful adventure that promises ','../../assets/Games/RollABall.png',608938,0,0,4.00),('Bottle Rings','So, gather your friends and family and step right up to the Bottle Ring Toss game at Cougar Park! Don\'t miss your shot, toss your way to victory today','../../assets/Games/BottleRing.png',731824,0,0,3.00),('Bowling','So, lace up your bowling shoes and join us at Cougar Park\'s Mini Bowling Game! It\'s a bowling experience like no other!!','../../assets/Games/Bowling.png',827465,1,0,3.00),('Break Teeth','Step right up and take your best shot at \"Break the Teeth\"! Excitement and laughter guaranteed. Don\'t miss out on the smashing fun!','../../assets/Games/BreakTeeth.png',942176,0,0,3.00);
/*!40000 ALTER TABLE `Games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Gift_Cart`
--

DROP TABLE IF EXISTS `Gift_Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Gift_Cart` (
  `gift_cart_id` int NOT NULL AUTO_INCREMENT,
  `gift_id` int NOT NULL,
  `account_id` int unsigned NOT NULL,
  `quantity` int NOT NULL,
  `purchased` tinyint(1) NOT NULL DEFAULT '0',
  `size` varchar(2) DEFAULT NULL,
  `cost` decimal(10,2) NOT NULL,
  PRIMARY KEY (`gift_cart_id`),
  KEY `gift_id` (`gift_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `Gift_Cart_ibfk_1` FOREIGN KEY (`gift_id`) REFERENCES `Gift_Items` (`gift_id`),
  CONSTRAINT `Gift_Cart_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `User_Account` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gift_Cart`
--

LOCK TABLES `Gift_Cart` WRITE;
/*!40000 ALTER TABLE `Gift_Cart` DISABLE KEYS */;
INSERT INTO `Gift_Cart` VALUES (28,3,175,1,1,'',15.99),(29,2,175,1,1,'L',12.99),(30,2,178,1,1,'L',12.99),(31,1,178,1,1,'',7.99),(32,1,180,2,1,'',15.98),(33,2,180,2,1,'L',25.98),(34,3,183,2,1,'',31.98),(35,3,183,1,1,'',15.99),(36,2,183,1,1,'',12.99),(37,1,183,1,1,'',7.99),(38,1,184,2,0,'',15.98),(43,2,158,1,1,'',12.99),(44,2,158,1,1,'S',12.99),(45,3,158,1,1,'',15.99),(46,2,158,1,1,'',12.99),(47,2,158,1,1,'',12.99),(54,2,158,1,1,'M',12.99),(56,1,171,1,1,'',7.99),(58,1,171,2,0,'M',15.98);
/*!40000 ALTER TABLE `Gift_Cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Gift_Items`
--

DROP TABLE IF EXISTS `Gift_Items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Gift_Items` (
  `gift_id` int NOT NULL AUTO_INCREMENT,
  `picture` varchar(255) DEFAULT NULL,
  `description` text,
  `cost` decimal(10,2) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`gift_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gift_Items`
--

LOCK TABLES `Gift_Items` WRITE;
/*!40000 ALTER TABLE `Gift_Items` DISABLE KEYS */;
INSERT INTO `Gift_Items` VALUES (1,'../../assets/Gifts/CougarMug.png','The Cougar Mug is a captivating and functional gift item perfect for theme park enthusiasts. This uniquely designed mug is skillfully crafted to bring a touch of wild adventure to your morning coffee or tea. Made from high-quality, durable materials, the Cougar Mug ensures both longevity and a memorable drinking experience.',7.99,'Cougar Mug'),(2,'../../assets/Gifts/CougarCap.png','The Cougar Cap is a stylish and spirited accessory perfect for any theme park enthusiast or nature lover. This cap features an embroidered design, set against a durable fabric background. Designed to offer both comfort and sun protection, the Cougar Cap is equipped with an adjustable strap to fit all sizes.',12.99,'Cougar Cap'),(3,'../../assets/Gifts/CougarQuencher.png','The Cougar Quencher is an innovative and thrilling beverage experience, specially designed for theme park visitors. This unique drinkware features a vibrant and rugged design with a dynamic cougar graphic that seems to leap off the cup, capturing the spirit of adventure found within the park',15.99,'Cougar Quencher'),(4,'../../assets/Gifts/CougarTshirt.png','The Cougar T-shirt is the perfect memento for any theme park visitor looking to capture the essence of adventure and freedom. This stylish T-shirt features a bold and striking graphic that reflects the thrill and excitement of the theme park experience.',9.99,'Cougar T-Shirt'),(5,'../../assets/Gifts/CougarBackpack.png','The Cougar Backpack is a robust and stylish accessory designed for theme park enthusiasts and adventurers alike. Featuring a striking design with a cougar emblem, this backpack combines functionality with an adventurous spirit, perfect companion for a day of exploration.',39.99,'Cougar Backpack');
/*!40000 ALTER TABLE `Gift_Items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Inventory`
--

DROP TABLE IF EXISTS `Inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Inventory` (
  `inventory_id` int NOT NULL AUTO_INCREMENT,
  `gift_id` int NOT NULL,
  `inventory` int NOT NULL,
  `available` tinyint(1) NOT NULL,
  `size` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`inventory_id`),
  KEY `fk_gift` (`gift_id`),
  CONSTRAINT `fk_gift` FOREIGN KEY (`gift_id`) REFERENCES `Gift_Items` (`gift_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inventory`
--

LOCK TABLES `Inventory` WRITE;
/*!40000 ALTER TABLE `Inventory` DISABLE KEYS */;
INSERT INTO `Inventory` VALUES (1,1,100,1,NULL),(2,2,0,1,'S'),(3,2,97,1,'M'),(4,2,98,1,'L'),(5,2,98,1,'XL'),(6,3,99,1,NULL),(7,4,100,1,'S'),(8,4,100,1,'M'),(9,4,100,1,'L'),(10,4,100,1,'XL'),(11,5,103,1,NULL);
/*!40000 ALTER TABLE `Inventory` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `Inventory_AFTER_OUTOFSTOCK` AFTER UPDATE ON `Inventory` FOR EACH ROW BEGIN
    IF NEW.inventory = 0 THEN
        UPDATE Inventory
        SET available = 0
        WHERE inventory_id = NEW.inventory_id;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `RideMaintenanceSeen`
--

DROP TABLE IF EXISTS `RideMaintenanceSeen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RideMaintenanceSeen` (
  `seen_id` int NOT NULL AUTO_INCREMENT,
  `trigger_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `seen` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`seen_id`),
  UNIQUE KEY `trigger_id` (`trigger_id`,`user_id`),
  KEY `RideMaintenanceSeen_ibfk_2` (`user_id`),
  CONSTRAINT `RideMaintenanceSeen_ibfk_1` FOREIGN KEY (`trigger_id`) REFERENCES `Trigger_RideMaintenance` (`trigger_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `RideMaintenanceSeen_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RideMaintenanceSeen`
--

LOCK TABLES `RideMaintenanceSeen` WRITE;
/*!40000 ALTER TABLE `RideMaintenanceSeen` DISABLE KEYS */;
INSERT INTO `RideMaintenanceSeen` VALUES (2,52,155,1),(6,56,155,1),(7,55,155,1),(8,56,156,1),(9,55,156,1),(11,52,156,1),(12,56,133,1),(13,55,133,1),(15,52,133,1),(16,57,133,1),(17,57,155,1),(18,57,156,1),(19,58,155,1),(20,59,156,1),(21,58,156,1),(22,59,157,1),(23,58,157,1),(24,57,157,1),(25,56,157,1),(26,55,157,1),(27,52,157,1),(28,59,155,1),(29,60,155,1),(30,60,156,1),(31,60,157,1),(32,61,157,1),(33,61,158,1),(34,62,158,1),(35,60,158,1),(36,59,158,1),(37,58,158,1),(38,57,158,1),(39,56,158,1),(40,55,158,1),(41,52,158,1),(42,62,155,1),(43,61,155,1);
/*!40000 ALTER TABLE `RideMaintenanceSeen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RideRainoutSeen`
--

DROP TABLE IF EXISTS `RideRainoutSeen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RideRainoutSeen` (
  `seen_id` int NOT NULL AUTO_INCREMENT,
  `trigger_id` int unsigned NOT NULL,
  `user_id` int unsigned NOT NULL,
  `seen` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`seen_id`),
  UNIQUE KEY `trigger_id` (`trigger_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `RideRainoutSeen_ibfk_1` FOREIGN KEY (`trigger_id`) REFERENCES `Trigger_RideRainout` (`trigger_id`),
  CONSTRAINT `RideRainoutSeen_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User_Account` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=312 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RideRainoutSeen`
--

LOCK TABLES `RideRainoutSeen` WRITE;
/*!40000 ALTER TABLE `RideRainoutSeen` DISABLE KEYS */;
INSERT INTO `RideRainoutSeen` VALUES (1,3,155,1),(2,2,155,1),(3,21,155,1),(4,20,155,1),(5,19,155,1),(6,18,155,1),(7,7,155,1),(8,8,155,1),(9,9,155,1),(10,10,155,1),(11,11,155,1),(12,12,155,1),(13,13,155,1),(14,14,155,1),(15,15,155,1),(16,16,155,1),(17,17,155,1),(18,6,155,1),(19,5,155,1),(20,4,155,1),(21,51,155,1),(22,50,155,1),(23,49,155,1),(24,48,155,1),(25,47,155,1),(26,46,155,1),(27,45,155,1),(28,44,155,1),(29,43,155,1),(30,42,155,1),(31,41,155,1),(32,40,155,1),(33,39,155,1),(34,38,155,1),(35,37,155,1),(36,36,155,1),(37,35,155,1),(38,34,155,1),(39,33,155,1),(40,32,155,1),(41,31,155,1),(42,30,155,1),(43,29,155,1),(44,28,155,1),(45,27,155,1),(46,26,155,1),(47,25,155,1),(48,24,155,1),(49,23,155,1),(50,22,155,1),(51,52,156,1),(52,39,156,1),(53,37,156,1),(54,38,156,1),(55,40,156,1),(56,41,156,1),(57,42,156,1),(58,43,156,1),(59,44,156,1),(60,46,156,1),(61,47,156,1),(62,48,156,1),(63,49,156,1),(64,50,156,1),(65,51,156,1),(66,45,156,1),(67,34,156,1),(68,33,156,1),(69,35,156,1),(70,36,156,1),(71,24,156,1),(72,32,156,1),(73,31,156,1),(74,30,156,1),(75,29,156,1),(76,28,156,1),(77,27,156,1),(78,26,156,1),(79,25,156,1),(80,22,156,1),(81,21,156,1),(82,20,156,1),(83,19,156,1),(84,18,156,1),(85,11,156,1),(86,7,156,1),(87,8,156,1),(88,9,156,1),(89,10,156,1),(90,12,156,1),(91,13,156,1),(92,14,156,1),(93,15,156,1),(94,16,156,1),(95,17,156,1),(96,6,156,1),(97,5,156,1),(98,4,156,1),(99,3,156,1),(100,23,156,1),(101,2,156,1),(102,52,155,1),(103,53,156,1),(104,53,133,1),(105,52,133,1),(106,47,133,1),(107,46,133,1),(108,45,133,1),(109,44,133,1),(110,43,133,1),(111,42,133,1),(112,41,133,1),(113,40,133,1),(114,39,133,1),(115,38,133,1),(116,37,133,1),(117,51,133,1),(118,50,133,1),(119,49,133,1),(120,48,133,1),(121,36,133,1),(122,35,133,1),(123,34,133,1),(124,33,133,1),(125,26,133,1),(126,25,133,1),(127,24,133,1),(128,23,133,1),(129,27,133,1),(130,28,133,1),(131,29,133,1),(132,30,133,1),(133,32,133,1),(134,31,133,1),(135,22,133,1),(136,21,133,1),(137,20,133,1),(138,19,133,1),(139,18,133,1),(140,7,133,1),(141,17,133,1),(142,16,133,1),(143,15,133,1),(144,14,133,1),(145,13,133,1),(146,12,133,1),(147,11,133,1),(148,10,133,1),(149,9,133,1),(150,8,133,1),(151,6,133,1),(152,5,133,1),(153,4,133,1),(154,3,133,1),(155,2,133,1),(156,55,155,1),(157,54,155,1),(158,55,156,1),(159,54,156,1),(160,55,157,1),(161,54,157,1),(162,53,157,1),(163,52,157,1),(164,37,157,1),(165,38,157,1),(166,39,157,1),(167,40,157,1),(168,41,157,1),(169,42,157,1),(170,43,157,1),(171,45,157,1),(172,47,157,1),(173,48,157,1),(174,49,157,1),(175,50,157,1),(176,51,157,1),(177,44,157,1),(178,36,157,1),(179,33,157,1),(180,34,157,1),(181,35,157,1),(182,25,157,1),(183,32,157,1),(184,31,157,1),(185,30,157,1),(186,29,157,1),(187,28,157,1),(188,26,157,1),(189,24,157,1),(190,23,157,1),(191,27,157,1),(192,22,157,1),(193,21,157,1),(194,20,157,1),(195,19,157,1),(196,18,157,1),(197,10,157,1),(198,7,157,1),(199,8,157,1),(200,9,157,1),(201,11,157,1),(202,13,157,1),(203,14,157,1),(204,15,157,1),(205,16,157,1),(206,12,157,1),(207,17,157,1),(208,6,157,1),(209,5,157,1),(210,46,157,1),(211,4,157,1),(212,3,157,1),(213,2,157,1),(214,63,155,1),(215,62,155,1),(216,61,155,1),(217,60,155,1),(218,59,155,1),(219,58,155,1),(220,57,155,1),(221,56,155,1),(222,63,156,1),(223,62,156,1),(224,61,156,1),(225,60,156,1),(226,59,156,1),(227,58,156,1),(228,57,156,1),(229,56,156,1),(230,53,155,1),(231,64,155,1),(232,64,156,1),(233,65,155,1),(234,65,156,1),(235,63,157,1),(236,62,157,1),(237,61,157,1),(238,59,157,1),(239,58,157,1),(240,57,157,1),(241,56,157,1),(242,65,157,1),(243,64,157,1),(244,60,157,1),(245,64,158,1),(246,65,158,1),(247,63,158,1),(248,61,158,1),(249,59,158,1),(250,58,158,1),(251,57,158,1),(252,56,158,1),(253,55,158,1),(254,54,158,1),(255,53,158,1),(256,52,158,1),(257,43,158,1),(258,37,158,1),(259,38,158,1),(260,39,158,1),(261,40,158,1),(262,41,158,1),(263,42,158,1),(264,44,158,1),(265,45,158,1),(266,47,158,1),(267,48,158,1),(268,49,158,1),(269,50,158,1),(270,51,158,1),(271,36,158,1),(272,35,158,1),(273,34,158,1),(274,33,158,1),(275,29,158,1),(276,31,158,1),(277,30,158,1),(278,32,158,1),(279,28,158,1),(280,27,158,1),(281,26,158,1),(282,25,158,1),(283,24,158,1),(284,23,158,1),(285,22,158,1),(286,21,158,1),(287,20,158,1),(288,19,158,1),(289,18,158,1),(290,14,158,1),(291,7,158,1),(292,8,158,1),(293,9,158,1),(294,10,158,1),(295,11,158,1),(296,12,158,1),(297,13,158,1),(298,15,158,1),(299,16,158,1),(300,17,158,1),(301,6,158,1),(302,5,158,1),(303,66,158,1),(304,46,158,1),(305,4,158,1),(306,3,158,1),(307,2,158,1),(308,60,158,1),(309,62,158,1),(310,66,155,1),(311,67,155,1);
/*!40000 ALTER TABLE `RideRainoutSeen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ride_Cart`
--

DROP TABLE IF EXISTS `Ride_Cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ride_Cart` (
  `Ride_Cart_id` int NOT NULL AUTO_INCREMENT,
  `ride_id` int unsigned NOT NULL,
  `account_id` int unsigned NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `purchased` tinyint(1) NOT NULL DEFAULT '0',
  `quantity` int NOT NULL,
  PRIMARY KEY (`Ride_Cart_id`),
  KEY `fk_ride` (`ride_id`),
  KEY `fk_account` (`account_id`),
  CONSTRAINT `fk_account` FOREIGN KEY (`account_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ride` FOREIGN KEY (`ride_id`) REFERENCES `Rides` (`ride_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ride_Cart`
--

LOCK TABLES `Ride_Cart` WRITE;
/*!40000 ALTER TABLE `Ride_Cart` DISABLE KEYS */;
INSERT INTO `Ride_Cart` VALUES (1,163927,158,15.00,1,3),(5,216398,158,5.00,1,1),(6,574639,158,15.00,1,3),(7,502746,158,15.00,1,3),(8,502746,158,30.00,1,6),(9,574639,158,10.00,1,2),(10,736841,158,25.00,1,5),(11,625198,158,5.00,1,1),(12,163927,158,5.00,1,1),(14,163927,158,10.00,1,2),(18,216398,175,5.00,1,1),(19,748315,175,5.00,1,1),(20,216398,178,5.50,1,1),(21,574639,180,30.00,0,6),(24,216398,158,5.00,1,1);
/*!40000 ALTER TABLE `Ride_Cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ride_Maintenance_Request`
--

DROP TABLE IF EXISTS `Ride_Maintenance_Request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ride_Maintenance_Request` (
  `breakdown_date` date NOT NULL,
  `breakdown_id` int unsigned NOT NULL AUTO_INCREMENT,
  `maintainer_id` int unsigned DEFAULT NULL,
  `fixed_date` date DEFAULT NULL,
  `description` varchar(150) NOT NULL,
  `requester_id` int unsigned NOT NULL,
  `ride_id` int unsigned NOT NULL,
  PRIMARY KEY (`breakdown_id`),
  UNIQUE KEY `ride_breakdown_id_UNIQUE` (`breakdown_id`),
  KEY `ride_maintainer_idfk` (`maintainer_id`) /*!80000 INVISIBLE */,
  KEY `ride_requester_idfk` (`requester_id`) /*!80000 INVISIBLE */,
  KEY `ride_idfk` (`ride_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `ride_idfk` FOREIGN KEY (`ride_id`) REFERENCES `Rides` (`ride_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ride_maintainer_idfk` FOREIGN KEY (`maintainer_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ride_requester_idfk` FOREIGN KEY (`requester_id`) REFERENCES `User_Account` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ride_Maintenance_Request`
--

LOCK TABLES `Ride_Maintenance_Request` WRITE;
/*!40000 ALTER TABLE `Ride_Maintenance_Request` DISABLE KEYS */;
INSERT INTO `Ride_Maintenance_Request` VALUES ('2024-01-12',2,83,'2024-01-13','ceased operation due to electrical short circuit, requiring immediate repair',65,216398),('2024-01-12',3,77,'2024-01-14','halted at peak angle due to mechanical failure, leading to panic',75,748315),('2024-01-16',5,76,'2024-01-18','slowed down and stopped due to loose bolts, causing safety concerns',66,295847),('2024-01-19',6,85,'2024-01-21','leaked water because of a cracked pipe, resulting in temporary closure',74,736841),('2024-01-21',7,80,'2024-01-22','jammed between levels due to a malfunctioning brake system, trapping visitors',73,625198),('2024-02-03',9,82,'2024-02-04','stuck in launch position due to computer system crash, leading to evacuation',68,409273),('2024-02-05',10,87,'2024-02-05','failed to ascend because of hydraulic fluid leak, leaving guests grounded',71,582910),('2024-02-05',11,84,'2024-02-05','stopped mid-air due to power supply issues, requiring manual retrieval of riders',67,347562),('2024-02-05',12,81,'2024-02-05','stopped mid-track due to power outage, leaving riders stranded for hours',64,163927),('2024-02-06',13,156,'2024-04-08','slowed down and stopped due to loose bolts, causing safety concerns',65,295847),('2024-02-06',14,76,'0000-00-00','one ladybug carriage stuck',74,502746),('2024-02-07',16,156,'2024-04-08','5 teeth will not reset',68,347562),('2024-02-08',17,78,'2024-02-28','carousel is turning violently quickly',67,625198),('2024-02-08',18,156,'2024-04-08','rollercoaster coaster stopped working',64,163927),('2024-02-08',19,156,'2024-04-08','one ladybug carriage stuck',71,502746),('2024-03-19',20,156,'2024-04-08','Ride seats are torn up and not safe.',133,216398),('2017-03-01',23,156,'2024-04-08','Jake',133,163927),('2024-03-01',24,156,'2024-04-08','Jake Schwartz',133,582910),('2024-03-01',25,156,'2024-04-08','Jake Schwartz',133,582910),('2024-03-01',26,156,'2024-04-08','First seat got torn up.',133,295847),('2024-03-21',27,76,NULL,'one ladybug carriage stuck',74,502746),('2024-03-21',28,76,'2024-03-28','one ladybug carriage stuck',74,502746),('2024-03-23',30,156,'2024-04-12','Broken Wheel',133,582910),('2023-03-23',31,156,'2024-04-08','Car 12 stopped working.',155,409273),('2024-04-06',41,156,'2024-04-16','Ride is not turning on',155,295847),('2024-04-07',42,156,'2024-04-08','Testing',155,216398),('2024-04-11',43,156,'2024-04-16','Ride wheel fell off',133,216398),('2024-04-16',44,156,'2024-04-16','Cars not bumping',155,409273),('2024-04-16',45,156,'2024-04-18','Sky Rider Is not working',156,295847),('2024-04-17',46,156,'2024-04-18','wheel problem',156,163927),('2024-04-18',47,156,'2024-04-18','Ride is broken',156,574639),('2024-04-19',49,156,NULL,'Bumping too much',156,409273);
/*!40000 ALTER TABLE `Ride_Maintenance_Request` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `AfterRideMaintenance3` AFTER INSERT ON `Ride_Maintenance_Request` FOR EACH ROW BEGIN
    INSERT INTO Trigger_RideMaintenance (ride_id, date, broken, type)
    VALUES (NEW.ride_id, NOW(), 1, 'RM');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `date_end` date DEFAULT NULL,
  PRIMARY KEY (`rainout_id`),
  UNIQUE KEY `rainout_id` (`rainout_id`),
  KEY `ride_id` (`ride_id`),
  KEY `attendant_id` (`attendant_id`),
  CONSTRAINT `Ride_Rainout_ibfk_1` FOREIGN KEY (`ride_id`) REFERENCES `Rides` (`ride_id`),
  CONSTRAINT `Ride_Rainout_ibfk_2` FOREIGN KEY (`attendant_id`) REFERENCES `User_Account` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ride_Rainout`
--

LOCK TABLES `Ride_Rainout` WRITE;
/*!40000 ALTER TABLE `Ride_Rainout` DISABLE KEYS */;
INSERT INTO `Ride_Rainout` VALUES (65,216398,1,'2024-03-21','2024-03-21'),(71,582910,2,'2024-03-15','2024-03-16'),(75,748315,3,'2024-03-10','2024-03-12'),(133,347562,14,'2024-03-23','2024-03-24'),(133,574639,15,'2024-03-21','2024-03-22'),(155,216398,16,'2024-04-07','2024-04-07'),(155,295847,17,'2024-04-07','2024-04-07'),(155,295847,18,'2024-04-07','2024-04-07'),(155,163927,19,'2024-04-07','2024-04-07'),(155,216398,20,'2024-04-07','2024-04-07'),(155,409273,21,'2024-04-07','2024-04-07'),(155,347562,22,'2024-04-07','2024-04-07'),(155,502746,23,'2024-04-07','2024-04-07'),(155,295847,24,'2024-04-07','2024-04-07'),(155,736841,25,'2024-04-07','2024-04-07'),(155,748315,26,'2024-04-07','2024-04-07'),(155,830172,27,'2024-04-07','2024-04-07'),(155,891634,28,'2024-04-07','2024-04-07'),(155,953821,29,'2024-04-07','2024-04-07'),(155,582910,30,'2024-04-07','2024-04-07'),(155,617490,31,'2024-04-07','2024-04-07'),(155,574639,32,'2024-04-07','2024-04-07'),(155,625198,33,'2024-04-07','2024-04-07'),(155,216398,34,'2024-04-07','2024-04-07'),(155,295847,35,'2024-04-07','2024-04-07'),(155,502746,36,'2024-04-07','2024-04-07'),(155,163927,37,'2024-04-07','2024-04-07'),(155,409273,38,'2024-04-07','2024-04-07'),(155,347562,39,'2024-04-07','2024-04-07'),(155,574639,40,'2024-04-07','2024-04-07'),(155,748315,41,'2024-04-07','2024-04-07'),(155,830172,42,'2024-04-07','2024-04-07'),(155,953821,43,'2024-04-07','2024-04-07'),(155,891634,44,'2024-04-07','2024-04-07'),(155,625198,45,'2024-04-07','2024-04-07'),(155,617490,46,'2024-04-07','2024-04-07'),(155,736841,47,'2024-04-07','2024-04-07'),(155,582910,48,'2024-04-07','2024-04-07'),(155,163927,49,'2024-04-07','2024-04-07'),(155,216398,50,'2024-04-07','2024-04-07'),(155,295847,51,'2024-04-07','2024-04-07'),(155,409273,52,'2024-04-07','2024-04-07'),(155,347562,53,'2024-04-07','2024-04-07'),(155,502746,54,'2024-04-07','2024-04-07'),(155,574639,55,'2024-04-07','2024-04-07'),(155,625198,56,'2024-04-07','2024-04-07'),(155,582910,57,'2024-04-07','2024-04-07'),(155,617490,58,'2024-04-07','2024-04-07'),(155,736841,59,'2024-04-07','2024-04-07'),(155,748315,60,'2024-04-07','2024-04-07'),(155,830172,61,'2024-04-07','2024-04-07'),(155,953821,62,'2024-04-07','2024-04-07'),(155,891634,63,'2024-04-07','2024-04-07'),(155,409273,64,'2024-04-07','2024-04-07'),(155,574639,65,'2024-04-07','2024-04-07'),(133,163927,66,'2024-04-11','2024-04-11'),(155,216398,67,'2024-04-12','2024-04-12'),(155,617490,68,'2024-04-19','2024-04-17'),(155,582910,69,'2024-04-17','2024-04-17'),(155,574639,70,'2024-04-17','2024-04-17'),(155,347562,71,'2024-04-17','2024-04-17'),(155,582910,72,'2024-04-17','2024-04-17'),(155,574639,73,'2024-04-17','2024-04-17'),(155,582910,74,'2024-04-17','2024-04-17'),(155,625198,75,'2024-04-17','2024-04-17'),(155,163927,76,'2024-04-18','2024-04-18'),(155,347562,77,'2024-04-18','2024-04-18'),(155,163927,78,'2024-04-20','2024-04-20'),(155,295847,79,'2024-04-20',NULL);
/*!40000 ALTER TABLE `Ride_Rainout` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `AfterRideRainout2` AFTER INSERT ON `Ride_Rainout` FOR EACH ROW BEGIN
        INSERT INTO Trigger_RideRainout (ride_id, date, rainout, type)
        VALUES (NEW.ride_id, NOW(), 1, 'RR');
    END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Ride_Visited`
--

DROP TABLE IF EXISTS `Ride_Visited`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ride_Visited` (
  `account_id` int unsigned NOT NULL,
  `ride_id` int unsigned NOT NULL,
  `visit_date` date NOT NULL,
  `ride_visit_id` int unsigned NOT NULL AUTO_INCREMENT,
  `cost` decimal(5,2) NOT NULL DEFAULT '5.00',
  `num_tickets` int NOT NULL,
  PRIMARY KEY (`ride_visit_id`),
  UNIQUE KEY `ride_visit_id` (`ride_visit_id`),
  KEY `Ride_Visited_ibfk_1_idx` (`account_id`),
  KEY `Ride_Visited_ibfk_2` (`ride_id`),
  CONSTRAINT `Ride_Visited_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `User_Account` (`account_id`),
  CONSTRAINT `Ride_Visited_ibfk_2` FOREIGN KEY (`ride_id`) REFERENCES `Rides` (`ride_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ride_Visited`
--

LOCK TABLES `Ride_Visited` WRITE;
/*!40000 ALTER TABLE `Ride_Visited` DISABLE KEYS */;
INSERT INTO `Ride_Visited` VALUES (41,163927,'2024-03-11',21,5.00,1),(55,625198,'2024-03-21',22,5.00,1),(57,953821,'2024-03-19',23,5.00,1),(139,736841,'2024-03-20',24,5.00,1),(134,409273,'2024-03-05',25,5.00,1),(59,582910,'2024-03-21',26,10.00,2),(60,409273,'2024-03-19',27,5.00,1),(60,409273,'2024-04-12',29,10.00,2),(59,409273,'2024-04-12',30,10.00,2),(158,502746,'2024-04-15',36,30.00,6),(158,574639,'2024-04-15',37,10.00,2),(158,736841,'2024-04-15',38,25.00,5),(158,625198,'2024-04-15',39,5.00,1),(158,163927,'2024-04-15',40,5.00,1),(158,163927,'2024-04-16',41,10.00,2),(175,216398,'2024-04-18',42,5.00,1),(175,748315,'2024-04-18',43,5.00,1),(178,216398,'2024-04-18',44,5.50,1),(158,216398,'2024-04-20',45,5.00,1);
/*!40000 ALTER TABLE `Ride_Visited` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`admin`@`%`*/ /*!50003 TRIGGER `check_height_before_ride` BEFORE INSERT ON `Ride_Visited` FOR EACH ROW BEGIN
  DECLARE v_height INT;
  DECLARE v_height_restriction INT;

  SELECT height INTO v_height
  FROM Customer_Info
  WHERE account_id = NEW.account_id;
  
  -- Retrieve the height restriction of the ride
  SELECT height_restriction INTO v_height_restriction
  FROM Rides
  WHERE ride_id = NEW.ride_id;
  
  -- Check if the account's height is less than the ride's height restriction
  IF v_height < v_height_restriction THEN
    -- Prevent insert if the height restriction is not met
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'You do not meet the height requirement for this ride.';
  END IF;
  
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `cost` decimal(10,2) NOT NULL DEFAULT '5.00',
  PRIMARY KEY (`ride_id`),
  UNIQUE KEY `ride_id` (`ride_id`) /*!80000 INVISIBLE */
) ENGINE=InnoDB AUTO_INCREMENT=953823 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rides`
--

LOCK TABLES `Rides` WRITE;
/*!40000 ALTER TABLE `Rides` DISABLE KEYS */;
INSERT INTO `Rides` VALUES ('Pirate Ship','Ahoy there, mateys! Welcome aboard the Pirateship!, where adventure awaits on the high seas! ',1,'../../assets/rides/CougarPirateship.png',0,23,0,163927,5.50),('Twister','Welcome to Twister, where the winds of excitement are swirling and adventure awaits around every twist and turn! ',0,'../../assets/rides/CougarTwister.png',0,35,0,216398,5.00),('Sky Rider',' Take flight with Sky Rider, where the sky truly is the limit! ',1,'../../assets/rides/cougarSkyrider.png',0,50,1,295847,5.00),('Dragons','Welcome, brave young adventurers, to Dragons! where dreams take flight upon the backs of mighty dragons! ',1,'../../assets/rides/cougarDragons.png',0,20,0,347562,5.00),('Bumping Cars','Get ready to rev your engines and unleash your inner daredevil with Bumping Cars! The Ultimate Bumper Car Bonanza! ',1,'../../assets/rides/CougarBumpingCars.png',0,18,0,409273,5.00),('Ladybugs','Welcome to Cougar Ladybugs, where each twist and turn of our exhilarating ride unveils a world of enchantment and excitement! ',0,'../../assets/rides/cougarLadybugs.png',0,0,0,502746,5.00),('Teacups','Step right up and embark on a delightful adventure with Cougar Teacups, the whimsical ride that promises fun and excitement for all ages! ',0,'../../assets/rides/cougarTeacups.png',0,0,0,574639,5.00),('Airplanes','Embark on an exhilarating journey through the clouds aboard our thrilling attraction, Airplanes! The Sky Explorer!',0,'../../assets/rides/CougarAirplanes.png',0,0,0,582910,5.00),('Slide','Welcome to our Cougar Slide, where the adventure begins and the thrill of sliding down our towering giant ignites your senses!',0,'../../assets/rides/CougarSlide.png',0,18,0,617490,5.00),('Carousel','Welcome to our Cougar-themed Carousel, where every ride is a journey into enchantment and nostalgia, waiting to be rediscovered with each turn',0,'../../assets/rides/CougarCarousel.png',0,20,0,625198,5.00),('Alien Invasion','Prepare for an otherworldly adventure unlike anything you\'ve ever experienced with Alien Invasion! The Extraterrestrial Encounter!',0,'../../assets/rides/CougarAlienInvasion.png',0,42,0,736841,5.00),('Roller Coaster','Prepare for the ride of your life on velocity, the ultimate roller coaster experience that will leave you breathless with excitement! ',0,'../../assets/rides/CougarRollerCoaster.png',0,54,0,748315,7.00),('Slingshot','Get ready to defy gravity and experience the thrill of a lifetime with our Cougar Slinghot!  the most exhilarating slingshot ride in town! ',0,'../../assets/rides/CougarSlingshot.png',0,48,0,830172,5.00),('Fireball','Get ready to experience the heart-pounding excitement of Fireball! An adrenaline-fueled journey that will leave you breathless and craving more! ',0,'../../assets/rides/CougarFireball.png',0,48,0,891634,5.00),('Wheel','Ascend into the heavens and behold the cityscape from a whole new perspective aboard Cougar Skyline, our magnificent Ferris wheel that promises awe-inspiring vistas and indelible moments!',0,'../../assets/rides/CougarWheel.png',0,0,0,953821,5.00);
/*!40000 ALTER TABLE `Rides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shift_Time`
--

DROP TABLE IF EXISTS `Shift_Time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Shift_Time` (
  `shift_time_id` int NOT NULL AUTO_INCREMENT,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  PRIMARY KEY (`shift_time_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shift_Time`
--

LOCK TABLES `Shift_Time` WRITE;
/*!40000 ALTER TABLE `Shift_Time` DISABLE KEYS */;
INSERT INTO `Shift_Time` VALUES (1,'08:00:00','12:00:00'),(2,'12:00:00','16:00:00'),(3,'16:00:00','20:00:00'),(4,'20:00:00','23:30:00');
/*!40000 ALTER TABLE `Shift_Time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Shifts`
--

DROP TABLE IF EXISTS `Shifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Shifts` (
  `shift_id` int unsigned NOT NULL AUTO_INCREMENT,
  `shift_date` date NOT NULL,
  `shift_type` enum('8:00a-12:00p','12:00p-4:00p','4:00p-8:00p','8:00p-11:30p') NOT NULL COMMENT 'Shift times:\\n8:00-12;00\\n12:00-4:00\\n4:00-8:00\\n8:00-11:30\\nCan be indexed via (1,2,3,4)',
  PRIMARY KEY (`shift_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Shifts`
--

LOCK TABLES `Shifts` WRITE;
/*!40000 ALTER TABLE `Shifts` DISABLE KEYS */;
INSERT INTO `Shifts` VALUES (1,'2024-01-12','8:00a-12:00p'),(2,'2024-01-12','12:00p-4:00p'),(3,'2024-01-12','4:00p-8:00p'),(4,'2024-01-12','8:00p-11:30p'),(5,'2024-01-13','8:00a-12:00p'),(6,'2024-01-13','12:00p-4:00p'),(7,'2024-01-13','4:00p-8:00p'),(8,'2024-01-13','8:00p-11:30p'),(9,'2024-01-14','8:00a-12:00p'),(10,'2024-01-14','12:00p-4:00p'),(11,'2024-01-14','4:00p-8:00p'),(12,'2024-01-14','8:00p-11:30p'),(13,'2024-01-15','8:00a-12:00p'),(14,'2024-01-15','12:00p-4:00p'),(15,'2024-01-15','4:00p-8:00p'),(16,'2024-01-15','8:00p-11:30p'),(17,'2024-01-16','8:00a-12:00p'),(18,'2024-01-16','12:00p-4:00p'),(19,'2024-01-16','4:00p-8:00p'),(20,'2024-01-16','8:00p-11:30p'),(21,'2024-01-17','8:00a-12:00p'),(22,'2024-01-17','12:00p-4:00p'),(23,'2024-01-17','4:00p-8:00p'),(24,'2024-01-17','8:00p-11:30p'),(25,'2024-01-18','8:00a-12:00p'),(26,'2024-01-18','12:00p-4:00p'),(27,'2024-01-18','4:00p-8:00p'),(28,'2024-01-18','8:00p-11:30p'),(29,'2024-01-19','8:00a-12:00p'),(30,'2024-01-19','12:00p-4:00p'),(31,'2024-01-19','4:00p-8:00p'),(32,'2024-01-19','8:00p-11:30p'),(33,'2024-01-20','8:00a-12:00p'),(34,'2024-01-20','12:00p-4:00p'),(35,'2024-01-20','4:00p-8:00p'),(36,'2024-01-20','8:00p-11:30p'),(37,'2024-01-21','8:00a-12:00p'),(38,'2024-01-21','12:00p-4:00p'),(39,'2024-01-21','4:00p-8:00p'),(40,'2024-01-21','8:00p-11:30p'),(41,'2024-01-22','8:00a-12:00p'),(42,'2024-01-22','12:00p-4:00p'),(43,'2024-01-22','4:00p-8:00p'),(44,'2024-01-22','8:00p-11:30p'),(45,'2024-01-23','8:00a-12:00p'),(46,'2024-01-23','12:00p-4:00p'),(47,'2024-01-23','4:00p-8:00p'),(48,'2024-01-23','8:00p-11:30p'),(49,'2024-01-24','8:00a-12:00p'),(50,'2024-01-24','12:00p-4:00p'),(51,'2024-01-24','4:00p-8:00p'),(52,'2024-01-24','8:00p-11:30p'),(53,'2024-01-25','8:00a-12:00p'),(54,'2024-01-25','12:00p-4:00p'),(55,'2024-01-25','4:00p-8:00p'),(56,'2024-01-25','8:00p-11:30p'),(57,'2024-01-26','8:00a-12:00p'),(58,'2024-01-26','12:00p-4:00p'),(59,'2024-01-26','4:00p-8:00p'),(60,'2024-01-26','8:00p-11:30p'),(61,'2024-01-27','8:00a-12:00p'),(62,'2024-01-27','12:00p-4:00p'),(63,'2024-01-27','4:00p-8:00p'),(64,'2024-01-27','8:00p-11:30p'),(65,'2024-01-28','8:00a-12:00p'),(66,'2024-01-28','12:00p-4:00p'),(67,'2024-01-28','4:00p-8:00p'),(68,'2024-01-28','8:00p-11:30p'),(69,'2024-01-29','8:00a-12:00p'),(70,'2024-01-29','12:00p-4:00p'),(71,'2024-01-29','4:00p-8:00p'),(72,'2024-01-29','8:00p-11:30p'),(73,'2024-01-30','8:00a-12:00p'),(74,'2024-01-30','12:00p-4:00p'),(75,'2024-01-30','4:00p-8:00p'),(76,'2024-01-30','8:00p-11:30p'),(77,'2024-01-31','8:00a-12:00p'),(78,'2024-01-31','12:00p-4:00p'),(79,'2024-01-31','4:00p-8:00p'),(80,'2024-01-31','8:00p-11:30p'),(81,'2024-02-01','8:00a-12:00p'),(82,'2024-02-01','12:00p-4:00p'),(83,'2024-02-01','4:00p-8:00p'),(84,'2024-02-01','8:00p-11:30p'),(85,'2024-02-02','8:00a-12:00p'),(86,'2024-02-02','12:00p-4:00p'),(87,'2024-02-02','4:00p-8:00p'),(88,'2024-02-02','8:00p-11:30p'),(89,'2024-02-03','8:00a-12:00p'),(90,'2024-02-03','12:00p-4:00p'),(91,'2024-02-03','4:00p-8:00p'),(92,'2024-02-03','8:00p-11:30p'),(93,'2024-02-04','8:00a-12:00p'),(94,'2024-02-04','12:00p-4:00p'),(95,'2024-02-04','4:00p-8:00p'),(96,'2024-02-04','8:00p-11:30p'),(97,'2024-02-05','8:00a-12:00p'),(98,'2024-02-05','12:00p-4:00p'),(99,'2024-02-05','4:00p-8:00p'),(100,'2024-02-05','8:00p-11:30p');
/*!40000 ALTER TABLE `Shifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Trigger_AttractionMaintenance`
--

DROP TABLE IF EXISTS `Trigger_AttractionMaintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Trigger_AttractionMaintenance` (
  `trigger_id` int NOT NULL AUTO_INCREMENT,
  `attraction_id` int unsigned NOT NULL,
  `date` date NOT NULL,
  `broken` tinyint(1) NOT NULL,
  `type` enum('RM','GM','RR','GR','AR','AM') NOT NULL,
  PRIMARY KEY (`trigger_id`),
  KEY `fk4_attraction` (`attraction_id`),
  CONSTRAINT `fk4_attraction` FOREIGN KEY (`attraction_id`) REFERENCES `Attraction` (`attraction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trigger_AttractionMaintenance`
--

LOCK TABLES `Trigger_AttractionMaintenance` WRITE;
/*!40000 ALTER TABLE `Trigger_AttractionMaintenance` DISABLE KEYS */;
INSERT INTO `Trigger_AttractionMaintenance` VALUES (1,207564,'2024-04-16',1,'AM'),(2,207564,'2024-04-16',1,'AM'),(3,473628,'2024-04-16',1,'AM'),(4,473628,'2024-04-16',1,'AM');
/*!40000 ALTER TABLE `Trigger_AttractionMaintenance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Trigger_AttractionRainout`
--

DROP TABLE IF EXISTS `Trigger_AttractionRainout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Trigger_AttractionRainout` (
  `trigger_id` int unsigned NOT NULL AUTO_INCREMENT,
  `attraction_id` int unsigned NOT NULL,
  `date` datetime NOT NULL,
  `rainout` tinyint(1) NOT NULL,
  `type` enum('RM','GM','RR','GR','AR','AM') NOT NULL,
  PRIMARY KEY (`trigger_id`),
  UNIQUE KEY `trigger_id_UNIQUE` (`trigger_id`),
  KEY `Trigger_AttractionRainout_ibfk_1` (`attraction_id`),
  CONSTRAINT `Trigger_AttractionRainout_ibfk_1` FOREIGN KEY (`attraction_id`) REFERENCES `Attraction_Rainout` (`attraction_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trigger_AttractionRainout`
--

LOCK TABLES `Trigger_AttractionRainout` WRITE;
/*!40000 ALTER TABLE `Trigger_AttractionRainout` DISABLE KEYS */;
/*!40000 ALTER TABLE `Trigger_AttractionRainout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Trigger_GameMaintenance`
--

DROP TABLE IF EXISTS `Trigger_GameMaintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Trigger_GameMaintenance` (
  `trigger_id` int unsigned NOT NULL AUTO_INCREMENT,
  `game_id` int unsigned NOT NULL,
  `date` datetime NOT NULL,
  `broken` tinyint(1) NOT NULL,
  `type` enum('RM','GM','RR','GR','AR','AM') NOT NULL,
  PRIMARY KEY (`trigger_id`),
  UNIQUE KEY `trigger_id_UNIQUE` (`trigger_id`),
  KEY `Trigger_GameMaintenance_ibfk_1` (`game_id`),
  CONSTRAINT `Trigger_GameMaintenance_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `Game_Maintenance_Request` (`game_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trigger_GameMaintenance`
--

LOCK TABLES `Trigger_GameMaintenance` WRITE;
/*!40000 ALTER TABLE `Trigger_GameMaintenance` DISABLE KEYS */;
INSERT INTO `Trigger_GameMaintenance` VALUES (41,942176,'2024-01-21 00:00:00',1,'GM'),(42,731824,'2024-02-16 00:00:00',0,'GM'),(43,827465,'2024-03-21 00:00:00',1,'GM'),(44,428509,'2024-04-06 22:36:37',1,'GM'),(45,608937,'2024-04-07 21:48:54',1,'GM'),(46,428509,'2024-04-12 04:16:09',1,'GM'),(47,428509,'2024-04-18 21:34:47',1,'GM');
/*!40000 ALTER TABLE `Trigger_GameMaintenance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Trigger_GameRainout`
--

DROP TABLE IF EXISTS `Trigger_GameRainout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Trigger_GameRainout` (
  `trigger_id` int unsigned NOT NULL AUTO_INCREMENT,
  `game_id` int unsigned NOT NULL,
  `date` datetime NOT NULL,
  `rainout` tinyint(1) NOT NULL,
  `type` enum('RM','GM','RR','GR','AR','AM') NOT NULL,
  PRIMARY KEY (`trigger_id`),
  UNIQUE KEY `trigger_id_UNIQUE` (`trigger_id`),
  KEY `Trigger_GameRainout_ibfk_1_idx` (`game_id`),
  CONSTRAINT `Trigger_GameRainout_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `Game_Rainout` (`game_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trigger_GameRainout`
--

LOCK TABLES `Trigger_GameRainout` WRITE;
/*!40000 ALTER TABLE `Trigger_GameRainout` DISABLE KEYS */;
INSERT INTO `Trigger_GameRainout` VALUES (24,428509,'2024-04-18 22:02:23',1,'GR');
/*!40000 ALTER TABLE `Trigger_GameRainout` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Trigger_RideMaintenance`
--

DROP TABLE IF EXISTS `Trigger_RideMaintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Trigger_RideMaintenance` (
  `trigger_id` int unsigned NOT NULL AUTO_INCREMENT,
  `ride_id` int unsigned NOT NULL,
  `date` datetime NOT NULL,
  `broken` tinyint(1) NOT NULL,
  `type` enum('RM','GM','RR','GR','AR','AM') NOT NULL,
  PRIMARY KEY (`trigger_id`),
  UNIQUE KEY `trigger_id_UNIQUE` (`trigger_id`),
  KEY `Trigger_RideMaintenance_ibfk_1` (`ride_id`),
  CONSTRAINT `Trigger_RideMaintenance_ibfk_1` FOREIGN KEY (`ride_id`) REFERENCES `Ride_Maintenance_Request` (`ride_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trigger_RideMaintenance`
--

LOCK TABLES `Trigger_RideMaintenance` WRITE;
/*!40000 ALTER TABLE `Trigger_RideMaintenance` DISABLE KEYS */;
INSERT INTO `Trigger_RideMaintenance` VALUES (51,625198,'2024-02-08 00:00:00',0,'RM'),(52,502746,'2024-03-21 00:00:00',1,'RM'),(54,748315,'0000-00-00 00:00:00',0,'RM'),(55,295847,'2024-04-06 00:00:00',1,'RM'),(56,216398,'2024-04-07 21:12:35',1,'RM'),(57,216398,'2024-04-12 04:15:12',1,'RM'),(58,409273,'2024-04-16 22:41:16',1,'RM'),(59,295847,'2024-04-16 23:58:01',1,'RM'),(60,163927,'2024-04-18 02:19:48',1,'RM'),(61,574639,'2024-04-18 22:03:53',1,'RM'),(62,409273,'2024-04-19 06:38:13',1,'RM');
/*!40000 ALTER TABLE `Trigger_RideMaintenance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Trigger_RideRainout`
--

DROP TABLE IF EXISTS `Trigger_RideRainout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Trigger_RideRainout` (
  `trigger_id` int unsigned NOT NULL AUTO_INCREMENT,
  `ride_id` int unsigned NOT NULL,
  `date` datetime NOT NULL,
  `rainout` tinyint(1) NOT NULL,
  `type` enum('RM','GM','RR','GR','AR','AM') NOT NULL,
  PRIMARY KEY (`trigger_id`),
  UNIQUE KEY `trigger_id_UNIQUE` (`trigger_id`),
  KEY `Trigger_RideRainout_ibfk_1` (`ride_id`),
  CONSTRAINT `Trigger_RideRainout_ibfk_1` FOREIGN KEY (`ride_id`) REFERENCES `Ride_Rainout` (`ride_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Trigger_RideRainout`
--

LOCK TABLES `Trigger_RideRainout` WRITE;
/*!40000 ALTER TABLE `Trigger_RideRainout` DISABLE KEYS */;
INSERT INTO `Trigger_RideRainout` VALUES (1,748315,'2024-03-10 00:00:00',0,'RR'),(2,216398,'2024-03-21 00:00:00',1,'RR'),(3,582910,'2024-03-22 00:00:00',1,'RR'),(4,216398,'2024-04-07 19:55:48',1,'RR'),(5,295847,'2024-04-07 20:05:39',1,'RR'),(6,295847,'2024-04-07 21:06:47',1,'RR'),(7,216398,'2024-04-07 21:11:56',1,'RR'),(8,409273,'2024-04-07 21:11:56',1,'RR'),(9,347562,'2024-04-07 21:11:56',1,'RR'),(10,502746,'2024-04-07 21:11:56',1,'RR'),(11,295847,'2024-04-07 21:11:56',1,'RR'),(12,163927,'2024-04-07 21:11:56',1,'RR'),(13,748315,'2024-04-07 21:11:56',1,'RR'),(14,736841,'2024-04-07 21:11:56',1,'RR'),(15,830172,'2024-04-07 21:11:56',1,'RR'),(16,891634,'2024-04-07 21:11:56',1,'RR'),(17,953821,'2024-04-07 21:11:56',1,'RR'),(18,582910,'2024-04-07 21:11:57',1,'RR'),(19,617490,'2024-04-07 21:11:57',1,'RR'),(20,574639,'2024-04-07 21:11:57',1,'RR'),(21,625198,'2024-04-07 21:11:57',1,'RR'),(22,216398,'2024-04-07 21:24:09',1,'RR'),(23,295847,'2024-04-07 21:50:59',1,'RR'),(24,502746,'2024-04-07 21:50:59',1,'RR'),(25,163927,'2024-04-07 21:50:59',1,'RR'),(26,409273,'2024-04-07 21:50:59',1,'RR'),(27,347562,'2024-04-07 21:50:59',1,'RR'),(28,574639,'2024-04-07 21:50:59',1,'RR'),(29,748315,'2024-04-07 21:50:59',1,'RR'),(30,830172,'2024-04-07 21:50:59',1,'RR'),(31,953821,'2024-04-07 21:50:59',1,'RR'),(32,891634,'2024-04-07 21:50:59',1,'RR'),(33,625198,'2024-04-07 21:51:02',1,'RR'),(34,617490,'2024-04-07 21:51:02',1,'RR'),(35,736841,'2024-04-07 21:51:02',1,'RR'),(36,582910,'2024-04-07 21:51:02',1,'RR'),(37,163927,'2024-04-07 21:52:45',1,'RR'),(38,216398,'2024-04-07 21:52:45',1,'RR'),(39,295847,'2024-04-07 21:52:45',1,'RR'),(40,409273,'2024-04-07 21:52:45',1,'RR'),(41,347562,'2024-04-07 21:52:45',1,'RR'),(42,502746,'2024-04-07 21:52:45',1,'RR'),(43,625198,'2024-04-07 21:52:45',1,'RR'),(44,582910,'2024-04-07 21:52:45',1,'RR'),(45,574639,'2024-04-07 21:52:45',1,'RR'),(46,617490,'2024-04-07 21:52:45',1,'RR'),(47,736841,'2024-04-07 21:52:45',1,'RR'),(48,748315,'2024-04-07 21:52:45',1,'RR'),(49,830172,'2024-04-07 21:52:45',1,'RR'),(50,953821,'2024-04-07 21:52:45',1,'RR'),(51,891634,'2024-04-07 21:52:45',1,'RR'),(52,409273,'2024-04-07 21:54:34',1,'RR'),(53,574639,'2024-04-08 02:02:58',1,'RR'),(54,163927,'2024-04-12 04:13:48',1,'RR'),(55,216398,'2024-04-13 01:26:24',1,'RR'),(56,617490,'2024-04-17 16:00:25',1,'RR'),(57,582910,'2024-04-17 16:01:26',1,'RR'),(58,574639,'2024-04-17 16:04:38',1,'RR'),(59,347562,'2024-04-17 16:05:59',1,'RR'),(60,582910,'2024-04-17 16:10:19',1,'RR'),(61,574639,'2024-04-17 16:11:23',1,'RR'),(62,582910,'2024-04-17 16:15:32',1,'RR'),(63,625198,'2024-04-17 16:18:06',1,'RR'),(64,163927,'2024-04-18 20:05:24',1,'RR'),(65,347562,'2024-04-18 21:27:38',1,'RR'),(66,163927,'2024-04-20 18:15:20',1,'RR'),(67,295847,'2024-04-20 23:36:04',1,'RR');
/*!40000 ALTER TABLE `Trigger_RideRainout` ENABLE KEYS */;
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
  `password` varchar(60) NOT NULL,
  `account_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_type` enum('customer','attendant','maintenance','admin') NOT NULL,
  `phone` varchar(10) NOT NULL,
  `address` varchar(45) NOT NULL DEFAULT '18000 Space St.',
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `Email_UNIQUE` (`email`),
  UNIQUE KEY `Account_id_UNIQUE` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Account`
--

LOCK TABLES `User_Account` WRITE;
/*!40000 ALTER TABLE `User_Account` DISABLE KEYS */;
INSERT INTO `User_Account` VALUES ('1999-05-07','Aria','Cortes','ariacortes07@gmail.com','',31,'attendant','','18000 Space St.'),('2003-07-04','Esme','Dennis','dennisboy@hotmail.com','',34,'attendant','','18000 Space St.'),('2000-03-19','Boden','Collier','bodencollier3@yahoo.com','',35,'attendant','','18000 Space St.'),('1998-10-01','River','Allison','Allison10@hotmail.com','',36,'attendant','','18000 Space St.'),('2016-03-24','Ethan','Brooks','ethan.brooks@yahoo.com','',41,'customer','','18000 Space St.'),('2015-06-14','Olivia','Peterson','olivia.peterson@yahoo.com','',42,'customer','','18000 Space St.'),('2014-01-27','Lucas','Martinez','lucas.martinez@yahoo.com','',43,'customer','','18000 Space St.'),('2012-02-16','Isabella','Anderson','isabella.anderson@yahoo.com','',44,'customer','','18000 Space St.'),('1994-07-16','Mason','Rodriguez','mason.rodriguez@yahoo.com','',45,'customer','','18000 Space St.'),('1995-08-15','Sophia','Evans','sophia.evans@yahoo.com','',46,'customer','','18000 Space St.'),('1996-05-21','Logan','Ramirez','logan.ramirez@yahoo.com','',47,'customer','','18000 Space St.'),('1995-09-15','Ava','Thompson','ava.thompson@yahoo.com','',48,'customer','','18000 Space St.'),('2001-03-14','Elijah','Harris','elijah.harris@yahoo.com','',49,'customer','','18000 Space St.'),('2003-04-12','Mia','Sanchez','mia.sanchez@yahoo.com','',50,'customer','','18000 Space St.'),('2005-11-07','Benjamin','King','benjamin.king@yahoo.com','',51,'customer','','18000 Space St.'),('2007-12-09','Charlotte','Scott','charlotte.scott@yahoo.com','',52,'customer','','18000 Space St.'),('1999-10-30','William','Taylor','william.taylor@yahoo.com','',53,'customer','','18000 Space St.'),('1997-08-23','Amelia','Hughes','amelia.hughes@yahoo.com','',54,'customer','','18000 Space St.'),('2007-09-11','James','Cooper','james.cooper@yahoo.com','',55,'customer','','18000 Space St.'),('2003-04-12','Harper','Jenkins','harper.jenkins@yahoo.com','',56,'customer','','18000 Space St.'),('1996-06-09','Alexander','Phillips','alexander.phillips@yahoo.com','',57,'customer','','18000 Space St.'),('2001-09-11','Evelyn','Wright','evelyn.wright@yahoo.com','',58,'customer','','18000 Space St.'),('2002-07-09','Michael','Foster','michael.foster@yahoo.com','',59,'customer','','18000 Space St.'),('2000-11-03','Lily','Morgan','lili.morgan@yahoo.com','',60,'customer','','18000 Space St.'),('1990-10-10','Paul','Morris','paul.morris@yahoo.com','',62,'attendant','','18000 Space St.'),('2001-09-28','Jamie','Lowery','jamie.lowery@yahoo.com','',64,'attendant','','18000 Space St.'),('1983-09-16','Caroline','Davenport','caroline.davenport@yahoo.com','',65,'attendant','','18000 Space St.'),('1999-05-10','Sherry','Carlson','sherry.carlson@yahoo.com','',66,'attendant','','18000 Space St.'),('2002-09-07','Anna','Gonzales','anna.gonzales@yahoo.com','',67,'attendant','','18000 Space St.'),('1992-12-10','Kenneth','Davis','kenneth.davis@yahoo.com','',68,'attendant','','18000 Space St.'),('1998-02-03','Melissa','Reyes','melissa.reyes@yahoo.com','',69,'attendant','','18000 Space St.'),('2001-08-24','Charlene','Jones','charlene.jones@yahoo.com','',71,'attendant','','18000 Space St.'),('1995-03-08','Richard','Bradley','richard.bradley@yahoo.com','',73,'attendant','','18000 Space St.'),('1992-06-04','Christine','Nelson','christine.nelson@yahoo.com','',74,'attendant','','18000 Space St.'),('1988-11-12','Bradley','Valencia','bradley.valencia@yahoo.com','',75,'attendant','1234566543','18000 Space St.'),('1983-04-11','Virginia','Lewis','virginia.lewis@yahoo.com','',76,'','','18000 Space St.'),('1995-06-27','Kimberly','McIntosh','kimberly.mcintosh@yahoo.com','',77,'','','18000 Space St.'),('1997-07-08','Madison','Sullivan','madison.sullivan@yahoo.com','',78,'','','18000 Space St.'),('1996-05-19','Nathan','Giles','nathan.giles@yahoo.com','',79,'','','18000 Space St.'),('1989-10-10','James','Liu','james.liu@yahoo.com','',80,'','','18000 Space St.'),('1986-08-06','Danny','Smith','danny.smith@yahoo.com','',81,'','','18000 Space St.'),('1990-06-18','Christine','Cook','christine.cook@yahoo.com','',82,'','','18000 Space St.'),('1996-11-07','Timothy','Hancock','timothy.hancock@yahoo.com','',83,'','','18000 Space St.'),('1983-05-02','Mikayla','Moore','mikayla.moore@yahoo.com','',84,'','','18000 Space St.'),('1985-11-06','Todd','Campbell','todd.campbell@yahoo.com','',85,'','','18000 Space St.'),('1988-12-26','Nicole','Dunlap','nicole.dunlap@yahoo.com','',86,'','','18000 Space St.'),('1988-06-21','Franklin','Lewis','franklin.lewis@yahoo.com','',87,'','','18000 Space St.'),('2000-02-01','Jake','Reed','jreed@gmail.com','$2b$10$ZT9jM4hpQ4Ev.gw40nKbHeBauoaXOotKMacyctEqbfB0QRVhEITS.',133,'admin','3333333333','18000 Space St.'),('1998-09-23','Barnaby','Jingle','barnaby.jingle@yahoo.com','password123',134,'customer','8327789812','18000 Space St.'),('2000-02-01','Jake','Schwartz','jake12352@gmail.com','$2b$10$tPWzD2UmQoqEZb6ZHnA.EuVKQR.ppL9yhw56VCqwvdZB8TosAyySG',135,'admin','2222222222','18000 Space St.'),('2000-12-31','Jake','JJJJ','jake32@gmail.com','$2b$10$wIxdjluNDFPQj8unS42c0u0Fe2DcG4D/yKPsy8uQqKedlKNR8D/Ru',136,'customer','2222222222','18000 Space St.'),('2001-12-18','Saniya','Cole','snaia@ididnod.com','$2b$10$YrkaAhe3xFVJipxfjucaIuR8R5zd..IyTCYwLD/GbtUt0/j8xb/r6',137,'customer','8326373683','18000 Space St.'),('2000-07-24','Muskan ','Oad','moad2@cougarnet.uh.edu','$2b$10$Nc68QTo7K/Tn4YMQbYofPOh/yIhye4PTA455st.CJj6NFR8Swd3gG',138,'customer','3464321957','18000 Space St.'),('2000-04-17','John','Doe','johndoe@gmail.com','$2b$10$GXQr4pR5Ref5VLqKRaqTVeMwjnkLBGIG3SGNahGvvmjAkooktl/..',139,'customer','3465551234','18000 Space St.'),('2000-07-06','Alejandro','Avila','alejandroavila@gmail.com','$2b$10$MIBlMIwlGxf3KWPrxjB.Tefq1Oqz/UhMquk4QlmLslvWF47BkySBe',140,'customer','3461231234','18000 Space St.'),('2003-01-01','Samuel','Adams','samueladams@gmail.com','$2b$10$RShgp5C.pmVdTL8zK8zyr.UDuqeRxpvm3IDOWld/29l6RYhFzMsya',141,'customer','3331231234','18000 Space St.'),('2000-02-01','Group','Admin','groupadmin@gmail.com','$2b$10$wh02hYTkE8blzide5AKgm.wdF3Hy2j5vVetMt.X1uMIJst9AVEVpy',142,'admin','1234567899','18000 Space St.'),('2000-04-03','Jake','Reed','jreed2@gmail.com','$2b$10$NbXYllzl/ejtJQsEH6872uxPgKYrUTLYrEXWIp8o8jdgobs6HES4a',143,'customer','2222222222','18000 Space St.'),('2001-02-28','alex','avil','alexavil@gmail.com','$2b$10$k6FBnvzjV9aJD1k7ftbaf.ILaD6YlGLL1bpajFHTArquwzCzBX2v2',144,'customer','1231231234','18000 Space St.'),('2003-03-21','alex','av','alexav@gmail.com','$2b$10$xypctaDGxWy9yZDAHFTBB.hUj.gSPmc7X6ERFp8aj55r12l2A5Zza',145,'customer','1111111234','18000 Space St.'),('0000-00-00','alex','avila','alexav3@gmail.com','Alejandro8!',146,'admin','1231221234','18000 Space St.'),('1999-06-22','jose','ramos','jramos@gmail.com','$2b$10$8yaewqnugAqoplK5MHizWOzUfIxnlK5VMGpGI3BY7qPCrNJwMxBYq',147,'customer','3461231234','18000 Space St.'),('2000-01-02','Jake','Sch','jreedmaint@gmail.com','$2b$10$lltbCmoOONVVRLEDvmPnGOK0bT8RS2z.KTIgZzgjVhy1FollJZ/hS',151,'','2222222222','18000 Space St.'),('2000-01-01','Group ','Admin','admin@gmail.com','$2b$10$hqHup24QG13GF4.Vg7ccAuZoqnjAvdZW3iC/vfHlR.qejwoOi6I.S',155,'admin','2222222233','18000 Space St.'),('2000-01-01','Group','Maintenance','maintenance@gmail.com','$2b$10$l2d/8IbLZmQZ0EywoBoEOe0aR/AKpQF02mZOsyC8jQnwecuz2x79q',156,'maintenance','2222222222','18000 Space St.'),('2000-01-01','Group','Attendant','attendant@gmail.com','$2b$10$Zp7EaU4HrDKFfMTTF6SqPejdsm.kBWfXk8oqeMDgCj0.aCjV6j22y',157,'attendant','2222222222','18000 Space St.'),('2000-01-01','Group','Customer','customer@gmail.com','$2b$10$exA8PYFBtdcZjCyTXUBKdeg3Oi8leIpwbHHQ/5z/WHlatPeTkvIVO',158,'customer','2222222222','18000 Space St.'),('2012-01-01','Janet','Anagli','janet@gmail.com','$2b$10$8x3ksv8Qc/GmA/yK6J91U.wIQh.Ep1.pUrfeFZgUitRo6za.kP7nW',160,'customer','8137777777','18000 Space St.'),('2000-01-01','cougar','park','cougar@gmail.com','$2b$10$.atPGX12M5q5ocPVIENY7.ontE95dQTumPU0leMjIdl0.xhaCvoM2',161,'customer','2898188382','18000 Space St.'),('2005-06-07','Pepito','Olvera','pepito01@gmail.com','$2b$10$i2KEozTkRz4XlzWFYtw.EOKA6rlKJ3wpJ7tAORUkJqOPe.CkYn.CG',162,'customer','1111111111','18000 Space St.'),('2000-01-01','Jake','Smith','smithy1@gmail.com','$2b$10$L1JLhxTp/0kzZs5JybFmCu9nyj/ExUhLmD0FTFzMo4zLKc8yCriW.',167,'maintenance','2321232222','18000 Space St.'),('2006-03-09','Alejandro','Avila','alexlex@gmail.com','$2a$10$E9hzD2cB/9gTwkx0MSl7BOnSYDUBCEvdpx7D9vZ2.APyOPt4Ko7RC',169,'customer','1231231234','18000 Space St.'),('2000-02-01','Jessica','Le','jessle@gmail.com','$2a$10$ihNAIzKzGYFrAqXk6vQ2Eud51fvfJNKx6q8ZPLV/octXc48s1v216',170,'attendant','2232122222','18000 Space St.'),('2013-02-16','Jay','Jeong','abc@gmail.com','$2b$10$ypQ45/PDiOMkF5l.SsqDAu.DPQk16OETTYxi.CrbCSSadxvpi4fga',171,'customer','1234567898','18000 Space St.'),('2000-02-20','Jake','Schwartz','jake123@gmail.com','$2a$10$AmGGg6vjUyA1IdWBr0VDeuaG.9FDU1RDIjkVC/rdjwZJVXd08OXoS',172,'attendant','2322222222','18000 Space St.'),('2000-02-20','Jakes','Schwartzz','jake12345@gmail.com','$2a$10$RkIBMRTUEEJnAV/XssbdtetHvn1RodkYZDoAWLuNeAQtp41yOd0tK',173,'attendant','2322222222','18000 Space St.'),('2000-02-20','Jakes','Reed','jake123475@gmail.com','$2a$10$bm4/gOyyYWCnqm1zn1uXI.eu8wI1ysRD7oMIJoV8zNUYkJhV781lO',174,'attendant','2322222222','18000 Space St.'),('2000-12-01','Jake','Smith','jsmith@gmail.com','$2a$10$pWH3j2iklrLkIljH.5G6P.SIIT/ZGTRid3IwWxaK7p./UqJ3TXIu6',175,'customer','2148986402','18000 Space St.'),('2003-07-23','Max','Miller','max@gmail.com','$2a$10$aJcFH.D6mkXJwwTv061CKeNbodUPI4gykqi73peJhQEnPcL8XPYEW',177,'customer','1234567890','18000 Space St.'),('2000-03-20','Jake','Smith','jakesmith@gmail.com','$2a$10$PEBszqkX36WXPcW8kub94.22aCmXB7HcIZXnIQ7mXq1zPpgYfldHa',178,'customer','2234322222','18000 Space St.'),('2000-01-01','Jake','Reed','jre12@gmail.com','$2a$10$MFR2/7EgARkTn7c3aVxkSOGGcxNOSBlo43aNkRraJaWTuJqhq0Wd.',179,'attendant','2223334444','18000 Space St.'),('2000-02-02','Jim','Smith','jim@gmail.com','$2a$10$aLlN4.6cv7uPGWyi.6OY/uDvVjj6jvJ7.DlK1D5huHJafZ8mBwzR6',180,'customer','3127876653','18000 Space St.'),('2000-03-02','Jake','Schwartz','jaker@gmail.com','$2a$10$.od6qfSHpTQC1VAohz2nnuHK8sqc8NJpA3c/nmJzlnN1Y5Sl5rdfa',181,'attendant','2222222222','18000 Space St.'),('2000-03-10','Jake','Schwartz','jakerschwartz47@gmail.com','$2a$10$ndxZ/jHm8d/.TlfQhAewneMeQ0FnyjQpC8/NbrUkFP9Lbca0Mr6CG',183,'customer','1232222222','100 Jake St. Houston tx'),('2005-07-20','customer','21','customer2@gmail.com','$2a$10$gy4Ryd.AOg8eNarpXObci.eOTUcg.ZrXcuFwYnBkHtz/HT3tWGQn2',184,'customer','1234567890','');
/*!40000 ALTER TABLE `User_Account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'coogsparkdb'
--

--
-- Dumping routines for database 'coogsparkdb'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-20 23:59:34
