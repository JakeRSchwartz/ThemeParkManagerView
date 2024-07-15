import React, { useEffect, useState } from 'react'
import axiosApi from '../../axiosInstance'
import '../../styles/admin.styles/tiktitle.css'
import { IoTicket } from 'react-icons/io5'

function InventoryChart () {
  const [inventoryItems, setInventoryItems] = useState([])

  useEffect(() => {
    axiosApi
      .get('/admin/GetInventory')
      .then(res => {
        setInventoryItems(res.data.inventory)
      })
      .catch(err => console.error('Error fetching inventory:', err))
  }, [])

  return (
    <>
      <div className='TikTitle'>
        <h3>Inventory Overview:</h3>
        <table className='inventory-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Cost</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map(item => (
              <tr key={item.name}>
                <td>
                  {item.name} {item.size}
                </td>
                <td>${item.cost}</td>
                <td>{item.inventory}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default InventoryChart
