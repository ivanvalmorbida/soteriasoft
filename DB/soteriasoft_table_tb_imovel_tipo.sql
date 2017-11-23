
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_imovel_tipo`
--

CREATE TABLE `tb_imovel_tipo` (
  `codigo` int(11) NOT NULL,
  `descricao` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tb_imovel_tipo`
--

INSERT INTO `tb_imovel_tipo` (`codigo`, `descricao`) VALUES
(1, 'Terreno'),
(2, 'Casa padrão'),
(3, 'Apartamento'),
(4, 'Geminado'),
(5, 'Rural');
