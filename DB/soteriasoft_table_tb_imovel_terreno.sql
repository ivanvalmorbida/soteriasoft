
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_imovel_terreno`
--

CREATE TABLE `tb_imovel_terreno` (
  `codigo` int(11) NOT NULL,
  `tipo` tinytext,
  `cep` varchar(8) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL,
  `cidade` int(11) DEFAULT NULL,
  `bairro` int(11) DEFAULT NULL,
  `endereco` int(11) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `complemento` varchar(45) DEFAULT NULL,
  `area` double DEFAULT NULL,
  `frente` double DEFAULT NULL,
  `fundo` double DEFAULT NULL,
  `lateral1` double DEFAULT NULL,
  `lateral2` double DEFAULT NULL,
  `proprietario` int(11) DEFAULT NULL,
  `documentacao` int(11) DEFAULT NULL,
  `gabarito` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
