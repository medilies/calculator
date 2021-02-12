class Calculator {
    /**
     * Set HTML elements that make the calculator display
     * @param {HTMLDivElement} previousElement
     * @param {HTMLDivElement} currentElement
     */
    constructor(previousElement, currentElement) {
        this.previousElement = previousElement;
        this.currentElement = currentElement;
        this.init();
    }

    /**
     * Reset state
     */
    init() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = "";
    }

    appendNb(nb) {
        // prevent more then (1) dot in same currentOperand
        if (nb === "." && this.currentOperand.includes(".")) return;
        // prevent more then (1) zero on the left of currentOperand
        if (
            nb === "0" &&
            this.currentOperand.length >= 1 &&
            "0".repeat(this.currentOperand.length) === this.currentOperand
        )
            return;
        if (nb === "." && this.currentOperand === "") nb = "0.";
        // Delete old output - User is typing a new oprand to override old result
        else if (this.previousOperand !== "" && this.operation === "")
            this.previousOperand = "";
        this.currentOperand = this.currentOperand.toString() + nb.toString();
        this.updateOutput();
    }

    operate(op) {
        // User didn't input any number (0 operations)
        if (
            this.operation === "" &&
            this.previousOperand === "" &&
            this.currentOperand === ""
        ) {
            return;
        }
        // User is about to supply the second operand (1st operation)
        else if (
            this.operation === "" &&
            this.previousOperand === "" &&
            this.currentOperand !== ""
        ) {
            this.previousOperand = this.currentOperand;
            this.currentOperand = "";
        }
        // User is on the 2nd operation or more
        else if (
            this.operation !== "" &&
            this.previousOperand !== "" &&
            this.currentOperand !== ""
        ) {
            this.compute();
            this.currentOperand = "";
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
            this.currentOperand = "";
            this.operation = "";
            this.updateOutput();
        }
    }

    /**
     * Reset state and clears output
     */
    clear() {
        this.init();
        this.updateOutput();
    }

    /**
     * Remove last digit from currentOperand
     */
    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
        this.updateOutput();
    }

    /**
     * Sets previousOperand
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
            case "÷":
                this.previousOperand = prev / curr;
                break;

            default:
                throw "unexpected operation";
        }
        this.previousOperand = this.previousOperand.toString();
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

document.addEventListener("keydown", function (e) {
    let key = e.key;

    if (!isNaN(key) || key === ".") {
        calculator.appendNb(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
        if (key === "/") key = "÷";
        calculator.operate(key);
    } else if (key === "Enter") {
        calculator.result();
    } else if (key === "Delete") {
        calculator.clear();
    } else if (key === "Backspace") {
        calculator.delete();
    }
});
