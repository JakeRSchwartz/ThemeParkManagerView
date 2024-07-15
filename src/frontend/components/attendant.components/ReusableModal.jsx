import React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import moment from 'moment'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

const ShiftDetailsModal = ({ open, onClose, shiftDetails }) => {
    console.log('shiftDetails:', shiftDetails)
  if (!shiftDetails || shiftDetails.length === 0) {
  return null 
}


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>
        Shift Details for {moment(shiftDetails[0].start).format('MMMM Do YYYY')}
      </DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shiftDetails.map((detail, index) => (
              <TableRow key={index}>
                <TableCell>{moment(detail.start_time, 'HH:mm:ss').format('h:mm A')} - 
  {moment(detail.end_time, 'HH:mm:ss').format('h:mm A')}</TableCell>
                <TableCell>{detail.first_name}</TableCell>
                <TableCell>{detail.last_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ShiftDetailsModal


