import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import keyframes from 'styled-components'
import axiosApi from '../../axiosInstance'
import CustomerSideNav from '../../components/customer.components/CustomerNav'
import Header from '../../components/customer.components/Header'
function YourBookings () {
  const account_id = localStorage.getItem('account_id')
  const [RideData, setRideData] = useState([])
  const [GameData, setGameData] = useState([])
  const [AttractionData, setAttractionData] = useState([])

  useEffect(() => {
    axiosApi
      .get(`/customer/GetRideVisited/${account_id}`)
      .then(response => {
        setRideData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    axiosApi
      .get(`/customer/GetGameVisited/${account_id}`)
      .then(response => {
        setGameData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    axiosApi
      .get(`/customer/GetAttractionVisited/${account_id}`)
      .then(response => {
        setAttractionData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <CustomerSideNav />
      <Header />
      <Container>
        <Title>Your Bookings</Title>
        <BookingList>
          <Subtitle>Rides</Subtitle>
          {RideData.map((ride, index) => (
            <BookingItem key={index}>
              <Image src={ride.picture} alt={ride.name} />
              <Text>
                {ride.name} - Ticket(s): {ride.num_tickets}
              </Text>
            </BookingItem>
          ))}
        </BookingList>
        <BookingList>
          <Subtitle>Games</Subtitle>
          {GameData.map((game, index) => (
            <BookingItem key={index}>
              <Image src={game.picture} alt={game.name} />
              <Text>
                {game.name} - Ticket(s): {game.num_tickets}
              </Text>
            </BookingItem>
          ))}
        </BookingList>
        <BookingList>
          <Subtitle>Attractions</Subtitle>
          {AttractionData.map((attraction, index) => (
            <BookingItem key={index}>
              <Image src={attraction.picture} alt={attraction.name} />
              <Text>
                {attraction.name} - Ticket(s): {attraction.num_tickets}
              </Text>
            </BookingItem>
          ))}
        </BookingList>
      </Container>
    </>
  )
}

export default YourBookings

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`

const BookingList = styled.div`
  width: 90%;
  max-width: 800px;
  background: #f9f9f9;
  margin: 20px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
`

const BookingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.03);
  }
`

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 20px;
  margin-top: 5px;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
`

const Text = styled.span`
  font-size: 16px;
  color: #333;
`

const Title = styled.h2`
  color: #333;
  font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
  margin-bottom: 10px;
`

const Subtitle = styled.h3`
  color: #555;
  font-family: 'Arial Rounded MT Bold', 'Helvetica Rounded', Arial, sans-serif;
`
