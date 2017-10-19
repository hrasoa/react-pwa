CREATE SCHEMA IF NOT EXISTS `pwa` DEFAULT CHARACTER SET utf8;

CREATE TABLE IF NOT EXISTS `pwa`.`users` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `username` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `pwa`.`posts` (
  `id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `title` VARCHAR(45) NULL,
  `body` LONGTEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id_idx` (`user_id` ASC),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `pwa`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;