// Declare operator variable
const operator = "plus";

// Declare variable for number input and total
let num1 = 1;
let num2 = 1;
let total;

// Declare calculation functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Declare operate function
// Accepts three arguments - 2 numbers and operator
// Calls calculation function based on operator
function operate(a, b, operator) {
	if (operator == "plus") {
		return add(a, b);
	} else if (operator == "minus") {
		return subtract(a, b);
	} else if (operator == "multiply") {
		return multiply(a, b);
	} else if (operator == "divide") {
		return divide(a, b);
	}
}

console.log(operate(num1, num2, operator));
