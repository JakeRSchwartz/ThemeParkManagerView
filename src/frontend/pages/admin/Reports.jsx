import React from 'react'
import { Link } from 'react-router-dom'
import AdminSideNav from '../../components/admin.components/SideNav'
import '../../styles/admin.styles/reports.css'
import axiosApi from '../../axiosInstance'
import EmpHeader from '../../components/admin.components/EmpHeader'

function Reports () {
  return (
    <>
      <EmpHeader />
      <AdminSideNav height={1000} />
      <div className='MainReportCont'>
        <div className='ReportsContainer'>
          <Link to='/admin/reports/RevenueData' className='ReportLinkRide'>
            Revenue Reports
          </Link>
          <Link to='/admin/reports/GameData' className='ReportLinkGame'>
            Activity Reports
          </Link>
          <Link
            to='/admin/reports/MaintenanceReport'
            className='ReportLinkMain'
          >
            Maintenance Reports
          </Link>
        </div>
      </div>
    </>
  )
}

export default Reports
