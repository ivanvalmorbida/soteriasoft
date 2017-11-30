
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_imovel_imagem`
--

CREATE TABLE `tb_imovel_imagem` (
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `imovel` int(11) DEFAULT NULL,
  `arquivo` varchar(255) DEFAULT NULL,
  `ordem` int(11) DEFAULT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;