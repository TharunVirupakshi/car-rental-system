-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (arm64)
--
-- Host: localhost    Database: CarRentalDB
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'admin@rentcarz.com','$2a$10$/zC1H4IDSMyIfgoiENs3mODxivZMgG/Y0Lz1HOjEYJCCsuQd6VRWe');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `vehicleNo` varchar(20) NOT NULL,
  `carType` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `locationID` int DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `photoUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vehicleNo`),
  KEY `car_ibfk_1` (`locationID`),
  CONSTRAINT `car_ibfk_1` FOREIGN KEY (`locationID`) REFERENCES `location` (`locationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES ('KA05HD25','Sedan','Kia',1,NULL,NULL),('KA05HD26','Sedan','Kia',1,NULL,NULL),('KA05HX2','Coupe','Maruthi Swift',1,'2024-03-25 15:28:54',NULL),('KA05HX2555','Coupe','Maruthi',1,'2024-03-26 08:40:44',NULL),('KA06ABC','Sedan','Maruti Suzuki Dzire',1,NULL,NULL),('KA06ABC5','SUV','Tata',1,'2024-04-01 06:53:03',NULL),('KA06ABXX','Sedan','Kia',2,NULL,NULL),('KA06ZZZ5','Sedan','Maruthi2',1,NULL,NULL),('KA07XYZ','SUV','Mahindra XUV500',1,'2024-03-25 14:58:53',NULL),('KA08MNO','Sedan','Tata',1,NULL,NULL),('KA09PQR','Coupe','Hyundai Grand i10',1,'2024-03-26 08:43:26',NULL),('KA10XYZ','Sedan','Honda Amaze',1,NULL,NULL),('KA11ABC','SUV','Honda City',1,'2024-03-25 14:20:24',NULL),('KA12XYZ','Hatchback','Toyota Innova Crysta',1,NULL,NULL),('KA13MNO','Coupe','Volkswagen Polo',1,NULL,NULL),('KA14PQR','Sedan','Ford EcoSport',1,NULL,NULL),('KA15XYZ','SUV','Hyundai Verna',1,NULL,NULL),('KA16ABC','Sedan','Maruti Suzuki Ciaz',2,NULL,NULL),('KA17XYZ','SUV','Kia Seltos',2,NULL,NULL),('KA18MNO','Hatchback','Tata Altroz',2,NULL,NULL),('KA19PQR','Coupe','Mercedes-Benz A-Class',2,NULL,NULL),('KA20XYZ','Sedan','Toyota Fortuner',2,NULL,NULL),('KA21ABC','SUV','Skoda Rapid',2,NULL,NULL),('KA22XYZ','Hatchback','Renault Duster',2,NULL,NULL),('KA23MNO','Coupe','Ford Figo',2,NULL,NULL),('KA24PQR','Sedan','Nissan Kicks',2,NULL,NULL),('KA25XYZ','SUV','Tesla Model S',2,NULL,NULL),('KA26ABC','Sedan','Hyundai Elite i20',3,NULL,NULL),('KA27XYZ','SUV','Audi Q7',3,NULL,NULL),('KA28MNO','Hatchback','Maruti Suzuki Baleno',3,NULL,NULL),('KA29PQR','Coupe','Chevrolet Beat',3,NULL,NULL),('KA30XYZ','Sedan','Volvo XC40',3,'2024-03-25 15:16:45',NULL),('KA31ABC','SUV','Honda Civic',3,NULL,NULL),('KA32XYZ','Hatchback','Jeep Compass',3,NULL,NULL),('KA33MNO','Coupe','Ford Aspire',3,NULL,NULL),('KA34PQR','Sedan','BMW X3',3,'2024-03-25 15:00:01',NULL);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `custID` varchar(28) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `contactNum` varchar(15) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`custID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('F0VArbId9IY50ZV3c56Isx4oJkY2','Rohit','12345678','rohit@email.com','Banashankri 5th Stage'),('hKC8kg0T3tYn8OYf2575vc0i7KZ2','Raghunath','9191929293','raghunath@email.com','101, Koramangala, Bangalore, Karnataka - 560100'),('J1dPockkrPaNMDxn6LS0F0IEYVU2','Raghu Ram','1234567890','raghuram@email.com','101, Koramangala, Bangalore, Karnataka - 560100'),('MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2','Tharun Virupakshi','9945673332','tharunvrrvc184@gmail.com','BSK, 5th Stage'),('VjSGhcbZtMbf20TNYRWwu9Wdnga2','Rakesh Purohit','9594698888','rakeshpurohit@email.com','126, BSK');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount` (
  `discountID` int NOT NULL AUTO_INCREMENT,
  `couponCode` varchar(255) DEFAULT NULL,
  `discountPercent` decimal(2,2) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`discountID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
INSERT INTO `discount` VALUES (2,'SAVE10',0.10,NULL),(3,'GRAB20OFF',0.20,NULL),(4,'DISCOUNT15',0.15,'2024-03-25 17:20:18'),(5,'SPECIAL25',0.25,NULL),(6,'GET30NOW',0.30,NULL),(7,'SAVE10NOW',0.10,'2024-03-25 14:53:43'),(8,'FLAT50',0.50,'2024-03-25 17:20:10'),(9,'FLAT35',0.35,NULL);
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `getsRented`
--

DROP TABLE IF EXISTS `getsRented`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `getsRented` (
  `tripID` int NOT NULL AUTO_INCREMENT,
  `carID` varchar(20) DEFAULT NULL,
  `orderID` int DEFAULT NULL,
  `rentalStartDate` date DEFAULT NULL,
  `rentalEndDate` date DEFAULT NULL,
  PRIMARY KEY (`tripID`),
  KEY `getsrented_ibfk_2` (`orderID`),
  KEY `getsrented_ibfk_1` (`carID`),
  CONSTRAINT `getsrented_ibfk_1` FOREIGN KEY (`carID`) REFERENCES `car` (`vehicleNo`) ON UPDATE CASCADE,
  CONSTRAINT `getsrented_ibfk_2` FOREIGN KEY (`orderID`) REFERENCES `rentalOrder` (`orderID`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `getsRented`
--

LOCK TABLES `getsRented` WRITE;
/*!40000 ALTER TABLE `getsRented` DISABLE KEYS */;
INSERT INTO `getsRented` VALUES (24,'KA06ABC',57,'2024-03-10','2024-03-10'),(25,'KA07XYZ',58,'2024-03-10','2024-03-10'),(26,'KA08MNO',59,'2024-03-10','2024-03-12'),(27,'KA06ABC',60,'2024-03-11','2024-03-13'),(28,'KA06ABC',61,'2024-03-24','2024-03-26'),(29,'KA07XYZ',62,'2024-03-25','2024-03-27'),(30,'KA05HX2555',63,'2024-03-26','2024-03-26'),(31,'KA06ABC',64,'2024-03-27','2024-03-27'),(32,'KA06ABC',66,'2024-03-31','2024-03-31'),(33,'KA06ABC',67,'2024-04-01','2024-04-01'),(34,'KA06ZZZ5',68,'2024-04-01','2024-04-10');
/*!40000 ALTER TABLE `getsRented` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `location` (
  `locationID` int NOT NULL AUTO_INCREMENT,
  `branchName` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`locationID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Koramangala Branch','124 MG Road, Koramangala',NULL),(2,'Indiranagar Branch','456 100 Feet Road, Indiranagar',NULL),(3,'Whitefield Branch','789 ITPL Road, Whitefield',NULL),(4,'Banshankri','125, Banshankri','2024-03-26 03:41:40'),(6,'Banshankri','126, BSK','2024-03-26 05:27:46');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `paymentID` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `orderID` int DEFAULT NULL,
  `transactionID` int DEFAULT NULL,
  `payerID` varchar(28) DEFAULT NULL,
  `isSuccess` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`paymentID`),
  KEY `payment_ibfk_2_idx` (`transactionID`),
  KEY `payment_ibfk_1_idx` (`orderID`),
  KEY `payment_ibfk_3` (`payerID`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `rentalOrder` (`orderID`),
  CONSTRAINT `payment_ibfk_3` FOREIGN KEY (`payerID`) REFERENCES `customer` (`custID`) ON UPDATE CASCADE,
  CONSTRAINT `payment_ibfk_4` FOREIGN KEY (`transactionID`) REFERENCES `transaction` (`transactionID`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (61,800.00,'credit','2024-03-10 13:51:44',57,61,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(62,800.00,'debit','2024-03-10 14:35:23',58,62,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(63,1360.00,'credit','2024-03-10 18:18:38',59,63,'F0VArbId9IY50ZV3c56Isx4oJkY2',1),(64,2685.60,'credit','2024-03-11 10:39:10',60,64,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(65,1120.00,'credit','2024-03-24 12:33:53',61,65,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(66,1440.00,'credit','2024-03-25 11:56:55',62,66,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(67,520.00,'credit','2024-03-26 14:07:56',63,67,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(68,720.00,'credit','2024-03-27 06:14:46',64,68,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(69,1659.62,'debit','2024-03-31 13:40:50',66,69,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(70,1658.67,'credit','2024-04-01 12:20:52',67,70,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1),(71,10449.63,'credit','2024-04-01 12:57:52',68,71,'MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rentalOrder`
--

DROP TABLE IF EXISTS `rentalOrder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rentalOrder` (
  `orderID` int NOT NULL AUTO_INCREMENT,
  `carID` varchar(20) DEFAULT NULL,
  `custID` varchar(28) DEFAULT NULL,
  `asstID` int DEFAULT NULL,
  `discountID` int DEFAULT NULL,
  `totCost` decimal(10,2) DEFAULT NULL,
  `orderDate` date DEFAULT NULL,
  PRIMARY KEY (`orderID`),
  KEY `carID` (`carID`),
  KEY `fk_cust_ID` (`custID`),
  KEY `rentalorder_ibfk_4` (`discountID`),
  KEY `asstID` (`asstID`),
  CONSTRAINT `fk_cust_ID` FOREIGN KEY (`custID`) REFERENCES `customer` (`custID`),
  CONSTRAINT `rentalorder_ibfk_4` FOREIGN KEY (`discountID`) REFERENCES `discount` (`discountID`),
  CONSTRAINT `rentalorder_ibfk_5` FOREIGN KEY (`asstID`) REFERENCES `tripAsst` (`asstID`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rentalOrder`
--

LOCK TABLES `rentalOrder` WRITE;
/*!40000 ALTER TABLE `rentalOrder` DISABLE KEYS */;
INSERT INTO `rentalOrder` VALUES (57,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',3,NULL,800.00,'2024-03-10'),(58,'KA07XYZ','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',5,NULL,800.00,'2024-03-10'),(59,'KA08MNO','F0VArbId9IY50ZV3c56Isx4oJkY2',7,4,1360.00,'2024-03-10'),(60,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',6,2,2685.60,'2024-03-11'),(61,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',10,6,1120.00,'2024-03-24'),(62,'KA07XYZ','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',4,2,1440.00,'2024-03-25'),(63,'KA05HX2555','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',9,9,520.00,'2024-03-26'),(64,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',9,2,720.00,'2024-03-27'),(65,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',8,9,1954.10,'2024-03-31'),(66,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',1,NULL,1659.62,'2024-03-31'),(67,'KA06ABC','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',5,NULL,1658.67,'2024-04-01'),(68,'KA06ZZZ5','MKzHsTxTWvbFIpGKNiJ3Sj0kVkI2',3,6,10449.63,'2024-04-01');
/*!40000 ALTER TABLE `rentalOrder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `transactionID` int NOT NULL AUTO_INCREMENT,
  `transcName` varchar(255) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`transactionID`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (61,'cust_payment',800.00),(62,'cust_payment',800.00),(63,'cust_payment',1360.00),(64,'cust_payment',2685.60),(65,'cust_payment',1120.00),(66,'cust_payment',1440.00),(67,'cust_payment',520.00),(68,'cust_payment',720.00),(69,'cust_payment',1659.62),(70,'cust_payment',1658.67),(71,'cust_payment',10449.63);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tripAsst`
--

DROP TABLE IF EXISTS `tripAsst`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tripAsst` (
  `asstID` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `contactNum` varchar(15) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`asstID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tripAsst`
--

LOCK TABLES `tripAsst` WRITE;
/*!40000 ALTER TABLE `tripAsst` DISABLE KEYS */;
INSERT INTO `tripAsst` VALUES (1,'Rajesh','9035468888','rajesh@email.com',NULL),(2,'Priya Sharma','8765432109','priya.sharma@example.com',NULL),(3,'Vikram Singh','7654321098','vikram.singh@example.com',NULL),(4,'Sneha Patel','6543210987','sneha.patel@example.com',NULL),(5,'Ankit Verma','5432109876','ankit.verma@example.com',NULL),(6,'Ayesha Khan','4321098765','ayesha.khan@example.com',NULL),(7,'Pradeep Joshi','3210987654','pradeep.joshi@example.com',NULL),(8,'Anjali Gupta','2109876543','anjali.gupta@example.com',NULL),(9,'Arjun Malhotra','1098765432','arjun.malhotra@example.com',NULL),(10,'Pooja Das','9876543211','pooja.das@example.com',NULL),(11,'Pooja Sharma','9034567777','pooja.sharma@email.com','2024-03-26 04:44:27'),(12,'Suresh ','9191929293','suresh@mail.com','2024-03-26 05:46:26');
/*!40000 ALTER TABLE `tripAsst` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-01 18:02:38
