
-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)

DROP DATABASE IF EXISTS `democloud`;
CREATE DATABASE `democloud`;
USE `democloud`;

--
-- Table structure for table `key_details`
--

DROP TABLE IF EXISTS `key_details`;

CREATE TABLE `key_details` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key fo the key_details table',
  `key_id` varchar(80) COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Unique Identifier user for key',
  `key_arn` varchar(128) COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'AWS ARN for Key',
  `encryption_algorithm` varchar(60) COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Encryption Algorithm',
  `status` varchar(45) COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Indicates Assigned or Not',
  `key_alias` varchar(255) COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'key Alias',
  `key_creation_date` timestamp NULL DEFAULT NULL COMMENT 'Timestamp the key Created',
  `key_type` varchar(60) COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Key Type',
  `description` varchar(255) COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'description',
  `key_spec` varchar(60) COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Key Specification',
  `key_usage` varchar(60) COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Key Usage',
  `key_state` varchar(45) COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Key is Enabled or not',
  `attached_policy` varchar(255) COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Key is Enabled or not',
  `created_by` varchar(255) COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Username of the demo cloud user who created this key',
  `created_time` int(11) NOT NULL,
  `updated_time` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key_id` (`key_id`),
  UNIQUE KEY `id_UNIQUE` (`key_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Entity to store Key details';


--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;

CREATE TABLE `organization` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `organization_id` int(10) unsigned NOT NULL,
  `organization_name` varchar(255) NOT NULL,
  `created_time` int(11) NOT NULL,
  `updated_time` int(11) NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;


--
-- Table structure for table `patient_info`
--

DROP TABLE IF EXISTS `patient_info`;

CREATE TABLE `patient_info` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Primary key fo the patient_info table',
  `patient_id` varchar(80) COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Patient information',
  `shared_user_id` varchar(80) COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Kit user id',
  `created_time` int(11) NOT NULL COMMENT 'Created timestamp in epoch',
  `updated_time` int(11) NOT NULL COMMENT 'Updated timestamp in epoch',
  `created_by` varchar(255) COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Username of the demo cloud user who created',
  `updated_by` varchar(255) COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'Username of the demo cloud user who updated',
  PRIMARY KEY (`id`),
  UNIQUE KEY `patient_id` (`patient_id`),
  UNIQUE KEY `shared_user_id` (`shared_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Entity to store Patient details';


--
-- Table structure for table `telemetry_data`
--

DROP TABLE IF EXISTS `telemetry_data`;

CREATE TABLE `telemetry_data` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `telemetry_encrypted_key` longtext NOT NULL,
  `telemetry_encrypted_data` longtext NOT NULL,
  `telemetry_decrypted_data` longtext,
  `payload_creation` bigint(20) NOT NULL,
  `mac_address` varchar(45) NOT NULL,
  `last_reading` bigint(20) NOT NULL,
  `kit_user_id` varchar(45) NOT NULL,
  `kit_id` varchar(45) NOT NULL,
  `kafka_topic` varchar(45) NOT NULL,
  `hash` text NOT NULL,
  `gateway_id` varchar(45) NOT NULL,
  `cert_date` varchar(45) NOT NULL,
  `device_type` varchar(45) NOT NULL,
  `make` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `updated_time` int(11) NOT NULL,
  `created_time` int(11) NOT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `updated_by` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;




-- Table structure for table `encryption_key_association`
--

DROP TABLE IF EXISTS `encryption_key_association`;

CREATE TABLE `encryption_key_association` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `key_id` int(10) unsigned NOT NULL,
  `patient_id` int(10) unsigned DEFAULT NULL,
  `organization_id` int(10) unsigned DEFAULT NULL,
  `effective_date` int(11) NOT NULL,
  `created_time` int(11) NOT NULL,
  `updated_time` int(11) NOT NULL,
  `created_by` varchar(255) NOT NULL,
  `updated_by` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_encryption_key_1_idx` (`key_id`),
  KEY `fk_encryption_key_2_idx` (`patient_id`),
  KEY `fk_encryption_key_3_idx` (`organization_id`),
  CONSTRAINT `fk_encryption_key_1` FOREIGN KEY (`key_id`) REFERENCES `key_details` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_encryption_key_2` FOREIGN KEY (`patient_id`) REFERENCES `patient_info` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_encryption_key_3` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;


INSERT INTO `organization` (`id`, `organization_id`, `organization_name`, `created_time`, `updated_time`, `created_by`, `updated_by`) VALUES (1, 1, 'KORE', 1621919283, 1621919283, 'admin', 'admin');


ALTER TABLE `telemetry_data`
ADD COLUMN decrypted_data longtext NULL AFTER telemetry_decrypted_data;

ALTER TABLE `telemetry_data`
ADD CONSTRAINT telemetry_data_record_unique UNIQUE (payload_creation,
last_reading,kafka_topic,kit_user_id,mac_address);

--sprint-11

ALTER TABLE telemetry_data ADD iv LONGTEXT NOT NULL;
--sprint 19
ALTER TABLE `telemetry_data`
ADD COLUMN reason_code varchar(45) NULL AFTER telemetry_decrypted_data;

--sprint 20
ALTER TABLE `telemetry_data`
ADD COLUMN serial_number VARCHAR(55) NULL;

commit;
