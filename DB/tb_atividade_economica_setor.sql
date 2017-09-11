-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 10-Set-2017 às 21:18
-- Versão do servidor: 5.7.19-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `soteriasoft`
--

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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_atividade_economica_setor`
--
ALTER TABLE `tb_atividade_economica_setor`
  ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_atividade_economica_setor`
--
ALTER TABLE `tb_atividade_economica_setor`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=525;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
