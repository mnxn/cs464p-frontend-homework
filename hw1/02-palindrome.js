const elem = document.querySelector("input");
const output = document.querySelector("#output");

elem.addEventListener("input", handleInput);

function handleInput(event) {
  const original = parseFloat(elem.value);
  let reversed = 0;
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
