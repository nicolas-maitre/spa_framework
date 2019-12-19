-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema kaphootdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema kaphootdb
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `kaphootdb`;
CREATE SCHEMA IF NOT EXISTS `kaphootdb` DEFAULT CHARACTER SET utf8 ;
USE `kaphootdb` ;

-- -----------------------------------------------------
-- Table `kaphootdb`.`Quizzes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaphootdb`.`Quizzes` (
  `idQuizzes` VARCHAR(36) NOT NULL,
  `Name` VARCHAR(45) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`idQuizzes`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kaphootdb`.`Questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaphootdb`.`Questions` (
  `idQuestions` VARCHAR(36) NOT NULL,
  `data` TEXT NULL,
  `fk_Quizzes` VARCHAR(36) NOT NULL,
  `statement` TEXT NULL,
  `type` VARCHAR(20) NULL,
  PRIMARY KEY (`idQuestions`),
  INDEX `fk_Questions_Quizzes_idx` (`fk_Quizzes` ASC) ,
  CONSTRAINT `fk_Questions_Quizzes`
    FOREIGN KEY (`fk_Quizzes`)
    REFERENCES `kaphootdb`.`Quizzes` (`idQuizzes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kaphootdb`.`Answers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kaphootdb`.`Answers` (
  `idAnswers` VARCHAR(36) NOT NULL,
  `fk_Questions` VARCHAR(36) NOT NULL,
  `data` TEXT NULL,
  PRIMARY KEY (`idAnswers`),
  INDEX `fk_Answers_Questions1_idx` (`fk_Questions` ASC) ,
  CONSTRAINT `fk_Answers_Questions1`
    FOREIGN KEY (`fk_Questions`)
    REFERENCES `kaphootdb`.`Questions` (`idQuestions`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

