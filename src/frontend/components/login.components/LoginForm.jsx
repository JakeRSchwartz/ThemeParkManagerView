import React from 'react'
import '../../styles/login.styles/loginpage.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Alert } from '@mui/material'
import { Snackbar } from '@mui/material'
import axios from 'axios'
import { DataContext } from '../../contexts/dataContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosApi from '../../axiosInstance'

const LoginForm = () => {
  const emailregex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const passregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/

  const [open, setOpen] = useState(false)
  const { data, dispatch } = useContext(DataContext)
  const [error, setError] = useState('')
  const [LoginStatus, setLoginStatus] = useState(false)
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const handleCloseReg = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch({ type: 'SET_REGISTERED', payload: false })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  const handleChange = e => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    })
  }

  let navigate = useNavigate()
  const HandleSubmit = e => {
    e.preventDefault()
    if (!emailregex.test(loginInfo.email)) {
      setError('Invalid Credentials')
      setOpen(true)
      return
    }
    if (!passregex.test(loginInfo.password)) {
      setError('Invalid Credentials')
      setOpen(true)
      return
    }
    axiosApi
      .post('/auth/login', loginInfo)
      .then(response => {
        if (!response.data.auth) {
          setLoginStatus(false)
          setError('Not Authorized')
          setOpen(true)
        } else {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user_type', response.data.user.user_type)
          localStorage.setItem('account_id', response.data.user.account_id)
          localStorage.setItem('first_name', response.data.user.first_name)
          localStorage.setItem('last_name', response.data.user.last_name)
          // console.log(localStorage.getItem('user_type'))
          setLoginStatus(true)
          navigate('/home')
        }
      })
      .catch(err => {
        if (err.response.status === 401) {
          setLoginStatus(false)
          setError('Invalid Credentials')
          setOpen(true)
        }
        if (err.response.status === 500) {
          setLoginStatus(false)
          setError('Server Error')
          setOpen(true)
        }
      })
  }
  const userAuthenticated = () => {
    axiosApi
      .get('/auth/jwtAuth', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      })
      .then(res => {
        if (res.status === 200) {
          setLoginStatus(true)
          setError('User Authenticated')
          setOpen(true)
        }
      })
      .catch(err => {
        if (err.response.status === 401) {
          setLoginStatus(false)
          setError('Not Authorized')
          setOpen(true)
        }
        if (err.response.status === 500) {
          setLoginStatus(false)
          setError('Server Error')
          setOpen(true)
        }
      })
  }

  useEffect(() => {
    if (
      localStorage.getItem('account_id') &&
      localStorage.getItem('user_type')
    ) {
      navigate('/home')
    }
  }, [])
  return (
    <>
      <form>
        <h2>Sign In</h2>
        <div className='input-container'>
          <label htmlFor='email'>Email</label>
          <span>
            <input
              style={{ height: '45px' }}
              type='text'
              placeholder='Enter Email'
              name='email'
              required
              onChange={handleChange}
            />
          </span>
        </div>
        <div className='input-container'>
          <label htmlFor='password'>Password</label>
          <span>
            <input
              style={{ height: '45px' }}
              type='password'
              placeholder='Enter Password'
              name='password'
              required
              onChange={handleChange}
            />
          </span>
        </div>
        <span className='forgot_pass'>Forgot Password?</span>
        <div className='register'>
          Don't have an account? <Link to='/registration'>Click here</Link>
        </div>
        <span className='forgot_pass'> </span>
        <div className='input-container'>
          <button type='submit' className='submit' onClick={HandleSubmit}>
            Login
          </button>
        </div>
      </form>
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
      <Snackbar
        open={data.registered}
        autoHideDuration={4000}
        onClose={handleCloseReg}
      >
        <Alert severity='success' style={{ marginBottom: '10px' }}>
          Your account was successfully created!
        </Alert>
      </Snackbar>
      <Snackbar
        open={LoginStatus}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert severity='success' style={{ marginBottom: '10px' }}>
          Nice to see you again!
        </Alert>
      </Snackbar>
    </>
  )
}
export default LoginForm
