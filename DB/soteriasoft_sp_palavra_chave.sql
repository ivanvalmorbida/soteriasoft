DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_palavra_chave`(IN parImovel INT)
BEGIN
	delete from tb_imovel_busca where imovel=parImovel;
    
    insert into tb_imovel_busca (imovel, palavra_chave) 
	select i.codigo, concat(
	ifNull(t.descricao, ''), ' ', ifNull(p.nome, ''), ' ', 
	ifNull(i.inscricao_incra, ''), ' ', ifNull(l.cep, ''), ' ', 
	ifNull(u.nome, ''), ' ', ifNull(m.nome, ''), ' ', 
	ifNull(b.nome, ''), ' ', ifNull(e.nome, ''), ' ', 
	ifNull(u.Sigla, ''), if(f.mcmv=1, ' mcmv', ''), 
	if(f.financia=1, ' financiavel', ''), ' ', 
	cast(cast(f.valor as unsigned) as char)
	) as palavra_chave
	from tb_imovel as i 
	left join tb_pessoa p on i.proprietario=p.codigo 
	left join tb_imovel_tipo t on i.tipo=t.codigo 
	left join tb_imovel_terreno l on l.imovel=i.codigo 
	left join tb_imovel_financeiro f on f.imovel=i.codigo
	left join tb_estado u on u.codigo=l.estado
	left join tb_cidade m on m.codigo=l.cidade
	left join tb_bairro b on b.codigo=l.bairro
	left join tb_endereco e on e.codigo=l.endereco
	where i.codigo=parImovel;
END$$
DELIMITER ;
