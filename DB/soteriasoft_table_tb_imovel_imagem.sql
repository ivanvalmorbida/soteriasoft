
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_imovel_imagem`
--

CREATE TABLE `tb_imovel_imagem` (
  `codigo` int(11) NOT NULL,
  `imovel` int(11) DEFAULT NULL,
  `arquivo` varchar(255) DEFAULT NULL,
  `ordem` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tb_imovel_imagem`
--

INSERT INTO `tb_imovel_imagem` (`codigo`, `imovel`, `arquivo`, `ordem`) VALUES
(5, 1000, 'foto_imovel_1511219281943.jpg', 1),
(6, 1000, 'foto_imovel_1511220108314.jpg', 2);
