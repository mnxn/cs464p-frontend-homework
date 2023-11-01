import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; /// Chart.js fails to load without this import.

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

// Count the number of houses with more than one character.
// Houses with only one characters are grouped into the other category.
const countHouses = function collectHouseLabelsAndCounts(characters) {
  const counter = new Map();
  characters.forEach((c) => {
    // Normalize the family field by removing the House prefix.
    // Sometimes the data lists the same house both with and without the 'House' prefix.
    const trimmedFamily = c.family.replace(/^House /, '');
    const oldCount = counter.get(trimmedFamily);
    counter.set(
      trimmedFamily,
      oldCount === undefined
        ? 1 : oldCount + 1, // default to 1 if family is not already in the map
    );
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
  aspectRatio: 2, // Rectangular chart.
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

// Create the chart data from the provided labels and data.
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

const Houses = function HousesComponent({ characters }) {
  const [chartData, setChartData] = useState(createChartData([], []));

  useEffect(() => {
    const [labels, data] = countHouses(characters);
    setChartData(createChartData(labels, data));
  }, [characters]);

  return (
    <Card className="p-3">
      <h1 className="my-3 text-center">House Chart</h1>
      <Doughnut
        className="donut-chart"
        data={chartData}
        options={chartOptions}
        aria-label="donut chart"
        role="img"
      />
    </Card>
  );
};

export default Houses;
