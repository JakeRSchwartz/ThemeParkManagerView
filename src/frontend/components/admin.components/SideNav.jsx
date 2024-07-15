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
import { BsCloudRainFill } from 'react-icons/bs'
import { GrSchedule } from 'react-icons/gr'
import { BsFillSunFill } from 'react-icons/bs'
import { RiAddBoxFill } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { MdInventory } from 'react-icons/md'


import {
  Route,
  Routes,
  Link,
  BrowserRouter as Router,
  useLocation
} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function AdminSideNav () {
  const { pathname } = useLocation()
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
          } else if (selected === 'SubmitMaintenance') {
            navigate('/SubmitMaintenance')
          } else if (selected === 'SubmitRainout') {
            navigate('/SubmitRainout')
          } else {
            const to = '/admin/' + selected
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
            eventKey='Reports'
            style={{ marginBottom: '15px' }}
          >
            <NavIcon>
              <TbReportSearch size={22} style={{ color: '#FF0000' }} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Reports
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
            eventKey='EndRainout'
            style={{ marginBottom: '15px' }}
          >
            <NavIcon>
              <BsCloudRainFill style={{ color: '#FF0000' }} size={22} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Manage Rainout
            </NavText>
          </NavItem>
          <NavItem
            className='Navitem'
            eventKey='AddEmployee'
            style={{ marginBottom: '15px' }}
          >
            <NavIcon>
              <FaPersonCirclePlus size={22} style={{ color: '#FF0000' }} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Manage Employees
            </NavText>
          </NavItem>
          <NavItem
            className='Navitem'
            eventKey='ManageInventory'
            style={{ marginBottom: '15px' }}
          >
            <NavIcon>
              <MdInventory size={22} style={{ color: '#FF0000' }} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Manage Inventory
            </NavText>
          </NavItem>
          <NavItem
            className='Navitem'
            eventKey='MakeSchedule'
            style={{ marginBottom: '15px' }}
          >
            <NavIcon>
              <GrSchedule size={22} style={{ color: '#FF0000' }} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Make Schedule
            </NavText>
          </NavItem>
          <NavItem
            className='Navitem'
            eventKey='UpdatePark'
            style={{ marginBottom: '15px' }}
          >
            <NavIcon>
              <RiAddBoxFill size={22} style={{ color: '#FF0000' }} />
            </NavIcon>
            <NavText
              style={{
                color: 'black',
                fontFamily: 'Roboto',
                fontSize: '15px'
              }}
            >
              Update Park
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

export default AdminSideNav
