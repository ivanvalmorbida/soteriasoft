
--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_atividade_economica`
--
ALTER TABLE `tb_atividade_economica`
  ADD PRIMARY KEY (`codigo`);

--
-- Indexes for table `tb_atividade_economica_setor`
--
ALTER TABLE `tb_atividade_economica_setor`
  ADD PRIMARY KEY (`codigo`);

--
-- Indexes for table `tb_atividade_economica_subsetor`
--
ALTER TABLE `tb_atividade_economica_subsetor`
  ADD PRIMARY KEY (`codigo`);

--
-- Indexes for table `tb_bairro`
--
ALTER TABLE `tb_bairro`
  ADD PRIMARY KEY (`Codigo`),
  ADD KEY `index1` (`Nome`);

--
-- Indexes for table `tb_centro_custo`
--
ALTER TABLE `tb_centro_custo`
  ADD PRIMARY KEY (`Codgo`);

--
-- Indexes for table `tb_cep`
--
ALTER TABLE `tb_cep`
  ADD PRIMARY KEY (`cep`),
  ADD KEY `index1` (`endereco`),
  ADD KEY `index2` (`bairro`),
  ADD KEY `index3` (`cidade`),
  ADD KEY `UF` (`estado`);

--
-- Indexes for table `tb_cidade`
--
ALTER TABLE `tb_cidade`
  ADD PRIMARY KEY (`Codigo`),
  ADD KEY `index1` (`Nome`);

--
-- Indexes for table `tb_endereco`
--
ALTER TABLE `tb_endereco`
  ADD PRIMARY KEY (`Codigo`),
  ADD KEY `index1` (`Nome`);

--
-- Indexes for table `tb_estado`
--
ALTER TABLE `tb_estado`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `index1` (`Sigla`);

--
-- Indexes for table `tb_estado_civil`
--
ALTER TABLE `tb_estado_civil`
  ADD PRIMARY KEY (`Codigo`);

--
-- Indexes for table `tb_historico_contabil`
--
ALTER TABLE `tb_historico_contabil`
  ADD PRIMARY KEY (`Codgo`);

--
-- Indexes for table `tb_imovel_area_comum`
--
ALTER TABLE `tb_imovel_area_comum`
  ADD PRIMARY KEY (`imovel`);

--
-- Indexes for table `tb_imovel_construcao`
--
ALTER TABLE `tb_imovel_construcao`
  ADD PRIMARY KEY (`imovel`);

--
-- Indexes for table `tb_imovel_financeiro`
--
ALTER TABLE `tb_imovel_financeiro`
  ADD PRIMARY KEY (`imovel`);

--
-- Indexes for table `tb_imovel_terreno`
--
ALTER TABLE `tb_imovel_terreno`
  ADD PRIMARY KEY (`codigo`);

--
-- Indexes for table `tb_lancto_contabil`
--
ALTER TABLE `tb_lancto_contabil`
  ADD PRIMARY KEY (`Codigo`),
  ADD KEY `Pessoa` (`Pessoa`),
  ADD KEY `CentroCusto` (`CentroCusto`),
  ADD KEY `Credito` (`Credito`),
  ADD KEY `Debito` (`Debito`),
  ADD KEY `Data` (`Data`),
  ADD KEY `HP` (`HP`);

--
-- Indexes for table `tb_nacionalidade`
--
ALTER TABLE `tb_nacionalidade`
  ADD PRIMARY KEY (`codigo`);

--
-- Indexes for table `tb_pessoa`
--
ALTER TABLE `tb_pessoa`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `Endereco` (`endereco`),
  ADD KEY `Bairro` (`bairro`),
  ADD KEY `CEP` (`cep`),
  ADD KEY `Cidade` (`cidade`),
  ADD KEY `UF` (`estado`);

--
-- Indexes for table `tb_pessoa_email`
--
ALTER TABLE `tb_pessoa_email`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `Pessoa` (`pessoa`),
  ADD KEY `Email` (`email`);

--
-- Indexes for table `tb_pessoa_fisica`
--
ALTER TABLE `tb_pessoa_fisica`
  ADD PRIMARY KEY (`pessoa`),
  ADD KEY `Estado Civil` (`estadocivil`),
  ADD KEY `Profissao` (`profissao`),
  ADD KEY `Nacionalidade` (`nacionalidade`),
  ADD KEY `UFNasc` (`ufnasc`),
  ADD KEY `CidadeNasc` (`cidadenasc`),
  ADD KEY `OrgaoIdentidadeUF` (`ufidentidade`),
  ADD KEY `Conjuge` (`conjuge`);

--
-- Indexes for table `tb_pessoa_fone`
--
ALTER TABLE `tb_pessoa_fone`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `Pessoa` (`pessoa`),
  ADD KEY `Telefone` (`fone`);

--
-- Indexes for table `tb_pessoa_juridica`
--
ALTER TABLE `tb_pessoa_juridica`
  ADD PRIMARY KEY (`Pessoa`);

--
-- Indexes for table `tb_plano_conta`
--
ALTER TABLE `tb_plano_conta`
  ADD PRIMARY KEY (`Codigo`),
  ADD KEY `CodigoPai` (`CodigoPai`),
  ADD KEY `Tipo` (`Tipo`),
  ADD KEY `Rotulo` (`Rotulo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_atividade_economica`
--
ALTER TABLE `tb_atividade_economica`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=517;
--
-- AUTO_INCREMENT for table `tb_atividade_economica_setor`
--
ALTER TABLE `tb_atividade_economica_setor`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=525;
--
-- AUTO_INCREMENT for table `tb_atividade_economica_subsetor`
--
ALTER TABLE `tb_atividade_economica_subsetor`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=603;
--
-- AUTO_INCREMENT for table `tb_bairro`
--
ALTER TABLE `tb_bairro`
  MODIFY `Codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21704;
--
-- AUTO_INCREMENT for table `tb_centro_custo`
--
ALTER TABLE `tb_centro_custo`
  MODIFY `Codgo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tb_cidade`
--
ALTER TABLE `tb_cidade`
  MODIFY `Codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8841;
--
-- AUTO_INCREMENT for table `tb_endereco`
--
ALTER TABLE `tb_endereco`
  MODIFY `Codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=477715;
--
-- AUTO_INCREMENT for table `tb_estado`
--
ALTER TABLE `tb_estado`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `tb_estado_civil`
--
ALTER TABLE `tb_estado_civil`
  MODIFY `Codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `tb_historico_contabil`
--
ALTER TABLE `tb_historico_contabil`
  MODIFY `Codgo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tb_imovel_terreno`
--
ALTER TABLE `tb_imovel_terreno`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tb_lancto_contabil`
--
ALTER TABLE `tb_lancto_contabil`
  MODIFY `Codigo` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tb_nacionalidade`
--
ALTER TABLE `tb_nacionalidade`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=199;
--
-- AUTO_INCREMENT for table `tb_pessoa`
--
ALTER TABLE `tb_pessoa`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `tb_pessoa_email`
--
ALTER TABLE `tb_pessoa_email`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `tb_pessoa_fone`
--
ALTER TABLE `tb_pessoa_fone`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT for table `tb_plano_conta`
--
ALTER TABLE `tb_plano_conta`
  MODIFY `Codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;