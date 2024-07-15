import React from 'react'
import mainlogo from '../../assets/Mainlogo.png'
import '../../styles/customer.styles/customerHome.css'
import { Link } from 'react-router-dom'
import { BiUserCircle } from 'react-icons/bi'
import { BsCart4 } from 'react-icons/bs'

function ClearCache () {
  localStorage.clear()
}

function EmpHeader () {
  const first_name = localStorage.getItem('first_name')
  const last_name = localStorage.getItem('last_name')
  return (
    <div className='CustomerHeader' style={{position:'sticky', top:'0'}}>
      <img
        src={mainlogo}
        alt='mainlogo'
        style={{ width: '225px', height: '225px', marginLeft: '68px' }}
      />
      <div className='links-cust'>
        {/* <Link to='/login' className='LoginBtn' onClick={ClearCache}>
          Login
        </Link>
        <Link to='/registration' className='LoginBtn'>
          Register
        </Link> */}
        <Link
          to='/admin/Profile'
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

export default EmpHeader
