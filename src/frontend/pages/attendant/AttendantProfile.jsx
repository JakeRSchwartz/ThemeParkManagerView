import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axiosApi from '../../axiosInstance'
import EmpHeader from '../../components/admin.components/EmpHeader'
import AttendantNav from '../../components/attendant.components/attendantNav'
import { Button, TextField, Typography } from '@mui/material'
import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'

function AttendantProfile () {
  const [profile, setProfile] = useState({})
  const [editMode, setEditMode] = useState(false)
  const account_id = localStorage.getItem('account_id')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    axiosApi
      .get(`/attendant/GetProfile/${account_id}`)
      .then(res => {
        setProfile(res.data[0])
      })
      .catch(err => {
        console.log(err)
      })
  }, [account_id])

  const handleInputChange = e => {
    const { name, value } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleCancel = () => {
    setEditMode(false)
  }

  const handleSubmit = e => {
    e.preventDefault()
    axiosApi
      .put(`/attendant/UpdateProfile/${account_id}`, profile)
      .then(() => {
        setEditMode(false)
        setSuccess(true)
      })
      .catch(err => {
        console.error('Failed to update profile:', err)
        alert('Failed to update profile.')
      })
  }

  return (
    <>
      <EmpHeader />
      <AttendantNav />
      <Container>
        {!editMode ? (
          <>
            <ProfileView>
              <h1>Profile Information</h1>
              <TypeContainer>
                <Typography variant='h9'>
                  First Name: {profile.first_name}
                </Typography>
              </TypeContainer>
              <TypeContainer>
                <Typography variant='h9'>
                  Last Name: {profile.last_name}
                </Typography>
              </TypeContainer>
              <TypeContainer>
                <Typography variant='h9'>Email: {profile.email}</Typography>
              </TypeContainer>
              <TypeContainer>
                <Typography variant='h9'>Phone: {profile.phone}</Typography>
              </TypeContainer>
              <TypeContainer>
                <Typography variant='h9'>Address: {profile.address}</Typography>
              </TypeContainer>
              <Button
                variant='contained'
                color='primary'
                onClick={handleEdit}
                style={{ height: '50px' }}
              >
                Edit Profile
              </Button>
            </ProfileView>
          </>
        ) : (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant='h6' gutterBottom>
              Edit Your Profile
            </Typography>
            <StyledTextField
              label='First Name'
              name='first_name'
              value={profile.first_name}
              onChange={handleInputChange}
            />
            <StyledTextField
              label='Last Name'
              name='last_name'
              value={profile.last_name}
              onChange={handleInputChange}
            />
            <StyledTextField
              label='Email'
              name='email'
              value={profile.email}
              onChange={handleInputChange}
            />
            <StyledTextField
              label='Phone'
              name='phone'
              value={profile.phone}
              onChange={handleInputChange}
            />
            <StyledTextField
              label='Address'
              name='address'
              value={profile.address}
              onChange={handleInputChange}
            />
            <Button type='submit' variant='contained' color='primary'>
              Save Changes
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={handleCancel}
              style={{ marginTop: 10 }}
            >
              Cancel
            </Button>
          </StyledForm>
        )}
      </Container>
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
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </>
  )
}

export default AttendantProfile

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px);
  padding: 20px;
  background-color: #f5f5f5;
`

const ProfileView = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 800px;
  max-width: 800px;
  height: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  background-color: #ffffff;
  gap: 20px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  gap: 20px;
`

const StyledTextField = styled(TextField)`
  width: 100%;
`
const TypeContainer = styled.div`
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  background-color: #ffffff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`
