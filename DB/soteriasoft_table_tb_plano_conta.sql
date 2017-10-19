
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_plano_conta`
--

CREATE TABLE `tb_plano_conta` (
  `Codigo` int(11) NOT NULL,
  `CodigoPai` int(11) DEFAULT NULL,
  `Tipo` varchar(1) NOT NULL,
  `Rotulo` varchar(30) NOT NULL,
  `Descricao` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tb_plano_conta`
--

INSERT INTO `tb_plano_conta` (`Codigo`, `CodigoPai`, `Tipo`, `Rotulo`, `Descricao`) VALUES
(1, NULL, 'T', '', 'Plano de Contas'),
(2, 1, 'T', '1', 'Ativo'),
(3, 2, 'T', '1.1', 'Circulante'),
(4, 3, 'T', '1.1.1', 'Disponivel'),
(5, 4, 'T', '1.1.1.1', 'Bens Numerarios'),
(6, 5, 'A', '1.1.1.1.1', 'Caixa'),
(7, 4, 'T', '1.1.1.2', 'Depósitos Bancarios'),
(8, 7, 'A', '1.1.1.2.1', 'Banco do Brasil'),
(9, 7, 'A', '1.1.1.2.2', 'Caixa Economica Federal');
