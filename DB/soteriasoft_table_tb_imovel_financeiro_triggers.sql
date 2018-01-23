CREATE DEFINER=`root`@`localhost` TRIGGER `soteriasoft`.`tb_imovel_financeiro_AFTER_UPDATE` AFTER UPDATE ON `tb_imovel_financeiro` FOR EACH ROW
BEGIN
	CALL sp_palavra_chave(NEW.imovel);
END