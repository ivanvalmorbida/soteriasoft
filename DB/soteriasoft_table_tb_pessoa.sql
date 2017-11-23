
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

--
-- Extraindo dados da tabela `tb_pessoa`
--

INSERT INTO `tb_pessoa` (`codigo`, `tipo`, `nome`, `cep`, `estado`, `cidade`, `bairro`, `endereco`, `numero`, `complemento`, `obs`, `cadastro`) VALUES
(1, '1', 'teste1', '89208500', 24, 4187, 14462, 124486, '335', 'x', '', '2017-09-30 22:10:28'),
(2, '2', '', '', NULL, NULL, NULL, NULL, '', '', '', '2017-11-01 20:36:56');
