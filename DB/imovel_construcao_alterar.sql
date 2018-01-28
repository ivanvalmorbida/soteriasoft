ALTER TABLE `soteriasoft`.`tb_imovel_construcao` 
CHANGE COLUMN `quartos` `quartos` TINYINT(4) NULL DEFAULT NULL ,
CHANGE COLUMN `suites` `suites` TINYINT(4) NULL DEFAULT NULL ,
CHANGE COLUMN `garagens` `garagens` TINYINT(4) NULL DEFAULT NULL ,
CHANGE COLUMN `mobiliada` `mobiliada` TINYINT(4) NULL DEFAULT NULL ,
CHANGE COLUMN `churrasqueira` `churrasqueira` TINYINT(4) NULL DEFAULT NULL ,
CHANGE COLUMN `infra_ar_cond` `infra_ar_cond` TINYINT(4) NULL DEFAULT NULL ,
CHANGE COLUMN `reboco` `reboco` TINYINT(4) NULL DEFAULT NULL ,
CHANGE COLUMN `murro` `murro` TINYINT(4) NULL DEFAULT NULL ,
CHANGE COLUMN `portao` `portao` TINYINT(4) NULL DEFAULT NULL ;
