import React, { useEffect, useState } from 'react'
import AdminSideNav from '../../components/admin.components/SideNav'
import Header from '../../components/customer.components/Header'
import { TextField } from '@mui/material'
import { FaPencilAlt } from 'react-icons/fa'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { Snackbar, Alert } from '@mui/material'
import axiosApi from '../../axiosInstance' // Ensure axiosApi is correctly imported
import { BsFillTrash3Fill } from 'react-icons/bs'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'

function EditRides () {
  const [rides, setRides] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [currentDeleting, setCurrentDeleting] = useState(null)
  const [editMode, setEditMode] = useState({})
  const [editedRide, setEditedRide] = useState({})

  useEffect(() => {
    axiosApi
      .get('/customer/rides')
      .then(response => setRides(response.data))
      .catch(error => console.log(error))
  }, [])

  const handleInputChange = (rideId, field, value) => {
    setEditedRide(prev => ({
      ...prev,
      [rideId]: {
        ...prev[rideId],
        [field]: value
      }
    }))
  }

  const handleEditClick = ride => {
    setEditMode(prev => ({
      ...prev,
      [ride.ride_id]: true
    }))
    setEditedRide(prev => ({
      ...prev,
      [ride.ride_id]: {
        name: ride.name,
        description: ride.description,
        height_restriction: ride.height_restriction,
        cost: ride.cost
      }
    }))
  }

  const handleSubmitRide = rideId => {
    // Logic to submit changes
    setEditMode(prev => ({ ...prev, [rideId]: false }))
    axiosApi
      .put(`/admin/EditRide/${rideId}`, editedRide[rideId])
      .then(response => {
        setRides(prev =>
          prev.map(ride =>
            ride.ride_id === rideId ? { ...ride, ...editedRide[rideId] } : ride
          )
        )
      })
      .catch(error => console.log(error))
  }
  const handleDeleteAttraction = rideId => {
    // Call to delete the attraction
    axiosApi
      .delete(`/admin/DeleteRide/${rideId}`)
      .then(() => {
        setRides(prev =>
          prev.filter(ride => ride.ride_id !== rideId)
        )
        setOpenDialog(false) // Close the dialog after deletion
      })
      .catch(error => console.error('Error deleting attraction:', error))
  }
  const confirmDelete = rideId => {
    setOpenDialog(true)
    setCurrentDeleting(rideId)
  }

  return (
    <>
      <Container>
        <h4 className='TitleForType'>Our Rides:</h4>
        <Content>
          {rides.map(ride => (
            <Wrap key={ride.ride_id}>
              <Popup
                modal
                nested
                overlayStyle={{ backdropFilter: 'blur(5px)' }}
                trigger={
                  <div>
                    <h4 className='itemHeader'>{ride.name}</h4>
                    <img src={ride.picture} alt={ride.name} />
                  </div>
                }
              >
                {close => (
                  <ModalContent>
                    <CloseButton
                      className='close'
                      onClick={() => {
                        close()
                        setEditMode(prev => ({
                          ...prev,
                          [ride.ride_id]: false
                        }))
                        setEditedRide(prev => ({
                          ...prev,
                          [ride.ride_id]: null
                        }))
                      }}
                    >
                      &times;
                    </CloseButton>
                    {editMode[ride.ride_id] ? (
                      <>
                        <StyledForm>
                          <h2
                            style={{ fontFamily: 'sans-serif', margin: 'auto' }}
                          >
                            Edit Ride
                          </h2>
                          <InputContainer>
                            <StyledLabel htmlFor={`name-${ride.ride_id}`}>
                              Name
                            </StyledLabel>
                            <StyledInput
                              type='text'
                              id={`name-${ride.ride_id}`}
                              value={editedRide[ride.ride_id]?.name || ''}
                              onChange={e =>
                                handleInputChange(
                                  ride.ride_id,
                                  'name',
                                  e.target.value
                                )
                              }
                            />
                          </InputContainer>
                          <InputContainer>
                            <StyledLabel
                              htmlFor={`description-${ride.ride_id}`}
                            >
                              Description
                            </StyledLabel>
                            <TextField
                              style={{ width: '100%' }}
                              variant='outlined'
                              multiline
                              rows={6}
                              id={`description-${ride.ride_id}`}
                              value={
                                editedRide[ride.ride_id]?.description || ''
                              }
                              onChange={e =>
                                handleInputChange(
                                  ride.ride_id,
                                  'description',
                                  e.target.value
                                )
                              }
                            />
                          </InputContainer>
                          <InputContainer>
                            <StyledLabel
                              htmlFor={`height_restriction-${ride.ride_id}`}
                            >
                              Height Restriction
                            </StyledLabel>
                            <StyledInput
                              type='text'
                              id={`height-${ride.height_restriction}`}
                              value={
                                editedRide[ride.ride_id]?.height_restriction ||
                                ''
                              }
                              onChange={e =>
                                handleInputChange(
                                  ride.ride_id,
                                  'height_restriction',
                                  e.target.value
                                )
                              }
                            />
                          </InputContainer>
                          <InputContainer>
                            <StyledLabel htmlFor={`cost-${ride.ride_id}`}>
                              Cost
                            </StyledLabel>
                            <StyledInput
                              type='text'
                              id={`cost-${ride.ride_id}`}
                              value={editedRide[ride.ride_id]?.cost || ''}
                              onChange={e =>
                                handleInputChange(
                                  ride.ride_id,
                                  'cost',
                                  e.target.value
                                )
                              }
                            />
                          </InputContainer>
                          <button
                            onClick={() => handleSubmitRide(ride.ride_id)}
                          >
                            Submit
                          </button>
                        </StyledForm>
                      </>
                    ) : (
                      <RideDetail>
                        <ButtonContainer>
                          <EditButton onClick={() => handleEditClick(ride)}>
                            <FaPencilAlt />
                          </EditButton>
                          <DeleteButton
                            onClick={() => confirmDelete(ride.ride_id)}
                            color='error'
                          >
                            <BsFillTrash3Fill />
                          </DeleteButton>
                        </ButtonContainer>
                        <h2 style={{ fontFamily: 'fantasy' }}>{ride.name}</h2>
                        <img src={ride.picture} alt={ride.name} />
                        <p>{ride.description}</p>
                        <p>Height Restriction: {ride.height_restriction}</p>
                        <p>Price: ${ride.cost} Per Ticket</p>
                      </RideDetail>
                    )}
                  </ModalContent>
                )}
              </Popup>
            </Wrap>
          ))}
        </Content>
      </Container>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Confirm Deletion'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this ride? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteAttraction(currentDeleting)}
            color='secondary'
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default EditRides

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
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  width: 40px;
  justify-content: space-between;
`
const DeleteButton = styled.button`
  color: black; // Set text color
  background-color: white; // Set background color
  width: 40px;
  height: 20px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  box-shadow: none;
  transition: none; // Disables any transition effects

  &:hover {
    color: black; // Keeps the text color black on hover
    background-color: white; // Keeps the background color white on hover
    transform: none; // Ensures no transformation on hover
    box-shadow: none; // Ensures no shadow appears on hover
  }
`
const EditButton = styled.button`
  color: black; // Set text color
  background-color: white; // Set background color
  width: 40px;
  height: 20px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  box-shadow: none;
  transition: none; // Disables any transition effects

  &:hover {
    color: black; // Keeps the text color black on hover
    background-color: white; // Keeps the background color white on hover
    transform: none; // Ensures no transformation on hover
    box-shadow: none; // Ensures no shadow appears on hover
  }
`
