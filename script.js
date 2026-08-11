// CÓDIGO DO MODAL (Mantido para abrir/fechar a explicação da Lupa)
let btnAjuda = document.querySelector(".botao-ajuda");
let btnFechar = document.querySelector(".botao-fechar");
let modal = document.querySelector(".modal-fundo");

btnAjuda.addEventListener("click", abreModal);
btnFechar.addEventListener("click", fechaModal);

function abreModal() {
    modal.style.display = "block";
}

function fechaModal() {
    modal.style.display = "none";
}


// TAMANHO DE FONTES (Controle de Acessibilidade A+ e A-)
let tamanhoFonteAtual = 16;
const valorAdicionado = 2;
const valorSubtraido = 2;

let btnAumentaFonte = document.getElementById("btnAumentaTexto");
let btnDiminuiFonte = document.getElementById("btnDiminuiTexto");

btnAumentaFonte.addEventListener("click", aumentaFonte);
btnDiminuiFonte.addEventListener("click", diminuiFonte);

function aumentaFonte() {
    tamanhoFonteAtual = tamanhoFonteAtual + valorAdicionado;
    document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
}

function diminuiFonte() {
    tamanhoFonteAtual = tamanhoFonteAtual - valorSubtraido;
    document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
}


// LEITURA DE TELA (Correção para ignorar o menu e soltar o som direto)
let lendo = false;
let btnLeitura = document.querySelector(".botao-leitura");

btnLeitura.addEventListener("click", lerEmVozAlta);

function lerEmVozAlta() {

    // se já está lendo
    if (lendo == true) {
        // se estiver pausado 
        if (speechSynthesis.paused == true){
            // continua de onde parou
            speechSynthesis.resume();
        } else {
            // pausa
            speechSynthesis.pause();
        }
        return;
    }

    // Captura o título do banner e junta com o resto do texto explicativo
    let conteudo = document.querySelector(".conteudo");
    let tituloPrincipal = document.querySelector(".banner").innerText;
    let texto = tituloPrincipal + ". " + conteudo.innerText;

    let fala = new SpeechSynthesisUtterance(texto);

    fala.lang = "pt-BR";
    fala.rate = 1.1; // Velocidade natural de leitura
    fala.onend = finalizarLeitura;

    lendo = true;

    // Cancela qualquer áudio que tenha ficado travado na fila do navegador
    speechSynthesis.cancel();
    
    // Executa a fala
    speechSynthesis.speak(fala);
}

function finalizarLeitura() {
    lendo = false;
}
