
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_pessoa_email`
--

CREATE TABLE `tb_pessoa_email` (
  `codigo` int(11) NOT NULL,
  `pessoa` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `descricao` varchar(45) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tb_pessoa_email`
--

INSERT INTO `tb_pessoa_email` (`codigo`, `pessoa`, `email`, `descricao`) VALUES
(50, 1, 'ivan@ivan.com.br', NULL);
