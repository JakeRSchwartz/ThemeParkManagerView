import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosApi from '../../axiosInstance'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import Header from '../../components/customer.components/Header'
import CustomerNav from '../../components/customer.components/CustomerNav'
import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material'
function GiftShop () {
  const account_id = localStorage.getItem('account_id')
  const [suceess, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [products, setProducts] = useState([])
  const [selectedItems, setSelectedItems] = useState({})

  useEffect(() => {
    axiosApi
      .get('/customer/gifts')
      .then(response => {
        setProducts(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    axiosApi
  }, [])
  const handleQuantityChange = (gift_id, change) => {
    setSelectedItems(prevItems => {
      const currentQuantity = prevItems[gift_id]?.quantity || 0
      const newQuantity = Math.max(0, currentQuantity + change)
      return {
        ...prevItems,
        [gift_id]: {
          ...prevItems[gift_id],
          quantity: newQuantity
        }
      }
    })
  }

  const handleSizeChange = (gift_id, event) => {
    const newSize = event.target.value
    setSelectedItems(prevItems => {
      return {
        ...prevItems,
        [gift_id]: {
          ...prevItems[gift_id],
          size: newSize,
          quantity: prevItems[gift_id]?.quantity || 0 // Ensure quantity is initialized
        }
      }
    })
  }

  const HandleSubmit = (gift_id, cost) => {
    const quantity = selectedItems[gift_id]?.quantity
    const size = selectedItems[gift_id]?.size || 'M'
    if (!quantity) {
      setError(true)
      setMessage('Please select a quantity')
      return
    }

    const payload = {
      account_id,
      gift_id,
      quantity,
      size,
      cost
    }
    console.log(payload)
    axiosApi
      .post('/customer/AddToGiftCart', payload)
      .then(response => {
        setSuccess(true)
        setMessage('Item added to cart')
      })
      .catch(error => {
        if (error.response.status === 403) {
          setError(true)
          setMessage('Item already in cart')
          return
        }
        if (error.response.status === 402) {
          setError(true)
          setMessage('Item out of stock')
          return
        }
        console.log(error)
        setError(true)
        setMessage('Error adding item to cart')
      })
  }

  return (
    <>
      <CustomerNav />
      <Header />
      <Container>
        <h1
          style={{
            fontFamily: 'sans-serif',
            fontSize: '30px',
            marginLeft: '10px'
          }}
        >
          Gift Shop:
        </h1>
        <Card>
          {products.map(product => (
            <Wrap key={product.gift_id}>
              <img src={product.picture} alt='' />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p style={{ marginTop: '10px' }}>Price: ${product.cost}</p>
              {[2, 4].includes(product.gift_id) && (
                <SizeSelector
                  value={selectedItems[product.gift_id]?.size || 'M'}
                  onChange={e => handleSizeChange(product.gift_id, e)}
                >
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </SizeSelector>
              )}
              <QuantityAdjuster>
                <QuantityButton
                  onClick={() => handleQuantityChange(product.gift_id, -1)}
                >
                  -
                </QuantityButton>
                <QuantityDisplay>
                  {selectedItems[product.gift_id]?.quantity || 0}
                </QuantityDisplay>
                <QuantityButton
                  onClick={() => handleQuantityChange(product.gift_id, 1)}
                >
                  +
                </QuantityButton>
              </QuantityAdjuster>
              <button
                onClick={() => HandleSubmit(product.gift_id, product.cost)}
              >
                Add to Cart
              </button>
            </Wrap>
          ))}
        </Card>
      </Container>
      <Snackbar
        open={suceess}
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

export default GiftShop

const Container = styled.div`
  width: auto;
  height: auto;
  margin: auto;
  margin-left: 75px;
  margin-bottom: 50px;
  margin-right: 10px;
  margin-top: 50px;
`
const Card = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;
  padding: 0px;
`
const Wrap = styled.div`
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between; // Distributes space evenly
  align-items: center;
  max-height: 100%;
  box-shadow: 3px 7px 8px 3px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
  border-radius: 10px;
  margin-bottom: 20px;
  margin-top: 40px;
  img {
    width: 80%; // Responsive width
    height: auto;
  }
`
const SizeSelector = styled.select`
  margin-top: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 50px;
  cursor: pointer;
  height: 30px;
`

const QuantityAdjuster = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`

const QuantityButton = styled.button`
  padding: 5px 10px;
  color: black;
  margin: 0 5px;
  border-radius: 5px;
  border: none;
  background-color: #ddd;
  width: 50px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
`

const QuantityDisplay = styled.span`
  padding: 5px 10px;
  margin: 0 5px;
`
