
-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_atividade_economica_setor`
--

CREATE TABLE `tb_atividade_economica_setor` (
  `codigo` int(11) NOT NULL,
  `setor` varchar(15) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_atividade_economica_setor`
--

INSERT INTO `tb_atividade_economica_setor` (`codigo`, `setor`) VALUES
(517, 'Comércio'),
(518, 'Finanças'),
(519, 'Indústria'),
(520, 'Informática'),
(521, 'Infraestrutura'),
(522, 'Serviços'),
(523, 'Setor Primário'),
(524, 'Setor Público');
