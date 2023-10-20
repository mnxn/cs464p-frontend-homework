const textContainer = document.querySelector('#text');
const input = document.querySelector('#word-input');

const handleKeyDown = function handleKeyDown(event) {
  // only highlight on enter
  if (event.key !== 'Enter') return;

  const target = input.value;

  textContainer.innerHTML = textContainer.textContent
    .split(/\b/) // split by word boundary
    .map(
      (word) => word.replace(
        // case insensitive find, match whole string
        new RegExp(`^${target}$`, 'i'),
        // replace with span around original text
        '<span class="highlight">$&</span>',
      ),
    )
    .join(''); // join back to a string
};

input.addEventListener('keydown', handleKeyDown);
