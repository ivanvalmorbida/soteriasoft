
-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: 24/06/2017 às 12:18:31
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
-- Estrutura da tabela `tb_pessoa`
--

CREATE TABLE IF NOT EXISTS `tb_pessoa` (
  `Codigo` int(11) NOT NULL AUTO_INCREMENT,
  `Tipo` char(1) DEFAULT NULL,
  `Nome` varchar(50) DEFAULT NULL,
  `Endereco` int(11) DEFAULT NULL,
  `Numero` varchar(10) DEFAULT NULL,
  `Complemento` varchar(45) DEFAULT NULL,
  `Bairro` int(11) DEFAULT NULL,
  `CEP` varchar(8) DEFAULT NULL,
  `Cidade` int(11) DEFAULT NULL,
  `UF` int(11) DEFAULT NULL,
  `Obs` varchar(45) DEFAULT NULL,
  `Cadastro` datetime DEFAULT NULL,
  PRIMARY KEY (`Codigo`),
  KEY `Endereco` (`Endereco`),
  KEY `Bairro` (`Bairro`),
  KEY `CEP` (`CEP`),
  KEY `Cidade` (`Cidade`),
  KEY `UF` (`UF`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
