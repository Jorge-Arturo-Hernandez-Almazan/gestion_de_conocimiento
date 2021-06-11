-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: localhost    Database: kms
-- ------------------------------------------------------
-- Server version	8.0.21-0ubuntu0.20.04.4

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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema`
--

LOCK TABLES `adonis_schema` WRITE;
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;
INSERT INTO `adonis_schema` VALUES (26,'0594744915739_configuracion_cuestionario_schema',1,'2020-08-13 15:35:17'),(27,'1582124180844_rol_schema',1,'2020-08-13 15:35:17'),(28,'1582124454393_user',1,'2020-08-13 15:35:17'),(29,'1582126721648_tema_schema',1,'2020-08-13 15:35:17'),(30,'1582131304353_banco_pregunta_schema',1,'2020-08-13 15:35:17'),(31,'1582134757862_relacion_profesor_schema',1,'2020-08-13 15:35:17'),(32,'1582135796078_relacion_primaria_schema',1,'2020-08-13 15:35:18'),(33,'1582135820693_cuestionario_schema',1,'2020-08-13 15:35:18'),(34,'1582135840986_historial_alumno_schema',1,'2020-08-13 15:35:19'),(35,'1582135863912_testeo_schema',1,'2020-08-13 15:35:19'),(36,'1583935956042_relacion_nodo_alumno_schema',1,'2020-08-13 15:35:19'),(37,'1593025261330_opciones_schema',1,'2020-08-13 15:35:19'),(38,'1597086921291_margen_error_schema',1,'2020-08-13 15:35:20');
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
  `pregunta` text NOT NULL,
  `tipo` varchar(200) NOT NULL,
  `id_tema` int unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `banco_preguntas_id_tema_foreign` (`id_tema`),
  CONSTRAINT `banco_preguntas_id_tema_foreign` FOREIGN KEY (`id_tema`) REFERENCES `temas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banco_preguntas`
--

LOCK TABLES `banco_preguntas` WRITE;
/*!40000 ALTER TABLE `banco_preguntas` DISABLE KEYS */;
INSERT INTO `banco_preguntas` VALUES (4,'Como estas?','1',15,NULL,NULL),(5,'cuanto es 5+5','2',15,NULL,NULL),(6,'El circulo tiene lados ?','3',15,NULL,NULL),(7,'Tipos de triangulos','4',15,NULL,NULL);
/*!40000 ALTER TABLE `banco_preguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `configuracion_cuestionarios`
--

DROP TABLE IF EXISTS `configuracion_cuestionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuracion_cuestionarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `ponde_estricta` tinyint(1) DEFAULT NULL,
  `num_preguntas` int unsigned DEFAULT NULL,
  `num_preguntas_abiertas` int unsigned DEFAULT NULL,
  `num_preguntas_boleanas` int unsigned DEFAULT NULL,
  `num_preguntas_multiples` int unsigned DEFAULT NULL,
  `num_preguntas_calculadas` int unsigned DEFAULT NULL,
  `num_preguntas_numericas` int unsigned DEFAULT NULL,
  `rango_por_defecto` float(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracion_cuestionarios`
--

