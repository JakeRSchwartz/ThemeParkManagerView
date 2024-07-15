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
import { CgProfile } from 'react-icons/cg'
import { BiLogInCircle } from 'react-icons/bi'
import {
  Route,
  Routes,
  Link,
  BrowserRouter as Router,
  useLocation
} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import RideData from '../../pages/admin/RevenueData'

function LandingNav () {
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
           if (selected === 'Login') {
            localStorage.clear()
            navigate('/login')
          }
        }}
      >
        <SideNav.Toggle style={{ background: '#FF0000', color: 'black' }} />
        <SideNav.Nav defaultSelected='admin'>
          <NavItem
            className='Navitem'
            eventKey='Login'
            style={{ marginBottom: '15px', marginTop:'15px' }}
          >
            <NavIcon>
              <BiLogInCircle size={22} style={{ color: '#FF0000' }} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Login
            </NavText>
          </NavItem>
        </SideNav.Nav>
      </SideNav>
    </>
  )
}

export default LandingNav
