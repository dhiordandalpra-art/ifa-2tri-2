// ==========================================
// 1. CÓDIGO DO MODAL (ABRE/FECHA EXPLICAÇÃO)
// ==========================================
let btnAjuda = document.querySelector(".botao-ajuda");
let btnFechar = document.querySelector(".botao-fechar");
let modal = document.querySelector(".modal-fundo");

if (btnAjuda && btnFechar && modal) {
    btnAjuda.addEventListener("click", abreModal);
    btnFechar.addEventListener("click", fechaModal);
}

function abreModal() {
    modal.style.display = "block";
}

function fechaModal() {
    modal.style.display = "none";
}


// ==========================================
// 2. TAMANHO DE FONTES (CONTROLE DE ACESSIBILIDADE A+ E A-)
// ==========================================
let tamanhoFonteAtual = 22; // Inicia sincronizado com os 22px definidos na raiz do CSS
const valorAdicionado = 2;
const valorSubtraido = 2;
const limiteMaximo = 34;    // Trava superior para o layout não quebrar excessivamente
const limiteMinimo = 14;    // Trava inferior para manter o texto legível

let btnAumentaFonte = document.getElementById("btnAumentaTexto");
let btnDiminuiFonte = document.getElementById("btnDiminuiTexto");

if (btnAumentaFonte && btnDiminuiFonte) {
    btnAumentaFonte.addEventListener("click", aumentaFonte);
    btnDiminuiFonte.addEventListener("click", diminuiFonte);
}

function aumentaFonte() {
    if (tamanhoFonteAtual < limiteMaximo) {
        tamanhoFonteAtual = tamanhoFonteAtual + valorAdicionado;
        document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
    }
}

function diminuiFonte() {
    if (tamanhoFonteAtual > limiteMinimo) {
        tamanhoFonteAtual = tamanhoFonteAtual - valorSubtraido;
        document.documentElement.style.fontSize = `${tamanhoFonteAtual}px`;
    }
}


// ==========================================
// 3. LEITURA DE TELA EM VOZ ALTA
// ==========================================
let lendo = false;
let btnLeitura = document.querySelector(".botao-leitura");

if (btnLeitura) {
    btnLeitura.addEventListener("click", lerEmVozAlta);
}

function lerEmVozAlta() {
    // Se o áudio já estiver ativo
    if (lendo == true) {
        if (speechSynthesis.paused == true){
            speechSynthesis.resume(); // Retoma a leitura se estava pausada
        } else {
            speechSynthesis.pause();  // Pausa se estava rolando o som
        }
        return;
    }

    let conteudo = document.querySelector(".conteudo");
    let banner = document.querySelector(".banner");
    
    if (!conteudo || !banner) return;

    let tituloPrincipal = banner.innerText;
    let texto = tituloPrincipal + ". " + conteudo.innerText;

    let fala = new SpeechSynthesisUtterance(texto);

    fala.lang = "pt-BR";
    fala.rate = 1.1; // Velocidade natural de dicção
    fala.onend = finalizarLeitura;

    lendo = true;
    speechSynthesis.cancel(); // Limpa filas e travamentos antigos do navegador
    speechSynthesis.speak(fala);
}

function finalizarLeitura() {
    lendo = false;
}
