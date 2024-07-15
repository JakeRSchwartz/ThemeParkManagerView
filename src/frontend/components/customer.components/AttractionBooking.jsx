import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosApi from '../../axiosInstance'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { Alert } from '@mui/material'
import {Snackbar} from '@mui/material'

function AttractionBooking () {
  const [allAttractions, setAllAttractions] = useState([]) // Renamed to allgames for clarity
  const [FilteredAttractions, setFilteredAttractions] = useState([]) // State to hold filtered games
  const [showRainedOut, setShowRainedOut] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [sucess, setSucess] = useState(false)
  const [showAge, setShowAge] = useState(false)
  const [minAge, setminAge] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState({
    attraction_id: null,
    count: 0,
    cost: 12.00
  })
  const account_id = localStorage.getItem('account_id')
  const handleBookNow = () => {
    if (selectedTicket.count === 0) {
  setError(true)
  setMessage('Please select a ticket quantity')
  return
}
const payload = {
  ...selectedTicket,
  account_id
}
axiosApi
  .post('/customer/AddToAttractionCart', payload)
  .then(response => {
    setSucess(true)
    setMessage('Attraction added to cart')
  })
  .catch(error => {
    if (error.response.status === 402) {
      setError(true)
      setMessage('Age restriction not met')
      return
    }
    if (error.response.status === 403) {
      setError(true)
      setMessage('Entry pass required')
      return
    }
    if(error.response.status === 401){
      setError(true)
      setMessage('Attraction is rained out')
      return
    }
    console.log(error)
    setError(true)
    setMessage('Error adding attraction to cart')
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

  useEffect(() => {
    axiosApi
      .get('/customer/attractions')
      .then(response => {
        setAllAttractions(response.data)
        setFilteredAttractions(response.data) // Initialize filteredgames with all games
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const applyFilters = () => {
    const filtered = allAttractions.filter(attraction => {
      const AgeRestriction = parseFloat(attraction.age_restriction)
      const meetsAgeCriteria = AgeRestriction >= (minAge || 0)
      const meetsRainedOutCriteria = showRainedOut || !attraction.rained_out

      return meetsAgeCriteria && meetsRainedOutCriteria
    })
    setFilteredAttractions(filtered)
  }

  return (
    <>
      <Container>
        <FilterToggle>
          <button onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </FilterToggle>
        {showFilters && (
          <Filters>
            <div className='number-inputs'>
              <input
                type='number'
                placeholder='Min Age (Years)'
                value={minAge}
                onChange={e => setminAge(e.target.value)}
              />
            </div>

            <div
              style={{
                width: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginLeft: '100px'
              }}
            >
              <label>Show Non-Rained Out Attractions</label>
              <input
                type='checkbox'
                checked={showRainedOut}
                onChange={e => setShowRainedOut(e.target.checked)}
              />
            </div>
            <button onClick={applyFilters}>Apply Filters</button>
          </Filters>
        )}
        <h4 className='TitleForType'>Attractions:</h4>

        <Content>
          {FilteredAttractions.map(attraction => (
            <Wrap key={attraction.attraction_id}>
              <Popup
                modal
                nested
                overlayStyle={{ backdropFilter: 'blur(5px)' }}
                trigger={
                  <div>
                    <h4 className='itemHeader'>{attraction.name}</h4>
                    <img src={attraction.picture} alt={attraction.name} />
                  </div>
                }
              >
                {close => (
                  <ModalContent>
                    <CloseButton className='close' onClick={close}>
                      &times;
                    </CloseButton>
                    <AttractionDetail>
                      <h2 style={{ fontFamily: 'fantasy' }}>
                        {attraction.name}
                      </h2>
                      <img src={attraction.picture} alt={attraction.name} />
                      <p>{attraction.description}</p>
                      <p>Age Restriction: {attraction.age_restriction} {'+ '}</p>
                      <p>Price: ${attraction.cost} Per Ticket</p>
                      <TicketCounter
                        value={
                          selectedTicket.attraction_id ===
                          attraction.attraction_id
                            ? selectedTicket.count
                            : 0
                        }
                        onChange={newCount =>
                          setSelectedTicket({
                            attraction_id: attraction.attraction_id,
                            count: newCount,
                            cost: attraction.cost
                          })
                        }
                      />
                      <SubmitButton onClick={handleBookNow}>
                        Add to Cart
                      </SubmitButton>
                    </AttractionDetail>
                  </ModalContent>
                )}
              </Popup>
            </Wrap>
          ))}
        </Content>
      </Container>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert severity='error'>{message}</Alert>
      </Snackbar>
      <Snackbar
        open={sucess}
        autoHideDuration={6000}
        onClose={() => setSucess(false)}
      >
        <Alert severity='success'>{message}</Alert>
      </Snackbar>
    </>
  )
}

export default AttractionBooking

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
const AttractionDetail = styled.div`
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
  background-color: #ccc;
  width: 80px;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
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


const FilterToggle = styled.div`
  margin-bottom: 20px;
  width: 200px;
`
const Filters = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0.3, 0.2, 0.3, 0.4);
  border-radius: 10px;
  padding: 20px;
  width: 400px;
`
