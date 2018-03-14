CREATE PROCEDURE `sp_pessoa_fone_add`(in mpessoa int, in mfone VARCHAR(15))
BEGIN
	DECLARE finished INTEGER DEFAULT 0;
	DECLARE mcodigo int;
	
	DEClARE fone_cursor CURSOR FOR 
		SELECT codigo FROM tb_pessoa_fone where pessoa=mpessoa and fone=mfone;

	DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = 1;
	OPEN fone_cursor;
	FETCH fone_cursor INTO mcodigo;
	IF finished = 1 THEN 
		INSERT INTO tb_pessoa_fone (pessoa, fone) VALUES (mpessoa, mfone);
	END IF;
END