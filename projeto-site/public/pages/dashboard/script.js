var veiculos;
var todosVeiculos;
var empresa;
var motoristas;

window.onload = initialFunctions();
setInterval(() => {
    sendData();
    pegarVeiculos();
}, 5000);

function initialFunctions() {
    verificaSessao();
    pegarMotoristas();
    pegarVeiculos();
    pegarTodosVeiculos();
    pegarDadosEmpresa();
    sendData();
}
/* FUNÇÕES DO JS PARA A TROCA DE TELAS */
function changeToVehicles() {
    home.style = "display: none";
    vehicles.style = "display: block";
    vehicles.style = "display: flex";
    profile.style = "display: none";
}
function changeToIndex(idVeiculo, modeloVeiculo, placaVeiculo, nomeMotorista, telefoneMotorista) {
    sessionStorage.setItem('idVeiculo', idVeiculo);
    modelo_veiculo.innerHTML = `${modeloVeiculo} (${placaVeiculo})`;
    nome_motorista.innerHTML = nomeMotorista;
    telefone_motorista.innerHTML = telefoneMotorista;
    home.style = "display: block";
    home.style = "display: flex"
    vehicles.style = "display: none";
    profile.style = "display: none";
    data_list.innerHTML = "";
    chamargraficos(idVeiculo);
    chamargraficos2(idVeiculo);
    tempo = 5000;
}
function changeToProfile() {
    home.style = "display: none";
    vehicles.style = "display: none";
    profile.style = "display: block";
    profile.style = "display: flex";
}
/* Funções tela de cadastro */
function showVehiclesRegister() {
    travelRegister.style = "display: none";
    motoristaRegister.style = "display: none";
    vehiclesRegister.style = "display: block";
}

function showMotoristaRegister() {
    travelRegister.style = "display: none";
    vehiclesRegister.style = "display: none";
    motoristaRegister.style = "display: block";
}

function showTravelRegister() {
    vehiclesRegister.style = "display: none";
    motoristaRegister.style = "display: none";
    travelRegister.style = "display: block";
}

function closeMotoristaRegister() {
    motoristaRegister.style = "animation: animate-div-out 0.4s";
    setTimeout(() => {
        motoristaRegister.style = "display: none";
    }, 400);
}

function closeVehiclesRegister() {
    vehiclesRegister.style = "animation: animate-div-out 0.4s";
    setTimeout(() => {
        vehiclesRegister.style = "display: none";
    }, 400);
}

function closeTravelRegister() {
    travelRegister.style = "animation: animate-div-out 0.4s";
    setTimeout(() => {
        travelRegister.style = "display: none";
    }, 400);
}

function iniciarAguardarVeiculo() {
    btn_salvar_veiculo.style = "display: none";
    loading_veiculo.style = "display: block";
}

function finalizarAguardarVeiculo() {
    btn_salvar_veiculo.style = "display: block";
    loading_veiculo.style = "display: none";
}

function iniciarAguardarMotorista() {
    btn_salvar_motorista.style = "display: none";
    loading_motorista.style = "display: block";
}

function finalizarAguardarMotorista() {
    btn_salvar_motorista.style = "display: block";
    loading_motorista.style = "display: none";
}

function iniciarAguardarViagem() {
    btn_salvar_viagem.style = "display: none";
    loading_viagem.style = "display: block";
}

function finalizarAguardarViagem() {
    btn_salvar_viagem.style = "display: block";
    loading_viagem.style = "display: none";
}

function verificaSessao() {
    var cnpjEmpresa = sessionStorage.getItem("cnpj");
    if (cnpjEmpresa == undefined) {
        window.location.href = "/";
    }
}

function realizaLogout() {
    Swal.fire({
        text: "Deseja realizar logout?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.clear();
            window.location.href = "/";
        }
    })
}

function finalizarViagem() {
    let idVeiculo = sessionStorage.getItem('idVeiculo');
    Swal.fire({
        text: "Deseja finalizar esta viagem?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/viagens/deletar/${idVeiculo}`, {
                method: "POST",
            }).then(resposta => {
                if (resposta.ok) {
                    sucessoFinalizarViagem();
                } else {
                    console.log('Erro de aquisição!');
                    resposta.text().then(texto => {
                        console.log(texto);
                    });
                }
            })
        }
    })
}

function sucessoFinalizarViagem() {
    Swal.fire({
        icon: "success",
        title: 'Viagem finalizada com sucesso!',
        confirmButtonText: `Ok`,
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "/pages/dashboard/";
        }
    })

}

