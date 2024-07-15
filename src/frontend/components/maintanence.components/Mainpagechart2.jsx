import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import axios from 'axios'
import axiosApi from '../../axiosInstance'

function Mainpagechart2 () {
  const [rowData, setRowData] = useState([])
  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID', field: 'breakdown_id' },
    { headerName: 'Game Name', field: 'game_name' },
    { headerName: 'Breakdown Date', field: 'breakdown_date' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Requester First Name', field: 'requester_fname' },
    { headerName: 'Requester Last Name', field: 'requester_lname' },
    { headerName: 'Requester Email', field: 'requester_email' },
    { headerName: 'Game Name', field: 'game_name' }
  ])
  const account_id = localStorage.getItem('account_id')
  useEffect(() => {
    axiosApi
      .post('/maintenance/MyGameMaintenanceRequests', {account_id})
      .then(response => {
        console.log(response.data.myGame)
        setRowData(response.data.myGame)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  return (
    <div className='ag-theme-alpine' style={{ height: 500, width:'100%' }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={5}
        
      />
    </div>
  )
}

export default Mainpagechart2
