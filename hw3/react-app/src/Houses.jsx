import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

import './Houses.css';

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

const countHouses = function collectHouseLabelsAndCounts(characters) {
  const counter = new Map();
  characters.forEach((c) => {
    const trimmedFamily = c.family.replace(/^House /, '');
    const oldCount = counter.get(trimmedFamily);
    counter.set(trimmedFamily, oldCount === undefined ? 1 : oldCount + 1);
  });

  const labels = [];
  const counts = [];
  let other = 0;

  counter.forEach((count, family) => {
    if (count > 1) {
      labels.push(family);
      counts.push(count);
    } else {
      other += 1;
    }
  });

  if (other >= 1) {
    labels.push('Other');
    counts.push(other);
  }
  return [labels, counts];
};

const chartOptions = {
  aspectRatio: 2,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

const createChartData = function createDataObject(labels, data) {
  return {
    labels,
    datasets: [
      {
        label: 'My First Dataset',
        data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };
};

function Houses() {
  const [chartData, setChartData] = useState(createChartData([], []));

  useEffect(() => {
    const fetchData = async function fetchCharacterHouseData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw response;
        }

        const characters = await response.json();
        const [labels, data] = countHouses(characters);
        setChartData(createChartData(labels, data));
      } catch (error) {
        console.error('Failed to fetch data from thronesapi', error);
        alert('Failed to load character data.');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Card className="p-3">
        <h1 className="my-3 text-center">House Chart</h1>
        <Doughnut
          className="donut-chart"
          data={chartData}
          options={chartOptions}
          aria-label="donut chart"
          role="img"
        ></Doughnut>
      </Card>
    </>
  );
}

export default Houses;
