import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import '../../styles/admin.styles/RideData.css'
import MaintenanceSideNav from '../../components/maintanence.components/MainSideNav'
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
import AttendantNav from '../../components/attendant.components/attendantNav'
import EmpHeader from '../../components/admin.components/EmpHeader'

function AttendantMaint () {
  const { dispatch } = useContext(DataContext)
  const [error, setError] = useState('')
  const [GameorRide, setGameorRide] = useState('')
  const [rideNames, setRideNames] = useState([])
  const [gameNames, setGameNames] = useState([])

  useEffect(() => {
    axiosApi
      .get('/admin/GetRideNames')
      .then(response => {
        setRideNames(response.data.rideNames)
      })
      .catch(error => {
        console.error('Error fetching ride names:', error)
      })
    axiosApi
      .get('/admin/GetGameNames')
      .then(response => {
        setGameNames(response.data.gameNames)
      })
      .catch(error => {
        console.error('Error fetching game names:', error)
      })
  }, [])

  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [data, setData] = useState({
    type: '',
    account_id: localStorage.getItem('account_id'),
    first_name: '',
    last_name: '',
    item_id: '',
    breakdown_date: '',
    description: ''
  })
  const HandleChange = e => {
    if (e.target.name === 'last_name' || e.target.name === 'first_name') {
      setData({ ...data, [e.target.name]: e.target.value })
    } else {
      setData({ ...data, [e.target.name]: e.target.value })
    }
  }

  const HandleSubmit = async e => {
    e.preventDefault()

    if (data.type === '' || data.item_id === '') {
      setError('Please select game or ride and the name of the game or ride.')
      setOpen(true)
      return
    }
    if (data.description.length < 5) {
      setError('Please enter a valid description')
      setOpen(true)
      return
    }
    if (data.description.length > 150) {
      setError('Description must be > 150 characters')
      setOpen(true)
      return
    }
    if (data.first_name === '' || data.last_name === '') {
      setError('Please enter your first and last name')
      setOpen(true)
      return
    }
    if (data.breakdown_date === '') {
      setError('Please enter a breakdown date')
      setOpen(true)
      return
    }
    if (
      data.breakdown_date &&
      new Date(data.breakdown_date) > new Date(Date.now())
    ) {
      setError('Invalid Date')
      setOpen(true)
      return
    }
    axiosApi
      .post('/maintenance/maintenanceRequest', data, {
        timeout: 3000
      })
      .then(response => {
        if (response.status === 202) {
          setSuccess(true)
          setOpen(true)
          document.getElementsByClassName('MainDataForm')[0].reset()
        }
      })
      .catch(error => {
        console.error('Error fetching maintenance report:', error)
      })
  }
  return (
    <>
      <AttendantNav />
      <EmpHeader />
      <div className='RideDataContainer'>
        <>
          <div
            style={{
              marginBottom: '15px',
              fontSize: '30px',
              fontFamily: 'Roboto'
            }}
          >
            Submit Maintenance Request
          </div>
          <form className='MainDataForm'>
            <FormControl
              style={{ width: '80%', marginBottom: '23px', height: '56px' }}
            >
              <InputLabel id='type'>Game or Ride</InputLabel>
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
              </Select>
            </FormControl>
            {GameorRide === 'rides' ? (
              <FormControl
                style={{ width: '80%', marginBottom: '23px', height: '56px' }}
              >
                <InputLabel id='ride_name'>Ride Name</InputLabel>
                <Select
                  name='item_id'
                  labelId='ride_name'
                  id='item_id'
                  label='Ride Name'
                  style={{ height: '100%' }}
                  onChange={HandleChange}
                >
                  <MenuItem value='*'>All Rides</MenuItem>
                  {rideNames.map((ride, index) => {
                    return (
                      <MenuItem key={ride.name} value={ride.ride_id}>
                        {ride.name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            ) : (
              <FormControl
                style={{ width: '80%', marginBottom: '23px', height: '56px' }}
              >
                <InputLabel id='game_name'>Game Name</InputLabel>
                <Select
                  name='name'
                  labelId='game_name'
                  id='name'
                  label='Ride Name'
                  style={{ height: '100%' }}
                  onChange={HandleChange}
                >
                  <MenuItem value='*'>All Games</MenuItem>
                  {gameNames.map((game, index) => {
                    return (
                      <MenuItem key={game.name} value={game.game_id}>
                        {game.name}
                      </MenuItem>
                    )
                  })}
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
                  name='breakdown_date'
                  id='breakdown_date'
                  label='Breakdown Date'
                  slotProps={{
                    textField: {
                      helperText: 'YYYY-MM-DD'
                    }
                  }}
                  onChange={value => {
                    setData({
                      ...data,
                      breakdown_date: value.format('YYYY-MM-DD')
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
            <FormControl style={{ width: '80%' }}>
              <TextField
                styles={{ height: '800px', width: '100%' }}
                variant='outlined'
                multiline
                rows={6}
                label='Description'
                id='description'
                name='description'
                onChange={HandleChange}
              />
            </FormControl>
            <Button
              style={{
                width: '80%',
                height: '32%',
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
                width: '300px',
                padding: '10px',
                fontSize: '20'
              }}
              onClose={() => setOpen(false)}
              severity='error'
              variant='filled'
              styles={{ width: '100%' }}
            >
              {error}
            </Alert>
          </Snackbar>
          <Snackbar
            open={success}
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
              severity='success'
              variant='filled'
              sx={{ width: '100%' }}
            >
              Request Submitted
            </Alert>
          </Snackbar>
        </>
      </div>
    </>
  )
}

export default AttendantMaint
