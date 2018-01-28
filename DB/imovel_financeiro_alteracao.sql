ALTER TABLE `soteriasoft`.`tb_imovel_financeiro` 
CHANGE COLUMN `financia` `financia` INT NULL DEFAULT NULL ,
CHANGE COLUMN `permuta` `permuta` INT NULL DEFAULT NULL ,
CHANGE COLUMN `carro` `carro` INT NULL DEFAULT NULL ,
CHANGE COLUMN `fgts` `fgts` INT NULL DEFAULT NULL ,
CHANGE COLUMN `condominio` `condominio` DOUBLE NULL DEFAULT NULL ;
