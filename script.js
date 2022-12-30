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
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
   }

   chooseOperator(operator) {
        if (this.currentOperand === '') {
            this.currentOperand = 0;
        }
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
   }

   appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();

   }

   compute() {
        let computation = "";
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch(this.operator) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '÷':
                if (current !== 0) {
                computation = prev / current;
                } else {
                    computation = "Cannot divide by 0";
                }
                break;
            case 'x':
                computation = prev * current;
                break;
            default:
                return;
        }
    
        this.currentOperand = computation;
        this.previousOperand = '';
        this.operator = undefined;
   }

   getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]); // turns stringNumber into a length 2 array, where [0] is the integer part and [1] the decimal part
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
   }

   updateDisplay() {
        if (typeof(this.currentOperandTextElement.innerText) !== "string") {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        } else {
            this.currentOperandTextElement.innerText = this.currentOperand;
        }
        if (this.operator != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numbersButtons = document.querySelectorAll('[data-numbers]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});