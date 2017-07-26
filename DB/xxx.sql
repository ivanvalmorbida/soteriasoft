CREATE PROCEDURE `new_procedure` ()
BEGIN
DECLARE mcodigo int;
DECLARE msetor varchar(255) DEFAULT "";
DECLARE msubsetor varchar(255) DEFAULT "";
DECLARE matividade varchar(255) DEFAULT "";
 
-- declare cursor for employee atividade
DEClARE atividade_cursor CURSOR FOR 
 SELECT codigo, setor, subsetor, atividade FROM soteriasoft.tb_atividade_economica;
 
-- declare NOT FOUND handler
DECLARE CONTINUE HANDLER 
FOR NOT FOUND SET finished = 1;
OPEN atividade_cursor;
get_atividade: LOOP
 FETCH atividade_cursor INTO mcodigo, msetor, msubsetor, matividade;
 IF v_finished = 1 THEN 
 LEAVE get_atividade;
 END IF;
 -- build atividade list
 SET slist = CONCAT(msetor,";",slist);
END LOOP get_atividade;
END