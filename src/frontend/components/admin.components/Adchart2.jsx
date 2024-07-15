import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import axiosApi from '../../axiosInstance'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function Adchart2 () {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Ride vs Attraction vs Game Popularity'
      }
    }
  }

  const labels = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]
  const RidesArray = Array(labels.length).fill(0)
  const GamesArray = Array(labels.length).fill(0)
  const AttractionsArray = Array(labels.length).fill(0)

  const [chartDataGame, setChartDataGame] = useState([])
  const [chartDataAttraction, setChartDataAttraction] = useState([])
  const [chartDataRide, setChartDataRide] = useState([])
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Rides',
        data: chartDataRide,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 3
      },
      {
        label: 'Attractions',
        data: chartDataAttraction,
        backgroundColor: 'black',
        borderColor: 'black',
        borderWidth:3
      },
      {
        label: 'Games',
        data: chartDataGame,
        backgroundColor: 'grey',
        borderColor: 'grey',
        borderWidth:3
      }
    ]
  }
  useEffect(() => {
    axiosApi.post('/admin/chart2rides').then(res => {
      res.data.chartData.forEach(element => {
        RidesArray[element.day_of_week] = element.rides_visited
      })
        setChartDataRide(RidesArray)
    })
    axiosApi.post('/admin/chart2games').then(res => {
      res.data.chartData.forEach(element => {
        GamesArray[element.day_of_week] = element.games_visited
      })
        setChartDataGame(GamesArray)
    })
    axiosApi.post('/admin/chart2attractions').then(res => {
      res.data.chartData.forEach(element => {
        AttractionsArray[element.day_of_week] = element.attractions_visited
      })
        setChartDataAttraction(AttractionsArray)
    })
  }, [])
  return <Line data={data} options={options} />
}

export default Adchart2
