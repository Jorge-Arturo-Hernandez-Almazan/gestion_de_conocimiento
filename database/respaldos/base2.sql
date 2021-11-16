-- MySQL dump 10.13  Distrib 8.0.20, for Linux (x86_64)
--
-- Host: localhost    Database: kms
-- ------------------------------------------------------
-- Server version	8.0.20-0ubuntu0.20.04.1

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
-- Table structure for table `adonis_schema`
--

DROP TABLE IF EXISTS `adonis_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adonis_schema` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema`
--

LOCK TABLES `adonis_schema` WRITE;
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;
INSERT INTO `adonis_schema` VALUES (11,'1582124180844_rol_schema',1,'2020-06-24 19:03:47'),(12,'1582124454393_user',1,'2020-06-24 19:03:47'),(13,'1582126721648_tema_schema',1,'2020-06-24 19:03:47'),(14,'1582131304353_banco_pregunta_schema',1,'2020-06-24 19:03:48'),(15,'1582134757862_relacion_profesor_schema',1,'2020-06-24 19:03:48'),(16,'1582135796078_relacion_primaria_schema',1,'2020-06-24 19:03:48'),(17,'1582135820693_cuestionario_schema',1,'2020-06-24 19:03:49'),(18,'1582135840986_historial_alumno_schema',1,'2020-06-24 19:03:49'),(19,'1582135863912_testeo_schema',1,'2020-06-24 19:03:49'),(20,'1583935956042_relacion_nodo_alumno_schema',1,'2020-06-24 19:03:50'),(21,'1593022156348_respuestas_schema',1,'2020-06-24 19:03:51'),(22,'1593025261330_opciones_schema',1,'2020-06-24 19:03:51');
/*!40000 ALTER TABLE `adonis_schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banco_preguntas`
--

DROP TABLE IF EXISTS `banco_preguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banco_preguntas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `pregunta` varchar(200) NOT NULL,
  `tipo` varchar(200) NOT NULL,
  `id_tema` int unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `banco_preguntas_id_tema_foreign` (`id_tema`),
  CONSTRAINT `banco_preguntas_id_tema_foreign` FOREIGN KEY (`id_tema`) REFERENCES `temas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banco_preguntas`
--

