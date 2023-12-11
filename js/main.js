let idPreVendasCounter = 0;
let oportunidadeCount = 0;

function gerarIdPreVendas() {
    idPreVendasCounter++;
    document.getElementById('idPreVendas').value = idPreVendasCounter;
}

function gerarOportunidade() {
    idPreVendasCounter++;
    document.getElementById('idOportunidade').value = idOportunidade;
}

function preencherDataAtual() {
    const dataAtual = new Date();
    const formatoData = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dataFormatada = dataAtual.toLocaleDateString('en-US', formatoData);
    document.getElementById('dataAnalise').value = dataFormatada;
}

function novaAnalise() {
    document.getElementById('btnNovaAnalise').style.display = 'block';
    oportunidadeCount++;
    document.getElementById('idOportunidade').value = pad(oportunidadeCount, 2);
}

document.getElementById('consultarBTN').addEventListener('click', function () {
    // Gere um alerta para escolher um arquivo JSON do seu PC
    const input = document.createElement('input');
    input.type = 'file';

    input.addEventListener('change', function () {
        const file = input.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const jsonContent = e.target.result;
                const jsonData = JSON.parse(jsonContent);

                // Carregue os valores do JSON para o formulário
                carregarConteudo('/templates/consultar', function () {
                    preencherCampos(jsonData);
                });
            };

            reader.readAsText(file);
        }
    });

    input.click();
});

document.getElementById('novaAnaliseBTN').addEventListener('click', function () {
    carregarConteudo('/templates/novaAnalise', function () {
        preencherDataAtual();
        novaAnalise();
        preencherIdPreVendas();
    });
});

document.getElementById('novoAssessmentBTN').addEventListener('click', function () {
    carregarConteudo('/templates/novoAssessment', function () {
        preencherDataAtual();
        novaAnalise();
        preencherIdPreVendas();
    });
});

// Função para preencher os campos do formulário com base nos dados do JSON
function preencherCampos(dados) {
    document.getElementById('idPreVendas').value = dados.idPreVendas;
    document.getElementById('dataAnalise').value = dados.dataAnalise;
    document.getElementById('responsavelTecnico').value = dados.responsavelTecnico;
    document.getElementById('nomeOportunidade').value = dados.nomeOportunidade;
    document.getElementById('tipoOportunidade').value = dados.tipoOportunidade;

    // Exemplo de preenchimento de campos condicionais (checkboxes)
    document.getElementById('dxp').checked = dados.dxp;
    document.getElementById('commerce').checked = dados.commerce;
    document.getElementById('squid').checked = dados.squid;

    // Exemplo de preenchimento condicional de campos baseado em valores específicos
    if (dados.tipoOportunidade === 'Cliente da Base') {
        document.getElementById('clienteDaBase').style.display = 'block';
        // Preencher campos adicionais específicos para Cliente da Base
    }

    document.getElementById('produto').value = dados.produto;
    document.getElementById('proprietarioComercial').value = dados.proprietarioComercial;
    document.getElementById('segmento').value = dados.segmento;
    document.getElementById('plataforma').value = dados.plataforma;

    // Preencher a outra plataforma se aplicável
    if (dados.plataforma === 'Outra') {
        document.getElementById('outraPlataforma').style.display = 'block';
        document.getElementById('outraPlataformaInput').value = dados.outraURL;
    }

    document.getElementById('url').value = dados.url;

    // Preencher outra URL se aplicável
    if (dados.outraURL) {
        document.getElementById('outraURLCheckbox').checked = true;
        document.getElementById('outraURL').style.display = 'block';
        document.getElementById('outraURLInput').value = dados.outraURL;
    }

    // Preencher campos da fase 2 da análise
    document.getElementById('transactionID').value = dados.transactionID;
    document.getElementById('transactionTotal').value = dados.transactionTotal;
    document.getElementById('obsRequisitosMinimos').value = dados.obsRequisitosMinimos;
    document.getElementById('analiseNome').value = dados.analiseNome;
    document.getElementById('analiseEmail').value = dados.analiseEmail;
    document.getElementById('analiseTelefone').value = dados.analiseTelefone;
    document.getElementById('obsOptin').value = dados.obsOptin;
}

function carregarConteudo(formulario, callback) {
    fetch(`${formulario}.html`)
        .then((response) => response.text())
        .then(data => {
            const container = document.getElementById(`conteudo`);
            container.innerHTML = data;

            if (formulario === `consultar`) {
            consultar();
            }

            // Chama a função de callback após o carregamento do conteúdo
            if (typeof callback === 'function') {
                callback();
            }
        })
        .catch(error =>
            console.log(`Erro ao carregar o conteúdo`, error));
}

document.getElementById('novaAnaliseBTN').addEventListener('click', function () {
    carregarConteudo('/templates/novaAnalise', function () {
        preencherDataAtual();
        novaAnalise();
        preencherIdPreVendas();
    });
});

document.getElementById('novoAssessmentBTN').addEventListener('click', function () {
    carregarConteudo('/templates/novoAssessment', function () {
        preencherDataAtual();
        novaAnalise();
        preencherIdPreVendas();
    });
});


