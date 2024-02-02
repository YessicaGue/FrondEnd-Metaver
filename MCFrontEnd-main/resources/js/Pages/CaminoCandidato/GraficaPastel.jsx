import React from 'react';
import Plotly from 'react-plotly.js';

const GraficaPastel = () => {
  const data = [
    {
      labels: ['Lorem', 'Lorem1'],
      values: [50, 50],
      type: 'pie',
      marker: {
        colors: ['#00B5DA', '#BA00FF'], // Colores para cada sector
      },
    },
  ];

  const layout = {
    // title: 'Titilo de la grafica',
    legend: {
      x: 0.2,
      y: -0.3,
    },
    margin: {
        l: 0,
        r: 0,
        t: 10,
        b: 2, 
      },
  };

  return (
    <div className="">
      <Plotly className='max-w-[200px] max-h-[250px]' data={data} layout={layout} />
    </div>
  );
};

export default GraficaPastel;
