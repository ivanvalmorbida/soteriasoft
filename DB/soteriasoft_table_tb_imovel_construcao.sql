
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_imovel_construcao`
--

CREATE TABLE `tb_imovel_construcao` (
  `imovel` int(11) NOT NULL,
  `entrega` date DEFAULT NULL,
  `ano_construcao` int(11) DEFAULT NULL,
  `area_total` double DEFAULT NULL,
  `area_privativa` double DEFAULT NULL,
  `quartos` int(11) DEFAULT NULL,
  `suites` int(11) DEFAULT NULL,
  `garagens` int(11) DEFAULT NULL,
  `mobiliada` bit(1) DEFAULT NULL,
  `churrasqueira` bit(1) DEFAULT NULL,
  `infra_ar_cond` bit(1) DEFAULT NULL,
  `piso` tinyint(4) DEFAULT NULL,
  `teto` tinyint(4) DEFAULT NULL,
  `reboco` bit(1) DEFAULT NULL,
  `murro` bit(1) DEFAULT NULL,
  `portao` bit(1) DEFAULT NULL,
  `quintal_larg` int(11) DEFAULT NULL,
  `quintal_comp` int(11) DEFAULT NULL,
  `andar` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tb_imovel_construcao`
--

INSERT INTO `tb_imovel_construcao` (`imovel`, `entrega`, `ano_construcao`, `area_total`, `area_privativa`, `quartos`, `suites`, `garagens`, `mobiliada`, `churrasqueira`, `infra_ar_cond`, `piso`, `teto`, `reboco`, `murro`, `portao`, `quintal_larg`, `quintal_comp`, `andar`) VALUES
(1000, '2017-11-09', 0, 0, 0, 0, 0, 0, b'0', NULL, b'0', 0, 0, b'0', b'0', b'0', 0, 0, 0);
