const textContainer = document.querySelector('#text');
const input = document.querySelector('#word-input');

const originalText = textContainer.textContent;

const handleKeyDown = function handleKeyDown(event) {
  event.preventDefault();

  if (event.key.length === 1) {
    // Checking the length of the key property of the event is a simple way to
    // check if it is a character that is being written by the user instead of
    // a non-character key like Control, Backspace, etc. According to the linked
    // answer below, all inputted characters have have a length of 1 for the key
    // property, and are therefore safe to append to the input value.
    //
    // Method originally found here: https://stackoverflow.com/a/49612427
    input.value += event.key;
  } else if (event.key === 'Backspace') {
    // Since the default event handling is being prevented above, backspacing
    // must be implemented manually by removing the last string character.
    input.value = input.value.slice(0, -1);
  }

  const target = input.value;
  if (target === '') {
    textContainer.textContent = originalText;
  } else {
    // find target surrounded by word boundaries, globally (all results)
    const regexp = new RegExp(`\\b${target}\\b`, 'g');
    textContainer.innerHTML = originalText.replace(
      regexp,
      `<span class="highlight">${target}</span>`,
    );
  }
};

input.addEventListener('keydown', handleKeyDown);
