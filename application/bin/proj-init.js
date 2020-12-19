var db = require('../config/database');

var baseSQL = `-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table \`comments\`
--

DROP TABLE IF EXISTS \`comments\`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE \`comments\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`comment\` longtext NOT NULL,
  \`fk_authorid\` int NOT NULL,
  \`fk_postid\` int NOT NULL,
  \`created\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`id_UNIQUE\` (\`id\`),
  KEY \`comments to posts_idx\` (\`fk_authorid\`),
  KEY \`comments to posts\` (\`fk_postid\`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table \`comments\`
--

LOCK TABLES \`comments\` WRITE;
/*!40000 ALTER TABLE \`comments\` DISABLE KEYS */;
INSERT INTO \`comments\` VALUES (1,'test comment',9,12,'2020-12-18 19:03:09'),(2,'test comment',9,12,'2020-12-18 19:03:09'),(3,'test comment',9,12,'2020-12-18 19:03:09'),(4,'test comment',9,12,'2020-12-18 19:03:09'),(5,'test comment',9,12,'2020-12-18 19:03:09'),(6,'test comment',9,12,'2020-12-18 19:03:09'),(7,'test comment',9,12,'2020-12-18 19:03:09'),(8,'test comment',9,12,'2020-12-18 19:03:09'),(9,'test comment',9,12,'2020-12-18 19:03:09'),(10,'test comment',9,12,'2020-12-18 19:03:09'),(11,'test comment',9,12,'2020-12-18 19:03:09'),(12,'test comment',9,12,'2020-12-18 19:03:09'),(13,'hello',9,12,'2020-12-18 22:46:51'),(14,'I am alive',9,12,'2020-12-18 23:00:05'),(15,'wake me up inside save me',9,12,'2020-12-18 23:00:19'),(16,'how can you see into my',9,12,'2020-12-18 23:04:00'),(17,'eyes like open doors',9,12,'2020-12-18 23:07:25'),(18,'wake me up',9,12,'2020-12-18 23:07:45'),(19,'I hate sand',9,11,'2020-12-18 23:10:31');
/*!40000 ALTER TABLE \`comments\` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table \`posts\`
--

DROP TABLE IF EXISTS \`posts\`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE \`posts\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`title\` varchar(128) NOT NULL,
  \`description\` varchar(4096) NOT NULL,
  \`photopath\` varchar(4096) NOT NULL,
  \`thumbnail\` varchar(4096) NOT NULL,
  \`active\` int NOT NULL DEFAULT '0',
  \`created\` datetime NOT NULL,
  \`fk_userid\` int NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`id_UNIQUE\` (\`id\`),
  KEY \`posts to users_idx\` (\`fk_userid\`),
  CONSTRAINT \`posts to users\` FOREIGN KEY (\`fk_userid\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table \`posts\`
--

LOCK TABLES \`posts\` WRITE;
/*!40000 ALTER TABLE \`posts\` DISABLE KEYS */;
INSERT INTO \`posts\` VALUES (4,'test01','spongebob woke patrick','public\\images\\uploads\\4ef44ed03312084736282f482171eba90d69c16fdffc.jpeg','public/images/uploads/thumbnail-4ef44ed03312084736282f482171eba90d69c16fdffc.jpeg',0,'2020-12-17 14:04:03',8),(5,'test02','spongebob anxiety krabs','public\\images\\uploads\\63e402963633c8eb212a42.png','public/images/uploads/thumbnail-63e402963633c8eb212a42.png',0,'2020-12-17 14:09:15',8),(6,'test01','greek bob spongebob','public\\images\\uploads\\d0ab1e68f5fd00ae5e8019.jpeg','public/images/uploads/thumbnail-d0ab1e68f5fd00ae5e8019.jpeg',0,'2020-12-17 16:51:49',8),(7,'smooth brain','chicken breast','public\\images\\uploads\\05e22e1701ba22da37433f.jpeg','public/images/uploads/thumbnail-05e22e1701ba22da37433f.jpeg',0,'2020-12-17 16:52:08',8),(8,'test01','college ball senator armstrong','public\\images\\uploads\\e38613b0651e3f5db36f2d.jpeg','public/images/uploads/thumbnail-e38613b0651e3f5db36f2d.jpeg',0,'2020-12-17 16:52:20',8),(9,'Perfectly Balanced','balance thanos','public\\images\\uploads\\31f0384ec9061aa1d00f0d.jpeg','public/images/uploads/thumbnail-31f0384ec9061aa1d00f0d.jpeg',0,'2020-12-17 17:10:35',8),(10,'test01','thanos stones destroy','public\\images\\uploads\\fd59da59f3b1b0032bf9d3.jpeg','public/images/uploads/thumbnail-fd59da59f3b1b0032bf9d3.jpeg',0,'2020-12-17 17:12:08',8),(11,'hello there','general kenobi star wars prequel grievous Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. It’s not a story the Jedi would tell you. It’s a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life… He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic. He could save others from death, but not himself.','public\\images\\uploads\\12cfc0d54bbb5340cd019c.jpeg','public/images/uploads/thumbnail-12cfc0d54bbb5340cd019c.jpeg',0,'2020-12-17 21:55:30',8),(12,'this is fine','background fire burning','public\\images\\uploads\\7f00e5a1c7b0b7c7796ec0.jpeg','public/images/uploads/thumbnail-7f00e5a1c7b0b7c7796ec0.jpeg',0,'2020-12-18 16:46:22',9);
/*!40000 ALTER TABLE \`posts\` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table \`users\`
--

DROP TABLE IF EXISTS \`users\`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE \`users\` (
  \`id\` int NOT NULL AUTO_INCREMENT,
  \`username\` varchar(64) NOT NULL,
  \`email\` varchar(128) NOT NULL,
  \`password\` varchar(128) NOT NULL,
  \`usertype\` int NOT NULL DEFAULT '0',
  \`active\` int NOT NULL DEFAULT '0',
  \`created\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  UNIQUE KEY \`id_UNIQUE\` (\`id\`),
  UNIQUE KEY \`username_UNIQUE\` (\`username\`),
  UNIQUE KEY \`email_UNIQUE\` (\`email\`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table \`users\`
--

LOCK TABLES \`users\` WRITE;
/*!40000 ALTER TABLE \`users\` DISABLE KEYS */;
INSERT INTO \`users\` VALUES (7,'test06','test06@mail.com','$2b$13$USdYkeByuWoyC8OAzvy4H.MgSBfiPFH9zRA8yNMmN7mPECFkdTEBC',0,0,'2020-12-16 15:49:56'),(8,'test01','test01@mail.com','$2b$13$gBqlgqiBZYvL2luNYVpVkuenaZ7wzAH6KBLvguJO3DzbHvwQGTeyC',0,0,'2020-12-16 19:23:09'),(9,'goodUsername','mail@test.com','$2b$13$7rBYJHUJcn1xMZIpRTOwqOEkGQj6ZTTJNtOljCNTKYJRhIgc9Uj6.',0,0,'2020-12-18 13:44:16'),(10,'LetMeIn','test@mail2.com','$2b$15$sWa.c6UNg0CLFHS./Vtiku6/ISUNGkXnI6BFNI7RKakCihmys1fAe',0,0,'2020-12-18 14:44:37');
/*!40000 ALTER TABLE \`users\` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-18 23:19:38
`

db.execute(baseSQL);