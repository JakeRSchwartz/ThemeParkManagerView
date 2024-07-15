import React from 'react'
import styled from 'styled-components'

import { useState } from 'react'
import { useEffect } from 'react'
import axiosApi from '../../axiosInstance'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material'

function Games () {
  const [sucess, setSucess] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [games, setGames] = useState([])
  const [selectedTicket, setSelectedTicket] = useState({
    game_id: null,
    count: 0,
    account_id: null, 
    cost: 3.00
  })
  const account_id = localStorage.getItem('account_id')


  useEffect(() => {
    const account_id = localStorage.getItem('account_id')
    setSelectedTicket({ ...selectedTicket, account_id: account_id})
    axiosApi
      .get('/customer/games')
      .then(response => {
        setGames(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleBookNow = () => {
    if (selectedTicket.count === 0) {
      setError(true)
      setMessage('Please select a ticket quantity')
      return
    }
    const payload = {
       ...selectedTicket,
      account_id,
    };
    axiosApi
      .post('/customer/AddToGameCart', payload)
      .then(response => {
        setSucess(true)
        setMessage('Game added to cart')
      })
      .catch(error => {
        if (error.response.status === 403) {
          setError(true)
          setMessage('Entry pass required')
          return
        }
        if (error.response.status === 402) {
          setError(true)
          setMessage('Game is broken or rained out')
          return
        }
        console.log(error)
        setError(true)
        setMessage('Error adding game to cart')
      })
  }
  const TicketCounter = ({ value, onChange, onSubmit }) => {
    return (
      <CounterContainer>
        <AdjustButton onClick={() => onChange(Math.max(0, value - 1))}>
          -
        </AdjustButton>
        <TicketInput type='text' value={value} readOnly />
        <AdjustButton onClick={() => onChange(value + 1)}>+</AdjustButton>
      </CounterContainer>
    )
  }

  return (
    <>
      <Container>
        <h4 className='TitleForType'> Our Games:</h4>
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
                    <CloseButton className='close' onClick={close}>
                      &times;
                    </CloseButton>
                    <RideDetail>
                      <h2 style={{ fontFamily: 'fantasy' }}>{game.name}</h2>
                      <img src={game.picture} alt={game.name} />
                      <p>{game.description}</p>
                      <p>Price: ${game.cost} Per Ticket</p>
                      <TicketCounter
                        value={
                          selectedTicket.game_id === game.game_id
                            ? selectedTicket.count
                            : 0
                        }
                        onChange={newCount =>
                          setSelectedTicket({
                            game_id: game.game_id,
                            count: newCount,
                            cost: game.cost
                          })
                        }
                      />
                      <SubmitButton onClick={handleBookNow}>
                        Add to cart
                      </SubmitButton>
                    </RideDetail>
                  </ModalContent>
                )}
              </Popup>
            </Wrap>
          ))}
        </Content>
      </Container>
      <Snackbar
        open={sucess}
        autoHideDuration={6000}
        onClose={() => setSucess(false)}
      >
        <Alert onClose={() => setSucess(false)} severity='success'>
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

export default Games

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
const CounterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
`

const AdjustButton = styled.button`
  padding: 8px 15px;
  margin: 5px;
  font-size: 18px;
  background-color: #ddd;
  width: 80px;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`

const TicketInput = styled.input`
  width: 50px;
  text-align: center;
  font-size: 16px;
  margin: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #f8f9fa;
  color: black;
`

const SubmitButton = styled.button`
  width: 60%;
  padding: 20px 20px;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
`
