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
// document.onload(function() {})

function atualizaParedeAtual() {
    if (comodo.length > 0) {
        paredeAtual = comodo.length + 1;
    }
    $('#textoParede').text("emo " + paredeAtual);
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

    let area = altura * largura;
    if (area >= 1 && area <= 15) {
        alert("EMO");
    }
    else{alert("OTAKU")}
});