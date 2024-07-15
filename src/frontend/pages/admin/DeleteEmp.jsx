import React from 'react'
import { TextInput, Label, Button } from 'flowbite-react'
import '../../styles/registration.styles/registrationpage.css'
import { useState } from 'react'
import videos from '../../assets/CoogsPark.mp4'
import axios from 'axios'
import { Alert, Menu } from '@mui/material'
import { Snackbar } from '@mui/material'
import { TextField } from '@mui/material'
import { Form, useNavigate } from 'react-router-dom'
import AdminSideNav from '../../components/admin.components/SideNav'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import axiosApi from '../../axiosInstance'

function DeleteEmp () {
  const [formClick, setFormClick] = useState({})
  const [sucess, setSucess] = useState(false)
  const [formOpen, setFormOpen] = useState(true)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [inpErr, setInpErr] = useState({
    first_nameErr: false,
    last_nameErr: false
  })

  const [rowData, setRowData] = useState([{}])

  const [columnDefs, setColumnDefs] = useState([
    { field: 'account_id', checkboxSelection: true, headerName: 'User ID' },
    { field: 'first_name', headerName: 'First Name' },
    { field: 'last_name', headerName: 'Last Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'phone', headerName: 'Phone' },
    { field: 'user_type', headerName: 'Role' },
    { field: 'dob', headerName: 'Date of Birth' }
  ])

  const [userInfo, setuserInfo] = useState({
    first_name: '',
    last_name: ''
  })

  const handleChange = e => {
    setInpErr({
      ...inpErr,
      [e.target.name + 'Err']: false
    })
    setuserInfo({
      ...userInfo,
      [e.target.name]: '%' + e.target.value + '%'
    })
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (userInfo.first_name.length < 3) {
      setError('Please input first and last name')
      setInpErr({ ...inpErr, first_nameErr: true })
      setOpen(true)
      return
    }

    if (userInfo.last_name.length < 3) {
      setError('Please first and last name')
      setInpErr({ ...inpErr, last_nameErr: true })
      setOpen(true)
      return
    }
    axiosApi
      .post('/admin/getEmp', userInfo)
      .then(res => {
        setRowData(res.data.emp)
        setFormOpen(false)
      })
      .catch(err => {
        console.log(err)
      })
    setuserInfo({
      first_name: '',
      last_name: ''
    })
  }

  return (
    <>
      <AdminSideNav />
      <div className='reg-header'>
        <video autoPlay width={'50px'} className='admin_vid' muted>
          <source src={videos} type='video/mp4' />
        </video>
      </div>
      <div className='registration-centering'>
        {formOpen ? (
          <form
            className='registration-formcontainer'
            style={{ height: 'auto', marginBottom: '200px' }}
          >
            <div>
              <h1 className='reg-title'>Delete Employee:</h1>
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
            <div className='reg-inp-form'>
              <Button className='reg-btn' onClick={handleSubmit}>
                Search
              </Button>
            </div>
          </form>
        ) : (
          <>
            <div>
              <div
                className='ag-theme-alpine'
                style={{ height: 500, width: 1100 }}
              >
                <AgGridReact
                  rowData={rowData}
                  columnDefs={columnDefs}
                  rowSelection='single'
                  onSelectionChanged ={e => {
                    setFormClick(e.data.account_id)
                    console.log(e.data.account_id)
                  }}
                />
              </div>
              <div style={{ display: 'flex' }}>
                <Button
                  style={{ width: '200px', cursor: 'pointer' }}
                  onClick={() => setFormOpen(true)}
                >
                  Back
                </Button>
                <Button
                  style={{ width: '200px', backgroundColor: 'red' }}
                  onClick={() => {
                    axiosApi
                      .delete('/admin/deleteEmp', formClick)
                      .then(res => {
                        if (res.status === 202) {
                          setSucess(true)
                          formOpen(true)
                        }
                      })
                      .catch(err => {
                        console.log(err)
                      })
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </>
        )}
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
          open={sucess}
          autoHideDuration={6000}
          onClose={() => setSucess(false)}
        >
          <Alert
            onClose={() => setSucess(false)}
            severity='success'
            sx={{ width: '100%' }}
          >
            Employee Deleted
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}

export default DeleteEmp
