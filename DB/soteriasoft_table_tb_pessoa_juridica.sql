
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

--
-- Extraindo dados da tabela `tb_pessoa_juridica`
--

INSERT INTO `tb_pessoa_juridica` (`Pessoa`, `razaosocial`, `cnpj`, `incricaoestadual`, `atividade`, `homepage`, `representante`) VALUES
(1, 'xxxxxxxx', '11111111111111', '1234', 331, '123456', '1'),
(2, '', '', '', NULL, '', NULL);
