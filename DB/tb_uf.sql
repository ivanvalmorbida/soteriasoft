
-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: 21/03/2017 às 13:10:10
-- Versão do Servidor: 10.0.28-MariaDB
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
-- Estrutura da tabela `tb_uf`
--

CREATE TABLE IF NOT EXISTS `tb_uf` (
  `Codigo` int(11) NOT NULL AUTO_INCREMENT,
  `Sigla` char(2) DEFAULT NULL,
  `Nome` varchar(30) NOT NULL,
  PRIMARY KEY (`Codigo`),
  KEY `index1` (`Sigla`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=28 ;

--
-- Extraindo dados da tabela `tb_uf`
--

INSERT INTO `tb_uf` (`Codigo`, `Sigla`, `Nome`) VALUES
(1, 'AC', ''),
(2, 'AL', ''),
(3, 'AM', ''),
(4, 'AP', ''),
(5, 'BA', ''),
(6, 'CE', ''),
(7, 'DF', ''),
(8, 'ES', ''),
(9, 'GO', ''),
(10, 'MA', ''),
(11, 'MG', ''),
(12, 'MS', ''),
(13, 'MT', ''),
(14, 'PA', ''),
(15, 'PB', ''),
(16, 'PE', ''),
(17, 'PI', ''),
(18, 'PR', ''),
(19, 'RJ', ''),
(20, 'RN', ''),
(21, 'RO', ''),
(22, 'RR', ''),
(23, 'RS', ''),
(24, 'SC', ''),
(25, 'SE', ''),
(26, 'SP', ''),
(27, 'TO', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
