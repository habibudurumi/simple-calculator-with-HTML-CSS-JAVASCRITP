/** @format */

class Calculator {
  constructor(currentOperand, prevOperand) {
    this.currentOperand = currentOperand;
    this.prevOperand = prevOperand;
    this.clear();
  }

  clear() {
    this.current = "";
    this.previous = "";
    this.operation = undefined;
  }
  delete() {
    this.current = this.current.toString().slice(0, -1);
  }

  appendNum(num) {
    if (num === "." && this.current.includes(".")) return;
    this.current = this.current.toString() + num.toString();
  }

  chooseOperation(operation) {
    if (this.current === "") return;
    if (this.previous !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previous = this.current;
    this.current = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previous);
    const curr = parseFloat(this.current);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "÷":
        computation = prev / curr;
        break;
      default:
        return;
    }

    this.current = computation;
    this.operation = undefined;
    this.previous = "";
  }

  getNumber(number) {
    const stringNumber = number.toString();
    const interNumber = parseFloat(stringNumber.split(".")[0]);
    const decimalNumber = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(interNumber)) {
      integerDisplay = "";
    } else {
      integerDisplay = interNumber.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalNumber != null) {
      return `${integerDisplay}.${decimalNumber}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperand.textContent = this.getNumber(this.current);
    if (this.operation != null) {
      this.prevOperand.textContent = `${this.getNumber(this.previous)} ${
        this.operation
      }`;
    } else {
      this.prevOperand.textContent = "";
    }
  }
}

const numberBtns = document.querySelectorAll("[data-number]");
const operatorBtns = document.querySelectorAll("[data-operation]");
const clearBtn = document.querySelector("[data-clear]");
const clearAllBtn = document.querySelector("[data-all-clear]");
const currentOperand = document.querySelector("[data-current-operand]");
const prevOperand = document.querySelector("[data-prev-operand]");
const equalsBtn = document.querySelector("[data-equals]");

const calculator = new Calculator(prevOperand, currentOperand);

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNum(button.textContent);
    calculator.updateDisplay();
  });
});

operatorBtns.forEach((operator) => {
  operator.addEventListener("click", () => {
    calculator.chooseOperation(operator.textContent);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearAllBtn.addEventListener("click", (clear) => {
  calculator.clear();
  calculator.updateDisplay();
});

clearBtn.addEventListener("click", (clear) => {
  calculator.delete();
  calculator.updateDisplay();
});
