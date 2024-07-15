import React from 'react'
import { TextInput, Label, Button } from 'flowbite-react'
import '../../styles/registration.styles/registrationpage.css'
import { useState } from 'react'
import videos from '../../assets/CoogsPark.mp4'
import { Alert } from '@mui/material'
import { Snackbar } from '@mui/material'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../contexts/dataContext'
import { useContext } from 'react'
import HeaderL from '../../components/landing.components/HeaderL'
import axiosApi from '../../axiosInstance'
function RegistrationPage () {
  const navigate = useNavigate()
  const passregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/
  const emailregex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [inpErr, setInpErr] = useState({
    first_nameErr: false,
    last_nameErr: false,
    emailErr: false,
    passwordErr: false,
    confirm_passwordErr: false,
    dobErr: false,
    heightErr: false,
    phoneErr: false,
    addressErr: false
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const [confirm_pass, setconfirm_pass] = useState('')
  const [userInfo, setuserInfo] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    dob: '',
    height: '',
    phone: '',
    address: '',
    user_type: 'customer'
  })

  const { dispatch } = useContext(DataContext)

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

    if (userInfo.height < 25) {
      setError('Invalid height')
      setInpErr({ ...inpErr, heightErr: true })
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

    if (ageDiff < 10) {
      setError('You must be at least 10 years old to register')
      setInpErr({ ...inpErr, dobErr: true })
      setOpen(true)
      return
    }
    axiosApi
      .post('/auth/register', userInfo)
      .then(res => {
        if (res.status === 201) {
          dispatch({ type: 'SET_REGISTERED', payload: true })
          navigate('/login')
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

  return (
    <>
      <HeaderL /> 
      <div className='registration-centering'>
        <form className='registration-formcontainer'>
          <div>
            <h1 className='reg-title'>Create an Account:</h1>
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
              <TextField
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px'
                }}
                id='height'
                name='height'
                type='number'
                inputProps={{ min: '30', max: '100' }}
                label='Height (Inches)'
                variant='outlined'
                fullWidth
                required
                onChange={handleChange}
                error={inpErr.heightErr}
              />
            </div>
          </div>
          <div className='reg-input-container'>
            <div className='reg-inp-form'>
              <TextField
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px'
                }}
                id='phone'
                name='phone'
                type='number'
                label='Phone Number'
                variant='outlined'
                fullWidth
                required
                onChange={handleChange}
                error={inpErr.phoneErr}
              />
            </div>
            <div className='reg-inp-form'>
              <TextField
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px'
                }}
                id='adress'
                name='address'
                type='text'
                label='Address'
                variant='outlined'
                fullWidth
                required
                onChange={handleChange}
                error={inpErr.addressErr}
              />
            </div>
          </div>
          <div className='reg-inp-form'>
            <Button className='reg-btn' onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
        {error && (
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
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
      </div>
    </>
  )
}

export default RegistrationPage
