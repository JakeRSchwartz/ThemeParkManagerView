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
import { FaTools } from 'react-icons/fa'
import { IoIosSettings } from 'react-icons/io'
import { FaPerson, FaPersonCirclePlus } from 'react-icons/fa6'
import { FaPersonCircleXmark } from 'react-icons/fa6'
import '../../styles/admin.styles/admin.css'
import { IoLogOut } from 'react-icons/io5'
import { TbReportSearch } from 'react-icons/tb'
import { BsClipboardCheckFill } from 'react-icons/bs'
import { BsCloudRainFill } from 'react-icons/bs'
import '../../styles/maintanence.styles/maintenance.css'
import { GiCardPickup } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'

import {
  Route,
  Routes,
  Link,
  BrowserRouter as Router,
  useLocation
} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import RideData from '../../pages/admin/RevenueData'

function MaintenanceSideNav () {
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
            const to = '/maintenance/' + selected
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
            eventKey='PickupReq'
            style={{ marginBottom: '15px', marginTop: '15px' }}
          >
            <NavIcon>
              <GiCardPickup style={{ color: '#FF0000' }} size={22} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Pickup Request
            </NavText>
          </NavItem>
          <NavItem
            className='Navitem'
            eventKey='SubmitMaintenance'
            style={{ marginBottom: '15px' }}
          >
            <NavIcon>
              <FaTools size={22} style={{ color: '#FF0000' }} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Submit Maintenance
            </NavText>
          </NavItem>
          <NavItem
            className='Navitem'
            eventKey='MaintenanceFixed'
            style={{ marginBottom: '15px' }}
          >
            <NavIcon>
              <BsClipboardCheckFill size={22} style={{ color: '#FF0000' }} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Submit Fixed
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

export default MaintenanceSideNav
