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
      };
    };
    dataLabels: {
      enabled: boolean;
    };
    xaxis: {
      categories: string[];
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
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: labels,
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
                    type: 'bar' as const,
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
