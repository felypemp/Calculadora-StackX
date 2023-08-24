var valor = [];
var historico = []
var tabelaHistorico = document.querySelector('.Table-Historico');

function criaTr() {
  const tr = document.createElement('tr');
  tr.classList.add('trValor');
  return tr;
}

function removerTds() {
  var tds = document.querySelectorAll('.Table-Historico .trValor'); 

  for (var i = 0; i < tds.length; i++) {
      var td = tds[i];
      td.parentNode.removeChild(td); // Remove a célula 'td'
  }
}

function criaTd(){
  const td = document.createElement('td');
  return td;
}  

function adicionarHistorico(valor){

  const td = criaTd();
  const td1 = criaTd();
  const td2 = criaTd();
  const tr = criaTr();
  
  valor.forEach(function(dados, index){
    if (index === 0) {
      td.classList.add('historico', 'hist-data');
      td.innerText = dados;
      tr.appendChild(td);
    } 
  
    if (index === 1) {
      td1.classList.add('historico', 'hist-operacao');
      td1.innerText = dados;
      tr.appendChild(td1);

    }

    if (index === 2) {
      td2.classList.add('historico', 'hist-result');
      td2.innerText = dados;
      tr.appendChild(td2);
    }
  })
  
  tabelaHistorico.appendChild(tr);
  
}

////////////////////////////////////////////////////////////////////////
function zeroEsquerda(num){
  return num >=10 ? num : `0${num}`

}

const dataAtual = () => {
    const data = new Date();
    const dia = zeroEsquerda(data.getDate());
    const mes= zeroEsquerda(data.getMonth() +1);
    const ano= data.getFullYear();
    const horas= zeroEsquerda(data.getHours());
    const minutos= zeroEsquerda(data.getMinutes());
    const segundos= zeroEsquerda(data.getSeconds());
  
    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`
  }


//////////////////////////////////////////////////////////////////////

function Calculadora(){
    var conta;
    this.display = document.querySelector('.display');

    this.btnParaDisplay = (valor) => this.display.value += valor;

    this.histParaDisplay = (valor) => this.display.value = valor;

    this.clearDisplay = () => this.display.value = '';
    
    this.realizaConta = () => {
        conta = this.display.value;
        operacao = this.display.value;
    
        try {
          conta = eval(conta);
    
          if(!conta) {
            alert('Conta inválida');
            return;
          }
    
          this.display.value = String(conta);
        } catch(e) {
          alert('Conta inválida');
          return;
        }

      }
    

    this.inicia = () => {
        this.cliqueBotoes();
    }

    this.cliqueBotoes = () => {
        document.addEventListener('click', e =>{
            const elemento = e.target;

            if(elemento.classList.contains('btn-num')){
                this.btnParaDisplay(elemento.innerText)
            }

            if(elemento.classList.contains('btn-clear')) {
                this.clearDisplay();
              }

              if(elemento.classList.contains('btn-equal')) {
                this.realizaConta();

                //////////////////////////////////

                valor.unshift(dataAtual(), operacao, conta)
                if (historico.length <=3){
                   historico.push(valor)
                } else {
                  historico.shift();
                  historico.push(valor)
                 }
                valor = []
                
                //////////////////////////////////

                const trValor = document.querySelector('.trValor')
                removerTds()
                historico.forEach(function(hist) {
                  adicionarHistorico(hist)
                });

              }

              if(elemento.classList.contains('hist-result')) {
                this.histParaDisplay(elemento.innerText)
                
              }

              if(elemento.classList.contains('hist-operacao')) {
                this.histParaDisplay(elemento.innerText)
                
              }
        })
    }

}

const calculadora = new Calculadora;
calculadora.inicia();
