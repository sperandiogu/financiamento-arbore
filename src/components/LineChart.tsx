import { Chart, registerables } from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';
Chart.register(...registerables);

const LineChart = ({ data }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