document.getElementById(`gerarBlueprintBTN`).addEventListener(`click`, () => carregarConteudo(`templates/gerarBlueprint`));
document.getElementById(`consultarBTN`).addEventListener(`click`, () => carregarConteudo(`templates/consultar`));


function clienteDaBase() {
    const tipoOportunidade = document.getElementById('tipoOportunidade').value;
    const clienteDaBaseDiv = document.getElementById('clienteDaBase');
    clienteDaBaseDiv.style.display = tipoOportunidade === 'Cliente da Base' ? 'block' : 'none';
}

function outraPlataforma() {
    const plataforma = document.getElementById('plataforma').value;
    document.getElementById('outraPlataforma').style.display = plataforma === 'Outra' ? 'block' : 'none';
}

function validarURL() {
    const urlInput = document.getElementById('url');
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    if (!urlRegex.test(urlInput.value)) {
        alert("Digite uma URL válida");
        urlInput.value = "";
    }
}

function outraURL() {
    const checkbox = document.getElementById('outraURLCheckbox');
    const campoURL = document.getElementById('outraURL');

    if (checkbox.checked) {
        campoURL.style.display = 'block';
        campoURL.setAttribute('required', 'required');
    } else {
        campoURL.style.display = 'none';
        campoURL.removeAttribute('required');
        campoURL.value = '';
    }
}

function salvarAnalise() {
    // Lógica para salvar os dados da análise 
    const analiseData = coletarDadosAnalise();
    const idOportunidade = document.getElementById('idOportunidade').value;

    // Cria um Blob com os dados
    const blob = new Blob([JSON.stringify(analiseData)], { type: 'application/json' });

    // Cria um link para download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `analise_${idOportunidade}.json`;

    // Adiciona o link ao corpo do documento e clica nele
    document.body.appendChild(link);
    link.click();

    // Remove o link do corpo do documento
    document.body.removeChild(link);
}

function coletarDadosAnalise() {
    // Coleta os dados do formulário e retorna como objeto
    const campos = document.querySelectorAll('input, select, textarea');
    const analiseData = {};

    campos.forEach(campo => {
        analiseData[campo.id] = campo.value;
    });

    return analiseData;
}

function pad(number, length) {
    return (Array(length).join('0') + number).slice(-length);
}

function getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
}

function exportarPDF() {
    const doc = new jsPDF();

    // Adicione os campos do formulário ao PDF
    const campos = document.querySelectorAll('input, select, textarea');
    let posY = 10;

    campos.forEach(campo => {
        const label = document.querySelector(`label[for=${campo.id}]`);
        if (label) {
            doc.text(`${label.innerText}: ${campo.value}`, 10, posY);
            posY += 10;
        }
    });

    doc.save('analise.pdf');
}

function gerarImagem() {
    // Obtenha as respostas do formulário
    const plataformaSelecionada = document.getElementById('plataforma').value;
    const integrarLojaFisica = document.getElementById('integrarLojaFisica').value;
    const possuiApp = document.getElementById('possuiApp').value;
    const origemDadosLegado = document.getElementById('origemDadosLegado').value;
    const erpUtilizado = document.getElementById('erpUtilizado').value;

    // Obtenha o canvas e o contexto
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Defina o tamanho do canvas
    canvas.width = 400;
    canvas.height = 200;

    // Lógica para gerar imagem com base nas respostas
    let mensagem = '';

    if (plataformaSelecionada === 'Vtex' && integrarLojaFisica === 'Sim' && possuiApp === 'Sim') {
        mensagem = 'Imagem A';
    } else if (plataformaSelecionada === 'Magento' && origemDadosLegado === 'Salesforce' && erpUtilizado === 'SAP S/4HANA') {
        mensagem = 'Imagem B';
    } else {
        mensagem = 'Imagem Padrão';
    }

    // Desenhe a mensagem no canvas
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(mensagem, 10, 50);

    // Exiba o canvas como imagem
    const image = document.getElementById('outputImage');
    image.src = canvas.toDataURL('image/png');

    // Exiba a imagem
    image.style.display = 'block';
}

