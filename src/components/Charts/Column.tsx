'use client';

import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

interface ColumnChartProps {
  data: number[];
  labels: string[];
}

interface ChartData {
  series: {
    name: string;
    data: number[];
  }[];
  options: {
    chart: {
      type: string;
      height: number;
    };
    plotOptions: {
      bar: {
        borderRadius: number;
        horizontal: boolean;
        distributed: boolean;
      };
    };
    dataLabels: {
      enabled: boolean;
    };
    xaxis: {
      categories: string[];
    };
    fill: {
      colors: string[];
    };
  };
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data, labels }) => {
  const [chartData, setChartData] = useState<ChartData>({
    series: [
      {
        name: 'Sales',
        data: data,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: labels,
      },
      fill: {
        colors: [
          '#008FFB',
          '#00E396',
          '#FEB019',
          '#FF4560',
          '#775DD0',
          '#546E7A',
          '#26a69a',
          '#D10CE8',
          '#FF7F50',
          '#FFD700',
        ],
      },
    },
  });

  useEffect(() => {
    setChartData({
      series: [
        {
          name: 'Sales',
          data: data,
        },
      ],
      options: {
        ...chartData.options,
        xaxis: {
          categories: labels,
        },
      },
    });
  }, [data, labels]);

  return (
    <div className='column-chart'>
      <Chart
        options={{
          ...chartData.options,
          chart: {
            type: 'bar',
            height: 350,
          },
        }}
        series={chartData.series}
        type='bar'
        height={350}
      />
    </div>
  );
};

export default ColumnChart;