LOCK TABLES `banco_preguntas` WRITE;
/*!40000 ALTER TABLE `banco_preguntas` DISABLE KEYS */;
INSERT INTO `banco_preguntas` VALUES (2,'TIPOS DE ANGULOS QUE EXISTEN','opcion mulitple',1,NULL,NULL),(3,'TIPOS DE FIGURAS GEOMETRICAS','opcion mulitple',2,NULL,NULL),(4,'TIPOS DE LINEAS','opcion mulitple',2,NULL,NULL),(5,'TIPOS DE CONICAS','opcion mulitple',1,NULL,NULL),(6,'Tipos de triangulos','opcion mulitple',1,NULL,NULL),(7,'Tipos de triangulos','opcion mulitple',1,NULL,NULL),(8,'asdfasdf','opcion mulitple',1,NULL,NULL),(9,'pregunta AB123','opcion mulitple',1,NULL,NULL),(10,'Hola como estas?','opcion mulitple',2,NULL,NULL),(11,'Hola','opcion mulitple',1,NULL,NULL);
/*!40000 ALTER TABLE `banco_preguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuestionarios`
--

DROP TABLE IF EXISTS `cuestionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuestionarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `id_alumno` int unsigned DEFAULT NULL,
  `porcentaje` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cuestionarios_id_alumno_foreign` (`id_alumno`),
  CONSTRAINT `cuestionarios_id_alumno_foreign` FOREIGN KEY (`id_alumno`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuestionarios`
--

LOCK TABLES `cuestionarios` WRITE;
/*!40000 ALTER TABLE `cuestionarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuestionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historial_alumnos`
--

DROP TABLE IF EXISTS `historial_alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historial_alumnos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_cuestionario` int unsigned DEFAULT NULL,
  `id_pregunta` int unsigned DEFAULT NULL,
  `arespuesta` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `historial_alumnos_id_cuestionario_foreign` (`id_cuestionario`),
  KEY `historial_alumnos_id_pregunta_foreign` (`id_pregunta`),
  CONSTRAINT `historial_alumnos_id_cuestionario_foreign` FOREIGN KEY (`id_cuestionario`) REFERENCES `cuestionarios` (`id`),
  CONSTRAINT `historial_alumnos_id_pregunta_foreign` FOREIGN KEY (`id_pregunta`) REFERENCES `banco_preguntas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historial_alumnos`
--

LOCK TABLES `historial_alumnos` WRITE;
/*!40000 ALTER TABLE `historial_alumnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `historial_alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opciones`
--

DROP TABLE IF EXISTS `opciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opciones` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `opcion` varchar(300) NOT NULL,
  `id_pregunta` int unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `opciones_id_pregunta_foreign` (`id_pregunta`),
  CONSTRAINT `opciones_id_pregunta_foreign` FOREIGN KEY (`id_pregunta`) REFERENCES `banco_preguntas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opciones`
--

LOCK TABLES `opciones` WRITE;
/*!40000 ALTER TABLE `opciones` DISABLE KEYS */;
INSERT INTO `opciones` VALUES (1,'Isoceles',7,NULL,NULL),(2,'Escaleno',7,NULL,NULL),(3,'Equilatero',7,NULL,NULL),(4,'Oblicuo',7,NULL,NULL),(5,'Recto',7,NULL,NULL),(6,'Cuadrado',7,NULL,NULL),(7,'sadfa',8,NULL,NULL),(8,'asdfasdf',8,NULL,NULL),(9,'asdfasdf',8,NULL,NULL),(10,'asdfasfd',8,NULL,NULL),(11,'opcion 1 (AB123)',9,NULL,NULL),(12,'opcion 2 (AB123)',9,NULL,NULL),(13,'opcion 3 (AB123)',9,NULL,NULL),(14,'Bien',10,NULL,NULL),(15,'Mal',10,NULL,NULL),(16,'Maso',10,NULL,NULL),(17,'4',10,NULL,NULL),(18,'tanque soviético t-34',10,NULL,NULL),(19,'Hola',11,NULL,NULL),(20,'Avion de caza Republic P-47 Thunderbolt',11,NULL,NULL),(21,'ndad y tu',11,NULL,NULL),(22,'que ondiux',11,NULL,NULL);
/*!40000 ALTER TABLE `opciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relacion_nodo_alumnos`
--

DROP TABLE IF EXISTS `relacion_nodo_alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relacion_nodo_alumnos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `id_alumno` int unsigned DEFAULT NULL,
  `id_tema` int unsigned DEFAULT NULL,
  `ponderacion` int unsigned DEFAULT NULL,
  `clasificacion` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `relacion_nodo_alumnos_id_alumno_foreign` (`id_alumno`),
  KEY `relacion_nodo_alumnos_id_tema_foreign` (`id_tema`),
  CONSTRAINT `relacion_nodo_alumnos_id_alumno_foreign` FOREIGN KEY (`id_alumno`) REFERENCES `users` (`id`),
  CONSTRAINT `relacion_nodo_alumnos_id_tema_foreign` FOREIGN KEY (`id_tema`) REFERENCES `temas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relacion_nodo_alumnos`
--

LOCK TABLES `relacion_nodo_alumnos` WRITE;
/*!40000 ALTER TABLE `relacion_nodo_alumnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `relacion_nodo_alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relacion_primarias`
--

DROP TABLE IF EXISTS `relacion_primarias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relacion_primarias` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_padre` int unsigned DEFAULT NULL,
  `id_hijo` int unsigned DEFAULT NULL,
  `tipo` varchar(200) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `relacion_primarias_id_padre_foreign` (`id_padre`),
  KEY `relacion_primarias_id_hijo_foreign` (`id_hijo`),
  CONSTRAINT `relacion_primarias_id_hijo_foreign` FOREIGN KEY (`id_hijo`) REFERENCES `temas` (`id`),
  CONSTRAINT `relacion_primarias_id_padre_foreign` FOREIGN KEY (`id_padre`) REFERENCES `temas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relacion_primarias`
--

LOCK TABLES `relacion_primarias` WRITE;
/*!40000 ALTER TABLE `relacion_primarias` DISABLE KEYS */;
INSERT INTO `relacion_primarias` VALUES (1,1,2,'primarias',NULL,NULL),(2,1,3,'primarias',NULL,NULL),(3,3,4,'primarias',NULL,NULL);
/*!40000 ALTER TABLE `relacion_primarias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relacion_profesors`
--

DROP TABLE IF EXISTS `relacion_profesors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relacion_profesors` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_profesor` int DEFAULT NULL,
  `id_alumno` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relacion_profesors`
--

LOCK TABLES `relacion_profesors` WRITE;
/*!40000 ALTER TABLE `relacion_profesors` DISABLE KEYS */;
/*!40000 ALTER TABLE `relacion_profesors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuestas`
--

DROP TABLE IF EXISTS `respuestas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuestas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `respuesta` varchar(300) NOT NULL,
  `id_pregunta` int unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `respuestas_id_pregunta_foreign` (`id_pregunta`),
  CONSTRAINT `respuestas_id_pregunta_foreign` FOREIGN KEY (`id_pregunta`) REFERENCES `banco_preguntas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuestas`
--

LOCK TABLES `respuestas` WRITE;
/*!40000 ALTER TABLE `respuestas` DISABLE KEYS */;
INSERT INTO `respuestas` VALUES (1,'Isoceles',7,NULL,NULL),(2,'Escaleno',7,NULL,NULL),(3,'Equilatero',7,NULL,NULL),(4,'asdfasdf',8,NULL,NULL),(5,'opcion 1 (AB123)',9,NULL,NULL),(6,'tanque soviético t-34',10,NULL,NULL),(7,'Avion de caza Republic P-47 Thunderbolt',11,NULL,NULL);
/*!40000 ALTER TABLE `respuestas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `tipo_rol` varchar(30) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rols_tipo_rol_unique` (`tipo_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'Administrador',NULL,NULL),(2,'Experto',NULL,NULL),(3,'Maestro',NULL,NULL),(4,'Alumno',NULL,NULL);
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temas`
--

DROP TABLE IF EXISTS `temas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre_tema` varchar(30) NOT NULL,
  `nivel` int unsigned NOT NULL,
  `freex` float(8,2) NOT NULL,
  `freey` float(8,2) NOT NULL,
  `textPosition` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temas`
--

LOCK TABLES `temas` WRITE;
/*!40000 ALTER TABLE `temas` DISABLE KEYS */;
INSERT INTO `temas` VALUES (1,'Matemáticas',0,100.00,30.00,0,NULL,NULL),(2,'Resta ',1,-65.52,265.60,0,NULL,'2020-07-07 16:53:02'),(3,'Multiplicación ',1,255.85,139.65,0,NULL,'2020-07-07 17:04:34'),(4,'ingles',2,195.54,216.67,0,NULL,'2020-07-07 16:52:47');
/*!40000 ALTER TABLE `temas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testeos`
--

DROP TABLE IF EXISTS `testeos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testeos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `variable1` int unsigned DEFAULT NULL,
  `variable2` int unsigned DEFAULT NULL,
  `variable3` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testeos`
--

LOCK TABLES `testeos` WRITE;
/*!40000 ALTER TABLE `testeos` DISABLE KEYS */;
/*!40000 ALTER TABLE `testeos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `apellido_paterno` varchar(50) NOT NULL,
  `apellido_materno` varchar(50) NOT NULL,
  `matricula` varchar(50) NOT NULL,
  `password` varchar(90) NOT NULL,
  `nivel_academico` varchar(60) DEFAULT NULL,
  `id_rol` int unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_matricula_unique` (`matricula`),
  KEY `users_id_rol_foreign` (`id_rol`),
  CONSTRAINT `users_id_rol_foreign` FOREIGN KEY (`id_rol`) REFERENCES `rols` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Diego','Lumbreras','Vega','1530229','$2a$10$adb4J8qq.sJnUPktj9Pd6Ov7Ock4bGffrg1i5v7JQ7GgvCqFw4w9y','2',2,NULL,NULL),(2,'Eduardo','Apellido Pat','Apellido mat','1630031','$2a$10$i8/VzKAz65GfQBGfMMRTUeG0ZkbV07GH0Rq8K.wHp3dYI.7tD/cie','2',2,NULL,NULL),(3,'Victor','Apellido Pat','Apellido mat','123','$2a$10$HbHHjPY6DiCtGT6l504XFO5Vc.I1Ryo3OpvWDLaKm5QGzKLRw8wrO','2',2,NULL,NULL),(5,'Juan Diego','Vega','Lumbreras','1530334','$2a$10$CjyYILW5yScLTMx4Y6faSeok42gW1Xvui0whCiVNUm1VH8PO56axy',NULL,1,'2020-07-09 14:42:36','2020-07-09 14:42:36'),(6,'Froylan ','Melquiades','Wbario','1530006','$2a$10$9ubJqTrYTIzLIkFp1kiEeeqLxLvz9ttvHdNgPYG.g4jew7idWrJre',NULL,1,'2020-07-09 14:43:27','2020-07-09 14:43:27');
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

-- Dump completed on 2020-07-09 15:51:24
