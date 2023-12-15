// Declare operator variable
let operator = "";

// Declare variable for number input and total
let num1 = 0;
let num2 = 0;

let formula = document.getElementById("formula");
let formulaText = formula.innerHTML;
document.getElementById("output").maxLength = 5;
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

// Button elements
const btn = document.querySelectorAll("button");
const numeric = document.getElementsByClassName("numeric");
const operatorBtn = document.getElementsByClassName("operator");
const clearBtn = document.getElementById("clear");
const clearEntry = document.getElementById("clear-entry");
const equalsBtn = document.getElementById("equals");
const posandnegBtn = document.getElementById("pos-neg-btn");
const decimalBtn = document.getElementById("decimal-btn");
const percentageBtn = document.getElementById("percentage");

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
				checkLength();
				output.innerHTML = num2;
			}
		} else if (num1 == 0) {
			num1 = this.value;
			output.innerHTML = num1;
		} else {
			num1 += this.value;
			checkLength();
			output.innerHTML = num1;
		}
	});
}

// Limit the amount of numbers allowed
// Disable numeric buttons if greater than 16 numbers
function checkLength() {
	let tempString = output.innerHTML.split("");
	if (tempString.length > 14) {
		for (i of numeric) {
			i.disabled = true;
		}
	}
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
			for (i of numeric) {
				i.removeAttribute("disabled");
			}
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
		num1 = Number(num1);
		num2 = Number(num2);
		total = operate(num1, num2, operator);
		roundTotal(total);
		num1 = total;
		formula.innerHTML += " " + num2 + " " + btn.value;
		output.innerHTML = num1;
		num2 = 0;
	}
}

// Function to round total to two decimal places
function roundTotal(total) {
	if (Number.isInteger(total)) {
		return total;
	} else {
		return total.toFixed(2);
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

// Event listener to change numbers to negative numbers
posandnegBtn.addEventListener("click", function () {
	let num = 0;
	if (output.innerHTML != 0) {
		if (!operator) {
			num = output.innerHTML * -1;
			num1 = num;
			output.innerHTML = num1;
		} else {
			num = output.innerHTML * -1;
			num2 = num;
			output.innerHTML = num2;
		}
	}
});

// Event listener for decimal
// if decimal is already present disable decimal button
decimalBtn.addEventListener("click", function () {
	if (!output.innerHTML.includes(".")) {
		if (!operator) {
			num1 += this.value;
			output.innerHTML = num1;
		} else {
			num2 += this.value;
			output.innerHTML = num2;
		}
	} else {
		decimalBtn.disabled = true;
	}
});

// Event listener to calculate percentage
percentageBtn.addEventListener("click", function () {
	if (operator) {
		num2 = (num1 / 100) * num2;
		output.innerHTML = num2;
	}
});
