class Calculator { 
   constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
   } 

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = undefined;
   }

   delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
   }

   chooseOperator(operator) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operator = operator
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
   }

   appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()

   }

   compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch(this.operator) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '÷':
                computation = prev / current
                break
            case 'x':
                computation = prev * current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.previousOperand = ''
        this.operator = undefined
       
   }

   getDisplayNumber(number) {
    const floatNumber = parseFloat(number)
    if (isNaN(floatNumber)) return ''
    return floatNumber.toLocaleString('en')
   }

   updateDisplay () {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operator != null) {
        this.previousOperandTextElement.innerText = `${getDisplayNumber(this.previousOperand)} ${this.operator}`
        }   
    }
};

const numbersButtons = document.querySelectorAll('[data-numbers]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
});

numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
});

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
    })
});

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})