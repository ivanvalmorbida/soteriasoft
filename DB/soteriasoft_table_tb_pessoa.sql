
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_pessoa`
--

CREATE TABLE `tb_pessoa` (
  `codigo` int(11) NOT NULL,
  `tipo` char(1) DEFAULT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `cep` varchar(8) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `cidade` int(11) DEFAULT NULL,
  `bairro` int(11) DEFAULT NULL,
  `endereco` int(11) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  `obs` varchar(45) DEFAULT NULL,
  `cadastro` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;