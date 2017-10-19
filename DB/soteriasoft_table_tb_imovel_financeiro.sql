
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_imovel_financeiro`
--

CREATE TABLE `tb_imovel_financeiro` (
  `imovel` int(11) NOT NULL,
  `captador` int(11) DEFAULT NULL,
  `valor` double DEFAULT NULL,
  `financia` bit(1) DEFAULT NULL,
  `entrada` double DEFAULT NULL,
  `permuta` bit(1) DEFAULT NULL,
  `carro` bit(1) DEFAULT NULL,
  `fgts` bit(1) DEFAULT NULL,
  `mcmv` bit(1) DEFAULT NULL,
  `condominio` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
