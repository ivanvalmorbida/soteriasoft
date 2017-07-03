
-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tempo de Geração: 24/06/2017 às 12:19:44
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
-- Estrutura da tabela `tb_pessoa_fisica`
--

CREATE TABLE IF NOT EXISTS `tb_pessoa_fisica` (
  `Pessoa` int(11) NOT NULL,
  `Nascimento` datetime DEFAULT NULL,
  `CidadeNasc` int(11) DEFAULT NULL,
  `UFNasc` int(11) DEFAULT NULL,
  `Nacionalidade` int(11) DEFAULT NULL,
  `Sexo` char(1) DEFAULT NULL,
  `CPF` varchar(11) DEFAULT NULL,
  `Identidade` varchar(15) DEFAULT NULL,
  `OrgaoIdentidade` varchar(10) DEFAULT NULL,
  `OrgaoIdentidadeUF` int(11) DEFAULT NULL,
  `Estado Civil` int(11) DEFAULT NULL,
  `Conjuge` int(11) DEFAULT NULL,
  `Profissao` int(11) DEFAULT NULL,
  `CTPSNumero` varchar(7) DEFAULT NULL,
  `CTPSSerie` varchar(5) DEFAULT NULL,
  `PIS` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`Pessoa`),
  KEY `Estado Civil` (`Estado Civil`),
  KEY `Profissao` (`Profissao`),
  KEY `Nacionalidade` (`Nacionalidade`),
  KEY `UFNasc` (`UFNasc`),
  KEY `CidadeNasc` (`CidadeNasc`),
  KEY `OrgaoIdentidadeUF` (`OrgaoIdentidadeUF`),
  KEY `Conjuge` (`Conjuge`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
