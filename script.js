class Calculadora{
    constructor(textoAtual){
        this.textoAtual = textoAtual
        this.Anterior = ''
        this.Atual = ''
        this.operador = undefined
        this.cursor()
    }
    cursor(){
        if(this.Atual === ''){
            let contador = 0
            const pisca = setInterval(()=>{
                if(this.Atual !== '' && this.Atual !== '_'){
                    clearInterval(pisca)
                    return
                }

                if(contador ===  2){
                    contador = 0
                    this.Atual = ''
                }
                if(contador === 1){
                    this.Atual = '_'
                }
                contador++
                this.atualizarDisplay()
            },590)
        }
    }

    limpar(){
        this.Atual = ''
        this.Anterior = ''
        this.operador = undefined
        this.cursor()
    }

    adicionarNumero(numero){
        if(numero === ',' && this.Atual.includes(',')) return
        if(numero === ',' && this.Atual === '') return this.Atual = this.Atual.toString() + '0,'
        if(this.Atual === '_'){
            this.Atual = numero.toString()
        }else{
        this.Atual = this.Atual.toString() + numero.toString()}
    }

    operacao(operador){
        if(this.Atual === '' || this.Atual === ',0')return
        if(this.Atual !== ''){
            this.calculo()
        }
        this.operador = operador
        this.Anterior = this.Atual
        this.Atual = ''
    }

    trocarSinal(){
        if(this.textoAtual.innerText === '' || this.textoAtual.innerText === '_') return
        if(this.Atual.includes('-')){
            this.Atual = this.Atual.slice(1,this.Atual.length)
        }
        else{
            this.Atual = '-' + this.Atual
        }
    }

    calculo(){
        let resultado
        const anterior = parseFloat(this.Anterior)
        const atual = parseFloat(this.Atual)
        if(this.Anterior === '' || this.Atual === '') return
        switch(this.operador){
            case '+': resultado = anterior + atual
            break
            case '-': resultado = anterior - atual
            break
            case 'x': resultado = anterior * atual
            break
            case '/': resultado = anterior / atual
            break
            default: return
        }
        this.Atual = resultado
        this.Anterior = ''
        this.operador = undefined
    }

    atualizarDisplay(){
        this.textoAtual.innerText = this.Atual
    }
}

const numeros = document.querySelectorAll('.numero')
const operadores = document.querySelectorAll('.operador')
const igual = document.querySelector('.igual')
const display = document.querySelector('.display')
const limpar = document.querySelector('.limpar')
const trocarSinal = document.querySelector('.trocarsinal')
const textoAtual = document.querySelector('.textoAtual')
const textoAnterior = document.querySelector('.textoAnterior')

const calculadora = new Calculadora(textoAtual)

numeros.forEach(numero => {
    numero.addEventListener('click', () => {
        calculadora.adicionarNumero(numero.innerText)
        calculadora.atualizarDisplay()
    })
})

operadores.forEach(operador => {
    operador.addEventListener('click', () => {
        calculadora.operacao(operador.innerText)
        calculadora.atualizarDisplay()
    })
})

trocarSinal.addEventListener('click', () =>{
    calculadora.trocarSinal()
    calculadora.atualizarDisplay()
})

igual.addEventListener('click', () =>{
    calculadora.calculo()
    calculadora.atualizarDisplay()
})

limpar.addEventListener('click', () =>{
    calculadora.limpar()
    calculadora.atualizarDisplay()
})