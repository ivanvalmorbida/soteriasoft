
-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: 24/06/2017 às 12:17:38
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
-- Estrutura da tabela `tb_lancto_contabil`
--

CREATE TABLE IF NOT EXISTS `tb_lancto_contabil` (
  `Codigo` int(11) NOT NULL AUTO_INCREMENT,
  `Pessoa` int(11) NOT NULL,
  `CentroCusto` int(11) NOT NULL,
  `Credito` int(11) NOT NULL,
  `Debito` int(11) NOT NULL,
  `Valor` double NOT NULL,
  `Data` date NOT NULL,
  `HP` int(11) NOT NULL,
  `Descricao` varchar(50) NOT NULL,
  PRIMARY KEY (`Codigo`),
  KEY `Pessoa` (`Pessoa`),
  KEY `CentroCusto` (`CentroCusto`),
  KEY `Credito` (`Credito`),
  KEY `Debito` (`Debito`),
  KEY `Data` (`Data`),
  KEY `HP` (`HP`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
