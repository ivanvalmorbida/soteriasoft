
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_pessoa_juridica`
--

CREATE TABLE `tb_pessoa_juridica` (
  `Pessoa` int(11) NOT NULL,
  `razaosocial` varchar(60) DEFAULT NULL,
  `cnpj` varchar(14) DEFAULT NULL,
  `incricaoestadual` varchar(20) DEFAULT NULL,
  `atividade` int(11) DEFAULT NULL,
  `homepage` varchar(255) DEFAULT NULL,
  `representante` varchar(45) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;