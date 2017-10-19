
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

--
-- Extraindo dados da tabela `tb_pessoa_fone`
--

INSERT INTO `tb_pessoa_fone` (`codigo`, `pessoa`, `fone`, `descricao`) VALUES
(45, 1, '(47)99138-4090', NULL);
