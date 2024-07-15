import React from 'react'
import '../../styles/admin.styles/admin.css'
import AdminSideNav from '../../components/admin.components/SideNav.jsx'
import videos from '../../assets/CoogsParkad.mp4'
import InventoryChart from '../../components/admin.components/InventoryChart.jsx'
import MiniChartRide from '../../components/admin.components/MiniChartRide.jsx'
import MiniChartRain from '../../components/admin.components/MiniChartRain.jsx'
import MiniChartEmp from '../../components/admin.components/MiniChartEmp.jsx'
import { DataContext } from '../../contexts/dataContext.jsx'
import { useContext } from 'react'
import { Snackbar } from '@mui/material'
import { Alert } from '@mui/material'
import AdminChart1 from '../../components/admin.components/AdminChart1.jsx'
import AdminChart2 from '../../components/admin.components/Adchart2.jsx'
import Notifications from '../../components/admin.components/Notifications.jsx'
import EmpHeader from '../../components/admin.components/EmpHeader.jsx'
function AdminHome () {
  const fname = localStorage.getItem('first_name')
  const lname = localStorage.getItem('last_name')
  const { data, dispatch } = useContext(DataContext)
  const handleCloseReg = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch({ type: 'SET_REGISTERED', payload: false })
  }
  return (
    <>
          <AdminSideNav style={{ width: '100%', height: '100vh' }} />
          <EmpHeader/>
          <div className='homeContainer'>
        <div className='minichart1'>
          <InventoryChart />
        </div>
        <div className='adchart1'>
          <AdminChart1 />
        </div>
        <div className='adinfo1'>
          <AdminChart2 />
        </div>
        <div className='adinfo2'>
          <Notifications />
        </div>
        <Snackbar
          open={data.registered}
          autoHideDuration={4000}
          onClose={handleCloseReg}
        >
          <Alert severity='success' style={{ marginBottom: '10px' }}>
            Account was successfully created!
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}

export default AdminHome
