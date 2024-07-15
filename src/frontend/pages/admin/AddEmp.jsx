import React from 'react'
import { Button } from 'flowbite-react'
import '../../styles/registration.styles/registrationpage.css'
import { useState } from 'react'
import videos from '../../assets/CoogsPark.mp4'
import { Alert } from '@mui/material'
import { Snackbar } from '@mui/material'
import { TextField } from '@mui/material'
import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'
import { InputLabel } from '@mui/material'
import { FormControl } from '@mui/material'
import styled from 'styled-components'
import AdminSideNav from '../../components/admin.components/SideNav'
import axiosApi from '../../axiosInstance'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { keyframes } from 'styled-components'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { useEffect } from 'react'
import EmpHeader from '../../components/admin.components/EmpHeader'

function AddEmp () {
  const passregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/
  const emailregex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const [formClick, setFormClick] = useState(-100)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const [inpErr, setInpErr] = useState({
    first_nameErr: false,
    last_nameErr: false,
    emailErr: false,
    passwordErr: false,
    confirm_passwordErr: false,
    dobErr: false,
    heightErr: false,
    phoneErr: false
  })
  const [rowData, setRowData] = useState([{}])

  const [columnDefs, setColumnDefs] = useState([
    { field: 'account_id', headerName: 'User ID', checkboxSelection: true },
    { field: 'first_name', headerName: 'First Name' },
    { field: 'last_name', headerName: 'Last Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'phone', headerName: 'Phone' },
    { field: 'user_type', headerName: 'Role' }
  ])
  useEffect(() => {
    axiosApi
      .get('/admin/GetEmployees')
      .then(res => {
        setRowData(res.data.employees)
        console.log(rowData)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
    setSuccess(false)
  }
  const [confirm_pass, setconfirm_pass] = useState('')
  const [userInfo, setuserInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    dob: '',
    user_type: '',
    wage: ''
  })

  const handleConfirmPass = e => {
    setconfirm_pass(e.target.value)
  }

  const handleChange = e => {
    setInpErr({
      ...inpErr,
      [e.target.name + 'Err']: false
    })
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (userInfo.first_name.length < 2) {
      setError('First name must be at least 2 characters')
      setInpErr({ ...inpErr, first_nameErr: true })
      setOpen(true)
      return
    }
    if (userInfo.user_type === '') {
      setError('Please select a user type')
      setOpen(true)
      return
    }
    if (userInfo.last_name.length < 2) {
      setError('Last name must be at least 2 characters')
      setInpErr({ ...inpErr, last_nameErr: true })
      setOpen(true)
      return
    }
    if (!emailregex.test(userInfo.email)) {
      setError('Invalid email')
      setInpErr({ ...inpErr, emailErr: true })
      setOpen(true)
      return
    }

    if (userInfo.password.length < 8) {
      setError('Password must be at least 8 characters')
      setInpErr({ ...inpErr, passwordErr: true })
      setOpen(true)
      return
    }
    if (!passregex.test(userInfo.password)) {
      setError(
        'Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be 8 characters long.'
      )
      setInpErr({ ...inpErr, passwordErr: true })
      setOpen(true)
      return
    }

    if (userInfo.password !== confirm_pass) {
      setError('Passwords must match')
      setInpErr({ ...inpErr, passwordErr: true })
      setOpen(true)
      return
    }
    if (userInfo.dob === '') {
      setError('Invalid date of birth')
      setInpErr({ ...inpErr, dobErr: true })
      setOpen(true)
      return
    }

    if (userInfo.phone.toString().length !== 10) {
      setError('Invalid phone number')
      setInpErr({ ...inpErr, phoneErr: true })
      setOpen(true)
      return
    }
    const currentDate = new Date()
    const selectedDate = new Date(userInfo.dob)
    const ageDiff = currentDate.getFullYear() - selectedDate.getFullYear()

    if (ageDiff < 16) {
      setError('You must be at least 16 years old to work here.')
      setInpErr({ ...inpErr, dobErr: true })
      setOpen(true)
      return
    }
    if (userInfo.wage < 8.0 || userInfo.wage === '') {
      setError('Wage must be at least $8.00')
      setInpErr({ ...inpErr, wageErr: true })
      setOpen(true)
      return
    }
    console.log(userInfo)
    axiosApi
      .post('/admin/AddEmployee', userInfo)
      .then(res => {
        console.log(res)
        if (res.status === 202) {
          setRowData(prevRowData => [...prevRowData, res.data.newEmployee])
          setSuccess(true)
          setSuccessMsg('Employee added successfully!')
        } else if (res.status === 500) {
          setError('Server error')
          setOpen(true)
        } else if (res.status === 401) {
          setError('Email already exists')
          setInpErr({ ...inpErr, emailErr: true })
          setOpen(true)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleDelete = () => {
    axiosApi
      .delete('/admin/deleteEmp', { data: { account_id: formClick } })
      .then(res => {
        console.log(res)
        if (res.status === 202) {
          setRowData(prevRowData =>
            prevRowData.filter(emp => emp.account_id !== formClick)
          )
          setSuccess(true)
          setSuccessMsg('Employee deleted successfully!')
        } else if (res.status === 500) {
          setError('Server error')
          setOpen(true)
        }
      })
  }

  return (
    <>
      <AdminSideNav />
      <EmpHeader />
      <Popup
        modal
        nested
        overlayStyle={{ backdropFilter: 'blur(5px)' }}
        contentStyle={{ width: 'auto', margin: 'auto', borderRadius: '10px' }}
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
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
                width: '100%',
                height: '100%',
                margin: '0 auto'
              }}
            >
              <form className='registration-formcontainer'>
                <div>
                  <h1 className='reg-title'>Add Employee:</h1>
                </div>
                <div className='reg-input-container'>
                  <div className='reg-inp-form'>
                    <TextField
                      id='first_name'
                      name='first_name'
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px'
                      }}
                      label='First Name'
                      variant='outlined'
                      fullWidth
                      required
                      onChange={handleChange}
                      error={inpErr.first_nameErr}
                    />
                  </div>
                  <div className='reg-inp-form'>
                    <TextField
                      id='last_name'
                      name='last_name'
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px'
                      }}
                      label='Last Name'
                      variant='outlined'
                      fullWidth
                      required
                      onChange={handleChange}
                      error={inpErr.last_nameErr}
                    />
                  </div>
                </div>
                <div className='reg-input-container'>
                  <div className='reg-inp-form'>
                    <TextField
                      id='email'
                      name='email'
                      type='email'
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px'
                      }}
                      label='Email'
                      variant='outlined'
                      fullWidth
                      required
                      onChange={handleChange}
                      error={inpErr.emailErr}
                    />
                  </div>
                </div>
                <div className='reg-input-container'>
                  <div className='reg-inp-form'>
                    <TextField
                      id='password'
                      name='password'
                      type='password'
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px'
                      }}
                      label='Password'
                      variant='outlined'
                      fullWidth
                      required
                      onChange={handleChange}
                      error={inpErr.passwordErr}
                    />
                  </div>
                  <div className='reg-inp-form'>
                    <TextField
                      id='confirmed_password'
                      type='password'
                      name='confirm_password'
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px'
                      }}
                      label='Confirm Password'
                      variant='outlined'
                      fullWidth
                      required
                      onChange={handleConfirmPass}
                      error={inpErr.passwordErr}
                    />
                  </div>
                </div>
                <div className='reg-input-container'>
                  <div className='reg-inp-form'>
                    <TextField
                      style={{ display: 'inline-block', width: '265px' }}
                      id='dob'
                      type='date'
                      name='dob'
                      label='Date of Birth'
                      variant='outlined'
                      InputLabelProps={{
                        shrink: true,
                        required: true
                      }}
                      inputProps={{
                        min: '1900-01-01',
                        max: new Date().toISOString().split('T')[0]
                      }}
                      fullWidth
                      required
                      onChange={handleChange}
                      error={inpErr.dobErr}
                    />
                  </div>
                  <div className='reg-inp-form'>
                    <FormControl fullWidth>
                      <InputLabel id='user_type'>User Type</InputLabel>
                      <Select
                        name='user_type'
                        label='User Type'
                        variant='outlined'
                        fullWidth
                        required
                        onChange={handleChange}
                      >
                        <MenuItem value='4'>Admin</MenuItem>
                        <MenuItem value='2'>Attendant</MenuItem>
                        <MenuItem value='3'>Maintenance</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className='reg-input-container'>
                  <div className='reg-inp-form'>
                    <TextField
                      id='phone'
                      type='tel'
                      name='phone'
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px'
                      }}
                      label='Phone Number'
                      variant='outlined'
                      fullWidth
                      required
                      inputProps={{ pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}' }}
                      onChange={handleChange}
                      error={inpErr.phoneErr}
                    />
                  </div>
                  <div className='reg-inp-form'>
                    <TextField
                      id='Wage'
                      type='number'
                      inputProps={{ min: 8.0 }}
                      name='wage'
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px'
                      }}
                      label='Wage (Hourly)'
                      variant='outlined'
                      fullWidth
                      required
                      onChange={handleChange}
                      error={inpErr.phoneErr}
                    />
                  </div>
                </div>
                <div className='reg-input-container'>
                  <Button className='reg-btn' onClick={handleSubmit}>
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </ModalContent>
        )}
      </Popup>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Employees</h1>
      <div className='centering'>
        <div
          className='ag-theme-alpine'
          style={{ height: 490, width: 1100, overflow: 'hidden' }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            rowSelection='multiple'
            animateRows='true'
            pagination='true'
            paginationPageSize='10'
            onCellClicked={e => {
              setFormClick(e.data.account_id)
            }}
          ></AgGridReact>
        </div>
      </div>

      <button
        style={{
          width: '200px',
          height: '60px',
          marginRight: '200px',
          backgroundColor: 'red'
        }}
        onClick={handleDelete}
      >
        Delete Employee
      </button>
      <div>
        {error && (
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert
              style={{
                marginBottom: '5px',
                width: '100%',
                padding: '10px',
                fontSize: '20'
              }}
              onClose={handleClose}
              severity='error'
              variant='filled'
              sx={{ width: '100%' }}
            >
              {error}
            </Alert>
          </Snackbar>
        )}
        <Snackbar open={success} autoHideDuration={4000} onClose={handleClose}>
          <Alert
            style={{
              marginBottom: '5px',
              width: '100%',
              padding: '10px',
              fontSize: '20'
            }}
            onClose={handleClose}
            severity='success'
            variant='filled'
            sx={{ width: '100%' }}
          >
            {successMsg}
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}

export default AddEmp

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
