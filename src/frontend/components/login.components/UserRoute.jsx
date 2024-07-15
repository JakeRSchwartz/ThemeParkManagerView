import React, { useState, useEffect } from 'react'

import AdminHome from '../../pages/admin/AdminHome'
import AttendantHome from '../../pages/attendant/AttendantHome'
import MaintenanceHome from '../../pages/maintenance/MaintenanceHome'
import CustomerHome from '../../pages/customer/CustomerHome'


const UserRouter = () => {
  const [user_Type, setUserType] = useState('')

  useEffect(() => {
    setUserType(localStorage.getItem('user_type'))
  }, [])

  const routes = () => {
    switch (user_Type) {
      case 'customer':
        return <CustomerHome />
      case 'admin':
        return < AdminHome />
      case 'attendant':
        return <AttendantHome />
      case 'maintenance':
        return <MaintenanceHome/>
      default:
        return <div>Nothing Here</div>
    }
  }

  return <div>{routes()}</div>
}

export default UserRouter
