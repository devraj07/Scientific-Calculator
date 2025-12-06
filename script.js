const display = document.getElementById("display");
const keys = document.querySelector(".keys");

function append(char) {
  if (display.value === "Error") display.value = "";
  display.value += char;
}

function clearDisplay() {
  display.value = "";
}

function backspace() {
  if (display.value === "Error") {
    display.value = "";
  } else {
    display.value = display.value.slice(0, -1);
  }
}

function calculate() {
  if (!display.value) return;

  let expr = display.value;

  // Replace symbols with JavaScript Math equivalents
  expr = expr.replace(/π/g, "Math.PI");
  expr = expr.replace(/sqrt\(/g, "Math.sqrt(");
  expr = expr.replace(/log\(/g, "Math.log10("); // log base 10
  expr = expr.replace(/ln\(/g, "Math.log("); // natural log

  // trig functions (in radians)
  expr = expr.replace(/sin\(/g, "Math.sin(");
  expr = expr.replace(/cos\(/g, "Math.cos(");
  expr = expr.replace(/tan\(/g, "Math.tan(");

  // exponent ^ to **
  expr = expr.replace(/\^/g, "**");

  try {
    const result = Function('"use strict"; return (' + expr + ")")();
    if (result === undefined || Number.isNaN(result)) {
      display.value = "Error";
    } else {
      display.value = result.toString();
    }
  } catch (e) {
    display.value = "Error";
  }
}

// Handle button clicks
keys.addEventListener("click", (event) => {
  const button = event.target;
  if (button.tagName !== "BUTTON") return;

  const value = button.dataset.value;
  const action = button.dataset.action;

  if (action === "clear") {
    clearDisplay();
  } else if (action === "backspace") {
    backspace();
  } else if (action === "calculate") {
    calculate();
  } else if (value !== undefined) {
    append(value);
  }
});

// Optional: basic keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "Enter") {
    event.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape") {
    clearDisplay();
  } else if ("0123456789.+-*/()".includes(key)) {
    append(key);
  }
});
