import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
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
import axiosApi from '../../axiosInstance'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import SubmitRainout from '../maintenance/SubmitRainout'
import Popup from 'reactjs-popup'
import styled from 'styled-components'
import { keyframes } from 'styled-components'
import { Close } from '@mui/icons-material'
import EmpHeader from '../../components/admin.components/EmpHeader'

function EndRainout () {
  const [rowData, setrowData] = useState([])
  const [GameorRide, setGameorRide] = useState('')
  const [rideNames, setRideNames] = useState([])
  const [gameNames, setGameNames] = useState([])
  const [AtrractionNames, setAttractionNames] = useState([])
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'Name', field: 'name' },
    { headerName: 'Rainout Date', field: 'date_rainout' },
    { headerName: 'First Name', field: 'requester_first_name' },
    { headerName: 'Last Name', field: 'requester_last_name' },
    { headerName: 'Requester Email', field: 'requester_email' }
  ])

  useEffect(() => {
    axiosApi
      .post('/admin/GetRideNamesRO')
      .then(response => {
        console.log(response.data.rideNames)
        setRideNames(response.data.rideNames)
      })
      .catch(error => {
        console.error('Error fetching ride names:', error)
      })
    axiosApi
      .post('/admin/GetGameNamesRO')
      .then(response => {
        setGameNames(response.data.gameNames)
      })
      .catch(error => {
        console.error('Error fetching game names:', error)
      })
    axiosApi
      .post('/admin/GetAttractionNamesRO')
      .then(response => {
        console.log(response.data.attractionNames)
        setAttractionNames(response.data.attractionNames)
      })
      .catch(error => {
        console.error('Error fetching attraction names:', error)
      })
    axiosApi.get('admin/GetRainouts').then(response => {
      setrowData(response.data.rainouts)
    })
  }, [])
  const HandleAddRainout = async () => {
  axiosApi
    .post('/admin/GetRideNamesFRO')
    .then(response => {
      setRideNames(response.data.rideNames)
    })
    .catch(error => {
      console.error('Error fetching ride names:', error)
    })
}

  const [errorM, setErrorM] = useState('')
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [data, setData] = useState({
    type: 'rides',
    account_id: localStorage.getItem('account_id'),
    first_name: '',
    last_name: '',
    item_id: '',
    end_date: ''
  })
  const HandleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
    console.log(data)
  }

  const HandleSubmit = async e => {
    e.preventDefault()
    console.log(data)

    if (data.end_date === '') {
      setErrorM('Please enter a valid date')
      setOpen(true)
      return
    }
    console.log(data.end_date)
    const inputDate = data.end_date
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
    axiosApi
      .post('/admin/EndRainout', data)
      .then(response => {
        if (response.status === 202) {
          if (data.type === 'rides') {
            setRideNames(prev =>
              prev.filter(ride => ride.ride_id !== data.item_id)
            )
          } else if (data.type === 'games') {
            setGameNames(prev =>
              prev.filter(game => game.game_id !== data.item_id)
            )
          } else if (data.type === 'attractions') {
            setAttractionNames(prev =>
              prev.filter(
                attraction => attraction.attraction_id !== data.item_id
              )
            )
          }
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
      <AdminSideNav height={1000} />
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
            Submit Rainout Request
          </div>
          <div style={{ display: 'flex', marginBottom: '20px' }}>
            <Popup
              trigger={
                <Button color='primary' variant='contained'>
                  Add Rainout
                </Button>
              }
              modal
              nested
            >
              {close => (
                <ModalContent>
                  <CloseButton onClick={close}>x</CloseButton>
                  <SubmitRainout onSuccess={HandleAddRainout} />
                </ModalContent>
              )}
            </Popup>
            <Popup
              trigger={
                <Button
                  color='secondary'
                  variant='contained'
                  style={{ marginLeft: '10px' }}
                >
                  End Rainout
                </Button>
              }
              modal
              nested
            >
              {close => (
                <ModalContent>
                  <h1>End Rainout:</h1>
                  <CloseButton onClick={close}>x</CloseButton>;
                  <form className='MainDataForm'>
                    <FormControl
                      style={{
                        width: '80%',
                        marginBottom: '23px',
                        height: '56px'
                      }}
                    >
                      <InputLabel id='type'>
                        Game, Ride, or Attraction
                      </InputLabel>
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
                          width: '80%',
                          marginBottom: '23px',
                          height: '56px'
                        }}
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
                        style={{
                          width: '80%',
                          marginBottom: '23px',
                          height: '56px'
                        }}
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
                        style={{
                          width: '80%',
                          marginBottom: '23px',
                          height: '56px'
                        }}
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
                          name='end_date'
                          id='end_date'
                          label='End Rainout Date'
                          slotProps={{
                            textField: {
                              helperText: 'YYYY-MM-DD'
                            }
                          }}
                          onChange={value => {
                            setData({
                              ...data,
                              end_date: value.format('YYYY-MM-DD')
                            })
                          }}
                        />
                      </FormControl>
                    </LocalizationProvider>
                    <FormControl
                      style={{
                        width: '80%',
                        margin: '20px',
                        marginBottom: '40px'
                      }}
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
                </ModalContent>
              )}
            </Popup>
          </div>
          <div
            className='ag-theme-alpine'
            style={{ height: '500px', width: '70%' }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              domLayout='autoHeight'
              pagination={true}
              paginationPageSize={10}
              
            />
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
      </div>
    </>
  )
}

export default EndRainout
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
  display: flex;
  flex-direction: column;
  height: auto;
  width: auto;
  align-items: center; // Center children horizontally in the flex container
  justify-content: center; // Center children vertically in the flex container
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  animation: ${fadeInScaleUp} 0.3s ease-out forwards;
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
