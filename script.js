//SELETORES
const seuVotoPara = document.querySelector(".frase span");
const cargo = document.querySelector(".cargo span");
const numbers = document.querySelector(".input");
const descripition = document.querySelector(".candidate");
const teclasInfo = document.querySelector(".d-2");
const candidatesPhoto = document.querySelector(".dright");
const som = document.querySelector("audio")

// LENGHT DO ARRAY ETAPAS
let etapaAtual = 0;
let numero = ''
let votoBranco = false
// VAI TODAS INFORMAÇÕESD A TELA E CONFIGURAR DE ACORDAR COM A ETAPA ATUAL
function startEtapa() {
let etapa = etapas[etapaAtual];

  //DEFINIR A QUANTIDADE DE QUADRADINHOS DE ACORDO COM O JSON ETAPAS
  let numbersHtml = "";
  numero = ''
  votoBranco = false
  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numbersHtml += '<div class="num pisca"></div>';
    } else {
      numbersHtml += '<div class="num"></div>';
    }
    
  }

  //ZERAR TODOS OS CAMPOS
  seuVotoPara.style.display = "none";
  cargo.innerHTML = etapa.titulo;
  descripition.innerHTML = "";
  teclasInfo.style.opacity = "0";
  candidatesPhoto.innerHTML = "";
  numbers.innerHTML = numbersHtml;
}

startEtapa();


  function updateScrean(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero == numero){
            return true;
        } else {
            return false;
        }
    });

  if (candidato.length > 0) {
    candidato = candidato[0]
    seuVotoPara.style.display = "block";
    if (etapaAtual == 0) {
      descripition.innerHTML = `Nome:<span class="tente">testeii</span >${candidato.nome} <br> 
      Partido:<span class="tente">teste</span>${candidato.partido}`;
    } else {
      descripition.innerHTML = `Nome:<span class="tente">testeii</span >${candidato.nome} <br> 
      Vice:<span class="tente">testeiiiii</span >${candidato.vice} <br> 
      Partido:<span class="tente">teste</span>${candidato.partido}`;
    }
    
    teclasInfo.style.opacity = "1";
    
    let candidatePhoto = ''
    for(let i in candidato.fotos){
      if (candidato.fotos[i].small == true) {
        candidatePhoto += `<div class="dright-img small"><img src="images/${candidato.fotos[i].url}" alt="candidato principal">${candidato.fotos[i].legenda}</div>`
      } else {
        candidatePhoto += `<div class="dright-img"><img src="images/${candidato.fotos[i].url}" alt="candidato principal">${candidato.fotos[i].legenda}</div>`
      }
      
    }
    candidatesPhoto.innerHTML = candidatePhoto

  } else {
    
    descripition.innerHTML = '<div class="candidate--grande pisca">VOTO NULO</div>'


  }


};



//FUNÇÕES PARA O TECLADO NUMERICO
function clicou(n) {
  let numberSpace = document.querySelector('.num.pisca')
  if (numberSpace !==null) {
    numberSpace.innerHTML = n
    numero += n
    numberSpace.classList.remove("pisca")

    if (numberSpace.nextElementSibling !== null) {
      numberSpace.nextElementSibling.classList.add("pisca")
    } else {
      updateScrean()
    }    
  }
}

function branco() {
if (numero == '') {
  votoBranco = true
  seuVotoPara.style.display = "block";
  numbers.innerHTML = '<div class="candidate--grande pisca">VOTO EM BRANCO</div>'
} else {
  
}
}


function corrige() {
  startEtapa()
  
}
function confirma() {
  let etapa = etapas[etapaAtual];
  let confirmaVoto = false
  if (votoBranco === true) {
    confirmaVoto = true
    
  } else if(numero.length == etapa.numeros){
    confirmaVoto = true
   
  }

  if (confirmaVoto) {
    som.play()
    etapaAtual++
    if (etapas[etapaAtual] !== undefined) {
      startEtapa()
    } else {
      document.querySelector('.screan').innerHTML = '<div class="candidate--GIGANTE pisca">FIM</div>'
    }
  }
  
}



