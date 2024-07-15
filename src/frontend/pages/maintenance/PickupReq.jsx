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
function PickupReq () {
  const [rowDataRides, setRowDataRides] = useState([])
  const [rowDataGames, setRowDataGames] = useState([])
  const [rowDataAttractions, setRowDataAttractions] = useState([])
  const [selectedRowRides, setSelectedRowRides] = useState(null)
  const [selectedRowGames, setSelectedRowGames] = useState(null)
  const [selectedRowAttractions, setSelectedRowAttractions] = useState(null)
  const [sucess1, setSucess1] = useState(false)
  const [sucess2, setSucess2] = useState(false)
  const [sucess3, setSucess3] = useState(false)
  const [columnDefs] = useState([
    { headerName: 'ID', field: 'breakdown_id', checkboxSelection: true },
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
    axiosApi
      .post('/maintenance/FreeMaintReq')
      .then(response => {
        setRowDataRides(response.data.AllRequests)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const fetchGames = () => {
    axiosApi
      .post('/maintenance/FreeMaintReqGames')
      .then(response => {
        setRowDataGames(response.data.AllRequests)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const fetchAttractions = () => {
    axiosApi
      .post('/maintenance/FreeMaintReqAttractions')
      .then(response => {
        setRowDataAttractions(response.data.AllRequests)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const handleUpdateRequestRide = () => {
    const account = { account_id: localStorage.getItem('account_id') }
    const data = { ...selectedRowRides, ...account }
    console.log(selectedRowRides)
    if (selectedRowRides === null) {
      console.error('No row selected')
      return
    }
    axiosApi
      .post('/maintenance/PickupMaintenanceRequest', data)
      .then(() => {
        // On successful update, remove the updated row from the current state
        const updatedRowData = rowDataRides.filter(
          row => row.breakdown_id !== selectedRowRides.breakdown_id
        )
        setRowDataRides(updatedRowData)
        setSelectedRowRides(null) // Reset selection
        setSucess1(true)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const handleUpdateRequestGames = () => {
    const account = { account_id: localStorage.getItem('account_id') }
    const data = { ...selectedRowGames, ...account }
    if (selectedRowGames === null) {
      console.error('No row selected')
      return
    }
    axiosApi
      .post('/maintenance/PickupMaintenanceRequestGames', data)
      .then(() => {
        // On successful update, remove the updated row from the current state
        const updatedRowData = rowDataGames.filter(
          row => row.breakdown_id !== selectedRowGames.breakdown_id
        )
        setRowDataGames(updatedRowData)
        setSelectedRowGames(null) // Reset selection
        setSucess2(true)
      })
      .catch(error => {
        console.error(error)
      })
  }
  const handleUpdateRequestAttractions = () => {
    const account = { account_id: localStorage.getItem('account_id') }
    const data = { ...selectedRowAttractions, ...account }
    if (selectedRowAttractions === null) {
      console.error('No row selected')
      return
    }
    axiosApi
      .post('/maintenance/PickupMaintenanceRequestAttractions', data)
      .then(() => {
        // On successful update, remove the updated row from the current state
        const updatedRowData = rowDataAttractions.filter(
          row => row.breakdown_id !== selectedRowAttractions.breakdown_id
        )
        setRowDataAttractions(updatedRowData)
        setSelectedRowAttractions(null) // Reset selection
        setSucess3(true)
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
              onCellClicked={e => setSelectedRowRides(e.data)}
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
            Pickup Ride
          </Button>
        </div>
        <Snackbar
          open={sucess1}
          autoHideDuration={6000}
          onClose={() => setSucess1(false)}
        >
          <Alert onClose={() => setSucess1(false)} severity='success'>
            Ride Picked up!
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
            Pickup Game
          </Button>
        </div>
        <Snackbar
          open={sucess2}
          autoHideDuration={6000}
          onClose={() => setSucess2(false)}
        >
          <Alert onClose={() => setSucess2(false)} severity='success'>
            Game Picked up!
          </Alert>
        </Snackbar>
      </div>
      <div className='RideDataContainer' style={{ margin: '0', height: '600px' }}>
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
      Pickup Attraction
    </Button>
  </div>
  <Snackbar
    open={sucess3}
    autoHideDuration={6000}
    onClose={() => setSucess3(false)}
  >
    <Alert onClose={() => setSucess3(false)} severity='success'>
      Attraction Picked up!
    </Alert>
  </Snackbar>
</div> 
    </>
  )
}

export default PickupReq
