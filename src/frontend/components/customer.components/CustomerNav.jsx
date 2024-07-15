import React from 'react'
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import { FaHome } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'
import '../../styles/admin.styles/admin.css'
import { IoLogOut } from 'react-icons/io5'
import { TbRollercoaster } from 'react-icons/tb'
import '../../styles/maintanence.styles/maintenance.css'
import { GiDart } from 'react-icons/gi'
import { BsFillPassFill } from 'react-icons/bs'
import { TbBuildingCircus } from 'react-icons/tb'
import { BsBookFill } from 'react-icons/bs'
import { GiTicket } from 'react-icons/gi'
import { AiFillGift } from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import {
  Route,
  Routes,
  Link,
  BrowserRouter as Router,
  useLocation
} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function CustomerSideNav () {
  const { pathname } = useLocation()
  console.log(pathname)
  const navigate = useNavigate()
  return (
    <>
      <SideNav
        style={{
          background: 'white',
          border: '2px solid black',
          borderTop: 'none',
          position: 'fixed',
          bottom: 0
        }}
        onSelect={selected => {
          if (selected === 'Home') {
            navigate('/home')
          } else if (selected === 'Logout') {
            localStorage.clear()
            navigate('/')
          } else {
            const to = '/customer/' + selected
            navigate(to)
          }
        }}
      >
        <SideNav.Toggle style={{ background: '#FF0000', color: 'black' }} />
        <SideNav.Nav defaultSelected='admin'>
          <NavItem
            className='Navitem'
            eventKey='Home'
            style={{ marginBottom: '15px', marginTop: '15px' }}
          >
            <NavIcon>
              <FaHome style={{ color: '#FF0000' }} size={22} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Home
            </NavText>
          </NavItem>
          <NavItem
            className='Navitem'
            eventKey='BuyEntryPass'
            style={{ marginBottom: '15px', marginTop: '15px' }}
          >
            <NavIcon>
              <GiTicket style={{ color: '#FF0000' }} size={22} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Buy Entry Pass
            </NavText>
          </NavItem>
          <NavItem
            className='Navitem'
            eventKey='GiftShop'
            style={{ marginBottom: '15px', marginTop: '15px' }}
          >
            <NavIcon>
              <AiFillGift style={{ color: '#FF0000' }} size={22} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Gift Shop
            </NavText>
          </NavItem>
          <NavItem
            className='Navitem'
            eventKey='BookRides'
            style={{ marginBottom: '15px' }}
          >
            <NavIcon>
              <TbRollercoaster size={22} style={{ color: '#FF0000' }} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
               Ride Tickets
            </NavText>
          </NavItem>
          <NavItem
            className='Navitem'
            eventKey='BookGames'
            style={{ marginBottom: '15px' }}
          >
            <NavIcon>
              <GiDart size={22} style={{ color: '#FF0000' }} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Game Tickets
            </NavText>
          </NavItem>
          <NavItem
            className='Navitem'
            eventKey='BookAttractions'
            style={{ marginBottom: '15px' }}
          >
            <NavIcon>
              <TbBuildingCircus size={22} style={{ color: '#FF0000' }} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Attraction Tickets
            </NavText>
          </NavItem>
          <NavItem
            className='Navitem'
            eventKey='MyBookings'
            style={{ marginBottom: '15px' }}
          >
            <NavIcon>
              <BsBookFill size={22} style={{ color: '#FF0000' }} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              My Bookings
            </NavText>
          </NavItem>
          <NavItem
            className='Navitem'
            eventKey='Profile'
            style={{ marginBottom: '15px' }}
          >
            <NavIcon>
              <CgProfile size={22} style={{ color: '#FF0000' }} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Profile
            </NavText>
          </NavItem>
          <NavItem
            className='Navitem'
            eventKey='Logout'
            style={{ marginBottom: '15px' }}
          >
            <NavIcon>
              <IoLogOut size={22} style={{ color: '#FF0000' }} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Logout
            </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </>
  )
}

export default CustomerSideNav
