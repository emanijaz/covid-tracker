import React, {useState} from 'react'
import './Chart.module.css'
import {Line, Bar, Pie} from 'react-chartjs-2';
import 'chart.js/auto';
import styles from './Chart.module.css'
import cx from 'classnames';

import ShowChartIcon from '@mui/icons-material/ShowChart';
import BarChartIcon from '@mui/icons-material/BarChartRounded';
import PieChartTwoToneIcon from '@mui/icons-material/PieChartTwoTone';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart({dailyTotalDeath, dailyTotalConfirmed, dailyDate, currentCountry}) {

  const [chartType, setchartType] = useState('lineChart');

  const handleFormat = (event, type) => {
    setchartType(type);
} ;

  const lineOptions = {
    
      title: { display: true, text: 'Covid Global Summary' },
      zoom: {
        enabled: true,
        mode: 'x',
      },
      // pan: {
      //   enabled: true,
      //   mode: 'x',
      // },
  
  }
  // const pieOptions = {
  //   chart: {
  //     width: 100,
  //     height: 100
  //   }
  // }

  const barOptions = {
    plugins: {
      title: {
        display: false,
        text: `Current State of ${currentCountry}`
      }
    }
  }
  const lineChart =(
    
    dailyTotalDeath.length >0 ? {
    
    labels: dailyDate,
    datasets: [
      {
        label: 'Infected',
        data : dailyTotalConfirmed,
        borderColor: 'rgb(0, 0, 255)',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        fill: true,
      },
      {
        label: 'Recovered',
        data: dailyTotalConfirmed - dailyTotalDeath,
        borderColor: 'rgb(0, 255, 0)',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        // backgroundColor: 'rgba(53, 162, 235, 0.5)',
        fill: true,
      },
      {
        label: 'Deaths',
        data: dailyTotalDeath,
        borderColor: 'rgb(255, 0, 0)',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',
        fill: true,
      },
    ],
  } : null);

  const barChart = (
    dailyTotalDeath.length>0 ? {
      labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: ['rgba(0, 0, 255, 0.5)','rgba(0, 255, 0, 0.5)','rgba(255, 0, 0, 0.5)'],
            // borderColor: 'rgb(0, 255, 0)',
            // borderWidth: 1,
            data: [dailyTotalConfirmed[dailyTotalConfirmed.length-1], dailyTotalConfirmed[dailyTotalConfirmed.length-1] - dailyTotalDeath[dailyTotalDeath.length-1] 
            ,dailyTotalDeath[dailyTotalDeath.length-1]]
          }
        ]
    } : null
  );

  const pieChart = (
    dailyTotalDeath.length>0 ? {
      labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            backgroundColor: ['rgba(0, 0, 255, 0.2)','rgba(0, 255, 0, 0.2)','rgba(255, 0, 0, 0.2)'],
            borderColor: ['rgba(0, 0, 255, 1)','rgba(0, 255, 0, 1)','rgba(255, 0, 0, 1)'],
            // borderWidth: 1,
            data: [dailyTotalConfirmed[dailyTotalConfirmed.length-1], dailyTotalConfirmed[dailyTotalConfirmed.length-1] - dailyTotalDeath[dailyTotalDeath.length-1] 
            ,dailyTotalDeath[dailyTotalDeath.length-1]],
            borderWidth: 1,
          }
        ]
    } : null
  );

  return (

    

    <div className={cx(styles.container)}>
      <ToggleButtonGroup className={cx(styles.toggleButtons)}
      value={chartType}
      exclusive
      onChange={handleFormat}
      aria-label="text alignment"
    >
      <ToggleButton value="lineChart" aria-label="left aligned">
        <ShowChartIcon fontSize="small"  />
      </ToggleButton>
      <ToggleButton value="barChart" aria-label="centered">
        <BarChartIcon fontSize="small"  />
      </ToggleButton>
      {/* <ToggleButton value="pieChart" aria-label="right aligned">
        <PieChartTwoToneIcon fontSize="small" />
      </ToggleButton> */}
    </ToggleButtonGroup>

      {dailyTotalDeath.length >0 && chartType==='lineChart' ? (<Line data={lineChart} options={lineOptions} />) : ""}
      {chartType==='barChart' ? (<Bar data={barChart} options={barOptions} />) : ""}
      {/* {chartType==='pieChart' ? (<Pie width="2%" height="2%" data={pieChart} />) : ""} */}

    </div>
  )
}
