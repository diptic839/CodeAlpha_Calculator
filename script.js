const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');
let expression = '';

function updateDisplay(text) {
  display.textContent = text || '0';
}

function calculate(expr) {
  try {
    let result = Function('"use strict";return (' + expr + ')')();
    if (result === Infinity || result === -Infinity) return 'Error';
    return result;
  } catch {
    return 'Error';
  }
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.getAttribute('data-value');

    if (btn.id === 'clear') {
      expression = '';
      updateDisplay(expression);
      return;
    }

    if (val === '=') {
      const res = calculate(expression);
      updateDisplay(res);
      expression = res === 'Error' ? '' : res.toString();
      return;
    }

    if ('+-*/'.includes(val)) {
      if (expression === '' && val !== '-') return;
      if ('+-*/'.includes(expression.slice(-1))) {
        expression = expression.slice(0, -1) + val;
        updateDisplay(expression);
        return;
      }
    }

    expression += val;
    updateDisplay(expression);
  });
});
