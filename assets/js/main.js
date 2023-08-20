const tabelaHistorico = document.querySelector('.Table-Historico');
const data = new Date();


////////////////////////////////////////////////////////////////////////
function criaTd(texto){
  const td = document.createElement('td');
  td.classList.add('historico', 'hist-linha');
  return td
}

function criaTr(){
  const tr = document.createElement('tr');
  return tr
}

function adicionarLinha(valor1, valor2){
  const tr = criaTr();
  const td1 = criaTd();
  const td2 = criaTd();
  td1.innerText = valor1;
  td2.innerText = valor2;
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

const dataAtual = formataData(data);



//////////////////////////////////////////////////////////////////////

function Calculadora(){
    var conta;
    this.display = document.querySelector('.display');

    this.btnParaDisplay = (valor) => this.display.value += valor;

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

        adicionarLinha(dataAtual, conta)

        // return console.log(conta + ' ' + dataAtual);
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
        })
    }

}

const calculadora = new Calculadora;
calculadora.inicia();



