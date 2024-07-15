import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosApi from '../../axiosInstance'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material'
import Header from '../../components/customer.components/Header'
import CustomerSideNav from '../../components/customer.components/CustomerNav'
import keyframes from 'styled-components'
function Cart () {
  const account_id = localStorage.getItem('account_id')
  const [RideData, setRideData] = useState([])
  const [Success, setSuccess] = useState(false)
  const [Error, setError] = useState(false)
  const [Message, setMessage] = useState('')
  const [GameData, setGameData] = useState([])
  const [AttractionData, setAttractionData] = useState([])
  const [GiftData, setGiftData] = useState([])
  const [ReceiptData, setReceiptData] = useState([])
  const [totalCost, setTotalCost] = useState(0)
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    const totalRidesCost = RideData.reduce(
      (acc, item) => acc + parseFloat(item.cost),
      0
    )
    const totalGamesCost = GameData.reduce(
      (acc, item) => acc + parseFloat(item.cost),
      0
    )
    const totalAttractionsCost = AttractionData.reduce(
      (acc, item) => acc + parseFloat(item.cost),
      0
    )
    const totalGiftsCost = GiftData.reduce(
      (acc, item) => acc + parseFloat(item.cost),
      0
    )

    setTotalCost(
      totalRidesCost + totalGamesCost + totalAttractionsCost + totalGiftsCost
    )
  }, [RideData, GameData, AttractionData, GiftData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const account_id = localStorage.getItem('account_id')
        if (!account_id) {
          console.log('No account_id')
          return
        }

        const rideCartResponse = await axiosApi.get(
          `/customer/GetRideCart/${account_id}`
        )
        const gameCartResponse = await axiosApi.get(
          `/customer/GetGameCart/${account_id}`
        )
        const attractionCartResponse = await axiosApi.get(
          `/customer/GetAttractionCart/${account_id}`
        )
        const giftCartResponse = await axiosApi.get(
          `/customer/GetGiftCart/${account_id}`
        )

        // Combine all data
        const RideArray = [...rideCartResponse.data]
        setRideData(RideArray)
        const GameArray = [...gameCartResponse.data]
        setGameData(GameArray)
        console.log(GameArray)
        const AttractionArray = [...attractionCartResponse.data]
        setAttractionData(AttractionArray)
        // const GiftArray = [...giftCartResponse.data]
        // setGiftData(GiftArray)
        const GiftArray = giftCartResponse.data.map(gift => ({
          ...gift,
          unit_cost: parseFloat(gift.cost) / gift.quantity
        }))
        setGiftData(GiftArray)

        // Update state once with all fetched data
        console.log(RideArray)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData() // Fetch data when the component mounts
  }, [])
  useEffect(() => {
    axiosApi
    .get(`/customer/GetPayment/${account_id}`)
    .then(response => {
      if (response.data.length === 0) {
        return
      }
      setFormData(response.data[0])
    })
    
  }, [account_id])

  function removeRide (id) {
    setRideData(prev => prev.filter(item => item.Ride_Cart_id !== id))
    axiosApi
      .delete(`/customer/DeleteRideCartItem/${id}`)
      .then(response => {})
      .catch(error => {
        console.log(error)
      })
  }
  function removeGame (id) {
    setGameData(prev => prev.filter(item => item.Game_Cart_id !== id))
    axiosApi
      .delete(`/customer/DeleteRideCartItem/${id}`)
      .then(response => {})
      .catch(error => {
        console.log(error)
      })
  }
  function removeAttraction (id) {
    console.log(id)
    setAttractionData(prev =>
      prev.filter(item => item.Attraction_Cart_id !== id)
    )
    axiosApi
      .delete(`/customer/DeleteAttractionCartItem/${id}`)
      .then(response => {})
      .catch(error => {
        console.log(error)
      })
  }
  function removeGift (id) {
    setGiftData(prev => prev.filter(item => item.gift_cart_id !== id))
    axiosApi
      .delete(`/customer/DeleteGiftCartItem/${id}`)
      .then(response => {})
      .catch(error => {
        console.log(error)
      })
  }
  function incrementRide (id) {
    setRideData(prev =>
      prev.map(item =>
        item.Ride_Cart_id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              cost: parseFloat(parseFloat(item.cost) + 5.0).toFixed(2)
            }
          : item
      )
    )
    axiosApi
      .put(
        `/customer/IncrementRideCartItemandCost
/${id}`
      )
      .then(response => {})
      .catch(error => {
        console.log(error)
      })
  }
  function decrementRide (id) {
    setRideData(prev =>
      prev.map(item =>
        item.Ride_Cart_id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              cost: parseFloat(parseFloat(item.cost) - 5.0).toFixed(2)
            }
          : item
      )
    )
    axiosApi
      .put(
        `/customer/DecrementRideCartItemandCost
/${id}`
      )
      .then(response => {})
      .catch(error => {
        console.log(error)
      })
  }
  function incrementGame (id) {
    setGameData(prev =>
      prev.map(item =>
        item.Game_Cart_id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              cost: parseFloat(parseFloat(item.cost) + 3.0).toFixed(2)
            }
          : item
      )
    )
    axiosApi
      .put(
        `/customer/IncrementGameCartItemandCost
/${id}`
      )
      .then(response => {})
      .catch(error => {
        console.log(error)
      })
  }
  function decrementGame (id) {
    setGameData(prev =>
      prev.map(item =>
        item.Game_Cart_id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              cost: parseFloat(parseFloat(item.cost) - 3.0).toFixed(2)
            }
          : item
      )
    )
    axiosApi
      .put(
        `/customer/DecrementGameCartItemandCost
/${id}`
      )
      .then(response => {})
      .catch(error => {
        console.log(error)
      })
  }
  function incrementAttraction (id) {
    setAttractionData(prev =>
      prev.map(item =>
        item.Attraction_Cart_id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              cost: parseFloat(parseFloat(item.cost) + 12.0).toFixed(2)
            }
          : item
      )
    )
    axiosApi
      .put(
        `/customer/IncrementAttractionCartItemandCost
/${id}`
      )
      .then(response => {})
      .catch(error => {
        console.log(error)
      })
  }
  function decrementAttraction (id) {
    setAttractionData(prev =>
      prev.map(item =>
        item.Attraction_Cart_id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              cost: parseFloat(parseFloat(item.cost) - 12.0).toFixed(2)
            }
          : item
      )
    )
    axiosApi
      .put(
        `/customer/DecrementAttractionCartItemandCost
/${id}`
      )
      .then(response => {})
      .catch(error => {
        console.log(error)
      })
  }
  function incrementGift (id) {
    setGiftData(prev =>
      prev.map(item =>
        item.gift_cart_id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              cost: parseFloat(
                parseFloat(item.cost) + parseFloat(item.unit_cost)
              ).toFixed(2) // assuming unit_cost holds the cost of one unit
            }
          : item
      )
    )
    axiosApi
      .put(
        `/customer/IncrementGiftCartItemandCost
/${id}`
      )
      .then(response => {})
      .catch(error => {
        console.log(error)
      })
  }

  function decrementGift (id) {
    setGiftData(prev =>
      prev.map(item =>
        item.gift_cart_id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              cost: parseFloat(
                parseFloat(item.cost) - parseFloat(item.unit_cost)
              ).toFixed(2) // assuming unit_cost holds the cost of one unit
            }
          : item
      )
    )
    axiosApi
      .put(
        `/customer/DecrementGiftCartItemandCost
/${id}`
      )
      .then(response => {})
      .catch(error => {
        console.log(error)
      })
  }
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePayment = () => {
    if (
      !formData.card_number ||
      !formData.card_holder_name ||
      !formData.expire_date ||
      !formData.cvv ||
      !formData.address_line1 ||
      !formData.city ||
      !formData.state ||
      !formData.zip_code
    ) {
      setError(true)
      setMessage('Please fill out all fields')
      return
    }
    if (formData.card_number.length < 15) {
      setError(true)
      setMessage('Card number must be 15 digits')
      return
    }
    if (formData.card_holder_name.length < 3) {
      setError(true)
      setMessage('Card holder name must be at least 3 characters')
      return
    }
    if (formData.expire_date.length < 4) {
      setError(true)
      setMessage('Expiry date must be in MM/YY format')
      return
    }
    if (formData.cvv.length < 3) {
      setError(true)
      setMessage('CVV must be 3 digits')
      return
    }
    if (formData.address_line1.length < 5) {
      setError(true)
      setMessage('Address line 1 must be at least 5 characters')
      return
    }
    if (formData.city.length < 3) {
      setError(true)
      setMessage('City must be at least 3 characters')
      return
    }
    if (formData.state.length < 2) {
      setError(true)
      setMessage('State must be 2 characters')
      return
    }
    if (formData.zip_code.length < 5) {
      setError(true)
      setMessage('Zip code must be 5 digits')
      return
    }
    if (
      AttractionData.length === 0 &&
      GameData.length === 0 &&
      RideData.length === 0 &&
      GiftData.length === 0
    ) {
      setError(true)
      setMessage('Cart is empty')
      return
    }
    if (AttractionData.length > 0) {
      axiosApi
        .post('/customer/InsertIntoAttractionVisited', {
          account_id: account_id,
          AttractionData: AttractionData
        })
        .then(response => {
          setAttractionData([])
        })
        .catch(error => {
          setError(true)
          setMessage('Payment failed')
        })
    }
    if (GameData.length > 0) {
      axiosApi
        .post('/customer/InsertIntoGameVisited', {
          account_id: account_id,
          GameData: GameData
        })
        .then(response => {
          setGameData([])
        })
        .catch(error => {
          setError(true)
          setMessage('Payment failed')
        })
    }
    if (RideData.length > 0) {
      axiosApi
        .post('/customer/InsertIntoRideVisited', {
          account_id: account_id,
          RideData: RideData
        })
        .then(response => {
          setRideData([])
        })
        .catch(error => {
          setError(true)
          setMessage('Payment failed')
        })
    }
    if (GiftData.length > 0) {
      axiosApi
        .put('/customer/UpdateGiftPurchased', {
          account_id: account_id,
          GiftData: GiftData
        })
        .then(response => {})
        .catch(error => {
          setError(true)
          setMessage('Payment failed')
        })
      axiosApi
        .post(`/customer/sendEmail/${account_id}`, {
          GiftData: GiftData
        })
        .then(response => {
          setGiftData([])
        })
        .catch(error => {
          setError(true)
          setMessage('Payment failed')
        })
    }
    setSuccess(true)
    setMessage(
      'Order Receieved! A confirmation email with details will be sent to you shortly.'
    )
  }

  return (
    <>
      <CustomerSideNav />
      <Header />
      <Container>
        <Title>Cart</Title>
        <Section>
          <Title>Rides</Title>
          <List>
            {RideData.map(ride => (
              <Item key={ride.Ride_Cart_id}>
                <ImgContainer>
                  <StyledImage src={ride.picture} alt='Ticket' />
                </ImgContainer>
                {ride.name} - {ride.quantity} ticket(s) - ${ride.cost}
                <ButtonContainer>
                  <AdjustButton
                    onClick={() => decrementRide(ride.Ride_Cart_id)}
                  >
                    -
                  </AdjustButton>
                  <AdjustButton
                    onClick={() => incrementRide(ride.Ride_Cart_id)}
                  >
                    +
                  </AdjustButton>
                </ButtonContainer>
                <RemoveButton onClick={() => removeRide(ride.Ride_Cart_id)}>
                  ✕
                </RemoveButton>
              </Item>
            ))}
          </List>
        </Section>
        <Section>
          <Title>Games</Title>
          <List>
            {GameData.map(game => (
              <Item key={game.Game_Cart_id}>
                <ImgContainer>
                  <StyledImage src={game.picture} alt='Ticket' />
                </ImgContainer>
                {game.name} - {game.quantity} play(s) - ${game.cost}
                <ButtonContainer>
                  <AdjustButton
                    onClick={() => decrementGame(game.Game_Cart_id)}
                  >
                    -
                  </AdjustButton>
                  <AdjustButton
                    onClick={() => incrementGame(game.Game_Cart_id)}
                  >
                    +
                  </AdjustButton>
                </ButtonContainer>
                <RemoveButton onClick={() => removeGame(game.Game_Cart_id)}>
                  ✕
                </RemoveButton>
              </Item>
            ))}
          </List>
        </Section>
        <Section>
          <Title>Attractions</Title>
          <List>
            {AttractionData.map(attraction => (
              <Item key={attraction.Attraction_Cart_id}>
                <ImgContainer>
                  <StyledImage src={attraction.picture} alt='Ticket' />
                </ImgContainer>
                {attraction.name} - {attraction.quantity} ticket(s) - $
                {attraction.cost}
                <ButtonContainer>
                  <AdjustButton
                    onClick={() =>
                      decrementAttraction(attraction.Attraction_Cart_id)
                    }
                  >
                    -
                  </AdjustButton>
                  <AdjustButton
                    onClick={() => incrementAttraction(attraction.Attraction_Cart_id)}
                  >
                    +
                  </AdjustButton>
                </ButtonContainer>
                <RemoveButton
                  onClick={() =>
                    removeAttraction(attraction.Attraction_Cart_id)
                  }
                >
                  ✕
                </RemoveButton>
              </Item>
            ))}
          </List>
        </Section>
        <Section>
          <Title>Gifts</Title>
          <List>
            {GiftData.map(gift => (
              <Item key={gift.gift_cart_id}>
                <ImgContainer>
                  <StyledImage src={gift.picture} alt='Ticket' />
                </ImgContainer>
                {gift.size} {gift.name} - {gift.quantity} item(s) - ${gift.cost}
                <ButtonContainer>
                  <AdjustButton
                    onClick={() => decrementGift(gift.gift_cart_id)}
                  >
                    -
                  </AdjustButton>
                  <AdjustButton
                    onClick={() => incrementGift(gift.gift_cart_id)}
                  >
                    +
                  </AdjustButton>
                </ButtonContainer>
                <RemoveButton onClick={() => removeGift(gift.gift_cart_id)}>
                  ✕
                </RemoveButton>
              </Item>
            ))}
          </List>
        </Section>
        <TotalCostDisplay>Total Cost: ${totalCost.toFixed(2)}</TotalCostDisplay>
        <Popup
          modal
          nested
          overlayStyle={{ backdropFilter: 'blur(5px)', zIndex: 1000 }}
          contentStyle={{
            width: '680px',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflowY: 'scroll',
            zIndex: 1001
          }}
          trigger={<button className='EntryBtn'>Proceed to Payment</button>}
          position='center center'
        >
          {close => (
            <ModalContent>
              <CloseButton className='close' onClick={close}>
                &times;
              </CloseButton>
              <h2>Payment and Shipping Information</h2>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  handlePayment()
                  close()
                }}
              >
                <div>
                  <Label htmlFor='cardNumber'>Card Number</Label>
                  <Input
                    type='text'
                    placeholder='Card Number'
                    value={formData.card_number || ''}
                    name='card_number'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor='cardHolderName'>Card Holder's Name</Label>
                  <Input
                    type='text'
                    placeholder="Card Holder's Name"
                    value={formData.card_holder_name || ''}
                    name='card_holder_name'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Expire Date</Label>
                  <Input
                    type='text'
                    placeholder='MM/YY'
                    value={formData.expire_date || ''}
                    name='expire_date'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>CVV</Label>
                  <Input
                    type='text'
                    placeholder='CVV'
                    value={formData.cvv || ''}
                    name='cvv'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Address Line 1</Label>
                  <Input
                    type='text'
                    placeholder='Address Line 1'
                    value={formData.address_line1 || ''}
                    name='address_line1'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Address Line 2</Label>
                  <Input
                    type='text'
                    placeholder='Address Line 2'
                    value={formData.address_line2 || ''}
                    name='address_line2'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Input
                    type='text'
                    placeholder='City'
                    value={formData.city || ''}
                    name='city'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>State</Label>
                  <Input
                    type='text'
                    placeholder='State'
                    value={formData.state || ''}
                    name='state'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Zip Code</Label>
                  <Input
                    type='text'
                    placeholder='Zip Code'
                    value={formData.zip_code || ''}
                    name='zip_code'
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <SubmitButton type='submit'>Submit Payment</SubmitButton>
                </div>
              </Form>
            </ModalContent>
          )}
        </Popup>
      </Container>
      <Snackbar
        open={Success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity='success'>
          {Message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={Error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert onClose={() => setError(false)} severity='error'>
          {Message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Cart

const Container = styled.div`
  margin: auto;
  width: 90%;
  margin-top: 60px;
  max-width: 600px;
  min-height: 800px;
  padding: 2rem;
  background: whitesmoke;
  border-radius: 20px; // Rounded corners for a bubbly look
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-family: 'Arial', sans-serif;
  margin-bottom: 40px;
`
const Section = styled.div`
  width: 100%;
  padding: 10px;
  text-align: center;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Item = styled.li`
  background: #ffffff;
  height: 100px;
  padding: 10px 15px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`
const RemoveButton = styled.span`
  cursor: pointer;
  color: #ff5c8d; // A cute pink shade
  font-size: 20px;
  display: inline-block;
  padding: 5px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background: #f0e1e1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: #ffced6;
    transform: rotate(90deg) scale(1.1); // Rotate for a playful effect
  }
`
const Title = styled.h2`
  font-size: 24px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 2px solid red;
  margin-bottom: 20px;
`
const StyledImage = styled.img`
  width: 80px;
  height: 100%;
  margin-bottom: 40px;
  box-shadow: 1px 3px 10px rgba(0.3, 0.3, 0.4, 0.6);
  border-radius: 10px;
  object-fit: cover;
  margin-right: 10px; // Adds space between the image and the text
  flex-shrink: 0; // Prevents the image from resizing flex items
`
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 75px;
  margin-left: 30px;
`
const AdjustButton = styled.button`
  width: 30px; // Fixed width for a perfect circle
  height: 30px; // Fixed height for a perfect circle
  border-radius: 50%; // Makes the button perfectly round
  border: 1px solid #ccc; // Subtle border for definition
  background-color: #f8f8f8; // Light and neutral background color
  color: #333; // Dark color for contrast
  font-size: 18px; // Adjust font size for visibility
  line-height: 28px; // Centers text vertically, adjust as needed for perfect centering
  text-align: center; // Ensure text is centered horizontally
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #e0e0e0; // Darker shade on hover for interaction feedback
    transform: scale(1.1); // Slightly enlarge button on hover for emphasis
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around; // This spreads out the buttons a bit
  height: 100%; // Ensures the container takes full height of its parent for vertical centering
  gap: 5px;
  margin-bottom: 38px;
`
const TotalCostDisplay = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #f0f0f0;
  border-top: 1px solid #ddd;
  text-align: center;
  font-size: 20px;
  color: #333;
  border-radius: 10px;
`

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
  position: relative;
  background: linear-gradient(145deg, #ffffff, #f9f9f9);
  border-radius: 10px;
  padding: 20px;
  color: black;
  font-size: 1rem;
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
  box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15);
  animation: ${fadeInScaleUp} 0.3s ease-out forwards;
  overflow-y: auto; // Enables vertical scrolling if needed
  max-height: 80vh; // Limits the height of the modal
`

const CloseButton = styled.span`
  cursor: pointer;
  height: 30px;
  position: absolute;
  width: 30px;
  top: 10px;
  z-index: 1;
  right: 15px;
  font-size: 30px;
  color: #ff0000; /* A bright red for contrast and attention */
  transition: all 0.2s ease;

  &:hover {
    color: #e92603; /* Darken the color slightly on hover */
    transform: rotate(90deg); /* Adds a playful twist on hover */
  }
`
const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // Two columns
  column-gap: 20px; // Space between columns
  row-gap: 10px; // Space between rows
  width: 100%; // Full width of the modal content area
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 15px; // More padding for a better visual appearance
  border: 1px solid #ccc; // Subtle border color
  border-radius: 8px; // Slightly rounded corners for a softer look
  outline: none; // Remove default focus outline
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); // Subtle inset shadow for depth
  transition: border-color 0.3s, box-shadow 0.3s; // Smooth transitions for interaction

  &:hover {
    border-color: #bbb; // Slightly darker border on hover
  }

  &:focus {
    border-color: #007bff; // Blue border for focus state similar to Bootstrap's primary color
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.25); // Glowing effect when focused
  }

  &::placeholder {
    color: #aaa; // Lighter text for placeholder
  }
`

const Label = styled.label``

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`
