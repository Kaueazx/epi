// let zuario;
// let button;
// button = document.getElementById("btnEnviar");
// button.addEventListener('click', (e) => {
// e.preventDefault();
// zuario = document.getElementById("zuario").value;
// alert(zuario);
// });

// $("#btnEnviar").on('click', (e) => {
// e.preventDefault();
// alert($("#zuario").val());
// })

// let parede = {
//     'altura': 0,
//     'largura': 0,
//     'nmrPortas': 0,
//     'nmrJanelas': 0
// }

let comodo = [];
let paredeAtual = 1;
let mensagem = "";
let campoMensagem = $("#mensagem");
const latasTinta = [18, 3.6, 2.5, 0.5];

// Funções
// document.onload(function() {})

function calculaTintaNecessaria(comodo) {
    let area1 = (comodo[0].altura * 1) * (comodo[0].altura * 1);
    let area2 = (comodo[1].altura * 1) * (comodo[1].altura * 1);
    let area3 = (comodo[2].altura * 1) * (comodo[2].altura * 1);
    let area4 = (comodo[3].altura * 1) * (comodo[3].altura * 1);


    let areaJanelas = (comodo[0].nmrJanelas * 2.4) + (comodo[1].nmrJanelas * 2.4) + (comodo[2].nmrJanelas * 2.4) + (comodo[3].nmrJanelas * 2.4);
    let areaPortas = (comodo[0].nmrPortas * 1.52) + (comodo[1].nmrPortas * 1.52) + (comodo[2].nmrPortas * 1.52) + (comodo[3].nmrPortas * 1.52);

    let areaTotal = (area1 + area2 + area3 + area4);
    let tintaNecessaria = (areaTotal - (areaJanelas + areaPortas)) / 5;

    alert(tintaNecessaria);

    return tintaNecessaria;
}

function atualizaParedeAtual() {
    if ((comodo.length > 0) && comodo.length <= 3) {
        paredeAtual = comodo.length + 1;
    }
    $('#textoParede').text("emo " + paredeAtual);

    if (comodo.length == 4) {
        $("#btnCalc").removeClass('hidden');
        $("#formButton").prop('disabled', true);
    }
}

function verificaAreaParede(altura, largura) {
    let area = altura * largura;
    if (area >= 1 && area <= 15)
        return true;
    else
        return false;
}

function verificaAlturaParede(nmrPortas, altura) {
    if ((nmrPortas > 0 && (altura - 0.3) >= 1.9) || nmrPortas == 0)
        return true;
    else
        return false;
}

function proporcaoParede(nmrPortas, nmrJanelas, altura, largura) {
    let area = (altura * largura) / 2;
    let areaJanelas = nmrJanelas * 2.4;
    let areaPortas = nmrPortas * 1.52;

    if ((areaJanelas + areaPortas) <= area) {
        if ((verificaAlturaParede(nmrPortas, altura) == true) && comodo.length <= 3) {
            comodo.push({
                'altura': altura,
                'largura': largura,
                'nmrPortas': nmrPortas,
                'nmrJanelas': nmrJanelas
            });

            console.log(comodo);

            atualizaParedeAtual();

        }
        else {
            mensagem = "A altura da parede tem de ser 30cm maior que a porta!";
            campoMensagem.removeClass("hidden");
            campoMensagem.text(mensagem);

        }

    }
    else {
        mensagem = "A soma da area das portas e das janelas excedeu 50% da area da parede!";
        campoMensagem.removeClass("hidden");
        campoMensagem.text(mensagem);

    }
}



function validaParede(altura, largura, nmrJanelas, nmrPortas) {
    if (verificaAreaParede(altura, largura) == true) {
        proporcaoParede(nmrPortas, nmrJanelas, altura, largura);
    }
    else {
        mensagem = "A area da parede deve estar entre 1 e 15 metros quadrados!";
        campoMensagem.removeClass("hidden");
        campoMensagem.text(mensagem);
    }
}

$(document).ready(() => {
    atualizaParedeAtual();
});

$("#formButton").on('click', (e) => {
    e.preventDefault();

    let altura = $('#altura').val();
    let largura = $('#largura').val();
    let nmrPortas = $('#portas').val();
    let nmrJanelas = $('#janelas').val();

    validaParede(altura, largura, nmrJanelas, nmrPortas);
});

$('#btnCalc').on('click', (e) => {
    e.preventDefault();
    // let tintaNecessaria = calculaTintaNecessaria(comodo);
    let tintaNecessaria = 19;
    let cont = 0;
    let qtdLata = 0;
    console.clear();

    while (cont < latasTinta.length) {
        if (latasTinta[cont] > 0.5) {
            if (latasTinta[cont] <= tintaNecessaria) {
                if (tintaNecessaria - latasTinta[cont] < latasTinta[cont]) {
                    if (cont === 0)
                        mensagem = `Compre 1 Lata de ${latasTinta[cont]} Litros`;
                    else {
                        if (tintaNecessaria - latasTinta[cont] <= 0)
                            mensagem += ` e 1 lata de ${latasTinta[cont]} litros`
                        else {
                            mensagem += `, 1 lata de ${latasTinta[cont]} litros`
                        }
                    }

                    tintaNecessaria = tintaNecessaria - latasTinta[cont];
                }
                else {
                    while (latasTinta[cont] <= tintaNecessaria) {
                        qtdLata++;

                        tintaNecessaria = tintaNecessaria - latasTinta[cont];
                    }

                    if (cont === 0)
                        mensagem = `Compre ${qtdLata} latas de ${latasTinta[cont]} Litros`;
                    else {
                        if (tintaNecessaria - latasTinta[cont] <= 0)
                            mensagem += ` e ${qtdLata} latas de ${latasTinta[cont]} litros`
                        else {
                            mensagem += `, ${qtdLata} latas de ${latasTinta[cont]} litros`
                        }
                    }
                }
            }
        }
        else {
            if (tintaNecessaria > 0) {
                qtdLata = 0;

                while (tintaNecessaria > 0) {
                    qtdLata++;

                    tintaNecessaria = tintaNecessaria - latasTinta[cont];
                }

                if (cont === 0)
                    mensagem = `Compre ${qtdLata} latas de ${latasTinta[cont]} Litros`;
                else {
                    if (tintaNecessaria - latasTinta[cont] <= 0)
                        mensagem += ` e ${qtdLata} latas de ${latasTinta[cont]} litros`
                    else {
                        mensagem += `, ${qtdLata} latas de ${latasTinta[cont]} litros`
                    }
                }
            }
        }

        cont++;
    }

    console.log(mensagem);

});


// tags em html sao os comando
// git = versionador de codigo
// github = arvore binaria
// git flow = work flow (forma de trabalhar)
// conceito Cli = funciona atraves de algum programa cmd
// conceito Gui =

// git flow por si só é um programa Cli

// git add . = git add = adicionar arquivos / . = todos

// git commit -m '' = git commit = "preparar os arquivos adicionados para serem publicados"

// git branch = mostrar as branchs 'ramos da arvore'

// git 'status' = 'status' do repositorio no geral

// git checkout = troca de branchs / git checkout -b main (checa se existe branch, e se nao existir cria a mesma)

// git flow feature start '' = criar uma feature
// ]
// git flow feature end = finaliza/deleta uma feature && da um push na feature para a develop(featurePai)

// git clone [link] = clona o repositorio git para a maquina local atual

// git remote = checa a origem da criaçao do repositorio



