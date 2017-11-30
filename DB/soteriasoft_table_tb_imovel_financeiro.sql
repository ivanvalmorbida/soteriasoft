
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_imovel_financeiro`
--

CREATE TABLE `tb_imovel_financeiro` (
  `imovel` int(11) NOT NULL,
  `valor` double DEFAULT NULL,
  `mcmv` int(11) DEFAULT NULL,
  `financia` varchar(5) DEFAULT NULL,
  `entrada` double DEFAULT NULL,
  `permuta` varchar(5) DEFAULT NULL,
  `carro` varchar(5) DEFAULT NULL,
  `fgts` varchar(5) DEFAULT NULL,
  `condominio` varchar(45) DEFAULT NULL,
  `captador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;