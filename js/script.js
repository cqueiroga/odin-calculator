// Declare operator variable
let operator = "";

// Declare variable for number input and total
let num1 = 0;
let num2 = 0;

let formula = document.getElementById("formula");
let formulaText = formula.innerHTML;
let output = document.getElementById("output");

const errorMsg = "Cannot divide by zero";

output.innerHTML = 0;

// Declare calculation functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
	if (b == 0) {
		return (output.innerHTML = errorMsg);
	} else {
		return a / b;
	}
};

const btn = document.querySelectorAll("button");
const numeric = document.getElementsByClassName("numeric");
const operatorBtn = document.getElementsByClassName("operator");
const clearBtn = document.getElementById("clear");
const clearEntry = document.getElementById("clear-entry");
const equalsBtn = document.getElementById("equals");

// Event listener for numeric buttons
for (i of numeric) {
	i.addEventListener("click", function () {
		if (operator && formula.innerHTML.includes("=")) {
			formula.innerHTML = "";
			num1 = 0;
		}

		if (operator) {
			if (num2 == 0) {
				num2 = this.value;
				output.innerHTML = num2;
			} else {
				num2 += this.value;
				output.innerHTML = num2;
			}
		} else if (num1 == 0) {
			num1 = this.value;
			output.innerHTML = num1;
		} else {
			num1 += this.value;
			output.innerHTML = num1;
		}
	});
}

// Event listener for operator buttons
let operatorCount = 0; // operatorCount for chaining calculations
for (i of operatorBtn) {
	i.addEventListener("click", function () {
		if (operatorCount >= 1) {
			equals(operator);
		}
		if (operator != "=") {
			operatorCount += 1;
			operator = this.value;
		}

		if (
			operator == "+" ||
			operator == "-" ||
			operator == "×" ||
			operator == "÷"
		) {
			formula.innerHTML = num1 + " " + operator + " ";
			output.innerHTML = num1;
		}
	});
}

// Event listener for equals button
equalsBtn.addEventListener("click", function () {
	equals(equalsBtn);
});

// Event listener for clear button
clearBtn.addEventListener("click", function () {
	clear();
});

// Event listener for clear entry button
clearEntry.addEventListener("click", function () {
	if (!operator) {
		num1 = 0;
		output.innerHTML = 0;
	} else if (formulaText.includes("=")) {
		clear();
	} else {
		num2 = 0;
		output.innerHTML = 0;
	}
});

// Declare operate function
// Accepts three arguments - 2 numbers and operator
// Calls calculation function based on operator
function operate(a, b, operator) {
	if (operator == "+") {
		return add(a, b);
	} else if (operator == "-") {
		return subtract(a, b);
	} else if (operator == "×") {
		return multiply(a, b);
	} else if (operator == "÷") {
		return divide(a, b);
	}
}

// equals function to calculate values and output
function equals(btn) {
	let total = 0;
	if (num1 == 0 && num2 == 0) {
		output.innerHTML = 0;
	} else {
		num1 = parseInt(num1);
		num2 = parseInt(num2);
		total = operate(num1, num2, operator);
		num1 = total;
		formula.innerHTML += " " + num2 + " " + btn.value;
		output.innerHTML = total;
		num2 = 0;
	}
}

// Function to reset variables, output and formula display
function clear() {
	output.innerHTML = 0;
	formula.innerHTML = "";
	operator = "";
	operatorCount = 0;
	num1 = 0;
	num2 = 0;
}
