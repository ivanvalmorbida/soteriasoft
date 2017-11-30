
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_imovel_terreno`
--

CREATE TABLE `tb_imovel_terreno` (
  `imovel` int(11) NOT NULL,
  `cep` varchar(8) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `cidade` int(11) DEFAULT NULL,
  `bairro` int(11) DEFAULT NULL,
  `endereco` int(11) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  `area_terreno` double DEFAULT NULL,
  `frente` double DEFAULT NULL,
  `fundo` double DEFAULT NULL,
  `lateral1` double DEFAULT NULL,
  `lateral2` double DEFAULT NULL,
  `gabarito` int(11) DEFAULT NULL,
  `esquina` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
