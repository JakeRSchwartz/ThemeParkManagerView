import React, { useEffect } from 'react'
import AdminSideNav from '../../components/admin.components/SideNav.jsx'
import styled from 'styled-components'
import { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material'
import Header from '../../components/customer.components/Header'
import { FaPencilAlt } from 'react-icons/fa'
import { TextField } from '@mui/material'
import { BsFillTrash3Fill } from 'react-icons/bs'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'

function EditGames () {
  const [games, setGames] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [currentDeleting, setCurrentDeleting] = useState(null)
  const [editMode, setEditMode] = useState({})
  const [editedGame, setEditedGame] = useState({})

  useEffect(() => {
    axiosApi
      .get('/customer/games')
      .then(response => setGames(response.data))
      .catch(error => console.log(error))
  }, [])

  const handleInputChange = (gameId, field, value) => {
    setEditedGame(prev => ({
      ...prev,
      [gameId]: {
        ...prev[gameId],
        [field]: value
      }
    }))
  }

  const handleEditClick = game => {
    setEditMode(prev => ({
      ...prev,
      [game.game_id]: true
    }))
    setEditedGame(prev => ({
      ...prev,
      [game.game_id]: {
        name: game.name,
        description: game.description,
        cost: game.cost
      }
    }))
  }

  const handleSubmitGame = gameId => {
    // Logic to submit changes
    setEditMode(prev => ({ ...prev, [gameId]: false }))
    // Potentially reset editedGame or send update to server here
    console.log('Submitting game:', editedGame[gameId])
    axiosApi
      .put(`/admin/EditGame/${gameId}`, editedGame[gameId])
      .then(response => {
        setGames(prev =>
          prev.map(game => {
            if (game.game_id === gameId) {
              return {
                ...game,
                ...editedGame[gameId]
              }
            }
            return game
          })
        )
      })
      .catch(error => {
        console.error('Error updating game:', error)
        // Show an error message
      })
  }
  const handleDeleteAttraction = gameId => {
    // Call to delete the attraction
    axiosApi
      .delete(`/admin/DeleteGame/${gameId}`)
      .then(() => {
        setGames(prev =>
          prev.filter(game => game.game_id !== gameId)
        )
        setOpenDialog(false) // Close the dialog after deletion
      })
      .catch(error => console.error('Error deleting attraction:', error))
  }
  const confirmDelete = gameId => {
    setOpenDialog(true)
    setCurrentDeleting(gameId)
  }

  return (
    <>
      <Container>
        <h4 className='TitleForType'>Our Games:</h4>
        <Content>
          {games.map(game => (
            <Wrap key={game.game_id}>
              <Popup
                modal
                nested
                overlayStyle={{ backdropFilter: 'blur(5px)' }}
                trigger={
                  <div>
                    <h4 className='itemHeader'>{game.name}</h4>
                    <img src={game.picture} alt={game.name} />
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
                          [game.game_id]: false
                        }))
                        setEditedGame(prev => ({
                          ...prev,
                          [game.game_id]: null
                        }))
                      }}
                    >
                      &times;
                    </CloseButton>
                    {editMode[game.game_id] ? (
                      <>
                        <StyledForm>
                          <h2
                            style={{ fontFamily: 'sans-serif', margin: 'auto' }}
                          >
                            Edit Game
                          </h2>
                          <InputContainer>
                            <StyledLabel htmlFor={`name-${game.game_id}`}>
                              Name
                            </StyledLabel>
                            <StyledInput
                              type='text'
                              id={`name-${game.game_id}`}
                              value={editedGame[game.game_id]?.name || ''}
                              onChange={e =>
                                handleInputChange(
                                  game.game_id,
                                  'name',
                                  e.target.value
                                )
                              }
                            />
                          </InputContainer>
                          <InputContainer>
                            <StyledLabel
                              htmlFor={`description-${game.game_id}`}
                            >
                              Description
                            </StyledLabel>
                            <TextField
                              style={{ width: '100%' }}
                              variant='outlined'
                              multiline
                              rows={6}
                              id={`description-${game.game_id}`}
                              value={
                                editedGame[game.game_id]?.description || ''
                              }
                              onChange={e =>
                                handleInputChange(
                                  game.game_id,
                                  'description',
                                  e.target.value
                                )
                              }
                            />
                          </InputContainer>
                          <InputContainer>
                            <StyledLabel htmlFor={`cost-${game.game_id}`}>
                              Cost
                            </StyledLabel>
                            <StyledInput
                              type='text'
                              id={`cost-${game.game_id}`}
                              value={editedGame[game.game_id]?.cost || ''}
                              onChange={e =>
                                handleInputChange(
                                  game.game_id,
                                  'cost',
                                  e.target.value
                                )
                              }
                            />
                          </InputContainer>
                          <button
                            onClick={() => handleSubmitGame(game.game_id)}
                          >
                            Submit
                          </button>
                        </StyledForm>
                      </>
                    ) : (
                      <RideDetail>
                        <ButtonContainer>
                          <EditButton onClick={() => handleEditClick(game)}>
                            <FaPencilAlt />
                          </EditButton>
                          <DeleteButton
                            onClick={() => confirmDelete(game.game_id)}
                            color='error'
                          >
                            <BsFillTrash3Fill />
                          </DeleteButton>
                        </ButtonContainer>
                        <h2 style={{ fontFamily: 'fantasy' }}>{game.name}</h2>
                        <img src={game.picture} alt={game.name} />
                        <p>{game.description}</p>
                        <p>Price: ${game.cost} Per Ticket</p>
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
            Are you sure you want to delete this game? This action cannot be
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

export default EditGames

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
