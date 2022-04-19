-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: localhost    Database: kms
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

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
-- Table structure for table `temas`
--

DROP TABLE IF EXISTS `temas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre_tema` varchar(100) DEFAULT NULL,
  `nivel` int unsigned NOT NULL,
  `freex` float(8,2) NOT NULL,
  `freey` float(8,2) NOT NULL,
  `textPosition` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `dificultad` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temas`
--

LOCK TABLES `temas` WRITE;
/*!40000 ALTER TABLE `temas` DISABLE KEYS */;
INSERT INTO `temas` VALUES (1,'Matematicas',0,500.00,50.00,0,NULL,NULL,0),(2,'Aritmetica',1,-501.73,150.50,0,NULL,'2022-01-03 23:53:32',12),(6,'Suma aritmética de números enteros',3,-1053.92,584.93,0,NULL,'2021-12-03 16:56:49',2),(7,'Conjuntos Numericos ',3,-1541.05,540.07,0,NULL,'2021-11-30 03:25:17',2),(8,'Tablas de  multiplicar',4,-1327.08,716.20,0,NULL,'2021-12-03 16:56:48',3),(9,'Clasificación de los números',4,-1594.79,870.71,0,NULL,'2021-07-05 21:36:23',3),(10,'Matrices',3,721.48,754.41,0,NULL,'2021-11-30 03:25:10',34),(11,'Multiplicación aritmética de números enteros',5,-1396.61,1123.90,0,NULL,'2021-08-06 16:58:44',4),(12,'Conjuntos',2,-1169.10,270.90,0,NULL,'2021-10-22 21:13:17',1),(13,'Álgebra  lineal',1,1021.56,359.31,0,NULL,'2022-01-11 17:11:31',8),(14,'Álgebra',1,-66.37,210.69,0,NULL,'2022-01-03 23:54:07',10),(17,'Trigonometría',1,1400.07,442.03,0,NULL,'2021-10-12 16:47:12',9),(19,'Triángulos rectángulos',2,1145.39,555.19,0,NULL,'2022-01-03 23:13:23',41),(20,'Geometría',1,426.28,283.35,0,NULL,'2022-01-03 23:54:12',10),(23,'Principios de la Geometríaa',2,237.28,457.56,0,NULL,'2022-01-05 17:55:01',23),(24,'Expresiones algebraicas',2,51.58,501.62,0,NULL,'2021-12-16 18:55:09',13),(25,'Números racionales ',5,-1768.70,1108.46,0,NULL,'2021-11-25 14:26:44',4),(26,'Operaciones Aritméticas ',2,-801.41,481.33,0,NULL,'2021-11-16 15:03:46',1),(27,'Común denominador ',6,-1905.83,1366.19,0,NULL,'2021-12-09 16:34:13',5),(28,'Mínimo común múltiplo ',7,-1668.81,1487.05,0,NULL,'2021-08-05 16:41:37',6),(29,'Máximo común divisor ',7,-1894.15,1680.02,0,NULL,'2021-12-09 16:34:11',6),(30,'Suma de números racionales ',8,-1256.22,1748.11,0,NULL,'2021-07-06 14:38:53',7),(31,'Ley de exponentes',9,-1592.61,2087.83,0,NULL,'2021-08-05 16:43:57',10),(32,'Notación científica ',10,-1873.18,2264.77,0,NULL,'2021-11-25 14:26:50',11),(33,'Ley de signos',6,-1540.55,1335.83,0,NULL,'2021-08-05 16:15:59',5),(34,'Exponentes de números enteros elevados a números enteros',6,-1612.81,1850.18,0,NULL,'2021-11-25 14:26:54',5),(35,'Jerarquías de las operaciones aritméticas',3,-800.70,835.51,0,NULL,'2021-12-29 22:27:35',2),(36,'Operaciones  aritméticas  compuestas',4,-700.33,1337.38,0,NULL,'2021-12-06 15:04:24',10),(37,'Resta aritmética de números enteros',3,-1096.29,993.36,0,NULL,'2021-12-13 23:17:57',2),(39,'División  aritmética de números enteros',6,-1176.46,1526.75,0,NULL,'2021-08-06 16:58:53',5),(40,'Funciones  matemáticas',1,1678.42,372.84,0,NULL,'2021-08-05 16:39:36',7),(41,'Conceptos de  funciones  matemáticas',4,1977.63,1001.28,0,NULL,'2021-11-16 02:42:27',52),(42,'Dominio y rango de una función',6,1993.32,1539.61,0,NULL,'2021-11-16 02:42:22',54),(44,'Función  Lineal',8,1610.66,2055.85,0,NULL,'2021-12-09 18:05:01',55),(46,'Función Cuadrática',8,1876.90,2054.83,0,NULL,'2021-12-06 15:05:23',55),(47,'Función Polinomial',8,2072.73,1992.66,0,NULL,'2021-12-06 15:05:24',55),(48,'Función  Exponencial',8,2242.03,1938.78,0,NULL,'2021-12-06 15:05:26',55),(49,'Funciones  Logarítmicas',8,2451.15,1916.85,0,NULL,'2021-12-06 15:05:28',55),(50,'Función  Valor absoluto',8,2662.98,1904.75,0,NULL,'2021-12-06 15:05:30',55),(51,'Cálculo  Diferencial',1,1917.37,288.83,0,NULL,'2021-08-05 16:40:33',6),(52,'Cálculo  Integral',1,2118.42,129.96,0,NULL,'2021-11-30 03:24:30',8),(53,'Tríangulos  oblicuángulos',2,1759.61,709.94,0,NULL,'2021-12-06 15:05:11',41),(54,'Círculo  unitarioo',3,1153.33,942.18,0,NULL,'2021-12-14 15:39:36',42),(55,'Razones  trigonométricas',4,1511.92,732.37,0,NULL,'2021-11-05 16:50:20',43),(57,'Ángulos y sus  razones  trigonométricas',5,1357.37,916.08,0,NULL,'2021-12-13 23:23:10',44),(58,'Identidades  trigonométricas',6,1470.11,1114.28,0,NULL,'2021-12-13 23:23:08',45),(59,'Ecuaciones trigonometricas',7,1479.50,1373.64,0,NULL,'2021-12-13 23:23:15',46),(60,'Ley de los Cosenos',7,1773.14,1047.15,0,NULL,'2021-08-05 16:38:57',46),(61,'Ángulos',3,304.85,699.70,0,NULL,'2021-12-14 01:03:18',24),(62,'Polígonos',4,283.06,962.21,0,NULL,'2022-01-04 15:31:38',25),(63,'Triángulos',5,423.28,1151.79,0,NULL,'2021-11-23 17:36:01',26),(71,'Operaciones  con  matrices',4,672.18,1121.91,0,NULL,'2021-11-14 16:51:37',35),(72,'Transpuesta',5,894.49,1098.97,0,NULL,'2021-12-09 18:15:59',36),(73,'Determinantes',6,793.65,1313.17,0,NULL,'2021-12-09 18:10:39',37),(74,'Regla  de  Cramer',7,856.07,1584.65,0,NULL,'2021-11-14 17:54:03',38),(75,'Método de Gauss Jordan',7,1061.12,1496.16,0,NULL,'2021-11-14 17:54:05',38),(76,'Matriz  Inversa',7,1294.81,1490.44,0,NULL,'2021-11-14 17:54:06',38),(77,'Solución de  sistemas de  ecuaciones  por matrices',8,1154.45,1838.18,0,NULL,'2021-12-09 18:05:18',39),(78,' Ecuaciones algebraicas',3,359.04,1600.33,0,NULL,'2021-12-09 18:18:48',14),(79,'Métodos analíticos para la resolución de sistemas de ecuaciones',4,496.51,1893.94,0,NULL,'2021-12-09 18:18:43',15),(80,'Sistemas  de  ecuaciones ',5,138.64,2418.44,0,NULL,'2021-12-09 18:18:40',21),(81,'Ecuaciones de  primer grado',4,-158.63,2279.56,0,NULL,'2021-12-09 18:18:46',20),(82,'Operaciones básicas del álgebra',3,-205.22,448.23,0,NULL,'2021-12-09 18:18:28',14),(83,'Lenguaje común y lenguaje algebraico',4,-396.74,592.68,0,NULL,'2021-12-13 23:23:48',15),(86,'Suma  y resta de  terminos algebraicos',5,-182.40,701.61,0,NULL,'2021-12-09 18:17:41',16),(88,'Multiplicación de  términos algebraicos',6,4.87,845.72,0,NULL,'2021-12-16 18:52:58',17),(91,'División de  términos  algebraicos',7,-425.90,901.15,0,NULL,'2021-12-09 17:04:36',18),(94,'Fórmula general para ecuaciones de segundo grado',2,-618.08,1036.06,0,NULL,'2021-12-29 22:27:37',1),(95,'División de  números  racionales',9,-948.78,2232.80,0,NULL,'2021-08-06 16:58:35',9),(96,'Radicales',10,-888.26,2634.73,0,NULL,'2021-07-05 21:37:02',10),(97,'Regla detres',10,-364.46,2260.50,0,NULL,'2021-12-14 00:47:17',11),(98,'Porcentajes',11,-322.02,2550.74,0,NULL,'2021-07-05 21:37:06',12),(99,'Multiplicación de  números  racionales',6,-609.41,1890.75,0,NULL,'2021-11-05 16:59:01',8),(100,'Razón y proporciones',7,-584.69,2465.46,0,NULL,'2021-08-06 16:58:23',10),(101,'Resta de  números  racionales',9,-1329.40,2518.45,0,NULL,'2021-08-06 16:58:30',8),(161,'Exponentes de números racionales a numeros enteros',6,-1007.34,1346.88,0,NULL,'2021-12-13 23:23:56',5),(163,'Multiplicación de polinomios',7,116.59,1121.97,0,NULL,'2021-12-09 18:19:07',18),(164,'División de polinomio entre monomio',8,-313.25,1236.86,0,NULL,'2021-12-09 18:19:10',19),(165,'División de polinomio entre polinomio',8,-147.25,1034.49,0,NULL,'2021-12-29 22:27:40',20),(166,'Factorización ',8,-472.11,1510.54,0,NULL,'2021-12-09 18:18:13',19),(167,'Productos notables',8,190.35,1444.69,0,NULL,'2021-12-09 18:20:03',20),(168,'Ecuaciones de segundo grado',9,4.85,1629.73,0,NULL,'2021-12-09 18:20:01',21),(169,'Solución de problemas reales con ecuaciones de segundo grado',10,-154.60,1905.11,0,NULL,'2021-12-09 18:18:55',22),(170,'Solución de problemas reales con sistemas de ecuaciones',6,51.07,2741.42,0,NULL,'2021-12-09 18:18:38',22),(172,'Cuadrilateros',6,491.11,1412.82,0,NULL,'2021-11-23 17:35:58',27),(173,'Postulados y teoremas',7,635.28,1701.95,0,NULL,'2021-11-14 17:54:15',28),(174,'Perímetros áreas y volúmenes',8,738.36,1951.01,0,NULL,'2021-11-14 17:54:12',29),(175,'Congruencia de trángulos',9,533.44,2165.79,0,NULL,'2021-12-09 17:36:18',30),(176,'Relación métrica de la circunferencia',9,914.54,2139.63,0,NULL,'2021-11-14 17:54:14',30),(177,'Semezanjas de triangulos',10,778.20,2337.02,0,NULL,'2021-12-09 17:36:21',31),(178,'Teorema de Thales de Mileto',11,811.06,2616.36,0,NULL,'2021-12-09 17:36:26',32),(179,'Teorema de Pitágoras',11,1095.51,2389.70,0,NULL,'2021-12-09 17:36:28',32),(180,'Teorema de Euclides',11,442.84,2462.82,0,NULL,'2021-12-09 17:36:24',32),(181,'Plano cartesiano',3,561.21,606.59,0,NULL,'2022-01-03 23:46:20',24),(182,'Recta',4,570.48,915.01,0,NULL,'2021-11-11 21:45:37',25),(183,'Circunferencia',5,875.92,908.37,0,NULL,'2021-11-14 16:51:40',26),(184,'Elipse',6,1151.83,945.13,0,NULL,'2021-08-05 16:26:28',27),(185,'Hipérbola',7,1129.05,1215.94,0,NULL,'2021-12-06 15:04:55',28),(186,'Sistema de n ecuaciones lineales con n incógnitas',2,871.94,515.39,0,NULL,'2021-11-05 16:31:40',33),(187,'Solución de problemas reales con álgebra lineal',9,1255.69,2092.21,0,NULL,'2021-12-09 18:14:08',40),(188,'Ley de los Senos',8,1758.18,1354.23,0,NULL,'2021-12-06 15:05:06',47),(189,'Solución de trángulos rectángulos',8,1634.19,1586.07,0,NULL,'2021-12-06 15:05:02',48),(190,'Solución de problemas reales con trigonometría',9,1562.94,1822.76,0,NULL,'2021-12-13 23:22:36',49),(191,'Intervalos',2,1923.50,555.78,0,NULL,'2021-12-06 15:05:15',50),(192,'Desigualdades - inecuaciones',3,2039.58,778.86,0,NULL,'2021-12-06 15:05:13',51),(193,'Formas de expresar funciones matemáticas',5,2003.89,1248.18,0,NULL,'2021-11-16 02:42:24',53),(194,'Funciones Trigonométricas',8,2926.44,1873.27,0,NULL,'2021-12-06 15:05:34',55),(195,'Modelado de funciones',9,2250.91,2439.78,0,NULL,'2021-12-06 15:05:19',56),(196,'Límites y continuidad',2,2124.60,549.60,0,NULL,'2021-11-25 14:26:24',57),(197,'Derivada',3,2363.21,676.67,0,NULL,'2021-11-25 14:26:22',58),(198,'Razón de cambio',4,2269.80,920.93,0,NULL,'2021-11-25 14:26:20',59),(199,'Reglas de derivación',5,2243.54,1179.75,0,NULL,'2021-11-25 14:26:12',60),(200,'Razones de cambio relacionadas',6,2350.54,1417.62,0,NULL,'2021-11-25 14:26:10',61),(201,'Optimizacion',7,2566.02,1594.20,0,NULL,'2021-11-25 14:26:08',62),(202,'Antiderivadas',2,2341.41,396.42,0,NULL,'2021-11-11 17:21:58',63),(203,'Definición de la integral',3,2595.67,583.02,0,NULL,'2021-11-11 17:21:59',64),(204,'Reglas de integración inmediatas',4,2637.25,805.84,0,NULL,'2021-12-09 17:36:42',65),(205,'Métodos de integración',5,2515.82,1073.40,0,NULL,'2021-12-09 17:36:40',66),(206,'Integral definida',6,2808.36,1149.13,0,NULL,'2021-12-09 17:36:48',67),(207,'Áreas bajo la curva',7,2609.94,1369.10,0,NULL,'2021-12-09 17:36:46',68),(208,'Sólido de revolución',8,2819.31,1673.18,0,NULL,'2021-12-09 17:36:50',69),(209,'Volúmen de un sólido en revolución',9,2800.59,1423.82,0,NULL,'2021-12-13 23:26:48',70);
/*!40000 ALTER TABLE `temas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-03 15:36:59