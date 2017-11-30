
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_pessoa_fisica`
--

CREATE TABLE `tb_pessoa_fisica` (
  `pessoa` int(11) NOT NULL,
  `nascimento` datetime DEFAULT NULL,
  `cidadenasc` int(11) DEFAULT NULL,
  `ufnasc` int(11) DEFAULT NULL,
  `nacionalidade` int(11) DEFAULT NULL,
  `sexo` char(1) DEFAULT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `identidade` varchar(15) DEFAULT NULL,
  `orgaoidentidade` varchar(10) DEFAULT NULL,
  `ufidentidade` int(11) DEFAULT NULL,
  `estadocivil` int(11) DEFAULT NULL,
  `conjuge` int(11) DEFAULT NULL,
  `profissao` int(11) DEFAULT NULL,
  `ctps` varchar(15) DEFAULT NULL,
  `pis` varchar(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;