// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

const characterContainer = document.querySelector('#character-container');
const loading = document.querySelector('#loading');

const characterElement = function createCharacterHtmlElement(character) {
  const section = document.createElement('section');
  section.classList.add(
    'character-card',
    'd-inline-block',
    'p-2',
    'text-center',
  );

  const img = document.createElement('img');
  img.classList.add('mb-3');
  img.src = character.imageUrl;
  img.alt = `Picture of ${character.fullName}`;
  img.width = 180;
  img.height = 200;

  const h2 = document.createElement('h2');
  h2.classList.add('fw-bold', 'fs-5');
  h2.textContent = character.fullName;

  const p = document.createElement('p');
  p.classList.add('fw-bold');
  p.textContent = character.title;

  section.append(img, h2, p);
  return section;
};

const updatePage = async function fetchAndUpdatePage() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw response;
    }

    const characters = await response.json();
    characterContainer.replaceChildren(
      ...characters.map(characterElement),
    );
  } catch (error) {
    console.error('Failed to fetch data from thronesapi', error);
    loading.textContent = 'Failed to load character data.';
  }
};

updatePage();
