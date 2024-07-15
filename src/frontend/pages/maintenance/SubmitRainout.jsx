import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import '../../styles/admin.styles/RideData.css'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import '../../styles/registration.styles/registrationpage.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Menu, Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { InputLabel } from '@mui/material'
import { TextField } from '@mui/material'
import '../../styles/admin.styles/MaintRep.css'
import { useContext } from 'react'
import { DataContext } from '../../contexts/dataContext'
import axiosApi from '../../axiosInstance'
import EmpHeader from '../../components/admin.components/EmpHeader'
import MaintenanceHeader from '../../components/maintanence.components/MaintenanceHeader'
function SubmitRainout () {
  const { dispatch } = useContext(DataContext)
  const [GameorRide, setGameorRide] = useState('')
  const [rideNames, setRideNames] = useState([])
  const [gameNames, setGameNames] = useState([])
  const [AtrractionNames, setAttractionNames] = useState([])

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
        console.log(response.data.attractionNames)
        setAttractionNames(response.data.attractionNames)
      })
      .catch(error => {
        console.error('Error fetching attraction names:', error)
      })
  }, [])
  const [errorM, setErrorM] = useState('')
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [data, setData] = useState({
    type: 'rides',
    account_id: localStorage.getItem('account_id'),
    first_name: '',
    last_name: '',
    item_id: '',
    date_rainout: ''
  })
  const HandleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
    console.log(data)
  }

  const HandleSubmit = async e => {
    e.preventDefault()

    if (data.date_rainout === '') {
      setErrorM('Please enter a valid date')
      setOpen(true)
      return
    }
    console.log(data.date_rainout)
    const inputDate = data.date_rainout
    const today = Date.now()
    console.log(today)
    console.log(inputDate)
    if (inputDate < today) {
      setErrorM('The date must be today or in the future.')
      setOpen(true)
      return
    }
    if (data.type === '' || data.item_id === '') {
      setErrorM('Please select game or ride and the name of the game or ride.')
      setOpen(true)
      return
    }

    if (data.first_name === '' || data.last_name === '') {
      setErrorM('Please enter your first and last name')
      setOpen(true)
      return
    }
    if (data.end_or_start === '') {
      setErrorM('Please select if the rainout is starting or ending')
      setOpen(true)
      return
    }
    axiosApi
      .post('/admin/submitRainout', data)
      .then(response => {
        if (response.status === 202) {
          console.log(response.data)
          setSuccess(true)
          document.getElementsByClassName('MainDataForm')[0].reset()
        }
        if (response.status === 401) {
          setErrorM(response.data.error)
          setOpen(true)
        }
      })
      .catch(error => {
        console.error('Error fetching maintenance report:', error)
      })
  }
  return (
    <>
      <h1>Add Rainout:</h1>

      <form className='MainDataForm'>
        <FormControl
          style={{ width: '80%', marginBottom: '23px', height: '56px' }}
        >
          <InputLabel id='type'>Game, Ride, or Attraction</InputLabel>
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
              name='date_rainout'
              id='date_rainout'
              label='Rainout Date'
              slotProps={{
                textField: {
                  helperText: 'YYYY-MM-DD'
                }
              }}
              onChange={value => {
                setData({
                  ...data,
                  date_rainout: value.format('YYYY-MM-DD')
                })
              }}
            />
          </FormControl>
        </LocalizationProvider>
        <FormControl
          style={{ width: '80%', margin: '20px', marginBottom: '40px' }}
        >
          <TextField
            variant='outlined'
            label='First Name'
            id='first_name'
            name='first_name'
            onChange={HandleChange}
          />
        </FormControl>
        <FormControl style={{ width: '80%', margin: '20px' }}>
          <TextField
            variant='outlined'
            label='Last Name'
            id='last_name'
            name='last_name'
            onChange={HandleChange}
          />
        </FormControl>
        <Button
          style={{
            width: '80%',
            height: '47%',
            textDecoration: 'bold',
            fontSize: '20px',
            backgroundColor: 'black'
          }}
          variant='contained'
          color='primary'
          onClick={HandleSubmit}
        >
          Submit
        </Button>
      </form>
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
          styles={{ width: '100%' }}
        >
          {errorM}
        </Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          style={{
            marginBottom: '5px',
            width: '100%',
            padding: '10px',
            fontSize: '20'
          }}
          onClose={() => setOpen(false)}
          severity='success'
          variant='filled'
          sx={{ width: '100%' }}
        >
          Request Submitted
        </Alert>
      </Snackbar>
    </>
  )
}

export default SubmitRainout
