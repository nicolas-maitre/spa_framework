-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema kaphoot_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema kaphoot_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kaphoot_db` DEFAULT CHARACTER SET utf8 ;
USE `kaphoot_db` ;

-- -----------------------------------------------------
-- Table `kaphoot_db`.`tblQuizzes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kaphoot_db`.`tblQuizzes` ;

CREATE TABLE IF NOT EXISTS `kaphoot_db`.`tblQuizzes` (
  `idQuizzes` VARCHAR(36) NOT NULL,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(255) NULL,
  `datecreation` DATE NULL,
  `status` VARCHAR(20) NULL DEFAULT 'build',
  `active` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`idQuizzes`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kaphoot_db`.`tblQuestions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kaphoot_db`.`tblQuestions` ;

CREATE TABLE IF NOT EXISTS `kaphoot_db`.`tblQuestions` (
  `idQuestions` VARCHAR(36) NOT NULL,
  `dataQuestions` TEXT NULL,
  `fk_Quizzes` VARCHAR(36) NOT NULL,
  `statement` TEXT NULL,
  `type` VARCHAR(20) NULL,
  `order` VARCHAR(45) NULL,
  `active` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`idQuestions`),
  CONSTRAINT `fk_Questions_Quizzes`
    FOREIGN KEY (`fk_Quizzes`)
    REFERENCES `kaphoot_db`.`tblQuizzes` (`idQuizzes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `kaphoot_db`.`tblSubmissions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kaphoot_db`.`tblSubmissions` ;

CREATE TABLE IF NOT EXISTS `kaphoot_db`.`tblSubmissions` (
  `idSubmissions` VARCHAR(36) NOT NULL,
  `datecreation` DATETIME NULL,
  `fk_Quizzes` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`idSubmissions`),
  CONSTRAINT `fk_tblSubmissions_tblQuizzes1`
    FOREIGN KEY (`fk_Quizzes`)
    REFERENCES `kaphoot_db`.`tblQuizzes` (`idQuizzes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `kaphoot_db`.`tblAnswers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `kaphoot_db`.`tblAnswers` ;

CREATE TABLE IF NOT EXISTS `kaphoot_db`.`tblAnswers` (
  `idAnswers` VARCHAR(36) NOT NULL,
  `data` TEXT NULL,
  `fk_Questions` VARCHAR(36) NOT NULL,
  `fk_Submissions` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`idAnswers`),
  CONSTRAINT `fk_Answers_Questions1`
    FOREIGN KEY (`fk_Questions`)
    REFERENCES `kaphoot_db`.`tblQuestions` (`idQuestions`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tblAnswers_tblSubmissions1`
    FOREIGN KEY (`fk_Submissions`)
    REFERENCES `kaphoot_db`.`tblSubmissions` (`idSubmissions`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
