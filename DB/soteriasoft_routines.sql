
DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_atividades` ()  BEGIN
	DECLARE finished INTEGER DEFAULT 0;
	DECLARE mcodigo int;
	DECLARE msetor varchar(255) DEFAULT "";
	DECLARE msubsetor varchar(255) DEFAULT "";
	DECLARE matividade varchar(255) DEFAULT "";
	
	DEClARE atividade_cursor CURSOR FOR 
		SELECT codigo, setor, subsetor, atividade FROM tb_atividade_economica;

	DECLARE CONTINUE HANDLER 
	FOR NOT FOUND SET finished = 1;
	OPEN atividade_cursor;
    get_atividade: LOOP
		FETCH atividade_cursor INTO mcodigo, msetor, msubsetor, matividade;
        
        IF coalesce(msubsetor,'') <> '' THEN 
			select msubsetor AS '** DEBUG:';
        END IF;    
            
        IF finished = 1 THEN 
			LEAVE get_atividade;
		END IF;
    END LOOP get_atividade;    
END$$

DELIMITER ;
