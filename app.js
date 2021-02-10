class Calculator {
    constructor(previousElement, currentElement) {
        this.previousElement = previousElement;
        this.currentElement = currentElement;
        this.init();
    }

    init() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = "";
    }

    appendNb(nb) {
        if (nb === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + nb.toString();
        this.updateOutput();
    }

    operate(op) {
        // User didn't input any number
        if (
            this.operation === "" &&
            this.previousOperand === "" &&
            this.currentOperand === ""
        ) {
            return;
        }
        // User supplied fisrt operand and is about to supply the second one
        else if (
            this.operation === "" &&
            this.previousOperand === "" &&
            this.currentOperand !== ""
        ) {
            this.operation = op;
            this.previousOperand = this.currentOperand;
            this.currentOperand = "";
        } else if (
            this.operation !== "" &&
            this.previousOperand !== "" &&
            this.currentOperand !== ""
        ) {
            this.compute();
        }
        this.operation = op;
        this.updateOutput();
    }

    result() {
        if (
            this.operation !== "" &&
            this.previousOperand !== "" &&
            this.currentOperand !== ""
        ) {
            this.compute();
            this.operation = "";
            this.currentOperand = "";
        }
        this.updateOutput();
    }

    clear() {
        this.init();
        this.updateOutput();
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
        this.updateOutput();
    }

    /**
     * sets previousOperand
     */
    compute() {
        let curr = parseFloat(this.currentOperand);
        let prev = parseFloat(this.previousOperand);
        switch (this.operation) {
            case "+":
                this.previousOperand = prev + curr;
                break;
            case "-":
                this.previousOperand = prev - curr;
                break;
            case "*":
                this.previousOperand = prev * curr;
                break;
            case "/":
                this.previousOperand = prev / curr;
                break;

            default:
                throw "unexpected operation";
        }
    }

    updateOutput() {
        this.currentElement.innerText = this.currentOperand;
        this.previousElement.innerText = this.previousOperand + this.operation;
    }
}

const calc = document.querySelector("#js-calc");
const currentOutput = document.querySelector("[current-output]");
const previousOutput = document.querySelector("[previous-output]");

const calculator = new Calculator(previousOutput, currentOutput);

calc.addEventListener("click", (e) => {
    const btn = e.target;

    if (btn.hasAttribute("nb")) {
        calculator.appendNb(btn.innerText);
    } else if (btn.hasAttribute("ops")) {
        calculator.operate(btn.innerText);
    } else if (btn.hasAttribute("eq")) {
        calculator.result();
    } else if (btn.hasAttribute("clear")) {
        calculator.clear();
    } else if (btn.hasAttribute("delete")) {
        calculator.delete();
    }
});
