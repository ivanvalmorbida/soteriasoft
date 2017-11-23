
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_imovel`
--

CREATE TABLE `tb_imovel` (
  `codigo` int(11) NOT NULL,
  `tipo` tinytext,
  `proprietario` int(11) DEFAULT NULL,
  `documentacao` int(11) DEFAULT NULL,
  `inscricao_incra` varchar(45) DEFAULT NULL,
  `lote_unidade` int(11) DEFAULT NULL,
  `quadra_bloco` varchar(10) DEFAULT NULL,
  `cadastro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tb_imovel`
--

INSERT INTO `tb_imovel` (`codigo`, `tipo`, `proprietario`, `documentacao`, `inscricao_incra`, `lote_unidade`, `quadra_bloco`, `cadastro`) VALUES
(1000, '3', 1, 1, '123ruioj777', 1, 'q', '2017-11-06 20:37:32');
