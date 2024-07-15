import React from 'react'
import AdminSideNav from '../../components/admin.components/SideNav.jsx'
import styled from 'styled-components'
import { useState } from 'react'
import { useEffect } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material'
import { FaPencilAlt } from 'react-icons/fa'
import { TextField } from '@mui/material'
import EditRides from '../../components/admin.components/EditRides.jsx'
import EditAttractions from '../../components/admin.components/EditAttractions.jsx'
import EditGames from '../../components/admin.components/EditGames.jsx'
import EmpHeader from '../../components/admin.components/EmpHeader.jsx'
import { Button, Select, Input, MenuItem } from '@mui/material'

function UpdatePark () {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    description: '',
    height_restriction: '',
    age_restriction: '',
    cost: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = e => {
    setFormData({ ...formData, picture: e.target.files[0] })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (
      !formData.type ||
      !formData.name ||
      !formData.description ||
      !formData.cost
    ) {
      setError(true)
      setMessage('Please fill in all fields')
      return
    }
    console.log(formData)
    if (formData.type === 'rides') {
      console.log(formData)
      axiosApi
        .post('/admin/addToParkRide', formData)
        .then(res => {
          setSuccess(true)
          setMessage('Ride added successfully')
        })
        .catch(err => {
          setError(true)
          setMessage('Failed to add ride')
        })
    }
    if (formData.type === 'Attractions') {
      axiosApi
        .post('/admin/addToParkAttraction', formData)
        .then(res => {
          setSuccess(true)
          setMessage('Attraction added successfully')
        })
        .catch(err => {
          setError(true)
          setMessage('Failed to add attraction')
        })
    }
    if (formData.type === 'Games') {
      axiosApi
        .post('/admin/addToParkGame', formData)
        .then(res => {
          setSuccess(true)
          setMessage('Game added successfully')
        })
        .catch(err => {
          setError(true)
          setMessage('Failed to add game')
        })
    }
  }

  return (
    <>
      <AdminSideNav />
      <EmpHeader />
      <Popup
        modal
        nested
        overlayStyle={{ backdropFilter: 'blur(5px)' }}
        trigger={
          <div>
            <StyledButton>Add New Item</StyledButton>
          </div>
        }
      >
        {close => (
          <>
            <CloseButton className='close' onClick={close}>
              &times;
            </CloseButton>
            <FormContainer onSubmit={handleSubmit}>
              <h1>Add Park Feature</h1>
              <Select name='type' value={formData.type} onChange={handleChange}>
                <MenuItem value='' disabled>
                  Select Type
                </MenuItem>
                <MenuItem
                  value='rides'
                  style={{ fontFamily: 'pacifico', fontSize: '20px' }}
                >
                  Ride
                </MenuItem>
                <MenuItem
                  value='Attractions'
                  style={{ fontFamily: 'pacifico', fontSize: '20px' }}
                >
                  Attraction
                </MenuItem>
                <MenuItem
                  value='Games'
                  style={{ fontFamily: 'pacifico', fontSize: '20px' }}
                >
                  Game
                </MenuItem>
              </Select>
              <Input
                name='name'
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
              />
              <Input
                name='description'
                placeholder='Description'
                value={formData.description}
                onChange={handleChange}
              />
              {formData.type === 'rides' && (
                <Input
                  name='height_restriction'
                  placeholder='Height Restriction'
                  value={formData.height_restriction}
                  onChange={handleChange}
                />
              )}
              {formData.type === 'Attractions' && (
                <Input
                  name='age_restriction'
                  placeholder='Age Restriction'
                  value={formData.age_restriction}
                  onChange={handleChange}
                />
              )}
              <Input
                name='cost'
                placeholder='Cost per Ticket'
                type='number'
                value={formData.cost}
                onChange={handleChange}
              />
              <Button type='submit'>Submit</Button>
            </FormContainer>
          </>
        )}
      </Popup>
      <EditRides />
      <EditGames />
      <EditAttractions />
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity='success'>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert onClose={() => setError(false)} severity='error'>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default UpdatePark

const Container = styled.div`
  width: 90%;
  margin-left: 100px;
`

const Content = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
`

const Wrap = styled.div`
cursor:pointer;
  border-radius: 10px;
  background-color: whitesmoke;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 80%) 0px 26px 30px -10px;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgb(0 0 0 / 80%) 10px 40px 22px -12px,
    transition all: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  img {
    width: 100%;
    height: 100%;
    margin-bottom:25px;
  }
  &:hover {
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px;
  }
`
import { keyframes } from 'styled-components'
import axiosApi from '../../axiosInstance.js'
import axios from 'axios'
import { format } from 'mysql'
import { set } from 'date-fns'

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
  position: relative; // Ensures that positioning is relative to nearest positioned ancestor
  background: linear-gradient(145deg, #ffffff, #f9f9f9);
  border-radius: 10px;
  padding: 20px;
  color: black;
  font-size: 1rem;
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
  font-family: 'pacifico';
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15), 0 0 10px rgba(0.3, 0.2, 0.3, 0.4);
  animation: ${fadeInScaleUp} 0.3s ease-out forwards;
  z-index: 1050; // Ensure this is higher than the nav bar
  line-height: 1.2;
`

const CloseButton = styled.span`
  cursor: pointer;
  height: 30px;
  width: 30px;
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
const RideDetail = styled.div`
  flex-direction: column;
  margin: 10px;
  align-items: center; /* Centers content horizontally in the flex container */
  justify-content: center; /* Centers content vertically if the container has a defined height */
  width: 100%; /* Ensure the container takes up full width */
  text-align: center; /* Ensures that text, if not explicitly wrapped, is centered */
  img {
    width: 70%; /* Ensures the image takes up the full width of the container */
    height: auto; /* Maintains the aspect ratio */
    margin: 0 auto; /* Centers the image horizontally */
    margin-bottom: 10px; /* Adds some space between the image and the text */
    box-shadow: 1px 3px 10px rgba(0.3, 0.3, 0.4, 0.6); /* Adds a subtle shadow to the image */
  }
  p {
    margin-bottom: 20px; /* Adds some space between the text and the next element */
  }
`
const EditButton = styled.button`
  color: black; // Set text color
  background-color: white; // Set background color
  width: 20px;
  height: 20px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  box-shadow: none;
  transition: none; // Disables any transition effects
  margin: 40px;

  &:hover {
    color: black; // Keeps the text color black on hover
    background-color: white; // Keeps the background color white on hover
    transform: none; // Ensures no transformation on hover
    box-shadow: none; // Ensures no shadow appears on hover
  }
`
const StyledForm = styled.form`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const StyledLabel = styled.label`
  display: block;
  color: #444;
  font-weight: bold;
  margin-bottom: 5px;
  width: 100%;
`

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    outline: none;
  }
`

const InputContainer = styled.div`
  margin-bottom: 15px;
`
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
`
const StyledButton = styled.button`
  width: 150px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 70px;
`
