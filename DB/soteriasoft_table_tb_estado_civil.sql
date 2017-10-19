
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_estado_civil`
--

CREATE TABLE `tb_estado_civil` (
  `Codigo` int(11) NOT NULL,
  `Descricao` varchar(25) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tb_estado_civil`
--

INSERT INTO `tb_estado_civil` (`Codigo`, `Descricao`) VALUES
(1, 'Solteiro'),
(4, 'Casado'),
(5, 'Viúvo'),
(6, 'Separado judicialmente'),
(7, 'Divorciado'),
(8, 'União Estavel');
