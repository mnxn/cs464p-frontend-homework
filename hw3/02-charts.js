const backgroundColors = [
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(255, 99, 132, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(199, 199, 199, 0.8)',
  'rgba(83, 102, 255, 0.8)',
  'rgba(40, 159, 64, 0.8)',
  'rgba(210, 199, 199, 0.8)',
  'rgba(78, 52, 199, 0.8)',
];

const borderColors = [
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(159, 159, 159, 1)',
  'rgba(83, 102, 255, 1)',
  'rgba(40, 159, 64, 1)',
  'rgba(210, 199, 199, 1)',
  'rgba(78, 52, 199, 1)',
];

// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

const loading = document.querySelector('#loading');

// Create a donut chart with the provided labels/data and update the page.
const renderChart = function renderDonutChart(labels, data) {
  const donutChart = document.querySelector('.donut-chart');

  new Chart(donutChart, {
    type: 'doughnut',
    options: {
      legend: {
        position: 'bottom',
      },
    },
    data: {
      labels,
      datasets: [
        {
          label: 'Number of Characters',
          data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
  });
};

// Normalize the family field by removing the House prefix and fixing house typos.
// Sometimes the data lists the same house both with and without the 'House' prefix.
const normalizeFamily = function normalizeFamilyName(family) {
  const trimmed = family.replace(/^House /, '');

  switch (trimmed) {
    case 'Targaryan':
      return 'Targaryen';

    case 'Lanister':
      return 'Lannister';

    case 'Lorathi':
      return 'Lorath';

    case '':
    case 'None':
    case 'Unkown':
      return 'Unknown';

    default:
      return trimmed;
  }
};

// Count the number of houses with more than one character.
// Houses with only one characters are grouped into the other category.
const countHouses = function collectHouseLabelsAndCounts(characters) {
  const counter = new Map();
  characters.forEach((c) => {
    const family = normalizeFamily(c.family);
    const oldCount = counter.get(family);
    counter.set(
      family,
      oldCount === undefined
        ? 1 : oldCount + 1, // default to 1 if family is not already in the map
    );
  });

  const labels = [];
  const counts = [];
  let other = 0;

  // Iterate over all family counts to create the label and data arrays for the chart.
  // If there is only 1 character in the family, or the family is unknown,
  // the count is grouped into the Other family.
  counter.forEach((count, family) => {
    if (count > 1 && family !== 'Unknown') { // group unknown into other
      labels.push(family);
      counts.push(count);
    } else {
      other += count;
    }
  });

  if (other >= 1) {
    labels.push('Other');
    counts.push(other);
  }
  return [labels, counts];
};

// Fetch all characters from the API and render the chart with the house counts.
const updatePage = async function fetchAndUpdatePage() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw response;
    }

    const characters = await response.json();
    const [labels, data] = countHouses(characters);
    loading.remove();
    renderChart(labels, data);
  } catch (error) {
    console.error('Failed to fetch data from thronesapi', error);
    loading.textContent = 'Failed to load character data.';
  }
};

updatePage();
