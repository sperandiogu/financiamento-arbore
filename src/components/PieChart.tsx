import { Chart, registerables } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
Chart.register(...registerables);

const PieChart = ({ data }) => {
  return <Pie data={data} />;
};

export default PieChart;
