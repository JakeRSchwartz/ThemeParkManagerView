import React, { useState } from 'react'
import styled from 'styled-components'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CustomerNav from '../../components/customer.components/CustomerNav'
import Header from '../../components/customer.components/Header'
import ticket from '../../assets/Ticket.jpeg'
import axiosApi from '../../axiosInstance'
import Popup from 'reactjs-popup'
import keyframes from 'styled-components'
import 'reactjs-popup/dist/index.css'
import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material'
import { useEffect } from 'react'
function BuyEntryPass () {

  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)
  const [formData, setformData] = useState({
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

  const [Error, setError] = useState(false)
  const [Success, setSuccess] = useState(false)
  const [Message, setMessage] = useState('')
  const account_id = localStorage.getItem('account_id')
   useEffect(() => {
    axiosApi.get(`/customer/GetPayment/${account_id}`).then(response => {
      if (response.data.length === 0){ 
        return
      }
      setformData(response.data[0])
      console.log(response.data[0])
    })
  }, [account_id])

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [ticketDetails, setTicketDetails] = useState({
    account_id: account_id,
    start_date: today.toISOString().split('T')[0], // Ensuring initial date is valid
    end_date: tomorrow.toISOString().split('T')[0] // Ensuring initial date is valid
  })

  const handleStartDateChange = date => {
    // Create date object and format it to an ISO string, then slice to get only the date part
    const formattedStartDate = date.toISOString().split('T')[0]
    const newEndDate = new Date(date)
    newEndDate.setDate(newEndDate.getDate() + 1) // Setting the end date to one day ahead

    // Format the end date
    const formattedEndDate = newEndDate.toISOString().split('T')[0]

    setTicketDetails(prevDetails => ({
      ...prevDetails,
      start_date: formattedStartDate,
      end_date: formattedEndDate
    }))
  }

  const HandleSubmit = () => {
    if (!ticketDetails.start_date || !ticketDetails.end_date) {
      setError(true)
      setMessage('Please select a valid date')
      return
    }
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
    axiosApi
      .post('/customer/entryPass', ticketDetails)
      .then(res => {
        setSuccess(true)
        setMessage('Entry pass purchased successfully')
        close()
      })
      .catch(err => {
        if (err.response.status === 401) {
          setError(true)
          setMessage('You Already Have an Entry Pass for This Date')
          return
        }
        console.error(err)
        setError(true)
      })
  }
  const handleChange = e => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <CustomerNav />
      <Header />
      <PassArea>
        <CTA>
          <h1
            style={{
              margin: 'auto',
              fontFamily: 'monospace',
              fontSize: '2rem'
            }}
          >
            Buy Entry Pass
          </h1>
          <CTALogoOne src={ticket} />
          <DateLabel>
            Select Date of Visit:
            <DatePicker
              selected={new Date(ticketDetails.start_date)}
              onChange={handleStartDateChange}
              minDate={new Date()}
              dateFormat='MMMM d, yyyy'
            />
          </DateLabel>
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
            trigger={
              <button className='EntryBtn' onClick={HandleSubmit}>
                BUY DAY TICKET
              </button>
            }
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
                      name='card_number'
                      value={formData.card_number || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor='cardHolderName'>Card Holder's Name</Label>
                    <Input
                      type='text'
                      placeholder="Card Holder's Name"
                      name='card_holder_name'
                      value={formData.card_holder_name || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Expire Date</Label>
                    <Input
                      type='text'
                      placeholder='MM/YY'
                      name='expire_date'
                      value={formData.expire_date || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>CVV</Label>
                    <Input
                      type='text'
                      placeholder='CVV'
                      name='cvv'
                      value={formData.cvv || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Address Line 1</Label>
                    <Input
                      type='text'
                      placeholder='Address Line 1'
                      name='address_line1'
                      value={formData.address_line1 || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Address Line 2</Label>
                    <Input
                      type='text'
                      placeholder='Address Line 2'
                      name='address_line2'
                      value={formData.address_line2 || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label>City</Label>
                    <Input
                      type='text'
                      placeholder='City'
                      name='city'
                      value={formData.city || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>State</Label>
                    <Input
                      type='text'
                      placeholder='State'
                      name='state'
                      value={formData.state || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label>Zip Code</Label>
                    <Input
                      type='text'
                      placeholder='Zip Code'
                      name='zip_code'
                      value={formData.zip_code || ''}
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
          <Description>
            {' '}
            *Our refund policy for tickets is designed to be clear and fair.
            Tickets purchased may be refunded up to 48 hours prior to the
            scheduled event or visit date, provided that the request is made in
            writing to our customer service team. Unfortunately, we cannot offer
            refunds or exchanges for tickets canceled less than 48 hours before
            the event. Additionally, please be aware that our ticket prices are
            subject to change without prior notice. This can occur due to
            varying demand, special promotions, or changes in operational costs.
            We recommend checking our website regularly for the most up-to-date
            pricing information and making purchases early to lock in the
            current rates
          </Description>
        </CTA>
      </PassArea>
      <Snackbar
        open={Error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert severity='error' onClose={() => setError(false)}>
          {Message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={Success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity='success' onClose={() => setSuccess(false)}>
          {Message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default BuyEntryPass

const PassArea = styled.div`
  height: 700px;
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  box-shadow: 0 6px 9px 0 rgba(0, 0.3, 0.2, 0.4);
  margin-top: 50px;
`
const DateLabel = styled.label`
  font-size: 18px;
  color: #333;
`

const DatePicker = styled(ReactDatePicker)`
  padding: 8px;
  font-size: 16px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 5px;

  &:focus {
    border-color: #007bff;
  }
`

const CTA = styled.div`
  max-width: 660px;
  padding: 80px 40px;
  display: flex;
  width: 80%;
  flex-direction: column;
  margin-top: 100px;
`

const Description = styled.p`
font-size:11px;
letter-spacingL1.5px;
text-align:center;
line-height:1.5;
margin-bottom:120px;
`
const CTALogoOne = styled.img`
  width: 400px;
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

const Label = styled.label`
  grid-column: span 2; // Make labels span across both columns for clarity
`

const SubmitButton = styled.button`
  grid-column: span 2; // Span the submit button across both columns
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`
