-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: localhost    Database: PathFynder
-- ------------------------------------------------------
-- Server version	5.7.17-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `club`
--

DROP TABLE IF EXISTS `club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club` (
  `clubId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `location` varchar(75) DEFAULT NULL,
  `avgTimeRating` float NOT NULL DEFAULT '1',
  PRIMARY KEY (`clubId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club`
--

LOCK TABLES `club` WRITE;
/*!40000 ALTER TABLE `club` DISABLE KEYS */;
/*!40000 ALTER TABLE `club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clubReview`
--

DROP TABLE IF EXISTS `clubReview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clubReview` (
  `reviewId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `clubId` bigint(20) unsigned NOT NULL,
  `userId` bigint(20) unsigned NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `review` varchar(3000) NOT NULL,
  `timeRating` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`reviewId`),
  KEY `clubId` (`clubId`),
  KEY `userId` (`userId`),
  CONSTRAINT `clubReview_ibfk_1` FOREIGN KEY (`clubId`) REFERENCES `club` (`clubId`),
  CONSTRAINT `clubReview_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clubReview`
--

LOCK TABLES `clubReview` WRITE;
/*!40000 ALTER TABLE `clubReview` DISABLE KEYS */;
/*!40000 ALTER TABLE `clubReview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `courseId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `abrev` varchar(4) NOT NULL,
  `number` varchar(7) NOT NULL,
  `avgWorkloadRating` float NOT NULL DEFAULT '1',
  `avgDifficultyRating` float NOT NULL DEFAULT '1',
  `avgUtilityRating` float NOT NULL DEFAULT '1',
  PRIMARY KEY (`courseId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courseReview`
--

DROP TABLE IF EXISTS `courseReview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courseReview` (
  `reviewId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `courseId` bigint(20) unsigned NOT NULL,
  `userId` bigint(20) unsigned NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `review` varchar(3000) NOT NULL,
  `difficultyRating` int(11) NOT NULL,
  `workloadRating` int(11) NOT NULL,
  `utilityRating` int(11) NOT NULL,
  PRIMARY KEY (`reviewId`),
  KEY `courseId` (`courseId`),
  KEY `userId` (`userId`),
  CONSTRAINT `courseReview_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `course` (`courseId`),
  CONSTRAINT `courseReview_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courseReview`
--

LOCK TABLES `courseReview` WRITE;
/*!40000 ALTER TABLE `courseReview` DISABLE KEYS */;
/*!40000 ALTER TABLE `courseReview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dining`
--

DROP TABLE IF EXISTS `dining`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dining` (
  `diningId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `location` varchar(75) NOT NULL,
  `avgStarRating` float NOT NULL DEFAULT '1',
  `avgFoodQualtiyRating` float NOT NULL DEFAULT '1',
  `avgHealthRating` float NOT NULL DEFAULT '1',
  PRIMARY KEY (`diningId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dining`
--

LOCK TABLES `dining` WRITE;
/*!40000 ALTER TABLE `dining` DISABLE KEYS */;
/*!40000 ALTER TABLE `dining` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diningReview`
--

DROP TABLE IF EXISTS `diningReview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diningReview` (
  `reviewId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `diningId` int(10) unsigned NOT NULL,
  `userId` bigint(20) unsigned NOT NULL,
  `starRating` tinyint(3) unsigned NOT NULL,
  `foodQualityRating` tinyint(3) unsigned NOT NULL,
  `healthRating` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`reviewId`),
  KEY `diningId` (`diningId`),
  KEY `userId` (`userId`),
  CONSTRAINT `diningReview_ibfk_1` FOREIGN KEY (`diningId`) REFERENCES `dining` (`diningId`),
  CONSTRAINT `diningReview_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diningReview`
--

LOCK TABLES `diningReview` WRITE;
/*!40000 ALTER TABLE `diningReview` DISABLE KEYS */;
/*!40000 ALTER TABLE `diningReview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internReview`
--

DROP TABLE IF EXISTS `internReview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `internReview` (
  `reviewId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `internId` bigint(20) unsigned NOT NULL,
  `userId` bigint(20) unsigned NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `review` varchar(3000) NOT NULL,
  `interviewRating` tinyint(4) NOT NULL DEFAULT '1',
  `difficultyRating` tinyint(4) NOT NULL DEFAULT '1',
  `utilityRating` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`reviewId`),
  KEY `userId` (`userId`),
  KEY `internId` (`internId`),
  CONSTRAINT `internReview_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  CONSTRAINT `internReview_ibfk_2` FOREIGN KEY (`internId`) REFERENCES `internship` (`internId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internReview`
--

LOCK TABLES `internReview` WRITE;
/*!40000 ALTER TABLE `internReview` DISABLE KEYS */;
/*!40000 ALTER TABLE `internReview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `internship`
--

DROP TABLE IF EXISTS `internship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `internship` (
  `internId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `companyName` varchar(30) NOT NULL,
  `avgInterviewRating` int(11) NOT NULL,
  `avgDifficultyRating` int(11) NOT NULL,
  `avgUtilityRating` int(11) NOT NULL,
  PRIMARY KEY (`internId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `internship`
--

LOCK TABLES `internship` WRITE;
/*!40000 ALTER TABLE `internship` DISABLE KEYS */;
/*!40000 ALTER TABLE `internship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resHall`
--

DROP TABLE IF EXISTS `resHall`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resHall` (
  `resId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `location` varchar(75) NOT NULL,
  `avgStarRating` float NOT NULL DEFAULT '1',
  PRIMARY KEY (`resId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resHall`
--

LOCK TABLES `resHall` WRITE;
/*!40000 ALTER TABLE `resHall` DISABLE KEYS */;
/*!40000 ALTER TABLE `resHall` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resReview`
--

DROP TABLE IF EXISTS `resReview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resReview` (
  `reviewId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `resId` int(10) unsigned NOT NULL,
  `userId` bigint(20) unsigned NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `review` varchar(3000) NOT NULL,
  `starRating` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`reviewId`),
  KEY `resId` (`resId`),
  KEY `userId` (`userId`),
  CONSTRAINT `resReview_ibfk_1` FOREIGN KEY (`resId`) REFERENCES `resHall` (`resId`),
  CONSTRAINT `resReview_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resReview`
--

LOCK TABLES `resReview` WRITE;
/*!40000 ALTER TABLE `resReview` DISABLE KEYS */;
/*!40000 ALTER TABLE `resReview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` char(32) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-26 19:28:04
