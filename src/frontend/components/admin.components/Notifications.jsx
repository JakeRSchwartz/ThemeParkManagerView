import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axiosApi from '../../axiosInstance'
import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import axios from 'axios'
import moment from 'moment-timezone'

function Notifications () {
  const [notifications, setNotifications] = useState([])
  const account_id = localStorage.getItem('account_id')
  useEffect(() => {
    console.log(account_id)
    axiosApi
      .post('/admin/Notifications', { account_id: account_id })
      .then(res => {
        setNotifications(res.data.notifications)
      })
      .catch(error => {
        console.error('There was an error fetching the notifications:', error)
      })
  }, [])

const formatDate = dateString => {
  return moment(dateString).format('MMMM DD, YYYY') // Adjusted for date only
}


  const handleClose = (trigger_id, type, account_id) => {
    setNotifications(
      notifications.filter(
        notification => notification.trigger_id !== trigger_id
      )
    )
    axiosApi
      .patch('/admin/SeenNotifications', {
        account_id,
        trigger_id,
        type
      })
      .then(() => {})
      .catch(error => {
        console.error('There was an error updating the notifications:', error)
      })
  }

  return (
    <div style={{ margin: '10px' }}>
      <h1 style={{marginBottom:'10px'}}>Today's Notifications</h1>
      <ul
        style={{
          margin: '10px, 10px, 10px, 10px',
          overflowY: 'auto', // Allow vertical scrolling
          maxHeight: '100vh'
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((notification, index) => {
            console.log(notification)
            const formattedDate = formatDate(notification.date)
            const message =
              notification.type === 'RM' || notification.type === 'GM' || notification.type === 'AM'
                ? `${formattedDate} ${notification.name} has a new maintenance request.`
                : `${formattedDate} ${notification.name} is rained out.`

            return (
              <Alert
                severity='warning'
                key={index}
                onClose={() =>
                  handleClose(
                    notification.trigger_id,
                    notification.type,
                    account_id
                  )
                }
                style={{ marginBottom: '10px' }}
              >
                {message}
              </Alert>
            )
          })
        ) : (
          <ul style={{ margin: '10px' }}>No Notifications</ul>
        )}
      </ul>
    </div>
  )
}

export default Notifications
