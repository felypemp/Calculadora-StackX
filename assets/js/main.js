const tabelaHistorico = document.querySelector('.Table-Historico');
const data = new Date();


////////////////////////////////////////////////////////////////////////

function adicionarHistorico(data, resultado){
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  td1.classList.add('historico', 'hist-data');
  td2.classList.add('historico', 'hist-result');

  td1.innerText = data;
  td2.innerText = resultado;
  tr.appendChild(td1);
  tr.appendChild(td2);
  tabelaHistorico.appendChild(tr);
  
}


////////////////////////////////////////////////////////////////////////
function zeroEsquerda(num){
  return num >=10 ? num : `0${num}`

}

function formataData(data){
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

        var dataAtual = () => formataData(data)
        adicionarHistorico(dataAtual(), conta)

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
                
              }

              if(elemento.classList.contains('hist-result')) {
                this.histParaDisplay(elemento.innerText)
                
              }
        })
    }

}

const calculadora = new Calculadora;
calculadora.inicia();


/////////////////////////////////////////////////////////////////