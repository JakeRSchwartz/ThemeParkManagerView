import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import axios from 'axios'
import axiosApi from '../../axiosInstance'
function Mainpagechart () {
  const [rowData, setRowData] = useState([])
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'breakdown_id' },
    { headerName: 'Ride Name', field: 'ride_name' },
    { headerName: 'Breakdown Date', field: 'breakdown_date' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Requester First Name', field: 'requester_fname' },
    { headerName: 'Requester Last Name', field: 'requester_lname' },
    { headerName: 'Requester Email', field: 'requester_email' }
  ])

  useEffect(() => {
    const account_id = { account_id: localStorage.getItem('account_id') }
    axiosApi
      .post('/maintenance/MyRideMaintenanceRequests', account_id)
      .then(response => {
        setRowData(response.data.myRide)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  return (
    <div className='ag-theme-alpine' style={{ height: 500, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={5}
      />
    </div>
  )
}

export default Mainpagechart
