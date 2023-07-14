let num1 = '';
let num2 = '';
let op = null;
let reset = false;

const digits = document.querySelectorAll('#digit');
const operators = document.querySelectorAll('#operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');
const clearOneButton = document.getElementById('clear-one');
const pointButton = document.getElementById('decimal');
const equationScreen = document.getElementById('equation');
const resultScreen = document.getElementById('result');

// Theme switcher

const toggle = document.getElementById('toggle');
const body = document.body;
toggle.addEventListener('click', tog)

const theme = localStorage.getItem('theme');

if (theme) {
  if (theme === 'light') {
    body.classList = 'light';
  } else {
    body.classList = 'dark';
  }
  toggle.textContent = (theme === 'light') ? 'dark':'light';
}

function tog() {
  if (body.classList.contains('light')){
    toggle.textContent = "light";
    body.classList.replace('light', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    toggle.textContent = "dark";
    body.classList.replace('dark', 'light');
    localStorage.setItem('theme', 'light');
  }
}


// End theme switcher


equalsButton.addEventListener('click', equate);
clearButton.addEventListener('click', clear);
clearOneButton.addEventListener('click', deleteNumber);
window.addEventListener('keydown', keyboardInput);
pointButton.addEventListener('click', appendPoint);

function appendPoint() {
  if (op === null) {
    num1 += ".";
    equationScreen.textContent += ".";
  }
  else {
    num2 += ".";
    equationScreen.textContent += ".";
  }
}


function keyboardInput(e) {
  console.log(e.key)
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === '.') appendPoint(e.key);
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%') appendOperator(e.key);
  if (e.key === 'Enter') equate();
  if (e.key === 'Backspace') deleteNumber();

}

digits.forEach(digit => {
  digit.addEventListener('click', () => appendNumber(digit.textContent));
})
operators.forEach(oper => {
  oper.addEventListener('click', () => appendOperator(oper.textContent));
})

function round (number) {
  return Math.round(number * 1000) / 1000
}

function equate() {
  if (num1 === "" || num2 === "" || op === null) {
    resultScreen.textContent = "Invalid Input";
    return
  }
  resultScreen.textContent = round(operate(num1, num2, op));
  num1 = "";
  num2 = "";
  op = null;
  reset = true;
}

function appendOperator(oper) {
  if (equationScreen.textContent === '0') {
    return
  } else {
      op = oper;
      equationScreen.textContent += oper;
      console.log("op:", op)
  }
}


function appendNumber(number) {
  if (equationScreen.textContent === '0' || reset) {
    num1 += number;
    equationScreen.textContent = number;
    console.log("num1", num1)

    reset = false;
  } else if (op === null) {
    num1 += number;
    console.log("num1", num1);
    equationScreen.textContent += number;
  } else {
      num2 += number;
      console.log("num2", num2);
      equationScreen.textContent += number;
  }
}

function clear() {
  equationScreen.textContent = '0';
  resultScreen.textContent = '';
  num1 = '';
  num2 = '';
  op = null;
  reset = true;
  console.log("after clear 1:", num1)
  console.log("after clear 2:", num2)
  console.log("after clear op:", op)
}
function deleteNumber() {
  console.log(equationScreen.textContent.toString())
  if (equationScreen.textContent === '0' || equationScreen.textContent.length === 1) {
    num1 = num1.slice(0, -1);
    equationScreen.textContent = '0';
    return;
  }
  if (op === null) {
    num1 = num1.slice(0, -1);
  } else if (num2 === '') {
    op = null;
  } else {
    num2 = num2.slice(0, -1);
  }
  equationScreen.textContent = equationScreen.textContent.toString().slice(0, -1);
  console.log('num1 is', num1);
  console.log('num2 is', num2);
  console.log('op is', op);
}

const operate = (A, B, operand) => {
  num1 = Number(A);
  num2 = Number(B);
  switch (operand) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    case '%':
      return num1 % num2;
    default:
      return 'Invalid operand';
  }
}

console.log(num1);
console.log(num2);
