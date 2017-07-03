
-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: 24/06/2017 às 12:21:20
-- Versão do Servidor: 10.1.24-MariaDB
-- Versão do PHP: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de Dados: `u671429522_oa`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_plano_conta`
--

CREATE TABLE IF NOT EXISTS `tb_plano_conta` (
  `Codigo` int(11) NOT NULL AUTO_INCREMENT,
  `CodigoPai` int(11) DEFAULT NULL,
  `Tipo` varchar(1) NOT NULL,
  `Rotulo` varchar(30) NOT NULL,
  `Descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`Codigo`),
  KEY `CodigoPai` (`CodigoPai`),
  KEY `Tipo` (`Tipo`),
  KEY `Rotulo` (`Rotulo`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Extraindo dados da tabela `tb_plano_conta`
--

INSERT INTO `tb_plano_conta` (`Codigo`, `CodigoPai`, `Tipo`, `Rotulo`, `Descricao`) VALUES
(1, NULL, 'T', '', 'Plano de Contas'),
(2, 1, 'T', '1', 'Ativo'),
(3, 2, 'T', '1.1', 'Circulante'),
(4, 3, 'T', '1.1.1', 'Disponivel'),
(5, 4, 'T', '1.1.1.1', 'Bens Numerarios'),
(6, 5, 'A', '1.1.1.1.1', 'Caixa'),
(7, 4, 'T', '1.1.1.2', 'Depósitos Bancarios'),
(8, 7, 'A', '1.1.1.2.1', 'Banco do Brasil'),
(9, 7, 'A', '1.1.1.2.2', 'Caixa Economica Federal');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
