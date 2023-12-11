function salvarAssessment() {
    // Obtenha os valores dos campos do formulário
    var idOportunidade = document.getElementById('idOportunidade').value;
    var dataAnalise = document.getElementById('dataAnalise').value;
    var responsavelTecnico = document.getElementById('responsavelTecnico').value;
    var nomeOportunidade = document.getElementById('nomeOportunidade').value;
    var tipoOportunidade = document.getElementById('tipoOportunidade').value;
    var dxp = document.getElementById('dxp').checked;
    var commerce = document.getElementById('commerce').checked;
    var squid = document.getElementById('squid').checked;
    var divisao = document.getElementById('divisao').value;
    var tier = document.getElementById('tier').value;
    var totalReceitaRecorrente = document.getElementById('totalReceitaRecorrente').value;

    // Detalhamento de Reunião Técnica para Blueprint
    var escopoDoProjeto = document.getElementById('observacoesAssessment1').value;
    var objetivosExpectativa = document.getElementById('observacoesAssessment2').value;
    var estrategiaDeExecucao = document.getElementById('observacoesAssessment3').value;
    var detalhamentoDadosPessoas = document.getElementById('observacoesAssessment4').value;
    var detalhamentoDadosPedidos = document.getElementById('observacoesAssessment5').value;
    var detalhamentoDadosProdutos = document.getElementById('observacoesAssessment6').value;
    var detalhamentoDadosComportamentais = document.getElementById('observacoesAssessment7').value;

    var origemDados = document.getElementById('origemDados').value;
    var tiposDeIntegracoes = document.getElementById('tiposDeIntegracoes').value;
    var possuiTI = document.getElementById('possuiTI').value;

    // Canais ativados
    var canaisAtivados = [];
    var clienteCanais = document.querySelectorAll('#clienteCanais input[type=checkbox]:checked');
    clienteCanais.forEach(function (canal) {
        canaisAtivados.push(canal.value);
    });

    // Integrações
    var integracoes = [];
    var tabelaIntegracoes = document.querySelectorAll('table tbody tr');
    tabelaIntegracoes.forEach(function (row) {
        var integracao = {
            nome: row.children[0].textContent,
            atividade: row.children[1].querySelector('select').value,
            responsavel: row.children[2].querySelector('select').value,
            observacao: row.children[3].querySelector('textarea').value,
        };
        integracoes.push(integracao);
    });

    // Atuação Pré-Vendas
    var analiseTecnica = {
        horas: document.getElementById('quantidadeHoras1').value,
        dataAtividade: document.getElementById('dataAtividade1').value,
    };

    var alinhamentoTecnico = {
        horas: document.getElementById('quantidadeHoras2').value,
        dataAtividade: document.getElementById('dataAtividade2').value,
    };

    var assessment = {
        horas: document.getElementById('quantidadeHoras3').value,
        dataAtividade: document.getElementById('dataAtividade3').value,
    };

    var blueprint = {
        horas: document.getElementById('quantidadeHoras4').value,
        dataAtividade: document.getElementById('dataAtividade4').value,
    };

    var precificacao = {
        horas: document.getElementById('quantidadeHoras5').value,
        dataAtividade: document.getElementById('dataAtividade5').value,
    };

    var proposta = {
        horas: document.getElementById('quantidadeHoras6').value,
        dataAtividade: document.getElementById('dataAtividade6').value,
    };

    // Crie um objeto JSON com os dados
    var dadosAssessment = {
        idOportunidade: idOportunidade,
        dataAnalise: dataAnalise,
        responsavelTecnico: responsavelTecnico,
        nomeOportunidade: nomeOportunidade,
        tipoOportunidade: tipoOportunidade,
        dxp: dxp,
        commerce: commerce,
        squid: squid,
        divisao: divisao,
        tier: tier,
        totalReceitaRecorrente: totalReceitaRecorrente,
        detalhamentoReuniao: {
            escopoProjeto: escopoDoProjeto,
            objetivosExpectativa: objetivosExpectativa,
            estrategiaExecucao: estrategiaDeExecucao,
            detalhamentoDadosPessoas: detalhamentoDadosPessoas,
            detalhamentoDadosPedidos: detalhamentoDadosPedidos,
            detalhamentoDadosProdutos: detalhamentoDadosProdutos,
            detalhamentoDadosComportamentais: detalhamentoDadosComportamentais,
        },
        origemDados: origemDados,
        tiposIntegracoes: tiposDeIntegracoes,
        possuiTI: possuiTI,
        canaisAtivados: canaisAtivados,
        integracoes: integracoes,
        preVendas: {
            analiseTecnica: analiseTecnica,
            alinhamentoTecnico: alinhamentoTecnico,
            assessment: assessment,
            blueprint: blueprint,
            precificacao: precificacao,
            proposta: proposta,
        },
    };

    // Cria um Blob com os dados
    const blob = new Blob([JSON.stringify(dadosAssessment)], { type: 'application/json' });

    // Cria um link para download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `assessment_${nomeOportunidade}.json`; // Use o nome da oportunidade no nome do arquivo

    // Adiciona o link ao corpo do documento e clica nele
    document.body.appendChild(link);
    link.click();

    // Remove o link do corpo do documento
    document.body.removeChild(link);
}
