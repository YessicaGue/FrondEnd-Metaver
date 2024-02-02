import React from 'react';
import Plotly from 'react-plotly.js';

const GraficaBarras = () => {
  const data = [
    {
      x: ['Lorem', 'Lorem1', 'Lorem2'],
      y: [55, 65, 45],
      type: 'bar',
      marker: {
        color: ['#60A5FA', '#FF6B6B', '#66DA26'], // Colores para cada barra
      },
    },
  ];

  const layout = {
    margin: {
        l: 20,
        r: 20,
        t: 10,
        b: 20,
      },
  };

  return (
      <div className="">
        <Plotly className='max-w-[200px] max-h-[200px]' data={data} layout={layout} />
      </div>
  );
};

export default GraficaBarras;
