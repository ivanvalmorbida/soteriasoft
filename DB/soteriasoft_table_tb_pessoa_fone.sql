
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_pessoa_fone`
--

CREATE TABLE `tb_pessoa_fone` (
  `codigo` int(11) NOT NULL,
  `pessoa` int(11) NOT NULL,
  `fone` varchar(15) DEFAULT NULL,
  `descricao` varchar(45) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
