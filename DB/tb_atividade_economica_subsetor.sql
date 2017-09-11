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
-- Estrutura da tabela `tb_atividade_economica_subsetor`
--

CREATE TABLE `tb_atividade_economica_subsetor` (
  `codigo` int(11) NOT NULL,
  `setor` int(11) DEFAULT NULL,
  `subsetor` varchar(41) DEFAULT NULL,
  `descricao` varchar(259) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `tb_atividade_economica_subsetor`
--

INSERT INTO `tb_atividade_economica_subsetor` (`codigo`, `setor`, `subsetor`, `descricao`) VALUES
(517, 523, 'Agricultura', 'Produção de safra agrícola'),
(518, 523, 'Pecuária', 'Criação de animais para consumo humano: bovinos, suínos, eqüinos, aves, etc'),
(519, 523, 'Serviços', 'Serviços relacionados com a agropecuária'),
(520, 523, 'Florestamento', 'Florestas para produção de madeira, outros produtos e serviços relacionados'),
(521, 523, 'Pesca e Caça', 'Pesca, caça e procriação de peixes e animais de caça'),
(522, 523, 'Lavra de metais', 'Mineração de todo tipo de metais e serviços relacionados'),
(523, 523, 'Lavra de carvão', 'Lavra de carvão e antracito, serviços relacionados'),
(524, 523, 'Lavra de petróleo e gás', 'Extração de óleo bruto, gas natural e serviços relacionados'),
(525, 523, 'Lavra de minérios não metálicos', 'Extração de pedras, brita, areia, cascalho, argila, cerâmica, rochas usadas na indústria química e de fertilizantes'),
(526, 519, 'Construção de prédios', 'Construção de edificações residenciais, comerciais e industriais'),
(527, 519, 'Construção pesada', 'Construção de estradas, ruas, canais, túneis, pontes e outras construções de grande porte'),
(528, 519, 'Construção especializada', 'Construção - empreiteiras especializadas; p.ex. pintura, concretagem, vidros, instalações elétricas, pisos, etc.'),
(529, 519, 'Produtos alimentícios', 'Alimentos: carnes, laticínios, enlatados, farinhas, pães, doces, óleos, bebidas, etc.'),
(530, 519, 'Produtos de fumo', 'Produtos de fumo: processamento de tabaco, cigarros e charutos'),
(531, 519, 'Produtos téxteis', 'Produtos têxteis: todos os tipos de tecidos'),
(532, 519, 'Vestuário', 'Vestuário e outros produtos têxteis acabados, inclusive de matérias primas não téxteis'),
(533, 519, 'Produtos de madeira', 'Produtos de madeira, exceto móveis: serrarias, chapas, casas prefabricadas'),
(534, 519, 'Móveis e Prateleiras', 'Móveis residenciais e comerciais, prateleiras, venezianas e persianas de madeira'),
(535, 519, 'Produtos de Papel', 'Papéis e produtos relacionados, p.ex. papelão, caixas, sacos, higiênico, envelopes, etc.'),
(536, 519, 'Gráficas e Imprensa', 'Impressões (offset, litografia, etc) e publicações (jornais, revistas, impressos, etc)'),
(537, 519, 'Produtos Químicos', 'Produtos químicos e correlatos: inorgánicos, plásticos, farmaceútico, limpeza, sabões, tintas, vernizes, fertilizantes'),
(538, 519, 'Derivados de Petróleo/Carvão/Álcool', 'Refinação de petróleo, asfaltos, óleos e graxas; usinas de produção de álcool carburante'),
(539, 519, 'Produtos de Borracha e Plástico', 'Produtos de borracha e plásticos: pneus, câmaras, calçados, mangueiras, perfis, tubos, garrafas, etc'),
(540, 519, 'Produtos de Couro', 'Couros: curtimento, solas, chinelos, calçados, luvas, malas, bolsas'),
(541, 519, 'Produtos de Pedra, Argila, Vidro', 'Produtos de pedra (cal, gesso), argila (telhas, tijolos, azulejos e pisos), vidro (plano, reciclado, garrafas) e concreto'),
(542, 519, 'Siderurgia Primária', 'Indústrias siderúrgicas primárias: altos-fornos, laminarias, fundições'),
(543, 519, 'Produtos de Metal', 'Produtos fabricados de metal, exceto maquinário e equipamento de transporte'),
(544, 519, 'Maquinário Industrial', 'Maquinário industrial: motores, turbinas, equipamento agrícola, p/construção, guinchos'),
(545, 519, 'Equipamentos Elétricos', 'Equipamento elétrico: transformadores, eletrodomésticos, iluminação, aúdio, vídeo, componentes, pilhas'),
(546, 519, 'Transportes', 'Equipamentos de transporte: automóveis, aviões, navios, trens, bicicletas, mísseis, trailers, tanques'),
(547, 519, 'Instrumentos de Medição', 'Instrumentos de medição, controle e análise; equipamentos fotográficos, médicos e óticos; relógios'),
(548, 519, 'Outras Indústrias', 'Indústrias manufatureiras diversas: vassouras, letreiros, caixões e outros'),
(549, 521, 'Transporte por Ferrovia', 'Transporte Ferroviário de Passageiros e serviços relacionados'),
(550, 521, 'Transportes Automotores', 'Transporte de passageiros por veículos automotores (taxi, ônibus, rodoviárias), local e intermunicipal'),
(551, 521, 'Transporte de Cargas e Armazéns', 'Transportes de carga e armazenagem por veículos automotores'),
(552, 521, 'Serviço Postal e Couriers', 'Serviços postais públicos e privados, inclusive couriers locais e internacionais'),
(553, 521, 'Transporte marítimo e fluvial', 'Transporte marítimo e fluvial'),
(554, 521, 'Transporte Aéreo', 'Transporte aéreo'),
(555, 521, 'Oleodutos', 'Oleodutos, exceto de gás natural'),
(556, 521, 'Serviços de transporte', 'Serviços de transporte: agências de viagem, excursões'),
(557, 521, 'Serviços de comunicação', 'Comunicações: telefonia, radio, TV'),
(558, 521, 'Eletricidade, Gás e Saneamento', 'Serviços de eletricidade, gás e tratamento de esgoto'),
(559, 517, 'Atacado de Bens Duráveis', 'Comércio atacadista de bens duráveis: veículos, móveis, madeiras, equipamentos, eletroeletrônicos, etc.'),
(560, 517, 'Atacado de Bens de Consumo', 'Comércio atacadista de bens não duráveis: papel, remedios, alimentos, vestiário, matéria prima, combustível, etc.'),
(561, 517, 'Varejo de material de construção', 'Comércio varejista de materiais de construção, ferragens e artigos para jardim'),
(562, 517, 'Varejo em geral', 'Comércio varejista de mercadorias em geral: lojas de departamento, conveniência, etc.'),
(563, 517, 'Varejo de alimentos', 'Comércio varejista de alimentos: supermercados, mercearias, açougues, padarias, etc.'),
(564, 517, 'Varejo de automóv. e combustív.', 'Revendedores de automóveis e postos de gasolina'),
(565, 517, 'Varejo de roupas e acessórios', 'Comércio varejista de roupas e acessórios'),
(566, 517, 'Varejo de móveis e equip. domést', 'Comércio varejista de móveis domésticos, acessórios e equipamentos'),
(567, 517, 'Restaurantes e Bares', 'Comércio de alimentos e bebidas prontas para consumo'),
(568, 517, 'Outros varejistas', 'Varejistas diversos: farmácias, adegas, artigos usados, livrarias, joalherias, combustíveis, etc., vendas sem lojas'),
(569, 518, 'Instituições de Depósito', 'Instituições financeiras com depósitos: bancos, cooperativas'),
(570, 518, 'Instituições de Crédito', 'Instituições de crédito sem depósitos: financeiras, crédito pessoal, hipotecário, etc'),
(571, 518, 'Corretoras e Distribuidoras', 'Corretoras e distribuidoras de títulos e valores mobiliários'),
(572, 518, 'Seguradoras', 'Seguradoras'),
(573, 518, 'Corretores de Seguros', 'Agentes e corretores de seguros e serviços'),
(574, 518, 'Imobiliárias', 'Propriedade imobiliária: administração e corretagem'),
(575, 518, 'Holdings e Investimentos', 'Escritórios de holding e outros investimentos'),
(576, 522, 'Hotéis e afins', 'Hotéis, motéis, pensões, acampamentos'),
(577, 522, 'Serviços Pessoais', 'Serviços pessoais: lavanderia, limpeza, fotografia, salões de beleza, sapataria, funerárias'),
(578, 522, 'Serviços Comerciais', 'Serviços comerciais: propaganda, cobrança, mala direta, em edificações, aluguel de equipamentos, segurança'),
(579, 522, 'Serviços Automotivos', 'Conserto de automóveis, serviços e estacionamentos'),
(580, 522, 'Outras Oficinas', 'Oficinas de conserto diversos'),
(581, 522, 'Filmes Cinematográficos', 'Filmes cinematográficos'),
(582, 522, 'Diversão e Recreação', 'Serviços de diversão e recreação: dança, teatro, boliches, clubes'),
(583, 522, 'Serviços de Saúde', 'Serviços de saúde: consultórios, clínicas, hospitais, laboratórios'),
(584, 522, 'Serviços Jurídicos', 'Serviços jurídicos'),
(585, 522, 'Serviços Educacionais', 'Serviços Educacionais: escolas, universidades, bibliotecas'),
(586, 522, 'Serviços Sociais', 'Serviço social: treinamento, reabilitação, creches'),
(587, 522, 'Museus e Jardins Botânicos e Zoológicos', 'Museus, galerias de arte, jardins botânicos e zoológicos'),
(588, 522, 'Associações', 'Associações de empresas, profissionais, sindicatos, políticas, religiosas, etc.'),
(589, 522, 'Serviços de Engenharia e Gerenciais', 'Serviços de engenharia, contabilidade, pesquisa, administração e Serviços relacionados'),
(590, 522, 'Serviços Domésticos', 'Serviços domésticos privados'),
(591, 522, 'Outros Serviços', 'Outros Serviços'),
(592, 524, 'Poder Executivo e Legislativo', 'Poderes executivos e legislativos em geral, exceto finanças'),
(593, 524, 'Poder Judiciário e Segurança', 'Justiça, ordem pública e segurança'),
(594, 524, 'Tributação', 'Tributação e política monetária'),
(595, 524, 'Admin. de Recursos Humanos', 'Administração de programas de recursos humanos'),
(596, 524, 'Admin. Ambiental e Habitação', 'Administração de programas de qualidade ambiental e de habitação'),
(597, 524, 'Diplomacia Internacional', 'Órgãoes e Instituições relacionados às relações internacionais'),
(598, 524, 'Forças Armadas e Inteligência', 'Forças armadas (exército, marinha, força aérea) e centrais de inteligência'),
(599, 524, 'Fundações', 'Fundações filantrópicas, comunitárias, especiais, etc.'),
(600, 520, 'Indústria', 'Equipamentos de computação e eletrônicos para uso em escritórios'),
(601, 520, 'Comércio', 'Lojas de venda de computadores, software e itens relacionados'),
(602, 520, 'Serviços', 'Serviços de programação de computadores e processamento de dados');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_atividade_economica_subsetor`
--
ALTER TABLE `tb_atividade_economica_subsetor`
  ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_atividade_economica_subsetor`
--
ALTER TABLE `tb_atividade_economica_subsetor`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=603;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