// Salva a análise em json
function salvarAnalise() {
    // Obtenha o valor do campo nomeOportunidade
    var nomeOportunidade = document.getElementById('nomeOportunidade').value;

    // Obtenha os valores dos outros campos do formulário
    var idPreVendas = document.getElementById('idPreVendas').value;
    var dataAnalise = document.getElementById('dataAnalise').value;
    var responsavelTecnico = document.getElementById('responsavelTecnico').value;
    var tipoOportunidade = document.getElementById('tipoOportunidade').value;
    var dxp = document.getElementById('dxp').checked;
    var commerce = document.getElementById('commerce').checked;
    var squid = document.getElementById('squid').checked;
    var produto = document.getElementById('produto').value;
    var proprietarioComercial = document.getElementById('proprietarioComercial').value;
    var segmento = document.getElementById('segmento').value;
    var plataforma = document.getElementById('plataforma').value;
    var outraPlataforma = document.getElementById('outraPlataforma').value;
    var url = document.getElementById('url').value;
    var outraURL = document.getElementById('outraURLCheckbox').checked ? document.getElementById('outraURLInput').value : null;
    var transactionID = document.getElementById('transactionID').value;
    var transactionTotal = document.getElementById('transactionTotal').value;
    var anexo = document.getElementById('anexo').value;
    var obsRequisitosMinimos = document.getElementById('obsRequisitosMinimos').value;
    var analiseNome = document.getElementById('analiseNome').value;
    var analiseEmail = document.getElementById('analiseEmail').value;
    var analiseTelefone = document.getElementById('analiseTelefone').value;
    var obsOptin = document.getElementById('obsOptin').value;

    // Crie um objeto JSON com os dados
    var dadosAnalise = {
        idPreVendas: idPreVendas,
        dataAnalise: dataAnalise,
        responsavelTecnico: responsavelTecnico,
        nomeOportunidade: nomeOportunidade,
        tipoOportunidade: tipoOportunidade,
        dxp: dxp,
        commerce: commerce,
        squid: squid,
        produto: produto,
        proprietarioComercial: proprietarioComercial,
        segmento: segmento,
        plataforma: plataforma,
        outraPlataforma: outraPlataforma,
        url: url,
        outraURL: outraURL,
        transactionID: transactionID,
        transactionTotal: transactionTotal,
        anexo: anexo,
        obsRequisitosMinimos: obsRequisitosMinimos,
        analiseNome: analiseNome,
        analiseEmail: analiseEmail,
        analiseTelefone: analiseTelefone,
        obsOptin: obsOptin
    };

    // Cria um Blob com os dados
    const blob = new Blob([JSON.stringify(dadosAnalise)], { type: 'application/json' });

    // Cria um link para download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `analise_${nomeOportunidade}.json`; // Use o nome da oportunidade no nome do arquivo

    // Adiciona o link ao corpo do documento e clica nele
    document.body.appendChild(link);
    link.click();

    // Remove o link do corpo do documento
    document.body.removeChild(link);
}

// Salva a assessmento em json
function salvarAssessment() {
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

    // Função auxiliar para obter o valor de um campo
    function getFieldValue(id) {
        return document.getElementById(id).value;
    }

    // Função auxiliar para obter o valor de um checkbox
    function getCheckboxValue(id) {
        return document.getElementById(id).checked;
    }

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
            escopoProjeto: getFieldValue('observacoesAssessment1'),
            objetivosExpectativa: getFieldValue('observacoesAssessment2'),
            estrategiaExecucao: getFieldValue('observacoesAssessment3'),
            detalhamentoDadosPessoas: getFieldValue('observacoesAssessment4'),
            detalhamentoDadosPedidos: getFieldValue('observacoesAssessment5'),
            detalhamentoDadosProdutos: getFieldValue('observacoesAssessment6'),
            detalhamentoDadosComportamentais: getFieldValue('observacoesAssessment7'),
        },
        origemDados: getFieldValue('origemDados'),
        tiposIntegracoes: getFieldValue('tiposDeIntegracoes'),
        possuiTI: getFieldValue('possuiTI'),
        canaisAtivados: getSelectedCheckboxesValues('clienteCanais'),
        integracoes: getIntegracoes(),
        preVendas: getHorasEData(['analiseTecnica', 'alinhamentoTecnico', 'assessment', 'blueprint', 'precificacao', 'proposta']),
    };

    // Cria um Blob com os dados
    const blob = new Blob([JSON.stringify(dadosAssessment)], { type: 'application/json' });

    // Cria um link para download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `assessment_${nomeOportunidade}.json`;

    // Adiciona o link ao corpo do documento e clica nele
    document.body.appendChild(link);
    link.click();

    // Remove o link do corpo do documento
    document.body.removeChild(link);
}

// Função auxiliar para obter os valores dos checkboxes selecionados
function getSelectedCheckboxesValues(containerId) {
    var checkboxes = document.querySelectorAll(`#${containerId} input[type=checkbox]:checked`);
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// Função auxiliar para obter os dados das integrações
function getIntegracoes() {
    var integracoes = [];
    var tabelaIntegracoes = document.querySelectorAll('table tbody tr');
    tabelaIntegracoes.forEach(function (row, index) {
        var integracao = {
            nome: row.children[0].textContent,
            atividade: getFieldValue(`selectBeTag${index + 1}`),
            responsavel: getFieldValue(`selectPessoas${index + 1}`),
            observacao: row.children[3].querySelector('textarea').value,
        };
        integracoes.push(integracao);
    });
    return integracoes;
}

// Função auxiliar para obter as horas e datas das atividades
function getHorasEData(atividades) {
    var horasEData = [];
    atividades.forEach(function (atividade, index) {
        var horas = getFieldValue(`quantidadeHoras${index + 1}`);
        var dataAtividade = getFieldValue(`dataAtividade${index + 1}`);
        horasEData.push({ horas: horas, dataAtividade: dataAtividade });
    });
    return horasEData;
}

