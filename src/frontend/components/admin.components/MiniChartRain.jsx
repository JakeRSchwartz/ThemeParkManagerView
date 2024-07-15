import { useState } from 'react'
import '../../styles/admin.styles/tiktitle.css'
import axios from 'axios'
import { useEffect } from 'react'
import { FaCloudRain } from 'react-icons/fa'
import axiosApi from '../../axiosInstance'

function MiniChartRain () {
  const [num, setNum] = useState('')
  useEffect(() => {
    axiosApi.get('/admin/NumRainouts').then(res => {
      const number = res.data.count
      setNum(number)
    })
  }, [])

  return (
    <>
      <div className='TikTitle'>
        <h3>Rides Rained Out:</h3>
        <div className='TikNum'>
          {num ? num : '0'}
          <FaCloudRain size={50} style={{marginLeft:'5px'}} />
        </div>
      </div>
    </>
  )
}

export default MiniChartRain
