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
import SideNav from '../../components/admin.components/SideNav'
import videos from '../../assets/CoogsParkad.mp4'
import axiosApi from '../../axiosInstance'
import AttendantCal from '../../components/attendant.components/AttendantCal'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import styled from 'styled-components'
import { keyframes } from 'styled-components'
import EmpHeader from '../../components/admin.components/EmpHeader'



function MakeSchedule () {
  const [AllEMP, setAllEMP] = useState([])
  const [shifts, setShifts] = useState([])
  const [rideNames, setRideNames] = useState([{}])
  const [gameNames, setGameNames] = useState([{}])
  const [attractionNames, setAttractionNames] = useState([{}])
  const [GameorRide, setGameorRide] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)

  const [data, setData] = useState({
    type: '',
    name: '',
    employee_id: '',
    shift: '',
    date: ''
  })
  const [Name, setName] = useState('')

  useEffect(() => {
    axiosApi.get('/admin/getAllEmployees').then(res => {
      setAllEMP(res.data.employees)
    })
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

  const HandleSubmit = e => {
    e.preventDefault()
    if (data.type === '') {
      setError('Please select a type')
      setOpen(true)
      return
    }
    if (data.date === '') {
      setError('Please input a date')
      setOpen(true)
      return
    }
    if (data.employee_id === '') {
      setError('Please select an employee')
      setOpen(true)
      return
    }
    if (data.shift === '') {
      setError('Please select a shift')
      setOpen(true)
      return
    }
    if (data.name === '') {
      setError('Please select a game, attraction, or ride')
      setOpen(true)
      return
    }
    if (data.date < new Date()) {
      setError('Date is in the past')
      setOpen(true)
      return
    }
    axiosApi
      .post('/admin/AddShift', data)
      .then(res => {
        setSuccess(true)
      })
      .catch(error => {
        if (error.response.status === 404) {
          setOpen(true)
          setError(error.response.data.message)
        } else {
          setOpen(true)
          console.log('error')
          setError('Error')
        }
      })
  }
  const HandleChange = e => {
    if (e.target.name === 'employee_id') {
      setData({ ...data, employee_id: e.target.value })
      setName(e.target.value)
    } else if (e.target.name === 'name') {
      setData({ ...data, name: e.target.value })
    }
  }
  return (
    <>
      <SideNav />
      <EmpHeader />
      <Popup
        modal
        nested
        overlayStyle={{ backdropFilter: 'blur(5px)' }}
        trigger={
          <div>
            <button
              className='addbtn'
              style={{ marginLeft: '100px', backgroundColor: 'green' }}
            >
              Add Employee
            </button>
          </div>
        }
      >
        {close => (
          <ModalContent>
            <CloseButton className='close' onClick={close}>
              &times;
            </CloseButton>
            <form className='scheduleform'>
              <h1 style={{marginBottom:'30px'}}>Add Employee: </h1>
              <FormControl style={{ width: '100%', marginBottom: '20px' }}>
                <InputLabel id='employee'>Employee</InputLabel>
                <Select
                  variant='outlined'
                  value={Name}
                  labelId='employee_id'
                  id='employee_id'
                  name='employee_id'
                  onChange={HandleChange}
                >
                  {AllEMP.map((emp, index) => (
                    <MenuItem
                      value={emp.account_id}
                      key={emp.first_name + ' ' + emp.last_name}
                    >
                      {emp.first_name + ' ' + emp.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl style={{ width: '100%', marginBottom: '20px' }}>
                <InputLabel id='type'>Shift</InputLabel>
                <Select
                  variant='outlined'
                  labelId='shift'
                  name='shift'
                  onChange={e => setData({ ...data, shift: e.target.value })}
                >
                  <MenuItem value={1} key={1}>
                    8:00a-12:00p
                  </MenuItem>
                  <MenuItem value={2} key={2}>
                    12:00p-4:00p
                  </MenuItem>
                  <MenuItem value={3} key={3}>
                    4:00p-8:00p
                  </MenuItem>
                  <MenuItem value={4} key={4}>
                    8:00p-11:30p
                  </MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormControl
                  components={['DatePicker', 'DatePicker', 'DatePicker']}
                  style={{ width: '100%', marginBottom: '20px' }}
                >
                  <DatePicker
                    inputFormat='YYYY-MM-DD'
                    name='date'
                    id='date'
                    label='Date'
                    onChange={value => {
                      setData({
                        ...data,
                        date: value.format('YYYY-MM-DD')
                      })
                    }}
                  />
                </FormControl>
              </LocalizationProvider>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
              ></LocalizationProvider>
              <FormControl
                style={{ width: '100%', marginBottom: '23px', height: '56px' }}
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
                  style={{
                    width: '100%',
                    marginBottom: '23px',
                    height: '56px'
                  }}
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
                  style={{
                    width: '100%',
                    marginBottom: '23px',
                    height: '56px'
                  }}
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
                  style={{
                    width: '100%',
                    marginBottom: '23px',
                    height: '56px'
                  }}
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
              <Button
                style={{
                  width: '100%',
                  height: '60px',
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
          </ModalContent>
        )}
      </Popup>
      <AttendantCal />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity='error'
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity='success'
          sx={{ width: '100%' }}
        >
          Employee added to schedule
        </Alert>
      </Snackbar>
    </>
  )
}

export default MakeSchedule

const fadeInScaleUp = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`

const ModalContent = styled.div`
  position: relative;

  height: 600px;
  background: linear-gradient(145deg, #ffffff, #f9f9f9);
  border-radius: 10px;
  padding: 20px;
  color: black;
  font-size: 1rem;
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
  font-family: 'pacifico';
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  animation: ${fadeInScaleUp} 0.3s ease-out forwards;
  box-shadow: 0 0 10px rgba(0.3, 0.2, 0.3, 0.4);
  line-height: 1.2;

  /* Further styling */
`
const CloseButton = styled.span`
  cursor: pointer;
  height: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: #ff0000; /* A bright red for contrast and attention */
  transition: all 0.2s ease;

  &:hover {
    color: #e92603; /* Darken the color slightly on hover */
    transform: rotate(90deg); /* Adds a playful twist on hover */
  }
`
