import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosApi from '../../axiosInstance'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar, Chart } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function AdminChart1 () {
  const labels = [
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
    `Sunday`
  ]
  const [chartData, setChartData] = useState([])
  const [chartLabels, setChartLabels] = useState([])
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: ' This Weeks Park Population'
      }
    }
  }
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Entry Passes Purchased',
        data: chartData,
        backgroundColor: 'red',
        borderColor: 'black',
        borderWidth: 2
      }
    ]
  }
  const passesPurchasedPerDay = Array(labels.length).fill(0)
  useEffect(() => {
    axiosApi
      .post('/admin/adminchart1')
      .then(res => {
        res.data.chartData.forEach(item => {
          passesPurchasedPerDay[item.day_of_week - 1] = item.passes_purchased // Subtract 1 from day_of_week to match array index
        })
        setChartData(passesPurchasedPerDay)
        console.log(passesPurchasedPerDay)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [])

  return <Bar data={data} options={options} />
}

export default AdminChart1
