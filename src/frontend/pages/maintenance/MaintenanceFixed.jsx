import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import MaintenanceSideNav from '../../components/maintanence.components/MainSideNav'
import { Button } from 'flowbite-react'
import axiosApi from '../../axiosInstance'
import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import EmpHeader from '../../components/admin.components/EmpHeader'
import MaintenanceHeader from '../../components/maintanence.components/MaintenanceHeader'

function MaintenanceFixed () {
  const [rowDataRides, setRowDataRides] = useState([])
  const [rowDataGames, setRowDataGames] = useState([])
  const [rowDataAttractions, setRowDataAttractions] = useState([])
  const [selectedRowRides, setSelectedRowRides] = useState(null)
  const [selectedRowGames, setSelectedRowGames] = useState(null)
  const [selectedRowAttractions, setSelectedRowAttractions] = useState(null)
  const [success1, setSuccess1] = useState(false)
  const [success2, setSuccess2] = useState(false)
  const [success3, setSuccess3] = useState(false)
  const [columnDefs] = useState([
    { headerName: 'Maintenance ID', field: 'breakdown_id', checkboxSelection: true },
    { headerName: 'Name ID', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Breakdown Date', field: 'breakdown_date' },
    { headerName: 'Description', field: 'description' },
    { headerName: 'Requester First Name', field: 'requester_fname' },
    { headerName: 'Requester Last Name', field: 'requester_lname' },
    { headerName: 'Requester Email', field: 'requester_email' }
  ])

  useEffect(() => {
    fetchMaintenanceRequests()
    fetchGames()
    fetchAttractions()
  }, [])

  const fetchMaintenanceRequests = () => {
    const account_id = { account_id: localStorage.getItem('account_id') }
    axiosApi
      .post('/maintenance/MyFixedMaintenanceRequests', account_id)
      .then(response => {
        setRowDataRides(response.data.myRequests)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const fetchGames = () => {
    const account_id = { account_id: localStorage.getItem('account_id') }
    axiosApi
      .post('/maintenance/MyFixedGames', account_id)
      .then(response => {
        setRowDataGames(response.data.myGame)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const fetchAttractions = () => {
    const account_id = { account_id: localStorage.getItem('account_id') }
    axiosApi
      .post('/maintenance/MyFixedAttractions', account_id)
      .then(response => {
        setRowDataAttractions(response.data.myAttractions)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleUpdateRequestRide = () => {
    if (selectedRowRides === null) {
      console.error('No row selected')
      return
    }
    axiosApi
      .patch('/maintenance/updateMaintenanceRequest', selectedRowRides)
      .then(() => {
        // On successful update, remove the updated row from the current state
        const updatedRowData = rowDataRides.filter(
          row => row.breakdown_id !== selectedRowRides.breakdown_id
        )
        setRowDataRides(updatedRowData)
        setSelectedRowRides(null) // Reset selection
        setSuccess1(true)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const handleUpdateRequestGames = () => {
    if (selectedRowGames === null) {
      console.error('No row selected')
      return
    }
    axiosApi
      .patch('/maintenance/updateMaintenanceRequestGames', selectedRowGames)
      .then(() => {
        // On successful update, remove the updated row from the current state
        const updatedRowData = rowDataGames.filter(
          row => row.breakdown_id !== selectedRowGames.breakdown_id
        )
        setRowDataGames(updatedRowData)
        setSelectedRowGames(null) // Reset selection
        setSuccess2(true)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const handleUpdateRequestAttractions = () => {
    if (selectedRowAttractions === null) {
      console.error('No row selected')
      return
    }
    axiosApi
      .patch(
        '/maintenance/updateMaintenanceRequestAttractions',
        selectedRowAttractions
      )
      .then(() => {
        // On successful update, remove the updated row from the current state
        const updatedRowData = rowDataAttractions.filter(
          row => row.breakdown_id !== selectedRowAttractions.breakdown_id
        )
        setRowDataAttractions(updatedRowData)
        setSelectedRowAttractions(null) // Reset selection
        setSuccess3(true)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <>
      <MaintenanceSideNav />
      <MaintenanceHeader />
      <div
        className='RideDataContainer'
        style={{ margin: '0', height: '600px' }}
      >
        <h1 style={{ margin: '10px' }}>Rides</h1>
        <div className='AdminRideData' style={{ overflowY: 'scroll' }}>
          <div className='ag-theme-alpine' style={{ height: 500, width: 1200 }}>
            <AgGridReact
              title='Rides'
              rowData={rowDataRides}
              columnDefs={columnDefs}
              rowSelection='single'
              onCellClicked={e => {
                setSelectedRowRides(e.data);
              }}
            />
          </div>
        </div>
        <div className='MaintDeleteBtn'>
          <Button
            style={{
              width: '150px',
              backgroundColor: 'green'
            }}
            onClick={handleUpdateRequestRide}
          >
            Ride Fixed
          </Button>
        </div>
        <Snackbar
          open={success1}
          autoHideDuration={6000}
          onClose={() => setSuccess1(false)}
        >
          <Alert onClose={() => setSuccess1(false)} severity='success'>
            Ride Fixed!
          </Alert>
        </Snackbar>
      </div>
      <div
        className='RideDataContainer'
        style={{ margin: '0', height: '600px' }}
      >
        <h1 style={{ marginBottom: '10px' }}>Games</h1>
        <div className='AdminRideData' style={{ overflowY: 'scroll' }}>
          <div className='ag-theme-alpine' style={{ height: 500, width: 1200 }}>
            <AgGridReact
              title='Rides'
              rowData={rowDataGames}
              columnDefs={columnDefs}
              rowSelection='single'
              onCellClicked={e => setSelectedRowGames(e.data)}
            />
          </div>
        </div>
        <div className='MaintDeleteBtn'>
          <Button
            style={{
              width: '150px',
              backgroundColor: 'green'
            }}
            onClick={handleUpdateRequestGames}
          >
            Game Fixed
          </Button>
        </div>
        <Snackbar
          open={success2}
          autoHideDuration={6000}
          onClose={() => setSuccess2(false)}
        >
          <Alert onClose={() => setSuccess2(false)} severity='success'>
            Game Fixed!
          </Alert>
        </Snackbar>
      </div>
      ;
      <div
        className='RideDataContainer'
        style={{ margin: '0', height: '600px' }}
      >
        <h1 style={{ marginBottom: '10px' }}>Attractions</h1>
        <div className='AdminRideData' style={{ overflowY: 'scroll' }}>
          <div className='ag-theme-alpine' style={{ height: 500, width: 1200 }}>
            <AgGridReact
              title='Rides'
              rowData={rowDataAttractions}
              columnDefs={columnDefs}
              rowSelection='single'
              onCellClicked={e => setSelectedRowAttractions(e.data)}
            />
          </div>
        </div>
        <div className='MaintDeleteBtn'>
          <Button
            style={{
              width: '150px',
              backgroundColor: 'green'
            }}
            onClick={handleUpdateRequestAttractions}
          >
            Attraction Fixed
          </Button>
        </div>
        <Snackbar
          open={success3}
          autoHideDuration={6000}
          onClose={() => setSuccess3(false)}
        >
          <Alert onClose={() => setSuccess3(false)} severity='success'>
            Attraction Fixed!
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}

export default MaintenanceFixed
