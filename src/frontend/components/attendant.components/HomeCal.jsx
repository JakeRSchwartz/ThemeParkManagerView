import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import axiosApi from '../../axiosInstance'
import styled from 'styled-components'
import ShiftDetailsModal from './ReusableModal'
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'

const StyledCalendar = styled(Calendar)`
  height: 800px;
  padding: 20px;
  .rbc-calendar {
    border: 1px solid #ddd;
  }
  .rbc-toolbar {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
  }
  .rbc-btn-group button {
    padding: 5px 10px;
    font-size: 12px;
    width: 100px;
    height: 40px;
  }
`

function HomeCal () {
  const account_id = localStorage.getItem('account_id')
  const localizer = momentLocalizer(moment)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    setLoading(true)
    axiosApi
      .get(`/attendant/GetYourShifts/${account_id}`)
      .then(response => {
        const formattedEvents = response.data.map(item => {
          const startDate = new Date(item.shift_date)
          const endDate = new Date(item.shift_date)
          const start = new Date(
            startDate.setHours(
              parseInt(item.start_time.split(':')[0]),
              parseInt(item.start_time.split(':')[1])
            )
          )
          const end = new Date(
            endDate.setHours(
              parseInt(item.end_time.split(':')[0]),
              parseInt(item.end_time.split(':')[1])
            )
          )

          return {
            title: `${item.first_name} ${item.last_name} - ${
              item.ride_name || item.game_name || item.attraction_name || 'None'
            }`,
            start: start,
            end: end,
            allDay: false,
            resource: item,
            locationType: item.ride_name
              ? 'Ride'
              : item.game_name
              ? 'Game'
              : item.attraction_name
              ? 'Attraction'
              : 'None'
          }
        })
        setEvents(formattedEvents)
        setLoading(false)
      })
      .catch(error => {
        console.error('Failed to fetch shifts:', error)
        setLoading(false)
      })
  }, [account_id])

  const handleEventSelect = event => {
    setSelectedEvent([event.resource])
    setModalOpen(true)
  }

  const handleSelectSlot = slotInfo => {
    const dayShifts = events.filter(event =>
      moment(event.start).isSame(moment(slotInfo.start), 'day')
    )
    setSelectedEvent(dayShifts)
    setModalOpen(true)
  }

  const filteredEvents =
    filter === 'All'
      ? events
      : events.filter(event => event.locationType === filter)

  return (
    <>
      <FormControl
        style={{ width: '200px', marginLeft: '100px', marginTop: '50px' }}
      >
        <InputLabel id='filter-label'>Filter by Type</InputLabel>
        <Select
          labelId='filter-label'
          id='filter-select'
          value={filter}
          label='Filter by Type'
          onChange={e => setFilter(e.target.value)}
        >
          <MenuItem value='All'>All</MenuItem>
          <MenuItem value='Ride'>Rides</MenuItem>
          <MenuItem value='Game'>Games</MenuItem>
          <MenuItem value='Attraction'>Attractions</MenuItem>
        </Select>
      </FormControl>

      <StyledCalendar
        localizer={localizer}
        events={filteredEvents}
        onSelectEvent={handleEventSelect}
        onSelectSlot={handleSelectSlot}
        selectable={true}
        style={{ height: 700, width: 1100, margin: 'auto', marginTop: 20 }}
      />

      <ShiftDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        shiftDetails={selectedEvent}
      />
    </>
  )
}

export default HomeCal