function pegarVeiculos() {
    let idEmpresa = sessionStorage.getItem("idEmpresa");
    fetch(`/veiculos/autenticar/${idEmpresa}`, {
        method: "POST",
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                veiculos = json;
                selecaoVeiculos(veiculos);
            });
        } else {
            console.log('Erro de aquisição!');
            resposta.text().then(texto => {
                console.log(texto);
            });
        }
    });
    return false;
}
function selecaoVeiculos(veiculos) {
    let valida = veiculos[0].idVeiculo;
    var veiculosSelecao = [];
    veiculosSelecao.push(veiculos[0]);
    for (let i = 1; i < veiculos.length; i++) {
        if (valida < veiculos[i].idVeiculo) {
            veiculosSelecao.push(veiculos[i]);
            valida = veiculos[i].idVeiculo;
        }
    }
    inserirVeiculosCard(veiculosSelecao);
}
function pegarTodosVeiculos() {
    let idEmpresa = sessionStorage.getItem("idEmpresa");
    fetch(`/veiculos/todos_veiculos/${idEmpresa}`, {
        method: "POST"
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                todosVeiculos = json;
                inserirVeiculosSelect();
            });
        } else {
            console.log('Erro de aquisição!');
            resposta.text().then(texto => {
                console.log(texto);
            });
        }
    });
    return false;
}
function pegarMotoristas() {
    let idEmpresa = sessionStorage.getItem("idEmpresa");
    fetch(`/motoristas/pegar_motoristas/${idEmpresa}`, {
        method: "POST",
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                motoristas = json;
                inserirMotoristasSelect();
            });
        } else {
            console.log('Erro de aquisição!');
            resposta.text().then(texto => {
                console.log(texto);
            });
        }
    });
    return false;
}
function pegarDadosEmpresa() {
    var cnpjEmpresa = sessionStorage.getItem("cnpj");
    fetch(`/empresas/buscar_empresa/${cnpjEmpresa}`, {
        method: "POST",
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                empresa = json;
                inserirDadosEmpresa();
            });
        } else {
            console.log('Erro de aquisição!');
            resposta.text().then(texto => {
                console.log(texto);
            });
        }
    });
    return false;
}
function inserirVeiculosCard(veiculos) {
    container_veiculos.innerHTML = "";
    for (let i = 0; i < veiculos.length; i++) {
        var cor_temperatura;
        var cor_umidade;
        var img_termometro;
        var img_umidade;
        if (veiculos[i].temperatura.toFixed(1) <= 2) {
            cor_temperatura = 'color: #00ACEE';
            img_termometro = 'termometro_blue.png'
        } else if (veiculos[i].temperatura.toFixed(1) >= 2.1 && veiculos[i].temperatura.toFixed(1) <= 3.5) {
            cor_temperatura = 'color: #ffd700';
            img_termometro = 'termometro_yellow.png'
        } else if (veiculos[i].temperatura.toFixed(1) >= 3.6 && veiculos[i].temperatura.toFixed(1) <= 6.4) {
            cor_temperatura = 'color: #27D72D';
            img_termometro = 'termometro_green.png'
        } else if (veiculos[i].temperatura.toFixed(1) >= 6.5 && veiculos[i].temperatura.toFixed(1) <= 7.9) {
            cor_temperatura = 'color: #FF8c00';
            img_termometro = 'termometro_orange.png'
        } else if (veiculos[i].temperatura.toFixed(1) > 7.9) {
            cor_temperatura = 'color:  #FF1616';
            img_termometro = 'termometro_red.png'
        }
        if (veiculos[i].umidade.toFixed(1) <= 40) {
            cor_umidade = 'color: #00ACEE';
            img_umidade = 'umidade_blue.png'
        } else if (veiculos[i].umidade.toFixed(1) >= 40.1 && veiculos[i].umidade.toFixed(1) <= 47.5) {
            cor_umidade = 'color: #ffd700';
            img_umidade = 'umidade_yellow.png'
        } else if (veiculos[i].umidade.toFixed(1) >= 47.6 && veiculos[i].umidade.toFixed(1) <= 62.4) {
            cor_umidade = 'color: #27D72D';
            img_umidade = 'umidade_green.png'
        } else if (veiculos[i].umidade.toFixed(1) >= 62.5 && veiculos[i].umidade.toFixed(1) <= 69.9) {
            cor_umidade = 'color: #FF8c00';
            img_umidade = 'umidade_orange.png';
        } else if (veiculos[i].umidade.toFixed(1) > 69.9) {
            cor_umidade = 'color:  #FF1616';
            img_umidade = 'umidade_red.png'
        }
        container_veiculos.innerHTML += `  
            <a onclick="changeToIndex('${veiculos[i].idVeiculo}', '${veiculos[i].modeloVeiculo}', '${veiculos[i].placaVeiculo}' ,'${veiculos[i].nomeMotorista}', '${veiculos[i].telefoneMotorista}')">
                <div class="chart_div" style="box-shadow: 2px 2px 15px ${cor_temperatura};">
                    <div class="container">
                        <p>
                            ${veiculos[i].modeloVeiculo} -
                            ${veiculos[i].placaVeiculo}
                        </p>
                        <img class="truck_img" src="img/vehicles/volvo-truck.png" alt="">
                        <div class="data-vehicle">
                            <img src="img/icons/tempHumi/${img_termometro}" class="icon" alt="">
                            <label id="temperatura_label" style="width:60px; ${cor_temperatura}; text-align: center; font-size:18px;">
                                ${veiculos[i].temperatura.toFixed(1)} °C
                            <label>
                        </div>
                        <div class="data-vehicle">
                            <img src="img/icons/tempHumi/${img_umidade}" class="icon" alt="">
                            <label style="width:60px; text-align: center; ${cor_umidade} ;font-size:18px">
                             ${veiculos[i].umidade}
                            </label>
                        </div>
                    </div>
                </div>
            </a>`
    }
}
function inserirVeiculosSelect() {
    fkVeiculo.innerHTML = `<option value="">Veículo</option>`;
    for (let i = 0; i < todosVeiculos.length; i++) {
        fkVeiculo.innerHTML += ` <option value="${todosVeiculos[i].idVeiculo}">${todosVeiculos[i].modeloVeiculo} (${todosVeiculos[i].placaVeiculo})</option>`
    }
}
function inserirMotoristasSelect() {
    fkMotorista.innerHTML = `<option value="">Motorista</option>`;
    for (let i = 0; i < motoristas.length; i++) {
        fkMotorista.innerHTML += ` <option value="${motoristas[i].cpfMotorista}">${motoristas[i].nomeMotorista}</option>`
    }
}
function inserirDadosEmpresa() {
    nomeEmpresa.value = empresa[0].nomeEmpresa;
    cnpj.value = empresa[0].cnpj;
    logradouro.value = empresa[0].logradouro;
    numLogradouro.value = empresa[0].numLogradouro;
    bairro.value = empresa[0].bairro;
    cidade.value = empresa[0].cidade;
    cep.value = Number(empresa[0].cep);
    telefone.value = empresa[0].telefone1;
    fkEmpresa.value = empresa[0].nomeEmpresa;
    hello_empresa.innerHTML = `Olá, ${empresa[0].nomeEmpresa}`
}
function cadastrarVeiculo() {
    iniciarAguardarVeiculo();
    var formulario = new URLSearchParams(new FormData(cadastro_veiculo));
    fetch(`/veiculos/cadastrar/${empresa[0].idEmpresa}`, {
        method: "POST",
        body: formulario
    }).then(function (response) {
        if (response.ok) {
            finalizarAguardarVeiculo();
            initialFunctions();
            buscarIdVeiculo();
            limparCamposVeiculo();
        } else {
            finalizarAguardarVeiculo();
            falhaMsg("veiculo");
            limparCamposVeiculo();
            response.text().then(function (resposta) {
                //alert(resposta);
            });
        }
    });
    return false;
}
function cadastrarMotorista() {
    iniciarAguardarMotorista();
    var formulario = new URLSearchParams(new FormData(cadastro_motorista));
    fetch(`/motoristas/cadastrar/${empresa[0].idEmpresa}`, {
        method: "POST",
        body: formulario
    }).then(function (response) {
        if (response.ok) {
            finalizarAguardarMotorista();
            sucessoMsg("Motorista");
            initialFunctions();
            limparCamposMotorista();
        } else {
            finalizarAguardarMotorista();
            falhaMsg("motorista");
            limparCamposMotorista();
        }
    });
    return false;
}
function cadastrarViagem() {
    iniciarAguardarViagem();
    var formulario = new URLSearchParams(new FormData(form_viagem));
    console.log(formulario)
    fetch(`/viagens/cadastrar/`, {
        method: "POST",
        body: formulario
    }).then(function (response) {
        if (response.ok) {
            finalizarAguardarViagem();
            sucessoMsgViagem();
            initialFunctions();
        } else {
            finalizarAguardarViagem();
            falhaMsg("viagem");
        }
    });
    return false;
}
function atualizarEmpresa() {
    var formulario = new URLSearchParams(new FormData(form_empresa));
    fetch(`/empresas/atualizar/${empresa[0].idEmpresa}`, {
        method: "POST",
        body: formulario
    }).then(function (response) {
        if (response.ok) {
            salvarCNPJ();
            sucessoMsgUpdate();
            initialFunctions();
        } else {
            falhaMsgUpdate();
        }
    });
    return false;
}
function salvarCNPJ() {
    sessionStorage.setItem('cnpj', cnpj.value);
    pegarDadosEmpresa();
}
function limparCamposVeiculo() {
    modeloVeiculo.value = "";
    placaVeiculo.value = "";
    tamanhoBau.value = "";
}
function limparCamposMotorista() {
    nomeMotorista.value = "";
    telefoneMotorista.value = "";
    cpfMotorista.value = "";
    fkEmpresa.value = "";
    fkVeiculo.value = "";
}
function buscarIdVeiculo() {
    fetch(`/veiculos/recuperar_id/${placaVeiculo.value}`, {
        method: "POST",
    }).then(resposta => {
        if (resposta.ok) {
            resposta.json().then(json => {
                let idVeiculo = json;
                insercaoSensor(idVeiculo[0].idVeiculo);
            });
        } else {
            console.log('Erro de aquisição!');
            resposta.text().then(texto => {
                console.log(texto);
            });
        }
    });
}
function insercaoSensor(idVeiculo) {
    Swal.fire({
        title: 'Ei!',
        text: 'Vamos atribuir um sensor a este veiculo',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off',
            placeholder: 'ID do sensor'
        },
        showCancelButton: false,
        confirmButtonText: 'Atribuir',
        confirmButtonColor: ' #07BEB8',
        showLoaderOnConfirm: true,
        preConfirm: (idSensor) => {
            fetch(`/sensores/atribuir/${idVeiculo}/${idSensor}`, {
                method: "POST",
            }).then(resposta => {
                if (resposta.ok) {
                    ok();
                } else {
                    console.log('Erro de aquisição!');
                    resposta.text().then(texto => {
                        console.log(texto);
                    });
                }
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
    })
}
function ok() {
    Swal.fire(
        'Ok',
        'Atribuído com sucesso!',
        'success'
    );
}
function sucessoMsg(param) {
    Swal.fire(
        'Ok',
        param + ' cadastrado com sucesso!',
        'success'
    );
}

function sucessoMsgViagem() {
    Swal.fire(
        'Ok',
        'Viagem inserida com sucesso!',
        'success'
    );
}

function sucessoMsgUpdate() {
    Swal.fire(
        'Ok',
        'Informações atualizadas com sucesso!',
        'success'
    );
}

function falhaMsg(param) {
    Swal.fire(
        'Ops...',
        'Erro ao cadastrar ' + param,
        'error'
    );
}

function falhaMsgUpdate() {
    Swal.fire(
        'Ops...',
        'Erro ao atualizar informações',
        'error'
    );
}
// CONFIGURAÇÕES GRÁFICOS
function configurarGrafico() {
    var configuracoes = {
        responsive: true,
        animation: { duration: 500 },
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
        },
        scales: {
            yAxes: [{
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-temperatura',
            }]
        }
    };
    return configuracoes;
}
function configurarGrafico2() {
    var configuracoes2 = {
        responsive: true,
        animation: { duration: 500 },
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
        },
        scales: {
            yAxes: [{
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-umidade',
            }]
        }
    };
    return configuracoes2;
}
function chamargraficos(idcaminhao) {
    obterDadosGraficoPrimeiraVez(idcaminhao)
}
function chamargraficos2(idcaminhao) {
    obterDadosGraficoPrimeiraVez2(idcaminhao)
}
var proximaAtualizacao;
var proximaAtualizacao2;
function obterDadosGraficoPrimeiraVez(idcaminhao) {
    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }
    fetch(`/leituras/ultimas/${idcaminhao}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                //console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                var dados = {
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'y-temperatura',
                            label: 'Temperatura',
                            borderColor: window.chartColors.red,
                            backgroundColor: window.chartColors.red,
                            fill: false,
                            data: []
                        }
                    ]
                };
                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    dados.labels.push(registro.momento_grafico);
                    dados.datasets[0].data.push(registro.temperatura);
                }
                plotarGrafico(dados, idcaminhao);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function obterDadosGraficoPrimeiraVez2(idcaminhao) {
    if (proximaAtualizacao2 != undefined) {
        clearTimeout(proximaAtualizacao2);
    }
    fetch(`/leituras/ultimas/${idcaminhao}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                //console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                var dados2 = {
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'y-umidade',
                            label: 'Umidade',
                            borderColor: window.chartColors.blue,
                            backgroundColor: window.chartColors.blue,
                            fill: false,
                            data: []
                        }
                    ]
                };
                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    dados2.labels.push(registro.momento_grafico);
                    dados2.datasets[0].data.push(registro.umidade);
                }
                plotarGrafico2(dados2, idcaminhao);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function atualizarGrafico(idcaminhao, dados) {
    fetch(`/leituras/tempo-real/${idcaminhao}`, { cache: 'no-store' }).then(function (response) {
        //console.log("Estou tentando pegar idcaminhao = ", idcaminhao)
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                //console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                //console.log(`Dados atuais do gráfico: ${dados}`);
                // tirando e colocando valores no gráfico
                dados.labels.shift(); // apagar o primeiro
                dados.labels.push(novoRegistro.momento_grafico); // incluir um novo momento
                dados.datasets[0].data.shift();  // apagar o primeiro de temperatura
                dados.datasets[0].data.push(novoRegistro.temperatura); // incluir uma nova leitura de temperatura
                //console.log("meu caminhão é o " + idcaminhao)
                atualizarEstatisticas(idcaminhao);
                window.graficoLinha.update();
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idcaminhao, dados), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idcaminhao, dados), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function atualizarGrafico2(idcaminhao, dados) {
    fetch(`/leituras/tempo-real/${idcaminhao}`, { cache: 'no-store' }).then(function (response) {
        //console.log("Estou tentando pegar idcaminhao = ", idcaminhao)
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                //console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                //console.log(`Dados atuais do gráfico: ${dados}`);
                // tirando e colocando valores no gráfico
                dados.labels.shift(); // apagar o primeiro
                dados.labels.push(novoRegistro.momento_grafico); // incluir um novo momento
                dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                dados.datasets[0].data.push(novoRegistro.umidade); // incluir uma nova leitura de umidade
                //console.log("meu caminhão é o " + idcaminhao)
                atualizarEstatisticas(idcaminhao);
                atualizarTabela(novoRegistro);
                window.graficoLinha2.update();
                proximaAtualizacao2 = setTimeout(() => atualizarGrafico2(idcaminhao, dados), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao2 = setTimeout(() => atualizarGrafico2(idcaminhao, dados), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function atualizarEstatisticas(idcaminhao) {
    //console.log('pegando estatisticas...');
    fetch(`/leituras/estatisticas/${idcaminhao}`, { cache: 'no-store' }).then(function (response) {
        //console.log("Estou tentando pegar idcaminhao = ", idcaminhao)
        if (response.ok) {
            response.json().then(function (estatisticas) {
                inserirEstatisticas(estatisticas);
            });
        }

    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
function atualizarTabela(dados1) {

    let cor_temperatura;
    let cor_umidade;

    if (dados1.temperatura.toFixed(1) <= 2) {
        cor_temperatura = '#00ACEE';
    } else if (dados1.temperatura.toFixed(1) >= 2.1 && dados1.temperatura.toFixed(1) <= 3.5) {
        cor_temperatura = '#ffd700';
    } else if (dados1.temperatura.toFixed(1) >= 3.6 && dados1.temperatura.toFixed(1) <= 6.4) {
        cor_temperatura = '#27D72D';
    } else if (dados1.temperatura.toFixed(1) >= 6.5 && dados1.temperatura.toFixed(1) <= 7.9) {
        cor_temperatura = '#FF8c00';
    } else if (dados1.temperatura.toFixed(1) > 7.9) {
        cor_temperatura = '#FF1616';
    }
    if (dados1.umidade.toFixed(1) <= 40) {
        cor_umidade = '#00ACEE';
    } else if (dados1.umidade.toFixed(1) >= 40.1 && dados1.umidade.toFixed(1) <= 47.5) {
        cor_umidade = '#ffd700';
    } else if (dados1.umidade.toFixed(1) >= 47.6 && dados1.umidade.toFixed(1) <= 62.4) {
        cor_umidade = '#27D72D';
    } else if (dados1.umidade.toFixed(1) >= 62.5 && dados1.umidade.toFixed(1) <= 69.9) {
        cor_umidade = '#FF8c00';
    } else if (dados1.umidade.toFixed(1) > 69.9) {
        cor_umidade = '#FF1616';
    }

    data_list.innerHTML += `<div class="item">
                                    <p style="color: ${cor_temperatura}">${dados1.temperatura.toFixed(1)} °C</p>
                                    <p style="color: ${cor_umidade}">${dados1.umidade} %</p>
                                    <p>${dados1.logDados}</p>
                                </div>`
}
function inserirEstatisticas(estatisticas) {
    if (estatisticas.temperatura.toFixed(1) <= 2) {
        atualTemp.style = 'color: #00ACEE';
        icon_temp_chart.src = 'img/icons/tempHumi/termometro_blue.png'
    } else if (estatisticas.temperatura.toFixed(1) >= 2.1 && estatisticas.temperatura.toFixed(1) <= 3.5) {
        atualTemp.style = 'color: #ffd700';
        icon_temp_chart.src = 'img/icons/tempHumi/termometro_yellow.png'
    } else if (estatisticas.temperatura.toFixed(1) >= 3.6 && estatisticas.temperatura.toFixed(1) <= 6.4) {
        atualTemp.style = 'color: #27D72D';
        icon_temp_chart.src = 'img/icons/tempHumi/termometro_green.png'
    } else if (estatisticas.temperatura.toFixed(1) >= 6.5 && estatisticas.temperatura.toFixed(1) <= 7.9) {
        atualTemp.style = 'color: #FF8c00';
        icon_temp_chart.src = 'img/icons/tempHumi/termometro_orange.png'
    } else if (estatisticas.temperatura.toFixed(1) > 7.9) {
        atualTemp.style = 'color:  #FF1616';
        icon_temp_chart.src = 'img/icons/tempHumi/termometro_red.png'
    }
    if (estatisticas.umidade.toFixed(1) <= 40) {
        atualHumidity.style = 'color: #00ACEE';
        icon_humi_chart.src = 'img/icons/tempHumi/umidade_blue.png'
    } else if (estatisticas.umidade.toFixed(1) >= 40.1 && estatisticas.umidade.toFixed(1) <= 47.5) {
        atualHumidity.style = 'color: #ffd700';
        icon_humi_chart.src = 'img/icons/tempHumi/umidade_yellow.png'
    } else if (estatisticas.umidade.toFixed(1) >= 47.6 && estatisticas.umidade.toFixed(1) <= 62.4) {
        atualHumidity.style = 'color: #27D72D';
        icon_humi_chart.src = 'img/icons/tempHumi/umidade_green.png'
    } else if (estatisticas.umidade.toFixed(1) >= 62.5 && estatisticas.umidade.toFixed(1) <= 69.9) {
        atualHumidity.style = 'color: #FF8c00';
        icon_humi_chart.src = 'img/icons/tempHumi/umidade_orange.png';
    } else if (estatisticas.umidade.toFixed(1) > 69.9) {
        atualHumidity.style = 'color:  #FF1616';
        icon_humi_chart.src = 'img/icons/tempHumi/umidade_red.png'
    }
    atualTemp.innerHTML = `${estatisticas.temperatura.toFixed(1)} °C`;
    atualHumidity.innerHTML = `${estatisticas.umidade.toFixed(0)} %`
}
function plotarGrafico(dados, idcaminhao) {
    //console.log('iniciando plotagem do gráfico...');
    var contexto_temperatura = chart.getContext('2d');
    window.graficoLinha = Chart.Line(contexto_temperatura, {
        data: dados,
        options: configurarGrafico()
    });
    //console.log('Atualizando estatisticas');
    atualizarEstatisticas(idcaminhao);
    setTimeout(() => atualizarGrafico(idcaminhao, dados), 2000);

}
function plotarGrafico2(dados, idcaminhao) {
    //console.log('iniciando plotagem do segundo gráfico...');
    var contexto_umidade = chart_humidity.getContext('2d');
    window.graficoLinha2 = Chart.Line(contexto_umidade, {
        data: dados,
        options: configurarGrafico2()
    });
    atualizarEstatisticas(idcaminhao);
    setTimeout(() => atualizarGrafico2(idcaminhao, dados), 2000);
}
function sendData() {
    var http = new XMLHttpRequest();
    http.open('GET', 'http://localhost:9000/api/sendData', false);
    http.send(null);
}