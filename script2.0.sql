-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema zenhogarv1
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema zenhogarv1
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `zenhogarv1` DEFAULT CHARACTER SET utf8 ;
USE `zenhogarv1` ;

-- -----------------------------------------------------
-- Table `zenhogarv1`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zenhogarv1`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zenhogarv1`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zenhogarv1`.`usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `avatar` VARCHAR(100) NOT NULL DEFAULT 'default.jpg',
  `rol_id` INT NOT NULL DEFAULT 1,
  `apellido` VARCHAR(45) NULL,
  `celular` VARCHAR(45) NULL,
  `active` TINYINT(1) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `rol_id_idx` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `rol_id`
    FOREIGN KEY (`rol_id`)
    REFERENCES `zenhogarv1`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zenhogarv1`.`categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zenhogarv1`.`categorias` (
  `id` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zenhogarv1`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zenhogarv1`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR(45) NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` TEXT NOT NULL,
  `dimensiones` VARCHAR(45) NOT NULL,
  `peso` INT NULL,
  `precio` DECIMAL(10,2) NOT NULL,
  `stock` INT NOT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_by` INT NOT NULL,
  `categoria_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `sku_UNIQUE` (`sku` ASC) VISIBLE,
  INDEX `created_by_idx` (`created_by` ASC) VISIBLE,
  INDEX `categoria_id_idx` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `created_by`
    FOREIGN KEY (`created_by`)
    REFERENCES `zenhogarv1`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `categoria_id`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `zenhogarv1`.`categorias` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zenhogarv1`.`carritos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zenhogarv1`.`carritos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `usuario_id_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `usuario_id`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `zenhogarv1`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zenhogarv1`.`carritos_detalles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zenhogarv1`.`carritos_detalles` (
  `id` INT NOT NULL,
  `carrito_id` INT NOT NULL,
  `producto_id` INT NOT NULL,
  `cantidad` INT NOT NULL DEFAULT 1,
  INDEX `fk_carrito_has_producto_producto1_idx` (`producto_id` ASC) VISIBLE,
  INDEX `fk_carrito_has_producto_carrito1_idx` (`carrito_id` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_carrito_has_producto_carrito1`
    FOREIGN KEY (`carrito_id`)
    REFERENCES `zenhogarv1`.`carritos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carrito_has_producto_producto1`
    FOREIGN KEY (`producto_id`)
    REFERENCES `zenhogarv1`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zenhogarv1`.`fotos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zenhogarv1`.`fotos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `filename` VARCHAR(45) NOT NULL,
  `path` VARCHAR(255) NOT NULL,
  `producto_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `producto_id_idx` (`producto_id` ASC) VISIBLE,
  UNIQUE INDEX `filename_UNIQUE` (`filename` ASC) VISIBLE,
  CONSTRAINT `producto_id`
    FOREIGN KEY (`producto_id`)
    REFERENCES `zenhogarv1`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `zenhogarv1`.`roles`
-- -----------------------------------------------------
START TRANSACTION;
USE `zenhogarv1`;
INSERT INTO `zenhogarv1`.`roles` (`id`, `nombre`) VALUES (1, 'usuario');
INSERT INTO `zenhogarv1`.`roles` (`id`, `nombre`) VALUES (2, 'vendedor');
INSERT INTO `zenhogarv1`.`roles` (`id`, `nombre`) VALUES (3, 'logistica');
INSERT INTO `zenhogarv1`.`roles` (`id`, `nombre`) VALUES (4, 'administrador');

COMMIT;


-- -----------------------------------------------------
-- Data for table `zenhogarv1`.`usuarios`
-- -----------------------------------------------------
START TRANSACTION;
USE `zenhogarv1`;
INSERT INTO `zenhogarv1`.`usuarios` (`id`, `email`, `password`, `nombre`, `avatar`, `rol_id`, `apellido`, `celular`, `active`) VALUES (1, 'a@admin.com', '123456', 'Admin', DEFAULT, 4, NULL, NULL, NULL);
INSERT INTO `zenhogarv1`.`usuarios` (`id`, `email`, `password`, `nombre`, `avatar`, `rol_id`, `apellido`, `celular`, `active`) VALUES (2, 'v@ventas.com', '123456', 'Ventas', DEFAULT, 2, NULL, NULL, NULL);
INSERT INTO `zenhogarv1`.`usuarios` (`id`, `email`, `password`, `nombre`, `avatar`, `rol_id`, `apellido`, `celular`, `active`) VALUES (3, 'l@logistica.com', '123456', 'Logistica', DEFAULT, 3, NULL, NULL, NULL);
INSERT INTO `zenhogarv1`.`usuarios` (`id`, `email`, `password`, `nombre`, `avatar`, `rol_id`, `apellido`, `celular`, `active`) VALUES (4, 'u@usuario.com', '123456', 'Usuario', DEFAULT, 1, NULL, NULL, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `zenhogarv1`.`categorias`
-- -----------------------------------------------------
START TRANSACTION;
USE `zenhogarv1`;
INSERT INTO `zenhogarv1`.`categorias` (`id`, `nombre`) VALUES (1, 'Categoria prueba 1');
INSERT INTO `zenhogarv1`.`categorias` (`id`, `nombre`) VALUES (2, 'Categoria prueba 2');

COMMIT;


-- -----------------------------------------------------
-- Data for table `zenhogarv1`.`productos`
-- -----------------------------------------------------
START TRANSACTION;
USE `zenhogarv1`;
INSERT INTO `zenhogarv1`.`productos` (`id`, `sku`, `nombre`, `descripcion`, `dimensiones`, `peso`, `precio`, `stock`, `active`, `created_by`, `categoria_id`) VALUES (1, 'zen-01', 'Producto prueba 1', 'The blob datatype allows you to insert data both as strings and buffers. However, when a blob is retrieved from database with Sequelize, it will always be retrieved as a Node Buffer.', '10 x 20 x 30', 25, 2499.99, 100, 1, 1, 1);
INSERT INTO `zenhogarv1`.`productos` (`id`, `sku`, `nombre`, `descripcion`, `dimensiones`, `peso`, `precio`, `stock`, `active`, `created_by`, `categoria_id`) VALUES (2, 'zen-02', 'Producto prueba 2', 'The blob datatype allows you to insert data both as strings and buffers. However, when a blob is retrieved from database with Sequelize, it will always be retrieved as a Node Buffer.', '5 x 15 x 25', 5, 499.99, 50, 1, 1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `zenhogarv1`.`carritos`
-- -----------------------------------------------------
START TRANSACTION;
USE `zenhogarv1`;
INSERT INTO `zenhogarv1`.`carritos` (`id`, `usuario_id`) VALUES (1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `zenhogarv1`.`carritos_detalles`
-- -----------------------------------------------------
START TRANSACTION;
USE `zenhogarv1`;
INSERT INTO `zenhogarv1`.`carritos_detalles` (`id`, `carrito_id`, `producto_id`, `cantidad`) VALUES (1, 1, 1, 5);
INSERT INTO `zenhogarv1`.`carritos_detalles` (`id`, `carrito_id`, `producto_id`, `cantidad`) VALUES (2, 1, 2, 5);

COMMIT;


-- -----------------------------------------------------
-- Data for table `zenhogarv1`.`fotos`
-- -----------------------------------------------------
START TRANSACTION;
USE `zenhogarv1`;
INSERT INTO `zenhogarv1`.`fotos` (`id`, `filename`, `path`, `producto_id`) VALUES (1, 'zen-01', '/img/uploads/products/', 1);
INSERT INTO `zenhogarv1`.`fotos` (`id`, `filename`, `path`, `producto_id`) VALUES (2, 'zen-02', '/img/uploads/products/', 1);
INSERT INTO `zenhogarv1`.`fotos` (`id`, `filename`, `path`, `producto_id`) VALUES (3, 'zen-03', '/img/uploads/products/', 1);
INSERT INTO `zenhogarv1`.`fotos` (`id`, `filename`, `path`, `producto_id`) VALUES (4, 'zen-04', '/img/uploads/products/', 2);
INSERT INTO `zenhogarv1`.`fotos` (`id`, `filename`, `path`, `producto_id`) VALUES (5, 'zen-05', '/img/uploads/products/', 2);
INSERT INTO `zenhogarv1`.`fotos` (`id`, `filename`, `path`, `producto_id`) VALUES (6, 'zen-06', '/img/uploads/products/', 2);

COMMIT;

