import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axiosApi from '../../axiosInstance'
import Header from '../../components/customer.components/Header'
import { Button, TextField, Typography } from '@mui/material'
import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import CustomerNav from '../../components/customer.components/CustomerNav'

function CustomerProfile () {
  const [profile, setProfile] = useState({})
  const [payment, setPayment] = useState({
    card_number: '',
    card_holder_name: '',
    expire_date: '',
    cvv: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: ''
  })
  const [editMode, setEditMode] = useState(null)
  const account_id = localStorage.getItem('account_id')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    axiosApi
      .get(`/customer/GetCustomerProfile/${account_id}`)
      .then(res => {
        setProfile(res.data[0])
      })
      .catch(err => {
        console.log(err)
      })
    axiosApi.get(`/customer/GetPayment/${account_id}`).then(res => {
      if (res.data.length === 0) {
        return
      }
      setPayment(res.data[0])
    })
  }, [account_id])

  const handleInputChange = e => {
    const { name, value } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleInputChangeCard = e => {
    const { name, value } = e.target
    setPayment(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEditProfile = () => {
    setEditMode('profile')
  }

  const handleEditPayment = () => {
    setEditMode('payment')
  }

  const handleCancel = () => {
    setEditMode(null)
  }

  const handleSubmit = e => {
    e.preventDefault()
    axiosApi
      .put(`/customer/UpdateCustomerProfile/${account_id}`, profile)
      .then(() => {
        setEditMode(null)
        setSuccess(true)
        setMessage('Profile Information Updated')
      })
      .catch(err => {
        console.error('Failed to update profile:', err)
        alert('Failed to update profile.')
      })
  }
  const handleSubmitCard = e => {
    e.preventDefault()
    console.log(payment)
    axiosApi
      .post(`/customer/RememberPayment/${account_id}`, payment)
      .then(() => {
        setEditMode(null)
        setSuccess(true)
        setMessage('Payment Information Updated')
      })
      .catch(err => {
        console.error('Failed to update payment:', err)
        alert('Failed to update payment.')
      })
  }

  return (
    <>
      <Header />
      <CustomerNav />
      <Container>
        {editMode === null && (
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
              <TypeContainer>
                <Typography variant='h9'>
                  Height: {profile.height} {
                    ' '
                  } Inches
                </Typography>
              </TypeContainer>
              <Button
                variant='contained'
                color='primary'
                onClick={handleEditProfile}
                style={{ height: '50px' }}
              >
                Edit Profile Information
              </Button>
            </ProfileView>
            <ProfileView>
              <h1>Payment Information</h1>
              <TypeContainer>
                <Typography variant='h9'>
                  Card Number: {payment.card_number || ''}
                </Typography>
              </TypeContainer>
              <TypeContainer>
                <Typography variant='h9'>
                  Card Holder's Name: {payment.card_holder_name || ''}
                </Typography>
              </TypeContainer>
              <TypeContainer>
                <Typography variant='h9'>
                  Expire Date: {payment.expire_date || ''}
                </Typography>
              </TypeContainer>
              <TypeContainer>
                <Typography variant='h9'>CVV: {payment.cvv || ''}</Typography>
              </TypeContainer>
              <TypeContainer>
                <Typography variant='h9'>
                  Address Line 1: {payment.address_line1 || ''}
                </Typography>
              </TypeContainer>
              <TypeContainer>
                <Typography variant='h9'>
                  Address Line 2: {payment.address_line2 || ''}
                </Typography>
              </TypeContainer>
              <TypeContainer>
                <Typography variant='h9'>City: {payment.city || ''}</Typography>
              </TypeContainer>
              <TypeContainer>
                <Typography variant='h9'>
                  State: {payment.state || ''}
                </Typography>
              </TypeContainer>
              <TypeContainer>
                <Typography variant='h9'>
                  Zip Code: {payment.zip_code || ''}
                </Typography>
              </TypeContainer>
              <Button
                variant='contained'
                color='primary'
                onClick={handleEditPayment}
                style={{ height: '50px' }}
              >
                Edit Payment Information
              </Button>
            </ProfileView>
          </>
        )}

        {editMode === 'profile' && (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant='h9' gutterBottom>
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
            <StyledTextField
              label='Height'
              name='height'
              value={profile.height}
              onChange={handleInputChange}
            />

            <Button type='submit' variant='contained' color='primary'>
              Save Changes
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleCancel}>
              Cancel
            </Button>
          </StyledForm>
        )}

        {editMode === 'payment' && (
          <StyledForm onSubmit={handleSubmitCard}>
            <Typography variant='h9' gutterBottom>
              Edit Your Payment Information
            </Typography>
            <StyledTextField
              label='Card Number'
              name='card_number'
              value={payment.card_number || ''}
              onChange={handleInputChangeCard}
            />
            <StyledTextField
              label="Card Holder's Name"
              name='card_holder_name'
              value={payment.card_holder_name || ''}
              onChange={handleInputChangeCard}
            />
            <StyledTextField
              label='Expire Date'
              name='expire_date'
              value={payment.expire_date || ''}
              onChange={handleInputChangeCard}
            />
            <StyledTextField
              label='CVV'
              name='cvv'
              value={payment.cvv || ''}
              onChange={handleInputChangeCard}
            />
            <StyledTextField
              label='Address 1'
              name='address_line1'
              value={payment.address_line1 || ''}
              onChange={handleInputChangeCard}
            />
            <StyledTextField
              label='Address 2'
              name='address_line2'
              value={payment.address_line2 || ''}
              onChange={handleInputChangeCard}
            />
            <StyledTextField
              label='City'
              name='city'
              value={payment.city || ''}
              onChange={handleInputChangeCard}
            />
            <StyledTextField
              label='State'
              name='state'
              value={payment.state || ''}
              onChange={handleInputChangeCard}
            />
            <StyledTextField
              label='Zip'
              name='zip_code'
              value={payment.zip_code || ''}
              onChange={handleInputChangeCard}
            />
            <Button type='submit' variant='contained' color='primary'>
              Save Changes
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleCancel}>
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
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default CustomerProfile

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px);
  padding: 20px;
  background-color: #f5f5f5;
  flex-direction: column;
`

const ProfileView = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  width: 840px;
  max-width: 800px;
  height: 450px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  background-color: #ffffff;
  gap: 20px;
  margin-bottom: 50px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 450px;
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
