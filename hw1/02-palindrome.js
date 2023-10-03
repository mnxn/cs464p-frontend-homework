const elem = document.querySelector("input");
const output = document.querySelector("#output");

elem.addEventListener("input", handleInput);

function handleInput(event) {
  const original = parseFloat(elem.value);

  if (isNaN(original)) {
    output.className = "";
    output.textContent = "";
    return;
  } else if (original < 0) {
    output.className = "text-danger";
    output.textContent = "Input must not be negative.";
    return;
  } else if (original % 1 !== 0) {
    output.className = "text-danger";
    output.textContent = "Input must not have a decimal component.";
    return;
  }

  let reversed = 0;

  // The Math.floor technique for integer division is from
  // https://stackoverflow.com/a/4228376
  //
  // Since numbers in JavaScript are floating point, the division operator
  // does not do integer division. The floor function removes the decimal
  // component and allows the loop to terminate when x reaches zero.
  for (let x = original; x > 0; x = Math.floor(x / 10)) {
    reversed *= 10;
    reversed += x % 10;
    console.log(x, reversed);
  }

  if (reversed === original) {
    output.className = "text-success";
    output.textContent = "Yes. This is a palindrome!";
  } else {
    output.className = "text-danger";
    output.textContent = "No. Try again.";
  }
}
