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
import { Menu, Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import { Select } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { InputLabel } from '@mui/material'
import { TextField } from '@mui/material'
import '../../styles/admin.styles/MaintRep.css'
import { set } from 'date-fns'
import axiosApi from '../../axiosInstance'
import EmpHeader from '../../components/admin.components/EmpHeader'
function MaintenanceReport () {
  const [rideNames, setRideNames] = useState([{}])
  const [GameorRide, setGameorRide] = useState('')
  const [gameNames, setGameNames] = useState([{}])
  const [attractionNames, setAttractionNames] = useState([{}])
  const [error, setError] = useState('')

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
    axiosApi.get('/admin/GetAttractionNames').then(response => {
      setAttractionNames(response.data.attractionNames)
    })
  }, [])

  const [rowData, setRowData] = useState([{}])
  const [columnGDefs, setColumnGDefs] = useState([
    { field: 'game_name', headerName: 'Game Name' },
    { field: 'breakdown_date', headerName: 'Breakdown Date' },
    { field: 'fixed_date', headerName: 'Fixed Date' },
    { field: 'maintainer_firstname', headerName: 'Maintainer First Name' },
    { field: 'maintainer_lastname', headerName: 'Maintainer Last Name' },
    { field: 'maintainer_email', headerName: 'Maintainer Email' },
    { field: 'requester_firstname', headerName: 'Requester First Name' },
    { field: 'requester_lastname', headerName: 'Requester Last Name' },
    { field: 'requester_email', headerName: 'Requester Email' }
  ])
  const [columnRDefs, setColumnRDefs] = useState([
    { field: 'ride_name', headerName: 'Ride Name' },
    { field: 'rained_out', headerName: 'Rained Out' },
    { field: 'breakdown_date', headerName: 'Breakdown Date' },
    { field: 'fixed_date', headerName: 'Fixed Date' },
    { field: 'maintainer_firstname', headerName: 'Maintainer First Name' },
    { field: 'maintainer_lastname', headerName: 'Maintainer Last Name' },
    { field: 'maintainer_email', headerName: 'Maintainer Email' },
    { field: 'requester_firstname', headerName: 'Requester First Name' },
    { field: 'requester_lastname', headerName: 'Requester Last Name' },
    { field: 'requester_email', headerName: 'Requester Email' }
  ])
  const [GameRep, setGameRep] = useState(false)
  const [ShowForm, setShowForm] = useState(true)
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    type: '',
    first_name: '',
    last_name: '',
    name: '',
    start_date: '',
    end_date: '',
    broken: ''
  })
  const HandleChange = e => {
    if (e.target.name === 'last_name' || e.target.name === 'first_name') {
      setData({ ...data, [e.target.name]: '%' + e.target.value + '%' })
    } else {
      setData({ ...data, [e.target.name]: e.target.value })
    }
  }

  const HandleSubmit = async e => {
    e.preventDefault()
    if (data.type === '' || data.name === '') {
      setError(
        'Please select game, ride, or attraction and the name of the game or ride.'
      )
      setOpen(true)
      return
    }
    if (data.start_date && data.end_date && data.start_date > data.end_date) {
      setError('Date Error')
      setOpen(true)
      return
    }
    if (data.start_date && new Date(data.start_date) > new Date()) {
      setError('Date Error')
      setOpen(true)
      return
    }
    axiosApi
      .post('/admin/GetMaintenanceReport', data, {
        timeout: 3000
      })
      .then(response => {
        setRowData(response.data.maintenanceReport)
        if (data.type === 'games') {
          setGameRep(true)
        }
        setShowForm(false)
      })
      .catch(error => {
        console.error('Error fetching maintenance report:', error)
      })
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
              Specify Report Constraints
            </div>
            <div className='MainDataForm'>
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
                    name='name'
                    labelId='name'
                    id='name'
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
                  <InputLabel id='type'> Name</InputLabel>
                  <Select
                    name='name'
                    labelId='name'
                    id='name'
                    label='name'
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
                  <InputLabel id='type'> Name</InputLabel>
                  <Select
                    name='name'
                    labelId='name'
                    id='name'
                    label='name'
                    style={{ height: '100%' }}
                    onChange={HandleChange}
                  >
                    <MenuItem value='*'>All Attractions</MenuItem>

                    {attractionNames.map((attraction, index) => (
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
                      setData({
                        ...data,
                        start_date: value.format('YYYY-MM-DD')
                      })
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
                    onChange={value => {
                      setData({ ...data, end_date: value.format('YYYY-MM-DD') })
                    }}
                  />
                </FormControl>
              </LocalizationProvider>
              <FormControl style={{ width: '80%', margin: '20px' }}>
                <TextField
                  variant='outlined'
                  label='Maintainer  First-Name'
                  id='first_name'
                  name='first_name'
                  onChange={HandleChange}
                />
              </FormControl>
              <FormControl style={{ width: '80%', margin: '20px' }}>
                <TextField
                  variant='outlined'
                  label='Maintainer Last-Name'
                  id='last_name'
                  name='last_name'
                  onChange={HandleChange}
                />
              </FormControl>
              <FormControl
                style={{ width: '80%', marginBottom: '23px', height: '56px' }}
              >
                <InputLabel id='broken'>Broken or Not Broken</InputLabel>
                <Select
                  name='broken'
                  labelId='broken'
                  id='broken'
                  label='broken'
                  style={{ height: '100%' }}
                  onChange={HandleChange}
                >
                  <MenuItem value='0'>Not Broken</MenuItem>
                  <MenuItem value='1'>Broken</MenuItem>
                </Select>
              </FormControl>
              <Button
                style={{
                  width: '80%',
                  height: '44%',
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
                {error}
              </Alert>
            </Snackbar>
          </>
        ) : (
          <div
            className='ag-theme-alpine'
            style={{
              height: '500px',
              width: '80%',
              marginTop: '20px'
            }}
          >
            <AgGridReact
              columnDefs={GameRep ? columnGDefs : columnRDefs}
              rowData={rowData}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default MaintenanceReport
