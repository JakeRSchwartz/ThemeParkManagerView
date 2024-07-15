import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import '../../styles/admin.styles/RideData.css'
import AdminSideNav from '../../components/admin.components/SideNav'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import '../../styles/registration.styles/registrationpage.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import axiosApi from '../../axiosInstance'
import { Select, MenuItem, InputLabel } from '@mui/material'
import EmpHeader from '../../components/admin.components/EmpHeader'
import { Bar } from 'react-chartjs-2'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { format } from 'date-fns'
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

function GameData () {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Tickets Sold',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)'
      }
    ]
  })

  const [rowData, setRowData] = useState([{}])
  const [GameorRide, setGameorRide] = useState('')
  const [rideNames, setRideNames] = useState([])
  const [gameNames, setGameNames] = useState([])
  const [AtrractionNames, setAttractionNames] = useState([])
  const [columnDefs, setColumnDefs] = useState([
    { field: 'date', headerName: 'Visit Date' },
    { field: 'first_name', headerName: 'First Name' },
    { field: 'last_name', headerName: 'Last Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'name', headerName: 'Activity Name' },
    { field: 'total_spent', headerName: 'Total Spent ($)' },
    { field: 'total_tickets', headerName: 'Total Tickets' }
  ])
  const [ShowForm, setShowForm] = useState(true)
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    start_date: '',
    end_date: '',
    type: '',
    item_id: ''
  })
  useEffect(() => {
    axiosApi
      .post('/admin/GetRideNamesFRO')
      .then(response => {
        setRideNames(response.data.rideNames)
      })
      .catch(error => {
        console.error('Error fetching ride names:', error)
      })
    axiosApi
      .post('/admin/GetGameNamesFRO')
      .then(response => {
        setGameNames(response.data.gameNames)
      })
      .catch(error => {
        console.error('Error fetching game names:', error)
      })
    axiosApi
      .post('/admin/GetAttractionNamesFRO')
      .then(response => {
        setAttractionNames(response.data.attractionNames)
      })
      .catch(error => {
        console.error('Error fetching attraction names:', error)
      })
  }, [])
  const HandleChange = e => {
    setData({ ...data, item_id: e.target.value })
  }

  const HandleSubmit = async e => {
    e.preventDefault()
    if (data.type === '') {
      setOpen(true)
      return
    }
    if (data.item_id === '') {
      setOpen(true)
      return
    }

    if (data.start_date === '' || data.end_date === '') {
      setOpen(true)
      return
    }
    const formattedData = {
      start_date: data.start_date ? data.start_date.format('YYYY-MM-DD') : null,
      end_date: data.end_date ? data.end_date.format('YYYY-MM-DD') : null,
      type: data.type,
      item_id: data.item_id
    }
    if (formattedData && formattedData.start_date > formattedData.end_date) {
      setOpen(true)
      return
    }
    if (
      formattedData.start_date &&
      new Date(formattedData.start_date) > new Date()
    ) {
      setOpen(true)
      return
    }

    console.log(formattedData)
    axiosApi
      .post('/admin/GetGameData', formattedData)
      .then(response => {
        setRowData(response.data.Data)
        setShowForm(false)
      })
      .catch(error => {
        console.log(error)
      })
    axiosApi.post('/admin/GetActivityGraph', formattedData).then(response => {
      if (response.status === 203) {
        const names = response.data.activityData.map(item => item.name)
        const tickets = response.data.activityData.map(item => item.tickets)

        setChartData({
          labels: names,
          datasets: [
            {
              label: 'Tickets Sold',
              data: tickets,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)'
            }
          ]
        })
      }
      if (response.status === 202) {
        const dates = response.data.activityData.map(item => item.date)
        const tickets = response.data.activityData.map(item => item.tickets)
        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Tickets Sold',
              data: tickets,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)'
            }
          ]
        })
      }
    })
  }
  const options = {
    scales: {
      y: {
        label: 'Tickets Sold'
      }
    }
  }

  return (
    <>
      <AdminSideNav height={1000} />
      <EmpHeader />
      <div className='RideDataContainer'>
        {ShowForm ? (
          <>
            <div
              style={{
                marginBottom: '15px',
                fontSize: '30px',
                fontFamily: 'Roboto'
              }}
            >
              Specify usage date range
            </div>
            <div className='RideDataForm'>
              <FormControl
                style={{ width: '80%', marginBottom: '23px', height: '60px' }}
              >
                <InputLabel id='type'>Rides, Games, or Attractions</InputLabel>
                <Select
                  value={GameorRide}
                  name='type'
                  labelId='type'
                  id='type'
                  label='Rides or Games'
                  style={{ height: '100%' }}
                  onChange={e => {
                    setGameorRide(e.target.value)
                    setData({ ...data, type: e.target.value })
                  }}
                >
                  <MenuItem value='rides'>Rides</MenuItem>
                  <MenuItem value='games'>Games</MenuItem>
                  <MenuItem value='attractions'>Attractions</MenuItem>
                </Select>
              </FormControl>
              {data.type === 'rides' && (
                <FormControl
                  style={{ width: '80%', marginBottom: '23px', height: '56px' }}
                >
                  <InputLabel id='name_label'> Name</InputLabel>
                  <Select
                    name='item_id'
                    labelId='item_id'
                    id='item_id'
                    label='Name'
                    style={{ height: '100%' }}
                    onChange={HandleChange}
                  >
                    <MenuItem value='*'>All Rides</MenuItem>

                    {rideNames.map((ride, index) => (
                      <MenuItem key={ride.name} value={ride.ride_id}>
                        {ride.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {data.type === 'games' && (
                <FormControl
                  style={{ width: '80%', marginBottom: '23px', height: '56px' }}
                >
                  <InputLabel id='name_label'> Name</InputLabel>
                  <Select
                    name='item_id'
                    labelId='item_id'
                    id='item_id'
                    label='Name'
                    style={{ height: '100%' }}
                    onChange={HandleChange}
                  >
                    <MenuItem value='*'>All Games</MenuItem>

                    {gameNames.map((game, index) => (
                      <MenuItem key={game.name} value={game.game_id}>
                        {game.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {data.type === 'attractions' && (
                <FormControl
                  style={{ width: '80%', marginBottom: '23px', height: '56px' }}
                >
                  <InputLabel id='name_label'> Name</InputLabel>
                  <Select
                    name='item_id'
                    labelId='item_id'
                    id='item_id'
                    label='Name'
                    style={{ height: '100%' }}
                    onChange={HandleChange}
                  >
                    <MenuItem value='*'>All Attractions</MenuItem>

                    {AtrractionNames.map((attraction, index) => (
                      <MenuItem
                        key={attraction.name}
                        value={attraction.attraction_id}
                      >
                        {attraction.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl
                  components={['DatePicker', 'DatePicker', 'DatePicker']}
                  style={{ width: '80%', margin: '20px' }}
                >
                  <DatePicker
                    inputFormat='YYYY-MM-DD'
                    name='start_date'
                    id='start_date'
                    label='Start Date'
                    slotProps={{
                      textField: { helperText: 'Leave empty for all dates' }
                    }}
                    onChange={value => {
                      setData({ ...data, start_date: value })
                    }}
                  />
                </FormControl>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl
                  components={['DatePicker', 'DatePicker', 'DatePicker']}
                  style={{ width: '80%', margin: '20px' }}
                >
                  <DatePicker
                    name='end_date'
                    id='end_date'
                    label='End Date'
                    inputFormat='YYYY-MM-DD'
                    slotProps={{
                      textField: { helperText: 'Leave empty for all dates' }
                    }}
                    onChange={date => {
                      setData({ ...data, end_date: date })
                      console.log(data)
                    }}
                  />
                </FormControl>
              </LocalizationProvider>
              <Button
                style={{
                  width: '80%',
                  height: '55px',
                  textDecoration: 'bold',
                  fontSize: '20px',
                  backgroundColor: 'black',
                  marginBottom: '20px'
                }}
                variant='contained'
                color='primary'
                onClick={HandleSubmit}
              >
                Submit
              </Button>
            </div>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={() => setOpen(false)}
            >
              <Alert
                style={{
                  marginBottom: '5px',
                  width: '100%',
                  padding: '10px',
                  fontSize: '20'
                }}
                onClose={() => setOpen(false)}
                severity='error'
                variant='filled'
                sx={{ width: '100%' }}
              >
                Please Enter all data
              </Alert>
            </Snackbar>
          </>
        ) : (
          <div>
            <div
              className='ag-theme-alpine'
              style={{ height: 600, width: 1100, margin: 'auto' }}
            >
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                animateRows='true'
                pagination='true'
                paginationPageSize='10'
              />
            </div>
            <div style={{top:'0'}}>
              {data.item_id === '*' ? (
                <Bar
                  data={chartData}
                  options={options}
                  style={{
                    width: 700,
                    margin: 700,
                    margin:'auto',
                    marginBottom: '200px'
                  }}
                />
              ) : (
                <Line
                  data={chartData}
                  options={options}
                  style={{
                    width: 700,
                    margin: 700,
                    margin:'auto',
                    marginBottom: '200px'
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default GameData
