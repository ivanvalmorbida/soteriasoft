
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_lancto_contabil`
--

CREATE TABLE `tb_lancto_contabil` (
  `Codigo` int(11) NOT NULL,
  `Pessoa` int(11) NOT NULL,
  `CentroCusto` int(11) NOT NULL,
  `Credito` int(11) NOT NULL,
  `Debito` int(11) NOT NULL,
  `Valor` double NOT NULL,
  `Data` date NOT NULL,
  `HP` int(11) NOT NULL,
  `Descricao` varchar(50) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
