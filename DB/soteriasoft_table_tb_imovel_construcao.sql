
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_imovel_construcao`
--

CREATE TABLE `tb_imovel_construcao` (
  `imovel` int(11) NOT NULL,
  `area_total` double DEFAULT NULL,
  `area_privativa` double DEFAULT NULL,
  `quadra_bloco` varchar(10) DEFAULT NULL,
  `lote_unidade` int(11) DEFAULT NULL,
  `andar` int(11) DEFAULT NULL,
  `quartos` int(11) DEFAULT NULL,
  `entrega` date DEFAULT NULL,
  `suites` int(11) DEFAULT NULL,
  `garagens` int(11) DEFAULT NULL,
  `ano_construcao` int(11) DEFAULT NULL,
  `infra_ar_cond` bit(1) DEFAULT NULL,
  `mobiliada` bit(1) DEFAULT NULL,
  `piso` tinyint(4) DEFAULT NULL,
  `teto` tinyint(4) DEFAULT NULL,
  `churrasqueira` bit(1) DEFAULT NULL,
  `reboco` bit(1) DEFAULT NULL,
  `murro` bit(1) DEFAULT NULL,
  `portao` bit(1) DEFAULT NULL,
  `quintal_larg` int(11) DEFAULT NULL,
  `quintal_comp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