LOCK TABLES `configuracion_cuestionarios` WRITE;
/*!40000 ALTER TABLE `configuracion_cuestionarios` DISABLE KEYS */;
INSERT INTO `configuracion_cuestionarios` VALUES (2,NULL,NULL,NULL,1,1,0,0,0,0,0.00);
/*!40000 ALTER TABLE `configuracion_cuestionarios` ENABLE KEYS */;
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
  `id_configuracion` int unsigned DEFAULT NULL,
  `porcentaje` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cuestionarios_id_alumno_foreign` (`id_alumno`),
  KEY `cuestionarios_id_configuracion_foreign` (`id_configuracion`),
  CONSTRAINT `cuestionarios_id_alumno_foreign` FOREIGN KEY (`id_alumno`) REFERENCES `users` (`id`),
  CONSTRAINT `cuestionarios_id_configuracion_foreign` FOREIGN KEY (`id_configuracion`) REFERENCES `configuracion_cuestionarios` (`id`)
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
-- Table structure for table `margen_errors`
--

DROP TABLE IF EXISTS `margen_errors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `margen_errors` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `id_pregunta` int unsigned DEFAULT NULL,
  `aplicableArriba` tinyint(1) DEFAULT NULL,
  `aplicableAnbajo` tinyint(1) DEFAULT NULL,
  `rango` float(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `margen_errors_id_pregunta_foreign` (`id_pregunta`),
  CONSTRAINT `margen_errors_id_pregunta_foreign` FOREIGN KEY (`id_pregunta`) REFERENCES `banco_preguntas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `margen_errors`
--

LOCK TABLES `margen_errors` WRITE;
/*!40000 ALTER TABLE `margen_errors` DISABLE KEYS */;
INSERT INTO `margen_errors` VALUES (1,NULL,NULL,5,1,1,0.01);
/*!40000 ALTER TABLE `margen_errors` ENABLE KEYS */;
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
  `esrespuesta` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `opciones_id_pregunta_foreign` (`id_pregunta`),
  CONSTRAINT `opciones_id_pregunta_foreign` FOREIGN KEY (`id_pregunta`) REFERENCES `banco_preguntas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opciones`
--

LOCK TABLES `opciones` WRITE;
/*!40000 ALTER TABLE `opciones` DISABLE KEYS */;
INSERT INTO `opciones` VALUES (4,'bien,good,nice',4,1,NULL,NULL),(5,'10',5,1,NULL,NULL),(6,'verdadero',6,1,NULL,NULL),(7,'Escaleno',7,1,NULL,NULL),(8,'Isoseles',7,1,NULL,NULL),(9,'assdasd',7,0,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relacion_primarias`
--

LOCK TABLES `relacion_primarias` WRITE;
/*!40000 ALTER TABLE `relacion_primarias` DISABLE KEYS */;
INSERT INTO `relacion_primarias` VALUES (13,1,14,'primarias',NULL,NULL),(14,14,15,'primarias',NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relacion_profesors`
--

LOCK TABLES `relacion_profesors` WRITE;
/*!40000 ALTER TABLE `relacion_profesors` DISABLE KEYS */;
INSERT INTO `relacion_profesors` VALUES (1,3,7);
/*!40000 ALTER TABLE `relacion_profesors` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temas`
--

LOCK TABLES `temas` WRITE;
/*!40000 ALTER TABLE `temas` DISABLE KEYS */;
INSERT INTO `temas` VALUES (1,'Matematicas',0,100.00,30.00,0,NULL,NULL),(2,'hijo',1,104.33,108.50,0,NULL,'2020-08-13 17:03:42'),(14,'Algebra',1,100.00,130.00,0,NULL,NULL),(15,'Trigonometira',2,100.00,230.00,0,NULL,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Cristian','Echareta','De la Rosa','1530229','$2a$10$MHWxDXCxD0U1PUQngUFV.eYyXbJ9B/1LGHerfM6Y.6H.OceB.vDa.','2',1,NULL,NULL),(2,'Eduardo','Apellido Pat','Apellido mat','1630031','$2a$10$cYIvl3zR2DmI.uAfr2MhJ.MagDkaUFMlEr8zNR37XeTP6YZELPhJq','2',2,NULL,NULL),(3,'Victor','Apellido Pat','Apellido mat','123','$2a$10$8TC9omJv3Qmq/dmRUq0oYeWKoR9Rxibq5w4nOg3MNSHxiNFoz9pB.','2',3,NULL,NULL),(4,'Froylan','wbario','martinez','1530006','$2a$10$xGocFg2GPzAhTG10jrQ7ee4nODrqulL7iVjFkciR.862FD4rOwzQS','2',1,NULL,NULL),(5,'Uriel','Roman','Carrizalez','1630128','$2a$10$1XgkuePyuaSqMqtnt0b5N.O2PK6Gnok01XALqPIJ1DKBP3d8wGs3C',NULL,1,'2020-08-15 23:20:11','2020-08-15 23:20:11'),(6,'Jose Alejandro','Segura','Hernandez','1630166','$2a$10$ymFKGBkd9NGGG7.GSN8jmeObuVEEOQy9E9Gmn1fdtvFTqxW853LVa',NULL,1,'2020-08-16 19:23:56','2020-08-16 19:23:56'),(7,'Juan Diego','Vega','Lumbreras','1530334','$2a$10$eWompCn6djtX/PQjBlcA5OzYj142wdJK7ErcpnN0xh3HY8pWeGKbq','s',4,NULL,NULL),(8,'Leonardo','Amaya ','Escobedo','1730123','$2a$10$Wwx3fMmvpKcA7jAphA8pFOuvUgS7lyaLf.eLgdvZU7KPcBZACUYnC',NULL,1,'2020-08-20 16:45:45','2020-08-20 16:45:45'),(9,'Tomas','Navarro','Angeles','1730036','$2a$10$xy8PYCeaWqlHDG7H4gJCNug5Z8FXe2zzf.Bt/R7vwiztmPhgAtwdu',NULL,1,'2020-08-20 16:46:34','2020-08-20 16:46:34');
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

-- Dump completed on 2020-08-25 16:38:36
