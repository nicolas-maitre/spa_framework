-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema kaphoot_db
-- -----------------------------------------------------
USE `kaphoot_db` ;

-- -----------------------------------------------------
-- Table `kaphoot_db`.`tblquizzes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaphoot_db`.`tblquizzes` (
  `idQuizzes` VARCHAR(36) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `datecreation` DATE NULL DEFAULT NULL,
  `status` VARCHAR(20) NULL DEFAULT NULL,
  `active` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`idQuizzes`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `kaphoot_db`.`tblquestions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaphoot_db`.`tblquestions` (
  `idQuestions` VARCHAR(36) NOT NULL,
  `dataQuestions` TEXT NULL DEFAULT NULL,
  `fk_Quizzes` VARCHAR(36) NOT NULL,
  `statement` TEXT NULL DEFAULT NULL,
  `type` VARCHAR(20) NULL DEFAULT NULL,
  `order` INT(11) NULL DEFAULT NULL,
  `fk_Submission` VARCHAR(36) NULL,
  `active` TINYINT(4) NULL DEFAULT '1',
  PRIMARY KEY (`idQuestions`),
  INDEX `fk_Questions_Quizzes_idx` (`fk_Quizzes` ASC),
  CONSTRAINT `fk_Questions_Quizzes`
    FOREIGN KEY (`fk_Quizzes`)
    REFERENCES `kaphoot_db`.`tblquizzes` (`idQuizzes`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `kaphoot_db`.`tblanswers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaphoot_db`.`tblanswers` (
  `idAnswers` VARCHAR(36) NOT NULL,
  `fk_Questions` VARCHAR(36) NOT NULL,
  `dataAnswers` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`idAnswers`),
  INDEX `fk_Answers_Questions1_idx` (`fk_Questions` ASC),
  CONSTRAINT `fk_Answers_Questions1`
    FOREIGN KEY (`fk_Questions`)
    REFERENCES `kaphoot_db`.`tblquestions` (`idQuestions`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;