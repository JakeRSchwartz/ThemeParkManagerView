import React from 'react'
import mainlogo from '../../assets/Mainlogo.png'
import '../../styles/customer.styles/customerHome.css'
import { Link } from 'react-router-dom'
import { BiUserCircle } from 'react-icons/bi'
import { BsCart4 } from 'react-icons/bs'
import { Button } from '@mui/material'
import { IoIosNotifications } from 'react-icons/io'
import { useEffect } from 'react'
import Notifications from '../admin.components/Notifications.jsx'
import { useState } from 'react'

function Header () {
  const account_id = localStorage.getItem('account_id')
  const [showNotifications, setShowNotifications] = useState(false)
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  const first_name = localStorage.getItem('first_name')
  const last_name = localStorage.getItem('last_name')
  return (
    <div className='CustomerHeader'>
      <img
        src={mainlogo}
        alt='mainlogo'
        style={{ width: '225px', height: '225px', marginLeft: '68px' }}
      />
      < div className='links-cust'>
        
        <Link to='/Cart' className='LoginBtn' style={{ fontSize: '15px' }}>
          <BsCart4 style={{ fontSize: '30px' }} />
          Cart
        </Link>
        <Link
          to='/customer/Profile'
          className='LoginBtn'
          style={{ fontSize: '12px' }}
        >
          <BiUserCircle style={{ fontSize: '50px' }} />
          {first_name} {last_name}
        </Link>
      </div>
    </div>
  )
}

export default Header
