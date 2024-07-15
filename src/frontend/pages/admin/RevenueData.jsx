import React, { useEffect, useState } from 'react'
import axiosApi from '../../axiosInstance' // Ensure this points correctly to your API setup file
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Snackbar,
  Alert
} from '@mui/material'
import AdminSideNav from '../../components/admin.components/SideNav'
import styled from 'styled-components'
import Header from '../../components/customer.components/Header'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { Bar } from 'react-chartjs-2'
import EmpHeader from '../../components/admin.components/EmpHeader'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// Styled components
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  gap: 20px;
`

function RevenueData () {
  const [ShowForm, setShowForm] = useState(true)
  const [selectedType, setSelectedType] = useState('')
  const [TotalRevenue, setTotalRevenue] = useState(0)
  const [rowData, setRowData] = useState([{}])
  const [columnDefs, setColumnDefs] = useState([
    { field: 'date', headerName: 'Date' },
    { field: 'name', headerName: 'Name' },
    { field: 'revenue', headerName: 'Revenue' },
    { field: 'quantity', headerName: 'Amount Sold' }
  ])

  const [data, setData] = useState({
    start_date: null,
    end_date: null,
    type: ''
  })
  const [openSnackbar, setOpenSnackbar] = useState(false)

  // Fetch initial data

  const handleTypeChange = event => {
    setData(prev => ({ ...prev, type: event.target.value }))
  }
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Revenue',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)'
      }
    ]
  })

  const handleSubmit = async () => {
    if (!data.start_date || !data.end_date || data.start_date > data.end_date) {
      setOpenSnackbar(true)
      return
    }
    const FormatDate = date => date.format('YYYY-MM-DD')
    const start_date = FormatDate(data.start_date)
    const end_date = FormatDate(data.end_date)
    data.start_date = start_date
    data.end_date = end_date
    console.log(data)
    axiosApi
      .post('/admin/GetRevenueReport', data)
      .then(response => {
        setRowData(response.data.revenueReport)
      })
      .catch(error => {
        console.error('Failed to fetch revenue report:', error)
      })
    axiosApi.post('/admin/GetRevenueGraph', data).then(response => {
      const names = response.data.revenueGraph.map(item => item.name)
      const revenue = response.data.revenueGraph.map(item => item.revenue)
      setChartData({
        labels: names,
        datasets: [
          {
            label: 'Revenue',
            data: revenue,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)'
          }
        ]
      })
    })
    axiosApi
      .post('/admin/LargeRevenueStats', data)
      .then(response => {
        setTotalRevenue(response.data.revenue[0].revenue)
        console.log(TotalRevenue)
      })
      .catch(error => {
        console.error('Failed to fetch revenue report:', error)
      })

    setShowForm(false)
  }
  const options = {
    scales: {
      y: {
        label: 'Revenue ($)'
      },
      x: {
        label: 'Name'
      }
    }
  }

  return (
    <>
      <AdminSideNav />
      <EmpHeader />
      {ShowForm ? (
        <Container>
          <h1>Revenue Analysis</h1>
          <FormContainer>
            <InputLabel>Type</InputLabel>
            <Select
              value={data.type}
              label='Type'
              onChange={handleTypeChange}
              style={{ width: '70%' }}
            >
              <MenuItem value='rides'>Rides</MenuItem>
              <MenuItem value='games'>Games</MenuItem>
              <MenuItem value='attractions'>Attractions</MenuItem>
              <MenuItem value='gifts'>Gifts</MenuItem>
              <MenuItem value='*'>All</MenuItem>
            </Select>
            <FormControl style={{ width: '70%', gap: '20px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Start Date'
                  inputFormat='YYYY-MM-DD'
                  value={data.start_date}
                  onChange={newValue =>
                    setData(prev => ({ ...prev, start_date: newValue }))
                  }
                  renderInput={params => <StyledFormControl {...params} />}
                />
                <DatePicker
                  label='End Date'
                  inputFormat='YYYY-MM-DD'
                  value={data.end_date}
                  onChange={newValue =>
                    setData(prev => ({ ...prev, end_date: newValue }))
                  }
                  renderInput={params => <StyledFormControl {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
            <button
              variant='contained'
              onClick={handleSubmit}
              style={{ backGroundColor: 'black', marginBottom: '50px' }}
            >
              Submit
            </button>
          </FormContainer>
        </Container>
      ) : (
        <>
          <div
            className='ag-theme-alpine'
            style={{
              height: 400,
              width: 800,
              marginLeft: '320px',
              marginTop: '100px'
            }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
            />
          </div>
          <h1 style={{ marginLeft: '800px', marginBottom: '100px' }}>
            Total Revenue: ${TotalRevenue}
          </h1>
          <div style={{ width: '100%', height: '500px' }}>
            <Bar
              data={chartData}
              options={options}
              style={{
                width: 700,
                height: 700,
                margin: 'auto',
                marginBottom: '100px'
              }}
            />
          </div>
        </>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity='error'
          sx={{ width: '100%' }}
        >
          Invalid date range or data incomplete!
        </Alert>
      </Snackbar>
    </>
  )
}

export default RevenueData

const Container = styled.div`
  width: 400px;
  height: 400px;
  margin-top: 150px;
  margin-left: 520px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
`
