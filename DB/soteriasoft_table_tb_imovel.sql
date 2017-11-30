
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