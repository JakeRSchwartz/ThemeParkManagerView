import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button } from '@mui/material'
import axiosApi from '../../axiosInstance'
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { TextField } from '@mui/material'
import EmpHeader from '../../components/admin.components/EmpHeader'
import AdminSideNav from '../../components/admin.components/SideNav'
import {Snackbar} from '@mui/material'
import {Alert} from '@mui/material'
import { set } from 'date-fns'

function ManageInventory () {
  const [inventory, setInventory] = useState([])
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')
  const [selectedItem, setSelectedItem] = useState({
    inventory_id: '',
    quantity: ''
  })
  const handleSelectItem = event => {
    setSelectedItem({
      ...selectedItem,
      inventory_id: event.target.value
    })
  }
  const handleQuantityChange = event => {
    setSelectedItem({
      ...selectedItem,
      quantity: event.target.value
    })
  }
  const handleSubmit = () => {
    axiosApi.put('/admin/EditInventory', selectedItem)
    .then(response => {
        setSuccess(true)
        setMessage('Inventory updated successfully')
    }).catch(error => {
        console.log(error)
        setError(true)
        setMessage('Error updating inventory')
    })
  }

  useEffect(() => {
    axiosApi.get('/admin/GetInventoryInfo').then(response => {
      setInventory(response.data.inventory)
    })
  }, [])

  return (
    <>
      <EmpHeader />
      <AdminSideNav />
      <div
        style={{
          margin: 'auto',
          width: '500px',
          height: '300px',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '100px'
        }}
      >
        <h1 style={{ marginTop: '20px' }}>Manage Inventory</h1>
        <FormControl style={{ marginTop: '20px' }}>
          <InputLabel id='item'>Item</InputLabel>
          <Select
            onChange={handleSelectItem}
            name='item'
            labelId='item'
            id='item'
            label='Item'
            value={selectedItem.inventory_id}
            style={{ width: '200px' }}
          >
            {inventory.map(item => (
              <MenuItem value={item.inventory_id}>
                {item.name} {item.size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name='quantity'
          id='quantity'
          label='Quantity'
          variant='outlined'
          value={selectedItem.quantity}
          onChange={handleQuantityChange}
          style={{ marginTop: '20px' }}
        />
        <Button
          variant='contained'
          style={{ marginTop: '20px' }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
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
                Error updating inventory
            </Alert>
        </Snackbar>
    </>
  )
}

export default ManageInventory
