import { useState } from 'react'
import '../../styles/admin.styles/tiktitle.css'
import { BsTools } from 'react-icons/bs'
import axios from 'axios'
import { useEffect } from 'react'
import axiosApi from '../../axiosInstance'

function MiniChartRide () {
  const [num, setNum] = useState('')
  useEffect(() => {
    axiosApi.get('/admin/NumRidesBroken').then(res => {
      const number = res.data.count
      setNum(number)
    })
  }, [])

  return (
    <>
      <div className='TikTitle'>
        <h3>Rides Broken:</h3>
        <div className='TikNum'>
          {num ? num : '0'}
          <BsTools size={50} style={{marginLeft:'5px'}} />
        </div>
      </div>
    </>
  )
}

export default MiniChartRide
